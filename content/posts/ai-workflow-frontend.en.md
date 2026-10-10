---
title: How AI changed the way I do Front-end
excerpt: From Claude Code to GitHub Copilot — AI doesn't replace developers, but it does change how we work every day.
date: 2026-08-25
category: ai
featured: true
---

Over the past year AI has become a familiar "teammate" in my daily work. When I open VS Code in the morning, I almost always have Claude Code running in the terminal, GitHub Copilot suggesting code in the editor, and a ChatGPT tab for quick questions that aren't tied to the codebase. This post isn't trying to prove that AI is "magic" or "dangerous". It's simply a record of what I've actually learned from using it every day for front-end work with ReactJS and Next.js.

## Write prompts like work tickets

The first and most important lesson: AI is only as good as the request you give it. In the beginning I typed very short things like "make me a login form". The result usually ran, but it used the wrong library, the wrong naming, the wrong folder structure for the project — and I spent extra time fixing it.

Now I write prompts the way I'd write a ticket for a new teammate. A good prompt usually includes:

- **Goal**: what needs to be done and who it's for
- **Context**: the stack, related files, project conventions
- **Constraints**: no new libraries, must be accessible, must be responsive
- **An example**: an existing, similar component for the AI to follow
- **Output**: whether I want code, an explanation, or just a plan

Here's a sample prompt I often use when building a new component:

```text
Context: Next.js project (App Router), TypeScript, Tailwind CSS.
Reference component: src/components/ui/Card.tsx (follow the same style and naming).

Task: Create a <PricingCard /> component that shows the plan name, price, a list of features and a CTA button.

Constraints:
- Do not add new libraries.
- Props must be explicitly typed, no any.
- The CTA button must be keyboard-accessible with a clear focus state.
- Responsive: single column on mobile, placed in a grid on desktop.

Before writing code, briefly list your plan and your assumptions.
```

That last line is a small but very useful trick: asking the AI to state its plan and assumptions first lets me catch misunderstandings early, before it generates hundreds of lines heading in the wrong direction.

## What AI does well

After a while I noticed AI shines brightest on work with a clear pattern:

- **Scaffolding new components and pages**: boilerplate, props, basic layout
- **Writing tests and documentation**: especially the edge cases I tend to forget
- **Explaining unfamiliar code**: when I have to read an old module nobody remembers
- **Data transforms and repetitive refactors**: bulk renames, extracting functions, converting class components to function components

Here's a small refactor example. In many projects I've run into data fetching scattered inside components like this:

```tsx
// Before
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

I asked the AI to turn it into a Next.js Server Component with types and error handling:

```tsx
// After
type User = { id: string; name: string };

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.API_URL}/users`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to load users');
  return res.json();
}

export default async function UserList() {
  const users = await getUsers();
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

None of this is hard, but when it has to be done in many places, AI saves me a fair amount of typing. The rest — deciding whether a Server Component is the right choice at all — is still my job.

## Pitfalls to watch out for

AI is very confident, even when it's wrong. These are the problems I've run into:

### Hallucinated APIs

AI sometimes invents a function, a prop or an option that doesn't exist in the library, especially with newer versions. The code looks perfectly reasonable and only fails when it runs. Whenever I see an unfamiliar API, I check the official docs before trusting it.

### Security and proprietary code

Most of the projects I work on for clients are under non-disclosure agreements. So I have a few hard rules:

1. Never paste API keys, tokens, passwords or `.env` files into a prompt
2. Follow company and client policies on which AI tools are allowed
3. When asking an external chat tool, reduce the code to a minimal example and strip out sensitive names or business logic

### Over-reliance

This is the hardest pitfall to notice. At one point I realised I was accepting Copilot suggestions without really understanding them. If you don't understand the code you commit, you won't be able to debug it when something breaks. Every now and then I deliberately write a piece without AI, just to keep my coding "muscles" in shape.

> AI suggests — I decide. And I'm responsible for every line that gets merged.

## How I review AI-written code

I treat AI-generated code like a pull request from a teammate who is very fast but new to the project. When reviewing, I ask myself:

- Does the code actually solve the requirement, or does it just look like it does?
- Does it use any API or library I haven't verified?
- Does it handle loading, error and empty states?
- Are there accessibility issues: labels, focus, contrast?
- Does it add unnecessary dependencies or dead code?
- Does it follow the project's conventions and structure?

After that I always run lint, type checks and tests, and open the browser myself to check on several screen sizes. None of those steps get skipped just because "the AI wrote it".

## What still needs a human

Architecture decisions, user experience and ownership of product quality remain the developer's job. AI can offer five ways to organise state, but it doesn't know how my team will maintain the project over the next few years. It can write a smooth animation, but it doesn't know whether real users will find that animation annoying.

Coming from a design background, I see this even more clearly: a feel for spacing, rhythm and balance in an interface is something that needs human eyes and an understanding of users.

## My workflow

These days my workflow with AI looks like this:

1. **Describe the requirement clearly**: write the prompt like a ticket, with context and constraints
2. **Ask for a plan first**: read the plan and correct wrong assumptions
3. **Let AI produce a first draft**: break the work down, one piece at a time
4. **Review, edit and test**: review it like a teammate's PR
5. **Save prompts that work so I can reuse them**: I keep a notes file of sample prompts for each kind of task

Breaking work down is the point I want to stress. A big request like "build the whole dashboard page" usually produces something hard to review. Ten small requests, each checked carefully, give a much better result.

## Conclusion

AI hasn't made me a different developer, but it has changed how I spend my time. I spend less time retyping repetitive things and more time thinking: how should this component be split, how will users feel when they interact with it, is there a simpler way?

I think the most important skill going forward isn't knowing which AI tool to use, but knowing how to ask the right questions and understanding enough to judge the answers. AI helps me move faster — but the direction, and the people at the end of the road, are still things I have to keep in mind myself.
