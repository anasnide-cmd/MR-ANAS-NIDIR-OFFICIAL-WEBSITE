import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 

export async function POST(req) {
    try {
        const { prompt, userId } = await req.json();

        if (!prompt) {
            return new NextResponse("Prompt required", { status: 400 });
        }

        // --- SECURITY: CREDIT CHECK ---
        let credits = 50; 
        try {
            if (userId) {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    credits = userData.aiCredits !== undefined ? userData.aiCredits : (userData.plan === 'pro' ? 500 : 50);
                    
                    if (credits <= 0) {
                        return new NextResponse(JSON.stringify({ 
                            message: "Out of Fuel", 
                            action: "OUT_OF_FUEL"
                        }), { status: 402 });
                    }
                    
                    // Deduct credit
                    await updateDoc(userRef, { aiCredits: credits - 1 });
                }
            }
        } catch (err) {
            console.warn("Credit Check Failed or Bypassed:", err.message);
        }

        // Generate via Pollinations.ai (Free text-to-image)
        const seed = Math.floor(Math.random() * 1000000);
        // Add random seed to avoid caching
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

        return NextResponse.json({ url: imageUrl });

    } catch (error) {
        console.error("Image Gen Error:", error);
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
