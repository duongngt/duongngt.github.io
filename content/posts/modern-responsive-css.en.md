---
title: 5 modern CSS techniques for responsive UI
excerpt: clamp(), container queries, aspect-ratio, grid auto-fit and svh — the tools that let me write far fewer media queries.
date: 2026-06-02
category: frontend
---

Responsive design used to mean dozens of media queries: one set for mobile, one for tablet, one for desktop, plus a few "patches" for the awkward sizes in between. Today CSS is a lot smarter. Instead of listing every breakpoint, I describe *rules* — how big text should be within a range, how narrow a card is allowed to get — and let the browser work out the rest. Here are five techniques I use every day, all supported in all modern browsers.

## 1. clamp() for fluid type

`clamp(MIN, PREFERRED, MAX)` returns the middle value, but never less than `MIN` or more than `MAX`. Apply it to `font-size` and you get text that scales with the screen without going past its limits:

```css
h1 {
  font-size: clamp(2.4rem, 7vw, 5rem);
}
```

On a narrow phone, `7vw` is smaller than `2.4rem`, so the heading stays at `2.4rem`. As the screen widens, the text grows with `7vw`, and it stops at `5rem` on large displays. One line instead of three media queries.

### Don't rely on vw alone

There is a trap: if the preferred value is pure `vw`, the text won't grow when the user zooms the browser, because `vw` depends on the viewport, not the root font size. A safer approach is to add a `rem` component:

```css
:root {
  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --step-3: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}

body { font-size: var(--step-0); }
h2   { font-size: var(--step-3); }
```

I keep font sizes in CSS variables like this so the whole site shares one consistent type scale. `clamp()` also works nicely for `padding`, `gap` and `margin` — whitespace that scales with the screen feels much more natural.

## 2. Grid auto-fit

This is probably the line of CSS I copy most often:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```

Read it inside out: each column is at least `240px` and at most `1fr` (an equal share of the remaining space). `repeat(auto-fit, ...)` fits in as many columns as it can. A 1200px screen gets four columns, a tablet two, a phone one — no breakpoints needed.

### auto-fit or auto-fill?

- `auto-fit` collapses empty tracks, so when there are only two cards they stretch to fill the row.
- `auto-fill` keeps the empty tracks, so two cards stay the width of a single column.

There is one small bug: on screens narrower than `240px` plus padding, the grid overflows horizontally. Combine it with `min()` to prevent that:

```css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
}
```

`min(240px, 100%)` means "240px, but never wider than the container".

## 3. aspect-ratio

To keep a video frame at 16:9 we used to rely on the `padding-top: 56.25%` hack with an absolutely positioned child. Now it's just:

```css
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.avatar {
  width: 120px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}
```

Given the width, the browser works out the height. The biggest win is that the browser **reserves the space** for the image from the start, before it finishes loading, so the content below doesn't jump — which improves CLS (Cumulative Layout Shift). Paired with `object-fit: cover`, images with a different ratio still fill the frame without being distorted.

> Tip: for `img` elements, simply setting the `width` and `height` attributes in HTML lets the browser infer the ratio on its own. Reach for `aspect-ratio` in CSS when you want to force a fixed ratio across a whole grid of cards, regardless of the source images.

## 4. Container queries

A media query asks "how wide is the screen?". But a post card component might sit in a roomy main column or a cramped sidebar — on the same screen. Container queries let the component ask "how wide is my container?":

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
}

@container card (min-width: 480px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}
```

`container-type: inline-size` turns the element into a container along the inline (horizontal) axis. Once the container is `480px` or wider, the card switches to a two-column layout: image on the left, text on the right. Drop the same component into a narrow sidebar and it falls back to a stacked layout on its own — no extra classes, no need to know where it lives.

### The cqi unit

Container queries also bring new units. `1cqi` equals 1% of the inline size (usually the width) of the nearest container. Combined with `clamp()`:

```css
.card-title {
  font-size: clamp(1.1rem, 4cqi, 1.6rem);
}
```

The title now scales with the card, not the screen. For me, this is the final piece of component-driven design: every component takes care of its own responsiveness.

## 5. The svh, lvh and dvh units

`100vh` on phones is a familiar pain. On mobile browsers the address bar shrinks and expands as you scroll, so `100vh` is usually based on the *largest* viewport — and the bottom of a full-screen section ends up hidden behind the address bar. Three new units solve this:

- `svh` (small) — the viewport height while the browser toolbars are fully shown. Always fits, never covered.
- `lvh` (large) — the height once the toolbars have fully retracted.
- `dvh` (dynamic) — changes continuously with the actual state of the toolbars.

```css
.hero {
  min-height: 100vh;  /* fallback for older browsers */
  min-height: 100svh;
}
```

I usually pick `svh` for hero sections: the content always fits on screen. `dvh` sounds more appealing, but because it changes while scrolling, the layout can jitter slightly — use it deliberately. Declaring `100vh` first as a fallback is a good habit: a browser that doesn't understand `svh` simply ignores the second line.

## Bonus: min() and logical properties

Two more small tools I use all the time:

```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
  padding-block: clamp(3rem, 8vw, 6rem);
}
```

- `width: min(100% - 2rem, 1200px)` — the container is at most `1200px` wide, but on small screens always leaves `1rem` on each side. One line instead of a `max-width` + `padding` pair.
- `margin-inline` and `padding-block` are logical properties: they say "along the text direction" and "along the block direction" instead of left/right/top/bottom. The code is shorter, and it stays correct if the site ever supports right-to-left languages.

## Summary

These five techniques share one mindset: instead of giving orders for each screen size, describe the limits and let CSS do the math.

- `clamp()` for fluid type and spacing.
- `repeat(auto-fit, minmax())` for grids that pick their own column count.
- `aspect-ratio` to keep proportions and avoid layout shifts.
- Container queries and `cqi` for components that are responsive on their own.
- `svh`/`dvh`/`lvh` for accurate screen heights on mobile.

I still use media queries — for big page-level layout changes, or for `prefers-reduced-motion` and `prefers-color-scheme`. But there are far fewer of them. Let CSS do the heavy lifting — cleaner code that is easier to maintain.
