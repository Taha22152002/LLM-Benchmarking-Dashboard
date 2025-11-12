## Overview

* Convert ad-hoc JS app into a structured React + Express project with clear boundaries, secure configuration, and basic operational tooling.

* Prioritize security (CORS, headers, rate limiting), environment-driven configuration, error handling, and developer experience (lint/format/tests/CI).

## Backend Hardening

* Replace hardcoded `PORT` with `process.env.PORT || 3000` and document in `.env.example`.

* Tighten CORS with explicit `origin` whitelist and allowed methods/headers.

* Add `helmet()` for security headers; tune CSP if needed.

* Introduce `express-rate-limit` for `/api/*` routes.

* Centralize error handling via a global error middleware with normalized JSON responses.

## Backend Structure

* Rename `server/models/server.js` to `server/index.js` (or `server/server.js`) and split concerns: `routes/`, `services/`, `middleware/`, `config/`.

* Extract external API client into `services/aiClient.js` and reuse across routes.

## Configuration & Secrets

* Add `.env.example` and ensure `.env` is git-ignored.

* Keep `ARTIFICIAL_ANALYSIS_API_KEY` server-side only; validate presence at startup with helpful error.

## Frontend Config & API Base

* Remove hardcoded `BASE_URL`; read `import.meta.env.VITE_API_BASE_URL` with a sane default.

* Add `public/.env.example` (or root) with `VITE_API_BASE_URL` and document usage.

## Frontend Structure & Build

* Fix Tailwind `content` globs to match `public/src/**/*.{js,jsx}`.

* Normalize entry (`index.html` + `/src/main.jsx`) to standard Vite structure.

## Security & Validation

* Add request validation (Zod/Joi) for endpoints that accept parameters; sanitize user inputs.

* Ensure no sensitive headers are logged; redact tokens in logs.

## Logging

* Introduce structured logging (`pino` or `winston`), per-request correlation IDs, and error logging in the middleware.

## Testing

* Add test frameworks: `vitest` for frontend, `jest` or `vitest` for backend.

* Create basic tests: route smoke tests, service client mocks, and a few component tests.

## Linting/Formatting & DX

* Add Prettier with consistent rules; integrate ESLint + Prettier.

* Add `husky` + `lint-staged` pre-commit hooks for lint/format/test on changed files.

<br />

## Documentation

* Update README with setup, env variables, scripts, and security notes.

## Migration Plan

* Implement changes incrementally: start with CORS/PORT/env and API base; add error middleware and logging; fix Tailwind/content paths; introduce tests; then add CI and optional Docker.

* Keep commits scoped and reversible to minimize disruption.

