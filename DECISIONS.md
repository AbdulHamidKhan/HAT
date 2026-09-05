# Architecture & Implementation Decisions

This document tracks every assumption and default choice made during the build of Haat, as required by the product specification.

## Phase 0 (Foundation)
*   **Repository Structure**: Monorepo using Turborepo (npm workspace). It allows easy sharing of types and configurations between the web frontend and API backend.
*   **Database**: PostgreSQL 16 with PostGIS. Using a standard `docker-compose.yml` with the official `postgis/postgis` Docker image.
*   **ORM**: Prisma. It offers excellent TypeScript support and schema management. We will use raw SQL queries via Prisma where PostGIS specific features (like spatial queries) are not natively supported by Prisma's standard API.
*   **Backend Framework**: NestJS. Chosen for its robust structure, Dependency Injection, and built-in support for cron jobs (needed for TCB/DAM scrapers and aggregation jobs), even though the prompt suggested NestJS or Hono. NestJS is more fully-featured out of the box for the complex requirements of this app.
*   **Frontend Framework**: Next.js App Router with Tailwind CSS, as explicitly specified.
