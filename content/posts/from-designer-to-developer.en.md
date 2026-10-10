---
title: From Web Designer to Front-end Engineer
excerpt: What did years of designing banners for Japanese brands teach me when I switched to writing code?
date: 2026-03-10
category: design
cover: /img/Group-1.png
---

I started my career in Photoshop and Illustrator, designing hundreds of banners for Japanese e-commerce sites. From 2015 to 2018 my daily work was promotional banners and landing pages — layouts that had to catch the eye and deliver a message in just a few seconds. Then one day I wanted to turn designs into real products myself, instead of just handing over a PSD and waiting to see how someone else would build it.

This post is what I learned along the way, plus a few suggestions for designers who are thinking about learning to code.

## Why I made the switch

As a designer, I often had a feeling that something was "lost": the design in Photoshop was polished, but once it went live the spacing was off, the fonts were different, the hover effects weren't what I had imagined. I didn't blame the developers — they had plenty of other things to worry about. But I realised that if I understood how browsers render an interface, I could design more realistically, and fix those small details myself.

At first I only planned to learn enough HTML/CSS to build landing pages on my own. But the more I learned, the more I enjoyed it, and gradually code became my main job.

## Lessons from design

### Lesson 1: Details make quality

Japanese clients are demanding down to the pixel. A banner might go through several rounds of revisions just because the gap between the headline and the button didn't feel balanced. That habit means I never skip spacing, alignment, or the hover, focus and disabled states of a component today.

### Lesson 2: Design for users

A beautiful banner nobody clicks is a failed banner. Designing banners for e-commerce taught me that every element on screen needs a purpose. Interfaces are the same — beauty has to go hand in hand with usability, speed and accessibility.

### Lesson 3: Speak each other's language

Having been a designer, I understand what designers want. As a developer, I know what's feasible. That bridge helps the whole team move faster: fewer rounds of back-and-forth, fewer misunderstandings.

> A design is only truly finished when it works on the user's screen.

## My learning roadmap

Looking back, this is the order I think makes sense for a designer who wants to learn front-end:

1. **HTML/CSS**: page structure, the box model, Flexbox, Grid, responsive design. This is the part designers will find most "familiar" because it's close to thinking in layouts.
2. **JavaScript**: variables, functions, arrays, objects, the DOM, events, then async/await and fetching data. This was the hardest part for me because it requires a completely different kind of logical thinking.
3. **React**: thinking in components, props, state, hooks. For designers, the idea of a component is very close to symbols or components in design tools.
4. **Next.js**: routing, server-side rendering, image and performance optimisation — the things you need to ship a real product.

Don't try to learn everything at once. I lost quite a bit of time jumping into a framework before my JavaScript basics were solid.

### A small example

When I was starting out, I used to centre things by "forcing" numbers:

```css
/* Before */
.banner-title {
  position: absolute;
  top: 120px;
  left: 340px;
}
```

It looked right on my screen, but broke on every other size. After I understood Flexbox:

```css
/* After */
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 1.5rem;
}
```

That was when I understood the difference between designing a fixed canvas and designing for the web.

## Tools I use

- **Figma**: my main tool for reading designs, grabbing specs and talking with designers
- **Photoshop and Illustrator**: still useful when I need to edit images, export assets or tweak icons
- **VS Code**: my everyday editor, with extensions for formatting, linting and Tailwind
- **Git**: confusing at first, but now I can't work without it — especially on a team

## How design skills help in front-end

This is where I feel I have the clearest advantage:

- **Spacing**: I naturally notice when spacing doesn't follow a system, and I prefer a consistent spacing scale over arbitrary numbers
- **Typography**: understanding line-height, line length and heading hierarchy makes content far easier to read
- **Design systems**: thinking in components, colour tokens and variants helps me build UI libraries that are organised and easy to extend
- **Handoff**: I know what to ask designers — empty states, error states, mobile behaviour — before I start coding

## Advice for designers who want to code

If you're a designer who wants to code, here are a few things I wish I had known sooner:

- **Rebuild your own designs**: it's the best exercise because you already know exactly how it should look
- **Learn in small steps**: a little every day beats a week of cramming followed by giving up
- **Use the browser's DevTools**: inspect websites you like to see how they're built
- **Don't fear errors**: errors in the console are the browser's way of talking to you
- **Keep your eye for aesthetics**: it isn't something to leave behind — it's what sets you apart

## Closing thoughts

Looking back, my years as a designer weren't a "detour". They gave me a perspective I use every day when writing code: always thinking about the person who will look at and touch that interface. Tools and frameworks will keep changing, but attention to detail and empathy for users won't.

If you're standing at the same crossroads I once was, just start. One small step at a time.
