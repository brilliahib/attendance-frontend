<div align="center">

# Attendance Frontend

Frontend application for the Attendance System.

</div>

## Overview

This repository contains the frontend implementation of the Attendance System. Built with **Next.js** and **TypeScript**, this project is structured to support scalable development, clean architecture, and maintainable code organization.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- TanStack Table
- Axios
- NextAuth
- Lucide React
- Sonner

---

## Prerequisites

Before running this project, make sure you have installed:

1. Node.js v18 or higher
2. npm

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/brilliahib/attendance-frontend.git
   ```

2. Navigate to the project directory

   ```bash
   cd attendance-frontend
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open the app in your browser

   ```
   http://localhost:3000
   ```

---

## Available Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Run the app in development mode |
| `npm run build` | Build the app for production    |
| `npm start`     | Start the production server     |
| `npm run lint`  | Run ESLint                      |

---

## Workflow

### 1. Git

Git is used as the version control system. Please use a branching workflow when working on new features or fixes.

### 2. Branching Strategy

This project uses three main branches:

| Branch        | Purpose                    |
| ------------- | -------------------------- |
| `main`        | Production branch          |
| `staging`     | Staging branch for testing |
| `development` | Active development branch  |

For every new feature or task, create a new branch from the `development` branch.

### 3. Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

Example commit messages:

```
feat: add attendance table
fix: handle login validation
chore: update dependencies
```

### 4. Pull Request

All changes to the main branches (`main`, `staging`, and `development`) must go through a Pull Request flow. Do not push or merge directly into those branches.

---

## Folder Structure

```
.
├── public
├── src
│   ├── app
│   ├── assets
│   │   └── fonts
│   ├── components
│   │   ├── atoms
│   │   ├── layouts
│   │   ├── molecules
│   │   └── organisms
│   ├── constants
│   ├── hooks
│   ├── http
│   ├── lib
│   ├── types
│   ├── utils
│   └── validators
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

### Folder Explanation

| Folder                     | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| `public`                   | Static files such as images, icons, and other public assets             |
| `src`                      | Main application source code                                            |
| `src/app`                  | Next.js App Router structure and routing pages                          |
| `src/assets/fonts`         | Local font files used by the application                                |
| `src/components`           | Reusable UI components                                                  |
| `src/components/atoms`     | Smallest reusable components                                            |
| `src/components/molecules` | Combinations of atoms                                                   |
| `src/components/organisms` | Larger UI sections composed of molecules and atoms                      |
| `src/components/layouts`   | Layout-level components for pages                                       |
| `src/constants`            | Global constant values used throughout the application                  |
| `src/hooks`                | Custom React hooks for shared logic and state handling                  |
| `src/http`                 | API request functions and service layer                                 |
| `src/lib`                  | Local helper libraries, such as Axios configuration or shared instances |
| `src/types`                | TypeScript types and interfaces                                         |
| `src/utils`                | General utility functions used across the project                       |
| `src/validators`           | Validation logic for forms, requests, and data structures               |
