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

        const { messages, model } = await req.json();

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
