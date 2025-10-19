# Lesson 10 — Build, deploy, and next steps (Vite, SSR basics)

Learning objectives

- Understand modern build tools (Vite) and why to use them
- Learn deployment options and basics of SSR/hydration
- Know steps to migrate from CDN-based examples to a real project

Why use a bundler / dev server

- Local development: fast HMR (hot module replacement) for quick feedback
- Production: bundling, minification, tree-shaking, and optimized assets
- Vite uses native ES modules in dev for rapid cold-start and rollup for production bundles

Create a minimal Vite React app (outline)

1. npm init vite@latest my-app --template react
2. cd my-app
3. npm install
4. npm run dev

Basic production build

```cmd
npm run build
npm run preview
```

Deployment options

- Static hosts: Netlify, Vercel, GitHub Pages — upload the `dist` or `build` folder
- Container: serve static files with Nginx or a Node server
- SSR: frameworks like Next.js or Remix enable server-side rendering and faster first paint for dynamic apps

SSR and hydration (overview)

- SSR renders HTML on the server and sends it to the client. The client then hydrates the markup to attach event listeners and make it interactive.
- Hydration must match the server-rendered HTML to avoid warnings.

Migration checklist from examples to Vite

- Create a new Vite project
- Move components and assets into `src/` and replace CDN imports with npm packages
- Add ESLint/Prettier and TypeScript as desired
- Replace manual script tags with proper module imports and build steps

Exercises

1. Create a Vite React app and import `examples/lesson-03-props-state.html` logic as React components under `src/`.
2. Deploy a production build to Netlify or Vercel.

Interview Q&A

Q: Why use Vite over older bundlers?
A: Vite provides faster dev startup by using native ES modules and optimized production builds powered by Rollup. It's generally faster and simpler to configure.

Q: What is hydration in SSR?
+A: Hydration is the process where client-side JavaScript attaches event listeners to server-rendered HTML and continues app lifecycle. It's crucial the client markup matches the server output.
