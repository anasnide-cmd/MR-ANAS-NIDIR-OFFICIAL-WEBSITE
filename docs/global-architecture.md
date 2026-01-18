# Global Architecture & Core Systems

This document details the underlying systems that power the entire MR ANAS NIDIR ecosystem.

## 🎨 Design System: Dark Nebula

The site follows a "Dark Nebula" aesthetic characterized by:

- **Primary Palette**: Deep blacks (#000), Dark purples (#0a001a), Cyan highlights (#00f0ff).
- **Glassmorphism**: Heavy use of `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle borders.
- **Typography**:
  - **Orbitron**: For tech-inspired headers.
  - **Exo 2**: For secondary headers and labels.
  - **Inter**: For clean, readable body text.

## 🏗️ Core Layout (`src/app/layout.js`)

The root layout provides:

- **Global Metadata**: SEO tags, OpenGraph images, and platform themes.
- **Navigation Bar**: A responsive, glassmorphism navbar shared across all apps.
- **Theme Providers**: Handling dynamic theme switching where supported.

## 💾 Data & Persistence

### Firebase Integration

- **Firestore**: Stores user data, Mr Build sites, Shop products, and Admin settings.
- **Rules**: Strict Role-Based Access Control (RBAC) implemented in `firestore.rules`.
- **Authentication**: Firebase Auth (Email/Social) integrated across the platform.

## 🧠 AI Engine (`src/app/api/chat/route.js`)

A centralized AI streaming route:

- **Model**: GPT-4o via OpenAI.
- **Integration**: Vercel AI SDK for edge-compatible streaming.
- **Context Handling**: Dynamic prompt injection based on whether call originates from Mr Build or Mr Search.

## 📱 Responsiveness

- **Desktop-First**: Mobile-optimized via CSS media queries.
- **Sidebar Layouts**: Robust sidebar systems in Mr Build and Admin panels for complex controls.
