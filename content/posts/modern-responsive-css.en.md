---
title: 5 modern CSS techniques for responsive UI
excerpt: clamp(), container queries, aspect-ratio, grid auto-fit and svh — the tools that let me write far fewer media queries.
date: 2026-06-02
category: frontend
---

Responsive design used to mean dozens of media queries. Today CSS is a lot smarter.

## 1. clamp() for fluid type

```css
h1 { font-size: clamp(2.4rem, 7vw, 5rem); }
```

One line, and the text scales smoothly from phones to large screens.

## 2. Grid auto-fit

```css
.grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
```

The grid works out the number of columns by itself — no breakpoints.

## 3. aspect-ratio

Keeps images and videos at a stable ratio and prevents layout shifts while loading.

## 4. Container queries

Components respond to the size of their container instead of the screen. A perfect match for component-driven design.

## 5. The svh unit

`100vh` on phones is often hidden behind the address bar. `100svh` fixes that.

## Summary

Let CSS do the heavy lifting — cleaner code that is easier to maintain.
