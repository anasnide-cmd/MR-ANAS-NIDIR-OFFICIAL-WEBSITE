import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, context } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are the Nexus AI Assistant for MR-ANAS-NIDIR-OFFICIAL-WEBSITE.
    Your objective is to help users build stunning websites in the "Mr Build" editor or answer questions in "Mr Search".
    
    Current Context: ${context}
    
    If in Mr Build:
    - You output valid Tailwind CSS and HTML components.
    - You use a premium "Dark Nebula" aesthetic (deep purples, glassmorphism, glowing borders).
    - You provide structural code that can be directly mapped to the editor's state.
    
    If in Mr Search:
    - You provide concise, professional answers based on the site's content.
    - You use a helpful, tech-savvy tone.`,
    messages,
  });

  return result.toDataStreamResponse();
}
