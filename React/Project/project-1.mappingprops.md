# React Masterclass — Components, Props & Mapping

> Goal of this project:
>
> By the end of this tutorial, students should deeply understand:
>
> - What components are
> - Why components exist
> - How props work
> - How data flows in React
> - How `.map()` works in React
> - How reusable UI is created
> - How real-world React apps are structured
>
> This tutorial is intentionally detailed.
>
> We are not just building an app.
>
> We are learning how React THINKS.

---

# Final Project We Will Build

We will build a:

# "Student Course Dashboard"

The dashboard will:

- Show multiple courses
- Display instructor information
- Show lessons inside each course
- Show tags for lessons
- Use reusable components
- Pass data using props
- Render lists using `.map()`
- Use nested mapping
- Use dynamic rendering

This project is PERFECT for understanding:

- Components
- Props
- Mapping
- Reusability

---

# What Students Will Learn

| Concept          | What It Means                    |
| ---------------- | -------------------------------- |
| Components       | Reusable UI blocks               |
| Props            | Data passed from parent to child |
| Mapping          | Rendering lists dynamically      |
| Reusability      | Write once, use many times       |
| Parent Component | Component sending data           |
| Child Component  | Component receiving data         |
| Dynamic UI       | UI generated from data           |

---

# Before Starting — Important Mindset

Most beginners make one HUGE mistake.

They think:

> "React is HTML inside JavaScript"

NO.

React is:

# UI built from COMPONENTS.

Think like LEGO blocks.

Instead of writing:

```html
<div>Course 1</div>

<div>Course 2</div>

<div>Course 3</div>
```

We create ONE reusable component:

```jsx
<CourseCard />
```

Then reuse it many times.

That is the ENTIRE philosophy of React.

---

# STEP 1 — Create React App

Using Vite:

```bash
npm create vite@latest react-props-masterclass
```

Choose:

```bash
React
JavaScript
```

Now install dependencies:

```bash
cd react-props-masterclass
npm install
```

Start server:

```bash
npm run dev
```

---

# STEP 2 — Clean the Project

Delete everything inside `App.jsx`

Also clean `App.css`

We want a fresh start.

---

# STEP 3 — Understand Components First

# What is a Component?

A component is:

# A reusable function that returns UI.

Example:

```jsx
function Welcome() {
  return <h1>Hello Students</h1>;
}
```

This is a component.

Why?

Because:

- It is reusable
- It returns UI
- React can render it

---

# Real World Analogy

Imagine a burger restaurant.

Instead of making each burger manually from scratch:

- You create a SYSTEM
- The system makes burgers repeatedly

React components work exactly the same way.

One blueprint.

Multiple reusable outputs.

---

# STEP 4 — Create Your First Component

Inside `src/components`

Create:

```bash
CourseCard.jsx
```

Code:

```jsx
function CourseCard() {
  return (
    <div>
      <h2>React Basics</h2>
      <p>Learn components and props</p>
    </div>
  );
}

export default CourseCard;
```

---

# Understanding Every Line

## Line 1

```jsx
function CourseCard() {
```

We are creating a function.

But React treats this function specially.

Why?

Because:

- It starts with CAPITAL LETTER
- It returns JSX

React now considers it a component.

---

## JSX

```jsx
<div>
  <h2>React Basics</h2>
</div>
```

This LOOKS like HTML.

But it is NOT actually HTML.

It is:

# JSX

(JS + XML)

React converts JSX into JavaScript behind the scenes.

---

## export default

```jsx
export default CourseCard;
```

This allows other files to use this component.

Without export:

Other files cannot import it.

---

# STEP 5 — Use Component Inside App.jsx

```jsx
import CourseCard from "./components/CourseCard";

function App() {
  return (
    <div>
      <CourseCard />
    </div>
  );
}

export default App;
```

---

# Understanding What Happened

## Import

```jsx
import CourseCard from "./components/CourseCard";
```

This brings the component into App.

Think of it like:

> "Hey App.jsx, use this reusable UI block"

---

## Rendering Component

```jsx
<CourseCard />
```

This is NOT HTML.

This is:

# Calling a React component.

React internally does something similar to:

```jsx
CourseCard();
```

Then inserts the returned UI.

---

# STEP 6 — Why Components Matter

Without components:

```jsx
<div>
  <h2>React Basics</h2>
</div>

<div>
  <h2>JavaScript Mastery</h2>
</div>

<div>
  <h2>Node.js</h2>
</div>
```

This becomes repetitive.

With components:

```jsx
<CourseCard />
<CourseCard />
<CourseCard />
```

Cleaner.

Reusable.

Maintainable.

Scalable.

---

# STEP 7 — The BIG Problem

Right now every card shows SAME data.

Why?

Because component is hardcoded.

We need dynamic data.

This is where:

# PROPS

enter the picture.

---

# STEP 8 — Understanding Props

# What Are Props?

Props are:

# Data passed from parent to child component.

Think of props like function arguments.

Example:

```js
sayHello("Ali");
```

`Ali` is data being passed.

React works similarly.

---

# Props Analogy

Imagine ordering pizza.

Pizza machine = component

Pizza details = props

Example:

```jsx
<Pizza size="large" flavor="pepperoni" />
```

The same pizza component can create MANY variations.

---

# STEP 9 — Add Props

Update `CourseCard.jsx`

```jsx
function CourseCard(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

export default CourseCard;
```

---

# Understanding Every Concept

## props parameter

```jsx
function CourseCard(props)
```

React automatically passes an object.

Example:

```js
{
  title: 'React Basics',
  description: 'Learn components'
}
```

This object is called:

# props

---

## Dynamic Rendering

```jsx
{
  props.title;
}
```

Curly braces mean:

# "Run JavaScript here"

React evaluates the expression.

---

# STEP 10 — Pass Props From Parent

Now update `App.jsx`

```jsx
import CourseCard from "./components/CourseCard";

function App() {
  return (
    <div>
      <CourseCard
        title="React Basics"
        description="Learn components and props"
      />

      <CourseCard
        title="JavaScript Advanced"
        description="Closures, async await and more"
      />
    </div>
  );
}

export default App;
```

---

# What Is Happening Internally?

React converts:

```jsx
<CourseCard title="React Basics" />
```

into something conceptually similar to:

```js
CourseCard({
  title: "React Basics",
});
```

THIS is the key idea.

Props are just:

# Object data sent into a component.

---

# STEP 11 — Destructuring Props

Most React developers do this:

```jsx
function CourseCard({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

---

# Why Destructuring?

Instead of writing:

```jsx
props.title;
props.description;
```

We directly extract values.

Cleaner.

Shorter.

More readable.

---

# STEP 12 — Styling The App

Update `App.jsx`

```jsx
import CourseCard from "./components/CourseCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Course Dashboard</h1>

      <CourseCard
        title="React Basics"
        description="Learn components and props"
      />

      <CourseCard
        title="JavaScript Advanced"
        description="Closures and async programming"
      />
    </div>
  );
}

export default App;
```

---

`App.css`

```css
body {
  font-family: Arial;
  background: #f4f4f4;
}

.app {
  padding: 30px;
}

.card {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}
```

---

Update `CourseCard.jsx`

```jsx
function CourseCard({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default CourseCard;
```

---

# STEP 13 — The Next BIG Problem

Imagine we have:

- 10 courses
- 50 courses
- 500 courses

Will we manually write:

```jsx
<CourseCard />
<CourseCard />
<CourseCard />
```

500 times?

Impossible.

This is where:

# MAPPING

becomes important.

---

# STEP 14 — Understanding map()

# What is map()?

`.map()` is a JavaScript array method.

It transforms arrays.

Example:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});
```

Result:

```js
[2, 4, 6];
```

---

# React Uses map() To Create UI

Instead of transforming numbers,

React transforms:

# DATA → UI

This is MASSIVE.

Example:

```jsx
courses.map((course) => {
  return <CourseCard />;
});
```

We are converting:

```js
[{}, {}, {}];
```

into:

```jsx
<CourseCard />
<CourseCard />
<CourseCard />
```

Dynamically.

---

# STEP 15 — Create Data Array

Update `App.jsx`

```jsx
import CourseCard from "./components/CourseCard";
import "./App.css";

function App() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn components and JSX",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      description: "Closures and async await",
    },
    {
      id: 3,
      title: "Node.js",
      description: "Backend development",
    },
  ];

  return (
    <div className="app">
      <h1>Course Dashboard</h1>
    </div>
  );
}

export default App;
```

---

# Understanding Data-Driven UI

This array is the HEART of the app.

Modern React apps are:

# DATA DRIVEN.

The UI comes FROM data.

Not manual HTML.

---

# STEP 16 — Map Through Courses

```jsx
import CourseCard from "./components/CourseCard";
import "./App.css";

function App() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn components and JSX",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      description: "Closures and async await",
    },
    {
      id: 3,
      title: "Node.js",
      description: "Backend development",
    },
  ];

  return (
    <div className="app">
      <h1>Course Dashboard</h1>

      {courses.map((course) => {
        return (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
          />
        );
      })}
    </div>
  );
}

export default App;
```

---

# Understanding This Deeply

## courses.map()

We loop through every course.

---

## course

Each iteration gives one object.

Example:

First loop:

```js
{
  id: 1,
  title: 'React Basics'
}
```

Second loop:

```js
{
  id: 2;
}
```

---

## Returning JSX

```jsx
return <CourseCard />;
```

Each loop creates ONE component.

If array has 100 items:

React creates 100 components.

Automatically.

---

# STEP 17 — Understanding key

```jsx
key={course.id}
```

React requires unique keys when rendering lists.

Why?

Because React needs to track:

- Which item changed
- Which item moved
- Which item got deleted

Keys help React optimize rendering.

Think of keys like:

# CNIC numbers for components.

Unique identity.

---

# STEP 18 — Make Components More Powerful

Now we will add:

- instructor
- duration
- level

Update data:

```jsx
const courses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn components and JSX",
    instructor: "Ali",
    duration: "6 Weeks",
    level: "Beginner",
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    description: "Closures and async await",
    instructor: "Ahmed",
    duration: "8 Weeks",
    level: "Advanced",
  },
];
```

---

# Update CourseCard

```jsx
function CourseCard({ title, description, instructor, duration, level }) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>{description}</p>

      <h4>Instructor: {instructor}</h4>

      <p>Duration: {duration}</p>

      <p>Level: {level}</p>
    </div>
  );
}

export default CourseCard;
```

---

# Update App.jsx

```jsx
<CourseCard
  key={course.id}
  title={course.title}
  description={course.description}
  instructor={course.instructor}
  duration={course.duration}
  level={course.level}
/>
```

---

# Real World React Pattern

This is EXACTLY how real apps work.

Backend/API sends data.

React maps through data.

Props send data into components.

Components render UI.

This is modern frontend architecture.

---

# STEP 19 — Nested Mapping

Now we level up.

Each course will contain:

# lessons

Example:

```js
lessons: ["Introduction", "Components", "Props"];
```

---

# Update Data

```jsx
const courses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn components and JSX",
    instructor: "Ali",
    duration: "6 Weeks",
    level: "Beginner",
    lessons: ["JSX", "Components", "Props", "Mapping"],
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    description: "Deep JavaScript concepts",
    instructor: "Ahmed",
    duration: "8 Weeks",
    level: "Advanced",
    lessons: ["Closures", "Promises", "Async Await"],
  },
];
```

---

# STEP 20 — Render Lessons

Update `CourseCard.jsx`

```jsx
function CourseCard({
  title,
  description,
  instructor,
  duration,
  level,
  lessons,
}) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>{description}</p>

      <h4>Instructor: {instructor}</h4>

      <p>Duration: {duration}</p>

      <p>Level: {level}</p>

      <h3>Lessons</h3>

      <ul>
        {lessons.map((lesson, index) => {
          return <li key={index}>{lesson}</li>;
        })}
      </ul>
    </div>
  );
}

export default CourseCard;
```

---

# HUGE Learning Moment

We are now doing:

# MAP INSIDE MAP

First map:

```jsx
courses.map();
```

creates course cards.

Second map:

```jsx
lessons.map();
```

creates lesson items.

This is how complex UI systems are built.

---

# STEP 21 — Component Hierarchy

Our app structure now looks like:

```text
App
 ├── CourseCard
 │      ├── Lesson Item
 │      ├── Lesson Item
 │      ├── Lesson Item
 │
 ├── CourseCard
 │      ├── Lesson Item
```

React apps are:

# Trees of components.

---

# STEP 22 — Create Separate Lesson Component

Now we make app EVEN MORE reusable.

Create:

```bash
LessonItem.jsx
```

---

# LessonItem.jsx

```jsx
function LessonItem({ lessonName }) {
  return <li>{lessonName}</li>;
}

export default LessonItem;
```

---

# Update CourseCard.jsx

```jsx
import LessonItem from "./LessonItem";

function CourseCard({
  title,
  description,
  instructor,
  duration,
  level,
  lessons,
}) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>{description}</p>

      <h4>Instructor: {instructor}</h4>

      <p>Duration: {duration}</p>

      <p>Level: {level}</p>

      <h3>Lessons</h3>

      <ul>
        {lessons.map((lesson, index) => {
          return <LessonItem key={index} lessonName={lesson} />;
        })}
      </ul>
    </div>
  );
}

export default CourseCard;
```

---

# Deep Understanding

Data flow:

```text
App
 ↓ props
CourseCard
 ↓ props
LessonItem
```

React follows:

# One-way data flow.

Parent sends data down.

Child receives.

---

# STEP 23 — Understanding Reusability

Now LessonItem can be reused ANYWHERE.

Example:

```jsx
<LessonItem lessonName="React Hooks" />
```

This is why components are powerful.

Write once.

Reuse everywhere.

---

# STEP 24 — Add Tags Using Nested Mapping

Now each lesson will have tags.

Example:

```js
{
  name: 'Props',
  tags: ['beginner', 'important']
}
```

---

# Update Data Structure

```jsx
lessons: [
  {
    name: "JSX",
    tags: ["core", "beginner"],
  },
  {
    name: "Props",
    tags: ["important", "core"],
  },
];
```

---

# Update LessonItem.jsx

```jsx
function LessonItem({ lesson }) {
  return (
    <li>
      <h4>{lesson.name}</h4>

      <div>
        {lesson.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
    </li>
  );
}

export default LessonItem;
```

---

# IMPORTANT CONCEPT

Now we have:

- Mapping courses
- Mapping lessons
- Mapping tags

Three levels of dynamic rendering.

This is REAL React architecture.

---

# STEP 25 — Final Folder Structure

```text
src
 ├── components
 │      ├── CourseCard.jsx
 │      ├── LessonItem.jsx
 │
 ├── App.jsx
 ├── App.css
 ├── main.jsx
```

---

# STEP 26 — Mental Model of Entire App

# App.jsx

Responsible for:

- Holding data
- Mapping data
- Sending props

---

# CourseCard.jsx

Responsible for:

- Displaying one course
- Receiving props
- Mapping lessons

---

# LessonItem.jsx

Responsible for:

- Displaying one lesson
- Mapping tags

---

# THIS is React Thinking

Break UI into:

# SMALL REUSABLE PIECES.

---

# Common Beginner Mistakes

# Mistake 1 — Forgetting return in map

WRONG:

```jsx
courses.map((course) => {
  <CourseCard />;
});
```

Nothing renders.

Why?

Because nothing is returned.

---

# Correct

```jsx
courses.map((course) => {
  return <CourseCard />;
});
```

OR

```jsx
courses.map((course) => <CourseCard />);
```

---

# Mistake 2 — Missing key

WRONG:

```jsx
<CourseCard />
```

inside map without key.

React warns because tracking becomes difficult.

---

# Mistake 3 — Mutating Props

NEVER do:

```jsx
props.title = "Changed";
```

Props are:

# READ ONLY.

---

# Mistake 4 — Thinking map is React

Important:

`.map()` is NOT React.

It is:

# Pure JavaScript.

React simply uses it for rendering lists.

---

# Advanced Understanding

# Why React Loves Arrays

React can render arrays of JSX.

Example:

```jsx
const items = [<h1>Hello</h1>, <h1>World</h1>];
```

React can directly display this.

`.map()` helps generate these arrays dynamically.

---

# Final Complete App

# App.jsx

```jsx
import CourseCard from "./components/CourseCard";
import "./App.css";

function App() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn modern React fundamentals",
      instructor: "Ali",
      duration: "6 Weeks",
      level: "Beginner",
      lessons: [
        {
          name: "JSX",
          tags: ["core", "beginner"],
        },
        {
          name: "Components",
          tags: ["important", "core"],
        },
        {
          name: "Props",
          tags: ["must-know", "core"],
        },
      ],
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      description: "Master deep JS concepts",
      instructor: "Ahmed",
      duration: "8 Weeks",
      level: "Advanced",
      lessons: [
        {
          name: "Closures",
          tags: ["advanced"],
        },
        {
          name: "Promises",
          tags: ["async"],
        },
        {
          name: "Async Await",
          tags: ["important"],
        },
      ],
    },
  ];

  return (
    <div className="app">
      <h1>Course Dashboard</h1>

      {courses.map((course) => {
        return (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            duration={course.duration}
            level={course.level}
            lessons={course.lessons}
          />
        );
      })}
    </div>
  );
}

export default App;
```

---

# CourseCard.jsx

```jsx
import LessonItem from "./LessonItem";

function CourseCard({
  title,
  description,
  instructor,
  duration,
  level,
  lessons,
}) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>{description}</p>

      <h4>Instructor: {instructor}</h4>

      <p>Duration: {duration}</p>

      <p>Level: {level}</p>

      <h3>Lessons</h3>

      <ul>
        {lessons.map((lesson, index) => {
          return <LessonItem key={index} lesson={lesson} />;
        })}
      </ul>
    </div>
  );
}

export default CourseCard;
```

---

# LessonItem.jsx

```jsx
function LessonItem({ lesson }) {
  return (
    <li>
      <h4>{lesson.name}</h4>

      <div>
        {lesson.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
    </li>
  );
}

export default LessonItem;
```

---

# Final Understanding Checklist

A student who understands this project now understands:

✅ Components

✅ Reusable UI

✅ Props

✅ Parent → Child communication

✅ JSX

✅ Dynamic rendering

✅ JavaScript map()

✅ Nested mapping

✅ Rendering lists

✅ React keys

✅ Component hierarchy

✅ One-way data flow

✅ Data-driven UI

---

# Final Mental Model

# React = UI generated from data using components.

The flow is:

```text
Data
 ↓
map()
 ↓
Components
 ↓
Rendered UI
```

This single idea powers MOST React applications.

If students deeply understand THIS project,

they have understood one of the most important foundations of React.

---

# Challenge Exercises For Students

# Beginner

1. Add course price
2. Add course image
3. Add enrollment count

---

# Intermediate

1. Add categories
2. Add rating stars
3. Add completed lessons counter

---

# Advanced

1. Add search filtering
2. Add sorting
3. Add favorite courses
4. Add dark mode
5. Fetch data from API

---

# Final Advice For Students

Do NOT memorize React.

Understand these ideas deeply:

- Components are reusable functions
- Props pass data
- map() creates dynamic UI
- Data drives everything

Once these ideas become natural,

React becomes MUCH easier.
