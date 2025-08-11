# Welcome to Internet Anime Database 👋

This document outlines the frontend architecture for **Internet Anime Database (IADB)**.  
Its purpose is to provide a comprehensive guide for developers, ensuring consistency, maintainability, and scalability across the codebase.

## 🧾 Project Overview

Internet Anime Database (IADB) is a mobile app built with **React Native**, **Expo**, and **TypeScript** that allows users to explore anime, view details, mark favorites, and filter by genre.

**Core Tech Stack**:
- React Native + Expo
- TypeScript
- React Navigation
- TanStack Query (React Query)
- React Context for global state
- Async Storage for persistance

## 📚 Table of Contents

- [🚀 Get Started](#-get-started)
- [🧭 Centrally Managed & Type-Safe Navigation](#-centrally-managed--type-safe-navigation)
- [📡 Data Fetching](#-data-fetching)
- [🗂️ State Management](#-state-management)
- [🧩 Composable Component Design](#-composable-component-design)
- [📝 Code Style & Conventions](#-code-style--conventions)
- [📁 Directory Structure](#-directory-structure)
- [Known Limitations](#-known-limitations)


## 🚀 Get Started

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Generate .env file**
   
   Copy env example file, fill in the EXPO_PUBLIC_API_URL with ``` https://api.jikan.moe/v4/' ```

2. **Start the app**  
   ```bash
   npx expo start
   ```

You'll be prompted to open the app in:
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)




## 🧭 Centrally Managed & Type-Safe Navigation

Navigation is powered by **React Navigation**, structured for scalability and safety:

1. **Centralized Configuration**  
   All navigators (Stack/Tab) and their screens are defined in `src/navigation/`, ensuring a single source of truth.

2. **Type-Safe Routes**  
   Using TypeScript, route parameters are strongly typed—enabling autocompletion and compile-time checks for all navigation-related code.



## 📡 Data Fetching

We use **Axios combined with TanStack Query (React Query)** for all server communication.

> 💡 **Why TanStack Query?**  
> It simplifies server-state management with caching, background updates, and stale-while-revalidate logic out of the box.



## 🗂️ State Management

We combine **local** and **global** state handling for flexibility:

- **Local State**  
  `useState` for local UI state like toggles.

- **Global State**  
  Powered by **React Context**, ideal for sharing app-wide data (e.g., favorites).  
  We prefer Context for its simplicity, minimal boilerplate, and native support for hooks.



## 🧩 Composable Component Design

Components are reusable, modular, and consistent:

- **UI Components**  
  Small atomic components (Button, Input, Card) found in `components/ui`.

- **Feature Components**  
  Built by composing UI components with business-specific logic, typically found inside `features`.

This composability ensures visual consistency and promotes reuse across the app.



## 📝 Code Style & Conventions

To maintain high-quality code, we enforce the following standards:

1. **Formatting**  
   - Automatically handled via **Prettier**

2. **Linting**  
   - Enforced via **ESLint**  
   - Run manually with:  
     ```bash
     npm run lint
     ```

3. **Naming Conventions**  
   - **Components and Contexts**: `PascalCase` (e.g., `UserProfile.tsx`)  
   - **Non-component files**: `kebab-case` 
   - **Types/Interfaces**: `PascalCase`, prefixed with `T` or `I` (e.g., `TUser`, `IResponse`)


## 📁 Directory Structure

The following is the standard structure inside the `app/` directory:

```
app/
├── api/             # API client setup, request functions (e.g., Axios/Fetch)
├── components/      
│   ├── layout/      # Layout components (Header, Footer, etc.)
│   ├── ui/          # Generic atomic components (Button, Input, etc.)
│   └── shared/      # Components shared between features
├── config/          # Global constants, theme config, etc.
├── features/        # Feature-specific logic & components
│   └── favourite/
│       ├── components/ # Favourite-specific components
│       ├── hooks/      # Favourite-specific hooks
│       └── index.ts    # Feature module public entry
├── hooks/           # Global, reusable hooks
├── lib/             # Utility/helper functions
├── routes/          # Application routes/pages
└── providers/       # Global context providers (e.g., QueryClient, Favourites)
```

## Known Limitations
   
   1. The project has been developed and tested exclusively on Android and iOS; it is not optimized for web platforms.
   2. Genre filtering currently supports only a single selected value.
   3. Offline functionality is limited.
