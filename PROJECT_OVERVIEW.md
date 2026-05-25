# Project Overview

## Repository
- **Root**: `g:/Port`
- **Purpose**: Portfolio website for Gustavo Rangel, a graphic designer.

## Tech Stack
- **Framework**: React with TanStack Router
- **Styling**: Tailwind CSS + custom CSS variables (`styles.css`)
- **Animations**: `motion/react`
- **Smooth scrolling**: `Lenis`
- **Components**: Reusable UI components (`Footer`, `Nav`, `Reveal`, `FadeUp`, `Marquee`, etc.)
- **Pages**: Home (`index.tsx`), Projects (list and slug), About, Contact.

## Key Directories
- `src/components` – UI components.
- `src/lib` – Data (projects list) and utils.
- `src/routes` – Route definitions for pages.
- `src/styles.css` – Global CSS variables and Tailwind configuration.
- `components.json` – Shadcn/ui configuration.

## Design System
- **Color palette**: Defined via CSS variables (`--color-primary`, `--color-background`, etc.) using Oklch.
- **Typography**: `--font-display` and `--font-sans` set to Helvetica family.
- **Animations**: `RevealLine` and `FadeUp` components for scroll‑based reveals.
- **Responsive layout**: Tailwind utility classes throughout.

## Update Log
- *0.1* – Initial creation of this overview file.

---
*This file will be kept up‑to‑date as the project evolves.*
