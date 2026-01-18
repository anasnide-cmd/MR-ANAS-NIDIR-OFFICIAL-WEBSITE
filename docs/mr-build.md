# MR BUILD: The Site Creation Hub

MR BUILD is a powerful, low-code/no-code website builder integrated into the MR ANAS NIDIR ecosystem.

## 📊 User Dashboard (`src/app/mr-build/dashboard/`)

The entry point for site creators.

- **Analytics**: Real-time view tracking for hosted sites.
- **Site Management**: Create, Edit, Delete, or Preview sites.
- **Subscription**: Management of site limits and premium features.

## 🏗️ The Editor (`src/app/mr-build/editor/`)

A state-of-the-art workspace for crafting websites.

### Core Features

- **Project Configuration**: Slug management with real-time uniqueness checking.
- **Theme Selection**: Choose from preset themes (Dark Nebula, minimal, etc.).
- **Template System**: Quick-start with pre-built architectures (Portfolio, Store, SaaS).

### Advanced Engineering (The "Code" Tab)

- **HTML/CSS Editors**: Powered by `react-simple-code-editor` with PrismJS syntax highlighting.
- **Live Preview**: Multi-device split-view to see changes in real-time within an `iframe`.
- **Building Blocks**: One-click code injection for Heroes, Grids, and CTAs.

## ✨ Magic Build (Nexus AI)

Located in the sidebar of the editor.

- **How it works**: Users describe a UI component in natural language.
- **AI Output**: Generates valid Tailwind CSS / HTML code.
- **Deployment**: The "Apply to Canvas" button automatically merges AI code into the current project content.

## ☁️ Deployment & Hosting

- sites are hosted dynamically under `/s/[slug]`.
- Content is stored in Firestore and rendered via a specialized dynamic route that reconstructs HTML/CSS into a standalone page.
