# Admin Panel & User Accounts

This document covers the administrative and personalized aspects of the MR ANAS NIDIR ecosystem.

## 🛠️ Admin Panel (`src/app/admin/`)

The command center for platform administrators.

- **User Management**: View and moderate users (Ban/Verify status).
- **Site Controls**: Oversight of all websites built via MR BUILD; ability to toggle visibility or delete content.
- **Analytics**: High-level platform metrics including total users, active sites, and shop performance.
- **Security**: Access is restricted via custom Firestore claims (Admin role).

## 👤 Account Management (`src/app/account/`)

The personal hub for all platform users.

- **Profile**: Manage public-facing information and avatars.
- **Security**: Password resets and multi-factor authentication settings.
- **Library**: Quick access to "Liked" SavoirPedia articles and "Favorite" Mr Build sites.

## 💰 Funding & Credits (`src/app/fund/`)

Management of platform coins and usage limits.

- **Balance**: View current coin balance used for premium AI generations or site features.
- **Transactions**: History of account activity and coin purchases.

## 🎮 MR GAMES (`src/app/mr-games/`)

An interactive portal for browser-based entertainment.

- A collection of mini-games designed to keep users engaged within the ecosystem.
- Integrated high-scores and achievements linked to the User Account.
