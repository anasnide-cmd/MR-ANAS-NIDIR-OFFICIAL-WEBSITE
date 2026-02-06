import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Dynamic import to prevent build crash if package missing
        const admin = await import('firebase-admin');
        const { getFirestore } = await import('firebase-admin/firestore');
        const { getApps, initializeApp } = await import('firebase-admin/app');

        if (getApps().length === 0) {
                initializeApp(); 
        }
        
        const db = getFirestore();
        const docRef = await db.collection('system_config').doc('nex_ai').get();
        
        // DEFAULTS if nothing configured
        const DEFAULT_MODELS = [
            { id: "openai/gpt-4o", name: "GPT-4 Omni", description: "Flagship intelligence", active: true },
            { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", description: "Strong reasoning", active: true },
            { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash", description: "Fast & multimodal", active: true }
        ];

        if (docRef.exists) {
            const data = docRef.data();
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

        // Return defaults if no DB config
        return NextResponse.json({ models: DEFAULT_MODELS });

    } catch (error) {
        console.error("Error fetching models:", error);
        // Fail gracefully with defaults or empty list
        return NextResponse.json({ models: [] });
    }
}
