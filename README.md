# ChatGPT Frontend

An advanced, modern, and fully responsive ChatGPT-like frontend built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Redux Toolkit](https://redux-toolkit.js.org/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Clerk](https://clerk.com/) for authentication. This project is designed for extensibility, beautiful UI, and a smooth developer experience.

---

## Overview

This project provides a robust, production-ready frontend for a ChatGPT-style application. It features a modular architecture, reusable UI components, and a focus on accessibility, performance, and developer ergonomics. The codebase is organized for scalability, making it easy to add new features, integrate APIs, or adapt the UI for different use cases.

---

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [UI & Design System](#ui--design-system)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Setup & Installation](#setup--installation)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Credits & Libraries](#credits--libraries)

---

## Features

- **Modern Chat UI**: Chat interface with code highlighting, copy-to-clipboard, and support for multiple message types.
- **Sidebar Navigation**: Collapsible, mobile-friendly sidebar with project and chat navigation.
- **Authentication**: Seamless sign-in/sign-up using Clerk.
- **Responsive Design**: Mobile-first, adaptive layouts using Tailwind CSS and custom hooks.
- **Redux State Management**: Global state for sidebar and UI preferences.
- **Component Library**: Reusable UI components (Button, Input, Dialog, Dropdown, Tooltip, etc.) built on Radix UI primitives.
- **Theme Support**: Light/dark mode with [next-themes](https://github.com/pacocoursey/next-themes).
- **Customizable**: Easily extendable for new features, projects, or chat types.

- **Accessibility**: All interactive elements are accessible and keyboard-navigable.
- **Performance**: Optimized for fast load times and smooth interactions.
- **Type Safety**: (If using TypeScript) Add types for props, state, and API responses.
- **API Integration Ready**: Easily connect to OpenAI or custom chat APIs.

---

## Project Structure

```
├── app/
│   ├── globals.css         # Global styles (Tailwind, custom CSS, scrollbar, themes)
│   ├── layout.js           # Root layout: wraps all pages, sets up providers
│   ├── page.js             # Main landing/chat page
│   ├── c/                  # Nested route for chat (with layout/page)
│   └── sign-in/, sign-up/  # Clerk authentication pages
├── components/
│   └── ui/                 # Radix-based UI primitives (Button, Input, Sidebar, etc.)
├── hooks/
│   └── use-mobile.js       # Custom hook for responsive logic
├── lib/
│   └── utils.js            # Utility functions (e.g., className merging)
├── public/
│   └── *.svg               # Static assets (icons, logos)
├── src/
│   ├── Components/
│   │   ├── Chat/           # Chat window, code block, message rendering
│   │   ├── Common/         # Header, icons, sign-up header
│   │   └── Sidebar/        # Sidebar, navigation, user/project lists
│   └── store/
│       ├── index.js        # Redux store setup
│       ├── reduxProvider.js# Redux provider for app
│       └── slices/         # Redux slices (sidebar, etc.)
├── package.json            # Scripts and dependencies
├── next.config.mjs         # Next.js config
├── postcss.config.mjs      # PostCSS/Tailwind config
├── eslint.config.mjs       # ESLint config
├── jsconfig.json           # Path aliases for cleaner imports
└── ...
```

---

## Architecture

The app is structured for scalability and maintainability:

- **App Directory (app/):** Uses Next.js App Router for layouts, nested routes, and server/client components.
- **Component-Driven:** All UI is built from small, reusable components in `components/ui/` and feature components in `src/Components/`.
- **State Management:** Redux Toolkit manages global state (sidebar, UI preferences). Local state is managed with React hooks.
- **Providers:** Context providers for Redux, theming, Clerk, and sidebar state are set up in the root layout.
- **Styling:** Tailwind CSS for utility-first styling, with custom themes and dark mode.
- **Authentication:** Clerk is integrated at the layout level for seamless user sessions.
- **API Integration:** (Pluggable) Add your own API calls for chat, user data, etc.

---

---

## UI & Design System

- **Radix UI**: All interactive UI primitives (dropdowns, dialogs, tooltips, sheets, etc.) are built on top of [Radix UI](https://www.radix-ui.com/) for accessibility and composability.
- **Tailwind CSS**: Utility-first styling with custom themes, dark mode, and responsive design.
- **Component Examples**:
- `Button`, `Input`, `Avatar`, `Sidebar`, `DropdownMenu`, `Dialog`, `Tooltip`, `Sheet`, `Skeleton`, `Separator`, `Collapsible`
- **Custom Scrollbars**: Styled for both webkit and Firefox.
- **SVG Icons**: Uses [Lucide React](https://lucide.dev/) and custom SVGs in `/public`.

- **Theming:** Easily switch between light/dark/system themes. Customize colors, radii, and fonts in `globals.css` and Tailwind config.
- **Accessibility:** All components are keyboard-accessible and screen-reader friendly.
- **Animations:** Smooth transitions for dialogs, dropdowns, and sidebar.

---

## Authentication

Authentication is handled via [Clerk](https://clerk.com/):

- Sign-in and sign-up pages are in `app/sign-in/[[...sign-in]]/page.js` and `app/sign-up/[[...sign-in]]/page.js`.
- After authentication, users are redirected to the main chat interface.
- User info and session are available throughout the app.

**How it works:**

- The root layout wraps the app in `<ClerkProvider>`, making user/session data available everywhere.
- Auth pages use Clerk's `<SignIn />` and `<SignUp />` components for a secure, customizable experience.
- After login, users are redirected to `/c` (main chat).
- User avatars, names, and subscription status are shown in the sidebar and header.

---

## State Management

- Uses [Redux Toolkit](https://redux-toolkit.js.org/) for global state (sidebar collapse, UI preferences, etc.).
- Store setup in `src/store/index.js` and provided via `ReduxProvider`.
- Example slice: `src/store/slices/sidebar.js` for sidebar open/collapse state.

**Redux Usage:**

- `sideBarSlice` manages sidebar open/collapse state, with actions and reducers.
- `ReduxProvider` wraps the app, making the store available to all components.
- Use `useSelector` and `useDispatch` from `react-redux` to access and update state.

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### 1. Clone the repository

```bash
git clone <repo-url>
cd chat-gpt-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment

- Copy `.env.example` to `.env.local` and set your Clerk and API keys as needed.

  - Example `.env.local`:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
    NEXT_PUBLIC_API_URL=https://your-api-endpoint
    ```

  - For Clerk setup, see [Clerk Docs](https://clerk.com/docs/quickstarts/nextjs)

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint

- `npm run format` — (If configured) Format code with Prettier

---

## Customization

- **Theming**: Edit `app/globals.css` and Tailwind config for colors, fonts, and radii.
- **Sidebar**: Add or modify navigation items in `src/Components/Sidebar`.
- **Chat**: Extend message types or add integrations in `src/Components/Chat`.
- **UI Components**: Reuse or extend components in `components/ui/`.
- **SVGs**: Replace or add icons in `public/`.

### Advanced Customization

- **Add a new chat provider:**
  - Create a new API utility in `lib/` or `src/`.
  - Update the chat component to call your API and render responses.
- **Add new sidebar sections:**
  - Edit `src/Components/Sidebar/index.js` and related files.
- **Add new UI primitives:**
  - Create a new file in `components/ui/` following the Radix UI pattern.
- **Change layout or routing:**
  - Edit `app/layout.js` and add new routes/pages in `app/`.
- **Add analytics or error tracking:**
  - Integrate tools like Vercel Analytics, Sentry, or LogRocket in the root layout.

---

## Development Workflow

1. **Branching:** Create a new branch for each feature or bugfix.
2. **Code Style:** Use Prettier and ESLint for consistent code formatting and linting.
3. **Component-Driven:** Build and test UI components in isolation before integrating.
4. **Testing:** (If configured) Add unit and integration tests for critical logic.
5. **Commits:** Write clear, descriptive commit messages.
6. **Pull Requests:** Open PRs for review before merging to main/production.
7. **CI/CD:** (If configured) Use GitHub Actions or Vercel for automated builds and deployments.

---

---

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js:

1. Push your code to GitHub/GitLab/Bitbucket.
2. Connect your repo on [Vercel](https://vercel.com/new).
3. Set environment variables in the Vercel dashboard.
4. Deploy!

For more, see [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

**Production Tips:**

- Set `NODE_ENV=production` and use environment variables for all secrets.
- Use Vercel's preview deployments for testing before going live.
- Monitor performance and errors with Vercel Analytics or third-party tools.

---

## Credits & Libraries

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Clerk](https://clerk.com/)
- [Lucide React](https://lucide.dev/)
- [Shiki](https://shiki.matsu.io/) (for code highlighting)
- [class-variance-authority](https://cva.style/)
- [clsx](https://github.com/lukeed/clsx)
- [next-themes](https://github.com/pacocoursey/next-themes)

- [Prettier](https://prettier.io/) (optional, for formatting)
- [Jest](https://jestjs.io/) or [React Testing Library](https://testing-library.com/) (optional, for testing)

---

## Screenshots

> _Add screenshots or GIFs here to showcase the UI and features._

### Example: Chat UI

![Chat UI Screenshot](./public/example-chat.png)

### Example: Sidebar

![Sidebar Screenshot](./public/example-sidebar.png)

---

## License

MIT — see [LICENSE](LICENSE) file.

---

## Improvements & Future Scope

Here are some ideas and directions to further enhance this project:

- **API Integration:**
  - Connect to OpenAI, Azure, or custom LLM APIs for real chat functionality.
  - Add streaming responses and typing indicators.
- **User Experience:**
  - Add message editing, deleting, and multi-turn conversation history.
  - Implement chat folders, search, and pinning important chats.
  - Add notifications for new messages or system events.
- **Collaboration:**
  - Enable real-time collaborative chat (WebSockets, Live Share).
  - Add team or group chat features.
- **Rich Media Support:**
  - Support for images, files, and voice messages in chat.
  - Integrate with image generation APIs (DALL·E, Stable Diffusion).
- **Customization:**
  - User profile settings, themes, and custom avatars.
  - Allow users to create and manage their own chatbots or agents.
- **Analytics & Monitoring:**
  - Add usage analytics, chat statistics, and admin dashboards.
  - Integrate error tracking and performance monitoring.
- **Testing & Quality:**
  - Add unit, integration, and end-to-end tests.
  - Set up CI/CD pipelines for automated testing and deployment.
- **Accessibility:**
  - Further improve ARIA roles, keyboard navigation, and screen reader support.
- **Mobile App:**
  - Build a React Native or Flutter mobile version for iOS/Android.
- **Internationalization:**
  - Add support for multiple languages and locales.
- **Security:**
  - Implement rate limiting, input sanitization, and advanced auth flows.
- **Documentation:**
  - Expand with API docs, architecture diagrams, and developer guides.

_Feel free to contribute or suggest more ideas!_
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
