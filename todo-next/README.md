# To‑Do List with Calendar (Next.js + TypeScript + Tailwind)

A simple, fast to‑do list app with an inline calendar and filters. Migrated from plain HTML/CSS/JS to Next.js (App Router) with TypeScript and TailwindCSS, preserving original UI and behavior while improving structure, accessibility, and maintainability.

## Project structure

- `src/app/`
  - `layout.tsx`: Root layout, metadata, semantic regions
  - `page.tsx`: App composition (top bar, calendar, input, filters, list, footer)
  - `globals.css`: Global styles (background, colors, utilities)
  - `error.tsx`, `not-found.tsx`: Error and 404 pages
- `src/components/`
  - `Calendar.tsx`: Month header and grid
  - `Filters.tsx`: Segmented control for All/Active/Completed
  - `TaskList.tsx`: List wrapper, menu state, empty state
  - `TaskItem.tsx`: Single task row with checkbox and menu
- `src/hooks/`
  - `useLocalStorage.ts`: Persist state to localStorage
  - `useClickOutside.ts`: Detect clicks outside an element
  - `useTasks.ts`: Encapsulated task state and operations
- `src/types/todo.ts`: Shared types (`Task`, `TaskId`, `Filter`)
- `src/utils/calendar.ts`: Calendar constants and helpers

## Tech stack

- Next.js (App Router)
- TypeScript (strict)
- TailwindCSS

## Features

- Add, toggle, and remove tasks
- Filter by All / Active / Completed
- Month calendar with previous/next navigation
- LocalStorage persistence for tasks
- URL-synced filter (`?filter=active`)
- Accessible form semantics and menu controls
- Clean, responsive UI using Tailwind

## Setup

Prerequisites: Node 18+

```bash
cd todo-next
npm install
```

## Development

```bash
npm run dev
```
Visit http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Testing (suggested)

The project is set up to be test-friendly; add Vitest + React Testing Library:
```bash
npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```
Example test candidates:
- `useTasks` add/toggle/remove
- Filters behavior and URL sync
- Calendar month navigation rendering

## Notes

- Colors are encoded via Tailwind utility classes; globals contain a few utilities (spin animation, checkbox accent, sr-only).
- Task IDs are stable, enabling reliable keys and operations.
- No external state library is required; hooks keep things simple and scalable.
