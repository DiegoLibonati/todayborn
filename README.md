# Todayborn

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Todayborn** is a lightweight web application that displays a curated list of people celebrating their birthday today, along with their profile photo, full name, and current age. The interface renders each person as a card in a clean, accessible list, making it easy to glance at who is turning a year older on any given day.

The page loads with a pre-defined set of birthday entries and shows the total count at the top so the user always knows at a glance how many birthdays are active. A single "Clear ALL" button lets the user dismiss the entire list at once, resetting the view to an empty state — useful when the information has already been acknowledged and the screen needs to be cleared.

The application is fully static: there is no backend, no database, and no authentication. All birthday data lives in a constants file, making it straightforward to extend or replace the seed data with a dynamic data source in the future. The UI is built with accessibility in mind — each birthday card exposes a descriptive `aria-label` combining the person's name and age, and profile images include meaningful alt text, so the content is usable with assistive technologies.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack above installed, follow these steps to run the app locally:

1. Ensure you have Node.js 22 installed (see `.nvmrc`)
2. Clone the repository
3. Navigate to the project folder
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is running, you can verify its behavior with the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

[![CI](https://github.com/DiegoLibonati/Birthday-React/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoLibonati/Birthday-React/actions/workflows/ci.yml)

### Pipeline overview

```
                ┌─── PR or push to main ───┐
                ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    lint-and-audit    │─▶│      testing     │─▶│       build      │
│  eslint · tsc check  │  │   jest (jsdom)   │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push to `main`)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint over `src`) and `npm run type-check` (TypeScript `--noEmit` against `tsconfig.app.json`).
2. **`testing`** — runs the full Jest suite headlessly via `npm test` against the jsdom environment. Requires `lint-and-audit` to pass first.
3. **`build`** — runs `npm run build`, which performs the TypeScript build and produces the Vite production bundle under `dist/`. Requires `testing` to pass first.

All jobs run on `ubuntu-latest` and share the Node version declared in [`.nvmrc`](.nvmrc) with the npm cache enabled via `actions/setup-node`.

### Where the build outputs live

| Output                                           | Location                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub                                   |
| Production bundle (`dist/`)                      | Ephemeral, inside the runner — not published as an artifact |

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm test

# build
npm run build
```

## Security Audit

Beyond functional tests, the project ships with tooling to audit dependencies and overall code health.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/todayborn`](https://www.diegolibonati.com.ar/#/project/todayborn)
