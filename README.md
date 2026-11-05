# KINDORA

KINDORA is a social development events platform. People discover cleanups,
plantations, donation drives and other community events, join them with one
click, and host events of their own.

## Features

- Public home page with a banner, features, the six soonest upcoming events,
  a photo gallery and a newsletter section
- Upcoming Events page: future events only, with server-side search by title
  and filters by type and location
- Event details page with a Join button (login required, no double joins)
- Create, update and delete your own events, with validation on every form
- Joined Events page sorted by event date
- Profile page to update your name and photo
- Email and password sign-up and login, plus Google and GitHub sign-in
- Light and dark theme (dark by default), fully responsive layout
- Loading skeletons, 404 and error pages, toast messages for every action

## Tech stack

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS v4 and shadcn/ui (Base UI)
- Better Auth with the MongoDB adapter and the JWT plugin
- API: [kindora-server](https://github.com/encodeshohan/kindora-server) (Express 5 and MongoDB)

## Getting started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Start the API server (see the kindora-server README).
4. Start the app: `npm run dev` and open http://localhost:3000

## Environment variables

| Name | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string (same cluster as the API) |
| `DB_NAME` | Database name (defaults to `kindora`). Must match the API's `DB_NAME`. Use a different name for production |
| `BETTER_AUTH_SECRET` | Long random secret used by Better Auth |
| `BETTER_AUTH_URL` | Public URL of this app (no trailing slash). Must match `CLIENT_URL` on the API |
| `NEXT_PUBLIC_API_URL` | Public URL of the API server (no trailing slash) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials (optional) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials (optional) |

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint
- `npx tsc --noEmit` type-checks the project

## How authentication works

Better Auth signs users in and issues a short-lived JWT. The client sends it
as `Authorization: Bearer <token>`, and the API verifies it against this app's
public keys at `/api/auth/jwks`. Private pages are protected by `src/proxy.ts`
and by a second session check inside each page, so reloading a private page
keeps you signed in.

## Notes

- In development, the browser console may show a React 19 warning about a
  script tag from `next-themes`. It is a known upstream issue, only appears in
  development, and does not affect the theme or production builds.
- Event dates are compared using Bangladesh time (Asia/Dhaka). An event
  happening today still counts as upcoming.