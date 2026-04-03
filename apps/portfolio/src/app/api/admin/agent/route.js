import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { db } from '@/lib/firebase'; // Adjust path if needed
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages, apiKey } = await req.json();

  // Configure Provider based on Key Source
  // If we have a key passed from client (Firestore), use it.
  // Otherwise fall back to env (not present in this case).
  
  const activeKey = apiKey || process.env.OPENROUTER_API_KEY;
  
  // If using OpenRouter key (sk-or-...), we must set baseURL
  const isOpenRouter = activeKey && activeKey.startsWith('sk-or-');
  
  // Since we are using standard @ai-sdk/openai, we can create a custom instance
  // or just rely on env vars if they were set. But here we must be dynamic.
  
  let modelProvider = openai('gpt-4o'); // Default env-based
  
  if (isOpenRouter) {
      // Create custom OpenRouter instance
      const { createOpenAI } = await import('@ai-sdk/openai');
      const openRouter = createOpenAI({
          apiKey: activeKey,
          baseURL: 'https://openrouter.ai/api/v1',
      });
      // Default to a model that exists on OpenRouter, or map 'gpt-4o' to something valid there?
      // OpenRouter supports 'openai/gpt-4o'.
      modelProvider = openRouter('openai/gpt-4o'); 
  }

  const result = streamText({
    model: modelProvider,
    system: `You are "The Oracle", a highly advanced, classified AI assistant for the OPTIC-ZERO Admin System.
    Your tone is: Professional, concise, high-tech, slightly "cyberpunk/intelligence agency".
    
    You have access to system tools to query real-time data.
    ALWAYS use tools when asked about specific data (user counts, site status, etc.).
    If you cannot find information, state "DATA_UNAVAILABLE" or "ACCESS_DENIED".
    
    Current Date: ${new Date().toISOString()}
    `,
    messages,
    tools: {
      getSystemStats: tool({
        description: 'Get current system statistics (total users, active sites, etc.)',
        parameters: z.object({}),
        execute: async () => {
          try {
             // Real-time counting (optimized for small scale, for large scale use aggregation)
             const usersSnap = await getDocs(collection(db, 'users'));
             const sitesSnap = await getDocs(collection(db, 'user_sites'));
             const messagesSnap = await getDocs(collection(db, 'messages'));
             
             const activeSites = sitesSnap.docs.filter(d => d.data().adminStatus === 'active' || !d.data().adminStatus).length;
             const bannedSites = sitesSnap.docs.filter(d => d.data().adminStatus === 'banned').length;

             return {
               totalAgents: usersSnap.size,
               totalNodes: sitesSnap.size,
               activeNodes: activeSites,
               criticalNodes: bannedSites,
               broadcastsActive: messagesSnap.size
             };
          } catch (error) {
            return { error: 'Failed to retrieve stats' };
          }
        },
      }),
      findAgent: tool({
        description: 'Find a specific agent (user) by email or ID',
        parameters: z.object({ query: z.string().describe('The email or UID to search for') }),
        execute: async ({ query: q }) => {
            try {
                // Search by UID first
                const docRef = doc(db, 'users', q);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) return { found: true, type: 'uid', data: docSnap.data() };

                // Search by Email
                const usersRef = collection(db, 'users');
                const qEmail = query(usersRef, where('email', '==', q));
                const emailSnap = await getDocs(qEmail);
                if (!emailSnap.empty) return { found: true, type: 'email', data: emailSnap.docs[0].data() };

                return { found: false, message: 'TARGET_NOT_FOUND' };
            } catch (error) {
                return { error: 'SEARCH_FAILED' };
            }
        },
      }),
      checkNodeStatus: tool({
        description: 'Check the status of a specific site text/node',
        parameters: z.object({ slug: z.string().describe('The site slug to check') }),
        execute: async ({ slug }) => {
            try {
                const sitesRef = collection(db, 'user_sites');
                const q = query(sitesRef, where('slug', '==', slug));
                const snap = await getDocs(q);
                if (snap.empty) return { found: false };
                
                const site = snap.docs[0].data();
                return { 
                    found: true, 
                    title: site.title, 
                    status: site.adminStatus || 'active',
                    views: site.views || 0,
                    owner: site.userEmail
                };
            } catch (error) {
                return { error: 'node_scan_failed' };
            }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
