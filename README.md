# To‑Do List with Calendar

## Project Description
A **simple and interactive to-do list app** that helps users track their daily tasks and activities. The app features a **built-in calendar** to visualize the current date and navigate between months, while allowing users to **add, complete, filter, and remove tasks** with ease.  

The UI is clean, intuitive, and responsive, making task management effortless on both desktop and mobile devices.

Please refer to todo-next folder for this project.

## Who It’s For & Why It Matters
This project is designed for anyone who wants to:
- Organize daily tasks efficiently.
- Track completed and pending tasks.
- Quickly visualize their schedule using an integrated calendar.

It is particularly useful for students, professionals, and anyone looking for a lightweight task management solution without the complexity of larger productivity tools.  

By providing a simple, distraction-free interface, the app encourages **better time management and productivity**.

## Tech Stack
- **Frontend Framework:** Next.js  
- **Language:** TypeScript  
- **Styling:** TailwindCSS  
- **State Management:** React hooks (\`useState\`, \`useEffect\`)  
- **Build Tools:** Vite or Next.js built-in bundler  
- **Version Control:** Git & GitHub  
- **IDE:** Cursor  

### Why This Stack
- **Next.js**: Provides server-side rendering, optimized routing, and API routes if needed.  
- **TypeScript**: Ensures type safety and reduces runtime errors.  
- **TailwindCSS**: Enables rapid styling with utility-first classes while keeping the design consistent with the original app.  

## AI Integration Strategy
AI will assist in the development lifecycle in the following ways:

1. **Code Generation**
   - Auto-generate repetitive UI components (e.g., calendar grid, task list items) with TypeScript types.
   - Create boilerplate code for filters, event handlers, and state management.

2. **Testing**
   - Generate unit and integration tests for calendar navigation, task add/remove, and filter functionality.
   - Use AI to suggest edge cases and generate mock data.

3. **Documentation**
   - Auto-generate component documentation and inline comments for maintainability.
   - Produce README updates reflecting new features.

4. **Context-Aware Coding**
   - Suggest refactoring opportunities to optimize performance and maintainability.
   - Recommend TypeScript types for props, state, and API responses.

## Project Structure (Example)
\`\`\`
/todo-calendar-next
│
├─ /components
│   ├─ Calendar.tsx
│   ├─ TaskItem.tsx
│   ├─ TaskList.tsx
│   └─ Filters.tsx
│
├─ /pages
│   ├─ index.tsx
│
├─ /styles
│   └─ globals.css
│
├─ /utils
│   └─ helpers.ts
│
├─ package.json
└─ tsconfig.json
\`\`\`

## Key Features
- Calendar with **month navigation** and highlighting of today’s date.  
- Add, complete, and delete tasks with **real-time updates**.  
- Filter tasks: **All**, **Active**, **Completed**.  
- Task completion count in the footer.  
- Dropdown menus for task options.  
- Responsive and modern design using TailwindCSS.  

## Next Steps
1. Set up a **Next.js + TypeScript** project.
2. Integrate **TailwindCSS** for styling.
3. Create the layout using **components**. 
4. Add calendar and task logic with **React hooks**.
5. Test all features and edge cases.
6. Deploy to **Vercel** or any preferred hosting platform.

