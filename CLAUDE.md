# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm test         # Jest in interactive watch mode
npm run build    # Production build to /build
```

ESLint runs automatically via CRA during `npm start` and `npm test`. Config is inline in `package.json` under `"eslintConfig"` (extends `react-app` and `react-app/jest`). There is no separate `.eslintrc`.

To run a single test file: `npm test -- --testPathPattern=App.test.js`

## Architecture

This is a **GitHub Repository Comparison Explorer** built with Create React App (plain JavaScript, no TypeScript). Users enter two GitHub repo paths (`owner/repo`), submit, and the app fetches stats from the GitHub public REST API (`https://api.github.com/repos/:owner/:repo`).

**Data flow:**
- `App.js` holds two `repoPath` states and two `useRepositoryData` hook instances, and passes a `handleSearch` callback to `<RepositorySearch>`
- `RepositorySearch` component manages its own local input state and only calls `onSearch` when both fields are filled
- `useRepositoryData` hook (`src/hooks/`) manages `data`/`loading`/`error` state for a single repo fetch, exposing a `getData(path)` function
- `fetchGitHubRepo` utility (`src/utils/`) calls the GitHub API and explicitly handles 404 (not found) and 403 (rate limit) errors

**Current state:** Fetching works, but `App.js` does not yet render `data`, `loading`, or `error` — the comparison display UI has not been built. The planned display fields are `forks_count`, `open_issues_count`, and `stargazers_count` (noted in comments in `Inputs.jsx`).

**Key constraints:**
- No routing (no React Router)
- No state management library — plain `useState`
- Plain `.css` files (no CSS modules or styled-components)
- `App.test.js` is stale CRA boilerplate and will fail as-is
