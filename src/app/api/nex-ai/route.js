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

        const { messages, model, currentContext } = await req.json();

        let apiKey = ENV_KEY;
        let usedSource = 'env'; 
        
        // 1. Try fetching keys from Admin Firestore using Client SDK
        try {
            const docRef = doc(db, 'system_config', 'nex_ai');
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // MULTI-KEY SUPPORT
                if (data.keys && Array.isArray(data.keys)) {
                    const activeKeys = data.keys.filter(k => k.status === 'active');
                    if (activeKeys.length > 0) {
                        const randomIndex = Math.floor(Math.random() * activeKeys.length);
                        apiKey = activeKeys[randomIndex].key;
                        usedSource = `db-rotated-${randomIndex}`;
                    }
                } 
                // Legacy Single Key Support
                else if (data.openRouterKey) {
                    apiKey = data.openRouterKey;
                    usedSource = 'db-legacy';
                }
            }
        } catch (dbError) {
            console.warn("DB Key Load Failed (Client SDK):", dbError.message);
        }

        if (!apiKey) {
            return new NextResponse("Configuration Error: No active API Keys found. Check Admin Settings or .env.local", { status: 500 });
        }

        // Construct System Prompt with Context
        let fileContext = "";
        if (currentContext?.files) {
            fileContext = Object.entries(currentContext.files).map(([name, content]) => {
                return `FILE: ${name}\n\`\`\`${name.split('.').pop()}\n${content}\n\`\`\``;
            }).join('\n\n');
        }

        const systemPrompt = `You are the NEX AI Architect for Mr Build, an advanced AI-powered website builder.
        
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
        return NextResponse.json(JSON.parse(data.choices[0].message.content));

    } catch (error) {
        console.error("NEX AI Error:", error);
        return new NextResponse(JSON.stringify({ message: error.message, action: "NONE" }), { status: 500 });
    }
}
