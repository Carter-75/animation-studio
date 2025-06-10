# Next.js Animation Portfolio Starter

This is a starter template for building a personal portfolio website to showcase web animation skills. It's built with Next.js (App Router), TypeScript, and includes `anime.js`, `matter-js`, and `bulma` to get you started.

## Project Goal

The goal is to provide a flexible and easily updatable platform where you can add new animation examples with minimal effort. This starter gives you the basic setup to begin building.

## Key Features (to be built)

The final project will have:

-   **Dynamic Animation Grid:** A grid that automatically displays all of your animation components from the `src/animations` folder.
-   **Easy Updates:** A system where you can add new animations just by creating a new file.
-   **Interactive UI:** An animated background and other interactive elements.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Add Animations

1.  Create your new animation component inside the `src/animations` directory.
2.  Import and add your component to the list in `src/animations/index.ts` (you will need to create this file).
3.  The main page will automatically pick up the new animation and display it in the grid.

## Technology Stack

-   **Framework:** [Next.js](https://nextjs.org/) (using React)
-   **Animation:** [anime.js](https://animejs.com/) & [matter-js](https://brm.io/matter-js/)
-   **Styling:** [Bulma](https://bulma.io/)
-   **TypeScript**
