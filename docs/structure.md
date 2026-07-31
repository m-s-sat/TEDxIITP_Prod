# Frontend Folder Structure (Next.js + Redux)

This project is built with Next.js App Router and Redux Toolkit for state management.

## Directory Overview

- `app/` - Routing and Layouts (Next.js App Router).
  - `components/` - Shared UI components.
  - `styles/` - Global CSS and Tailwind configuration.
    - `globals.css` - Main CSS entry point (Tailwind @import).
  - `layout.tsx` - Root layout (Configures StoreProvider and global styles).
  - `page.tsx` - Main entry page.
  - `StoreProvider.tsx` - Client component to wrap the app with the Redux Provider.
- `lib/` - Shared logic and state.
  - `features/` - Redux slices and API services (RTK-Query).
  - `store.ts` - Redux store configuration.
  - `hooks.ts` - Typed Redux hooks (`useAppDispatch`, `useAppSelector`).
- `public/` - Static assets like `logo.svg`.

## Important Things

1. **Hydration Safety**: If a component needs browser-only data (like Grammarly attributes or window size), add `suppressHydrationWarning` to the tag or use a `mounted` state in `useEffect`.
2. **Store Usage**: Always use the `StoreProvider` inside the `<body>` tag in `layout.tsx` to avoid hydration mismatches.
3. **Image Optimization**: Use the Next.js `Image` component. For LCP images (like the logo), always add the `priority` prop.
4. **Tailwind CSS**: Use utility classes for styling. Avoid complex CSS modules unless absolutely necessary.
