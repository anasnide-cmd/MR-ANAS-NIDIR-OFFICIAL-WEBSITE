# MR ANAS NIDIR OFFICIAL WEBSITE

The digital ecosystem for ANAS NIDIR, featuring advanced site-building tools, semantic search, e-commerce capabilities, and AI-driven experiences.

![Ecosystem Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?style=for-the-badge&logo=firebase)
![React Three Fiber](https://img.shields.io/badge/Three.js-3D_Visuals-black?style=for-the-badge&logo=three.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌌 Core Architecture

This project is built as a high-performance, AI-first platform utilizing modern web technologies:

- **Framework**: Next.js 16.1 (App Router)
- **Styling & Animation**: Tailwind CSS v4, Framer Motion, GSAP, and HeroUI 
- **3D Experiences**: Three.js, React Three Fiber, React Three Drei
- **Backend/DB**: Firebase Ecosystem (Authentication, Firestore, Storage, Hosting)
- **AI Integration**: Vercel AI SDK, OpenAI integration for conversational and generative capabilities
- **Payment & Data**: PayPal JS SDK, Chart.js, HTML5-Qrcode

## 🚀 The Ecosystem

Discover the comprehensive suite of applications within the MR ANAS NIDIR platform:

- **🏗️ [MR BUILD](./docs/mr-build.md)**: An advanced, browser-based website builder featuring drag-and-drop templates, an advanced code editor, and Nexus AI Magic Build.
- **🔍 [MR SEARCH](./docs/mr-search.md)**: "Super Engine" search platform delivering global indexing, Conversational AI mode, and semantic retrieval.
- **🛍️ [MR SHOP](./docs/mr-shop.md)**: E-commerce platform sporting a Dark Nebula aesthetic, robust product management, and a secure checkout simulation.
- **📚 [SAVOIRPEDIA](./docs/savoirpedia.md)**: The ultimate knowledge base and technical deep-dive hub, optimizing dynamic content for SEO.
- **🎮 [MR GAMES](./docs/mr-games.md)**: Interactive gaming portal for engaging user experiences.
- **🔐 [ADMIN & ACCOUNT](./docs/admin-account.md)**: A centralized control center for user profiles and site administration.

## 📚 Documentation

Comprehensive documentation and guides are available in the [`docs/`](./docs/index.md) directory:

- [Tutorial: Getting Started](./docs/tutorial.md)
- [Global Architecture](./docs/global-architecture.md)
- [MR BUILD Guide](./docs/mr-build.md)
- [MR SEARCH Guide](./docs/mr-search.md)

## 🛠️ Getting Started

### Prerequisites

- Node.js > 18.x
- npm or yarn
- Firebase CLI (for deployment)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

Deploying the application and its configurations to Firebase:

```bash
# Build the application
npm run build

# Deploy Hosting
npm run deploy:hosting

# Deploy Firestore Rules
npm run deploy:rules
```

## 🤝 Contributing & Maintenance

To ensure a smooth development lifecycle, please adhere to standard code formatting rules and run linting before commits:
```bash
npm run lint
```
