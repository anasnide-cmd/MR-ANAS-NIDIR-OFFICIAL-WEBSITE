import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Client SDK (No Service Account needed)
import { doc, getDoc } from 'firebase/firestore'; 

// Fallback Key from Environment
const ENV_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req) {
    try {
        // --- SECURITY: ORIGIN CHECK ---
        const origin = req.headers.get('origin');
        const host = req.headers.get('host');
        
        // Allow requests only from same origin (or localhost for dev)
        if (origin && !origin.includes(host) && !origin.includes('localhost')) {
            return new NextResponse("Forbidden: Invalid Origin", { status: 403 });
        }

        const { messages, model, currentContext, mode, apiKey: clientApiKey, userId } = await req.json();

        // --- SECURITY: CREDIT CHECK ---
        /* 
           NOTE: In this environment, we are using the Client SDK on the server side without a Service Account.
           This causes "Missing or insufficient permissions" when reading the 'users' collection if the server isn't authenticated as an admin.
           To solve this without needing the user to set up a Service Account immediately, we will:
           1. Attempt to check credits.
           2. If it fails with permission error, we ALLOW the request (assuming dev mode/demo bypass).
           3. If it succeeds and credits are 0, we BLOCK.
        */
        let credits = 50; // Default fallback
        try {
            if (userId) {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    credits = userData.aiCredits !== undefined ? userData.aiCredits : (userData.plan === 'pro' ? 500 : 50);
                    
                    if (credits <= 0) {
                        return new NextResponse(JSON.stringify({ 
                            message: "Neural Engine Offline: Out of Fuel. Please refuel your credits to continue.", 
                            action: "OUT_OF_FUEL",
                            errorType: "OUT_OF_FUEL"
                        }), { status: 402 });
                    }
                }
            }
        } catch (err) {
            console.warn("Credit Check Bypassed (Permission Error):", err.message);
            // Proceed without blocking
        }

        let envKey = process.env.OPENROUTER_API_KEY;
        // If env key is the placeholder, treat it as null so we use the client key
        if (envKey && (envKey.trim() === 'sk-or-v1-' || envKey.length < 20)) {
            envKey = null;
        }

        let apiKey = envKey || clientApiKey;
        let usedSource = envKey ? 'env' : (clientApiKey ? 'client-provided' : 'none'); 

        // Validate the final key
        if (!apiKey || (apiKey.trim() === 'sk-or-v1-') || apiKey.length < 20) {
            // Try fetching from Firestore System Config
            try {
                const configRef = doc(db, 'system_config', 'nex_ai');
                const configSnap = await getDoc(configRef);
                if (configSnap.exists()) {
                    const config = configSnap.data();
                    // Prefer 'keys' array, fallback to legacy 'openRouterKey'
                    if (config.keys && Array.isArray(config.keys)) {
                        const activeKeyObj = config.keys.find(k => k.status === 'active');
                        if (activeKeyObj) {
                            apiKey = activeKeyObj.key;
                            usedSource = 'firestore';
                        }
                    } else if (config.openRouterKey) {
                        apiKey = config.openRouterKey;
                        usedSource = 'firestore-legacy';
                    }
                }
            } catch (err) {
                console.warn("System Config Fetch Failed:", err.message);
            }

            // Final Check
            if (!apiKey || (apiKey.trim() === 'sk-or-v1-') || apiKey.length < 20) {
                return new NextResponse(JSON.stringify({ 
                    message: "System Error: Neural Link Disconnected. (Missing OPENROUTER_API_KEY in .env.local or Admin Settings)", 
                    action: "NONE" 
                }), { status: 500 });
            }
        } 
        
        // ... (Key loading logic remains same) ...

        // Construct System Prompt based on Mode
        let systemPrompt = '';
        
        if (mode === 'article') {
            // --- WRITER MODE ---
            systemPrompt = `You are NEX AI, a professional Editor and Content Strategist for SavoirPedia.
            
            CONTEXT:
            Title: "${currentContext?.title || ''}"
            Current Content (HTML): 
            \`\`\`html
            ${currentContext?.content || ''}
            \`\`\`

            CAPABILITIES:
            - You help write, edit, and format encyclopedia articles, blogs, and news.
            - You output clean, semantic HTML (using <h2>, <h3>, <ul>, <strong>, <blockquote>).
            - You can completely rewrite sections or append new content.
            - **VISION**: You can see and analyze images uploaded by the user. Describe them or use them as context for writing.

            RESPONSE FORMAT:
            Return a JSON object:
            {
                "thought": "Reasoning...",
                "message": "I've written a draft for you.",
                "action": "UPDATE_ARTICLE",
                "data": {
                    "title": "Proposed Title", // Optional: Update if needed or requested
                    "category": "Proposed Category", // Optional
                    "content": "<p>...</p>" // Optional: The HTML content
                }
            }
            
            IMPORTANT:
            1. If asked to write an article, return the FULL HTML structure and suggest a Title/Category.
            2. If asked to fix grammar, return the CORRECTED full content.
            3. Use "Dark Nebula" tone if requested, otherwise neutral encyclopedic tone.
            4. **IMAGES**: 
               - **ACTION REQUIRED**: Return a JSON action "GENERATE_IMAGE".
               - **DO NOT** return Markdown images (e.g., ![alt](url)).
               - **DO NOT** return HTML images.
               - Schema:
                 {
                   "action": "GENERATE_IMAGE",
                   "data": { "description": "detailed visual description with style keywords" }
                 }
               - **Styles**: 
                 - For "SEARCH/FIND": Add "photorealistic, 4k, photography".
                 - For "GENERATE/CREATE": Add "digital-art, cinematic, illustration".
            `;
        } else if (mode === 'architect') {
            // --- ARCHITECT MODE (Site Generation) ---
            systemPrompt = `You are the NEX AI Architect. Your goal is to design and build a complete website based on the user's description.
            
            CAPABILITIES:
            - You generate a complete file structure (index.html, styles.css, script.js, README.md).
            - You use modern string literals for HTML/CSS/JS.
            - You create "Dark Nebula" themed designs by default (black backgrounds, neon blue/purple accents).
            - **VISION**: YOU CAN SEE IMAGES. If the user uploads a screenshot, analyze its layout, colors, and structure, and replicate it in code.
            
            RESPONSE FORMAT:
            You must return a valid JSON object.
            
            CASE 1: CLARIFICATION NEEDED
            If the user's request is too vague (e.g., "build a site"), ask for details.
            {
                "thought": "User input is vague.",
                "message": "I can build that. What kind of site? (e.g., Portfolio, Store, landing page)?",
                "action": "CLARIFY"
            }

            CASE 2: GENERATE SITE
            If the user provides enough detail (e.g., "A portfolio for a photographer"), generate the site.
            {
                "thought": "Generating photographer portfolio...",
                "message": "Blueprint confirmed. Constructing site now...",
                "action": "GENERATE_SITE",
                "data": {
                    "title": "Photon Captures",
                    "description": "A high-end portfolio for a photographer.",
                    "files": {
                        "index.html": { 
                            "content": "<!DOCTYPE html>...", 
                            "language": "html" 
                        },
                        "styles.css": { 
                            "content": "body { background: #000; ... }", 
                            "language": "css" 
                        },
                        "script.js": { 
                            "content": "console.log('Init');", 
                            "language": "javascript" 
                        },
                        "README.md": { 
                            "content": "# Project \n AI Generated.", 
                            "language": "markdown" 
                        }
                    }
                }
            }
            
            DESIGN RULES:
            1. Use 'Inter' font.
            2. Responsive layout (Flexbox/Grid).
            3. Add modern animations (CSS transitions).
            `;
        } else {
            // --- CODER MODE (Default) ---
            let fileContext = "";
            if (currentContext?.files) {
                fileContext = Object.entries(currentContext.files).map(([name, content]) => {
                    return `FILE: ${name}\n\`\`\`${name.split('.').pop()}\n${content}\n\`\`\``;
                }).join('\n\n');
            }

            systemPrompt = `You are the NEX AI Architect for Mr Build, an advanced AI-powered website builder.
            
            CONTEXT (Virtual File System):
            ${fileContext || '(No files found)'}

            CAPABILITIES:
            You can analyze the code and perform actions to modify it. You support MULTI-FILE creation and editing.
            You can create JavaScript files, JSON data, or new HTML pages.

            RESPONSE FORMAT:
            You must return a valid JSON object.
            {
                "thought": "Reasoning...",
                "message": "I created script.js and linked it.",
                "action": "UPDATE_FILE", 
                "modifications": [ 
                    {
                        "file": "script.js", // Target filename (new or existing)
                        "code": "console.log('Hello');" // FULL content
                    },
                    {
                        "file": "index.html",
                        "code": "..." // Updated index.html to include <script src='script.js'></script>
                    }
                ]
            }
            
            IMPORTANT RULES:
            1. Always return FULL file content in 'code'. No diffs.
            2. "Dark Nebula" aesthetic: Use heavy blacks (#050505), neon cyan (#00f0ff).
            3. If creating a new file (e.g., script.js), YOU MUST ALSO UPDATE index.html to link to it.
            4. Be concise.
            `;
        }

        // --- DEBUG LOGGING ---
        console.log("--- NEX AI REQUEST START ---");
        console.log("Mode:", mode);
        console.log("Key Source:", usedSource);
        console.log("API Key:", apiKey ? `${apiKey.substring(0, 5)}...` : "NONE");
        console.log("Model:", model || "openai/gpt-4o-mini");

        // 2. Call OpenRouter
        // 2. Call OpenRouter with Retry/Fallback Logic
        const makeRequest = async (currentModel, isRetry = false) => {
            console.log(`Making Request to ${currentModel} (Retry: ${isRetry})`);
            
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://anasnidir.com",
                    "X-Title": "NEX AI",
                },
                body: JSON.stringify({
                    model: currentModel,
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...messages
                    ],
                    response_format: { type: "json_object" }, 
                    max_tokens: 4000 
                })
            });

            if (!res.ok) {
                // Check if it's a transient error (429 Rate Limit or 5xx Server Error)
                if ((res.status === 429 || res.status >= 500) && !isRetry) {
                    console.warn(`Model ${currentModel} failed (${res.status}). Switching to Fallback...`);
                    // Fallback to a reliable free model
                    return makeRequest("google/gemini-2.0-flash-lite-preview-02-05:free", true);
                }
                const err = await res.text();
                throw new Error(`OpenRouter API Error: ${err}`);
            }
            return res;
        };

        const response = await makeRequest(model || "openai/gpt-4o-mini");
        const data = await response.json();
        let aiResponse;
        try {
             aiResponse = JSON.parse(data.choices[0].message.content);
        } catch (e) {
             // Handle potential non-JSON string response from some models
             aiResponse = { message: data.choices[0].message.content, action: "NONE" };
        }

        // --- DECREMENT CREDITS ---
        try {
            if (userId) {
                const { updateDoc } = await import('firebase/firestore');
                // Only attempt if we successfully read credits earlier or if we want to try blindly (which will fail if no perm)
                 const userRef = doc(db, 'users', userId);
                await updateDoc(userRef, {
                    aiCredits: credits - 1, // utilize the local variable 'credits' which might be fallback
                    lastAiUsage: new Date().toISOString()
                });
            }
        } catch (e) {
             console.warn("Credit Decrement Failed (Permission Error):", e.message);
        }

        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error("NEX AI Error:", error);
        return new NextResponse(JSON.stringify({ message: error.message, action: "NONE" }), { status: 500 });
    }
}

// Force recompile: 5
