import { NextResponse } from 'next/server';

// Fallback Key from Environment
const ENV_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req) {
    try {
        const { messages, model } = await req.json();

        let apiKey = ENV_KEY;
        let usedSource = 'env'; // logging helper
        
        // 1. Try fetching keys from Admin Firestore
        try {
            // Dynamic import to prevent build crash if package missing
            const admin = await import('firebase-admin');
            const { getFirestore } = await import('firebase-admin/firestore');
            const { getApps, initializeApp } = await import('firebase-admin/app');

            if (getApps().length === 0) {
                 initializeApp(); 
            }
            
            const db = getFirestore();
            const docRefs = await db.collection('system_config').doc('nex_ai').get();
            
            if (docRefs.exists) {
                const data = docRefs.data();
                
                // MULTI-KEY SUPPORT
                if (data.keys && Array.isArray(data.keys)) {
                    // Filter ACTIVE keys
                    const activeKeys = data.keys.filter(k => k.status === 'active');
                    
                    if (activeKeys.length > 0) {
                        // RANDOM ROTATION LOGIC
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
        } catch (adminError) {
            console.warn("DB Key Load Failed, using ENV:", adminError.message);
        }

        if (!apiKey) {
            return new NextResponse("Configuration Error: No active API Keys found. Check Admin Settings.", { status: 500 });
        }

        // 2. Call OpenRouter
        console.log(`[NEX-AI] Using Key Source: ${usedSource}`); // Debug log
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://anasnidir.com", // Required by OpenRouter
                "X-Title": "NEX AI",
            },
            body: JSON.stringify({
                model: model || "openai/gpt-3.5-turbo",
                messages: messages
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`OpenRouter API Error: ${err}`);
        }

        const data = await response.json();
        return NextResponse.json({ 
            content: data.choices[0].message.content 
        });

    } catch (error) {
        console.error("NEX AI Error:", error);
        return new NextResponse(error.message, { status: 500 });
    }
}
