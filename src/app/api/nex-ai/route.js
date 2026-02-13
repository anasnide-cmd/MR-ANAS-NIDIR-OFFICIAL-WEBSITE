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
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "Authentication required for AI access.", action: "NONE" }), { status: 401 });
        }

        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data() || {};
        const credits = userData.aiCredits !== undefined ? userData.aiCredits : (userData.plan === 'pro' ? 500 : 50);

        if (credits <= 0) {
            return new NextResponse(JSON.stringify({ 
                message: "Neural Engine Offline: Out of Fuel. Please refuel your credits to continue.", 
                action: "OUT_OF_FUEL",
                errorType: "OUT_OF_FUEL"
            }), { status: 402 });
        }

        let apiKey = process.env.OPENROUTER_API_KEY || clientApiKey;
        let usedSource = process.env.OPENROUTER_API_KEY ? 'env' : (clientApiKey ? 'client-provided' : 'none'); 
        
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
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://anasnidir.com",
                "X-Title": "NEX AI",
            },
            body: JSON.stringify({
                model: model || "openai/gpt-4o-mini", // Default to fast model
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages
                ],
                response_format: { type: "json_object" }, 
                max_tokens: 4000 
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`OpenRouter API Error: ${err}`);
        }

        const data = await response.json();
        const aiResponse = JSON.parse(data.choices[0].message.content);

        // --- DECREMENT CREDITS ---
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(userRef, {
            aiCredits: credits - 1,
            lastAiUsage: new Date().toISOString()
        });

        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error("NEX AI Error:", error);
        return new NextResponse(JSON.stringify({ message: error.message, action: "NONE" }), { status: 500 });
    }
}

// Force recompile: 5
