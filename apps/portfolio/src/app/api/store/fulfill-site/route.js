import { db } from '@mr/core/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { addSiteLog } from '@mr/core/siteHistory';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { siteId, orderId, paymentDetails, buyerUid, buyerEmail } = await req.json();

        if (!siteId || !orderId) {
            return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
        }

        // 1. Fetch the site to verify it belongs to someone and is for sale
        const siteRef = doc(db, 'user_sites', siteId);
        const siteSnap = await getDoc(siteRef);

        if (!siteSnap.exists()) {
            return NextResponse.json({ message: 'Site not found' }, { status: 404 });
        }

        const siteData = siteSnap.data();

        if (!siteData.isForSale) {
            return NextResponse.json({ message: 'Site is no longer for sale' }, { status: 400 });
        }

        // 2. Perform the transfer
        // Note: In a production app, we would verify the payment with PayPal here
        // and get the buyer's UID from a secure session/cookie.
        // For this implementation, we use the provided buyer info or a fallback.
        
        const updates = {
            userId: buyerUid || 'system_transfer', // Fallback if not provided
            userEmail: buyerEmail || 'transferred@nexus.com',
            isForSale: false,
            salePrice: 0,
            updatedAt: new Date().toISOString()
        };

        await updateDoc(siteRef, updates);

        // 3. Log the history
        await addSiteLog(
            siteId, 
            buyerUid || 'SYSTEM', 
            buyerEmail || 'NEX MARKETPLACE', 
            `Purchased Asset via Marketplace (Order: ${orderId})`, 
            { orderId, payment: paymentDetails }
        );

        return NextResponse.json({ 
            success: true, 
            message: 'Ownership transferred successfully',
            siteId 
        });

    } catch (err) {
        console.error('Fulfillment API Error:', err);
        return NextResponse.json({ message: 'Internal server error', error: err.message }, { status: 500 });
    }
}
