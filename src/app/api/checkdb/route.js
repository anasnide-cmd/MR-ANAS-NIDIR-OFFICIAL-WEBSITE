import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug') || 'jemputanhariraya';
        
        console.log("Checking DB for slug:", slug);
        const q = query(collection(db, 'user_sites'), where('slug', '==', slug));
        const snap = await getDocs(q);
        
        if (snap.empty) {
            return NextResponse.json({ found: false, message: 'Not found' });
        } else {
            const data = snap.docs[0].data();
            return NextResponse.json({ found: true, data });
        }
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
