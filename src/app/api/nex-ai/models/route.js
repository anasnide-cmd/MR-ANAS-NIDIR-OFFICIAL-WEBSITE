import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Client SDK
import { doc, getDoc } from 'firebase/firestore';

const DEFAULT_MODELS = [
    { id: "openai/gpt-4o", name: "GPT-4 Omni", description: "Flagship intelligence", active: true },
    { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", description: "Strong reasoning", active: true },
    { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash", description: "Fast & multimodal", active: true }
];

export async function GET() {
    try {
        // Use Client SDK to fetch config (allowed by recent rules update)
        const docRef = doc(db, 'system_config', 'nex_ai');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.models && Array.isArray(data.models)) {
                // Filter only basic info for public (No keys, just IDs/Name/Desc)
                const safeModels = data.models
                    .filter(m => m.active) // Only ACTIVE models
                    .map(m => ({
                        id: m.id,
                        name: m.name,
                        description: m.description
                    }));
                
                return NextResponse.json({ models: safeModels });
            }
        }

        // Return defaults if no DB config found
        return NextResponse.json({ models: DEFAULT_MODELS });

    } catch (error) {
        console.warn("DB Model Load Failed (Client SDK), using defaults:", error.message);
        // Fail gracefully with defaults instead of empty list
        return NextResponse.json({ models: DEFAULT_MODELS });
    }
}
