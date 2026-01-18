# MR SEARCH: The Super Engine

MR SEARCH is the central information hub for the MR ANAS NIDIR ecosystem.

## ⚡ Standard Search Mode

- **Functionality**: Optimized for speed and precision across all project data.
- **Visuals**: A clean, minimalistic interface with a "Super Engine" subtitle.
- **Results**: Deep linking to Mr Build user sites and SavoirPedia articles.

## 🧠 Nexus AI Mode (Conversational)

Toggleable via the "SWITCH TO AI" button in the top control bar.

- **Engine**: Powered by OpenAI GPT-4o.
- **Interface**: A glassmorphism chat bubble system with neural-net animations.
- **Capabilities**:
  - Answering complex questions about the ecosystem.
  - Summarizing SavoirPedia content.
  - Contextual memory during a single search session.

## 🔧 Technical Details

- **Component**: `src/components/MrSearch/LandingClient.js`
- **AI Integration**: Uses the `@ai-sdk/react` hook `useChat` for real-time streaming.
- **API Endpoint**: Handled by the global `/api/chat` route.
