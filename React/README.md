React.js Beginner Course — from scratch

What this folder contains

- `lessons/` — markdown lessons covering theory and exercises.
- `examples/` — runnable single-file HTML examples using React + ReactDOM + Babel CDNs; open in a browser (no build).
- `starter/` — a minimal starter app and instructions to run a local static server.
- `syllabus.md` — course plan and learning path.

How to use

1. Read the lessons: open any Markdown file under `lessons/` to study the theory and exercises.
2. Run examples (no build): open the HTML files under `examples/` directly in a modern browser, or serve the folder with a static server for fetch examples to work.

Quick static server (Windows cmd.exe / PowerShell):

```cmd
cd /d f:\React\react-course
python -m http.server 8000
```

Then open in your browser:

http://localhost:8000/examples/lesson-01-basic.html

Notes

- Examples use CDN builds of React and Babel (for JSX in the browser). This is ideal for learning and small demos but not recommended for production.
- To migrate to a real project, consider Vite or Create React App—see `syllabus.md` for suggested next lessons.

Next steps

- I added lessons 1–4 and runnable examples. If you'd like, I can add a Vite + TypeScript starter and automated tests next.
