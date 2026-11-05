# 🤝 KINDORA — Social Development Events Platform

Small acts, lasting change.

KINDORA is a social development events platform. People discover cleanups, plantations, donation drives and other community events, join them with one click, and host events of their own.

🌐 **Live Demo:** [KINDORA](https://kindora-encodeshohan.vercel.app/)
📦 **Frontend Repository:** [encodeshohan/kindora](https://github.com/encodeshohan/kindora)
🖥️ **Backend Repository:** [encodeshohan/kindora-server](https://github.com/encodeshohan/kindora-server)

---

## 🌐 Project Overview

**KINDORA** is a full-stack web application that brings neighbours together around community causes.

Events are organised by type:

- Cleanup
- Plantation
- Donation
- Education
- Health Camp
- Awareness
- Food Drive

Visitors can browse upcoming events without an account. After signing in, they can join events, track everything they have joined, and create and manage their own events.

This repository is the **frontend**. It talks to the [kindora-server](https://github.com/encodeshohan/kindora-server) API for all event and join data.

---

## 🛠️ Technologies Used

### Frontend

- ⚛️ **Next.js 16** — App Router, Cache Components, Suspense streaming
- ⚛️ **React 19** — Component-based user interface, with the React Compiler
- 🔷 **TypeScript** — Type safety and maintainable code
- 🎨 **Tailwind CSS 4** — Responsive styling and layouts
- 🧱 **shadcn/ui (Base UI)** — Accessible UI components
- 🔤 **Plus Jakarta Sans** — Typography using `next/font`

### Libraries

- 🔐 **Better Auth** — Authentication, sessions and JWT issuing
- 🍃 **MongoDB** — Stores authentication data (users and sessions)
- 🔔 **sonner** — Success, info and error notifications
- 🌙 **next-themes** — Light and dark theme
- 🎯 **lucide-react** — Icons

### Data

- 🌐 **KINDORA API** — Event and join data from [kindora-server](https://github.com/encodeshohan/kindora-server) (Express 5 and MongoDB)

---

## ✨ Features

### 1. 🔎 Discover Upcoming Events

- Home page shows the six soonest upcoming events
- Upcoming Events page lists future events only
- Server-side search by title
- Filter by event type and by location
- Clear empty states when nothing matches

### 2. ✅ Join Events in One Click

- Event details page with date, location, type and host
- Join button requires login and prevents double joins
- Live count of how many people have joined each event
- Leave an event at any time from the details page or your list

### 3. 📅 Joined Events

- All joined events in one place, sorted by event date
- Split into **Upcoming** and **Past events** sections
- Leave button on upcoming events only

### 4. 🛠️ Host and Manage Your Own Events

- Create events with title, type, date, location, thumbnail and description
- Host name and email are shown on the form, taken from your account
- Manage Events page with a table on desktop and cards on mobile
- Edit events in a dialog and delete them with a confirmation step
- Joined users see updated details automatically

### 5. 🔐 Authentication and Social Login

- Register with name, email, photo URL and password
- Live password rules while typing
- Log in with email and password
- Continue with Google or GitHub
- Private pages are protected by `proxy.ts` and a second session check inside each page
- Users return to the page they originally wanted after logging in

### 6. 👤 Profile Management

- View your name, email and photo
- Update your name and photo with a live avatar preview
- Discard unsaved changes in one click

### 7. 📱 Responsive Design and User Experience

- Dark theme by default with a light theme toggle
- Fully responsive layout for mobile, tablet and desktop
- Logo shows the KINDORA name on large screens, and the footer always shows it
- Loading skeletons, custom 404 and error pages
- Toast messages for every action
- Skip-to-content link and labelled form errors for accessibility

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts       # Better Auth API handler
│   ├── create-event/              # Create an event (protected)
│   ├── events/
│   │   ├── page.tsx               # Upcoming events with filters
│   │   └── [id]/page.tsx          # Event details
│   ├── joined-events/             # Events you joined (protected)
│   ├── manage-events/             # Events you host (protected)
│   ├── profile/                   # Update your profile (protected)
│   ├── login/
│   ├── register/
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                   # Home page
│
├── components/
│   ├── auth/                      # Login, register and social buttons
│   ├── events/                    # Cards, forms, dialogs, filters, skeletons
│   ├── home/                      # Banner, features, gallery, newsletter
│   ├── layout/                    # Navbar, footer, logo, auth menu
│   ├── profile/                   # Profile form and skeleton
│   ├── shared/                    # Notice and section heading
│   └── ui/                        # shadcn/ui components
│
├── lib/
│   ├── api.ts                     # Public API calls
│   ├── server-api.ts              # Authenticated server-side API calls
│   ├── auth.ts                    # Better Auth server configuration
│   ├── auth-client.ts             # Better Auth client
│   ├── validation.ts              # Shared form validation
│   ├── format.ts                  # Date helpers (Asia/Dhaka)
│   ├── constants.ts
│   └── types/event.ts
│
└── proxy.ts                       # Protects private routes
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22
- npm
- A MongoDB database, such as a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- The [kindora-server](https://github.com/encodeshohan/kindora-server) API running locally or deployed
- Google and/or GitHub OAuth credentials if you want social login

### 1. Clone the repository

```bash
git clone https://github.com/encodeshohan/kindora.git
cd kindora
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB (use the same cluster as the API)
MONGODB_URI=your_mongodb_connection_string
DB_NAME=kindora

# Better Auth
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

# API server (no trailing slash)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

| Name | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `DB_NAME` | Database name (defaults to `kindora`). Must match the API's `DB_NAME` |
| `BETTER_AUTH_SECRET` | Long random secret used by Better Auth |
| `BETTER_AUTH_URL` | Public URL of this app, no trailing slash. Must match `CLIENT_URL` on the API |
| `NEXT_PUBLIC_API_URL` | Public URL of the API server, no trailing slash |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials (optional) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials (optional) |

**Important:** never commit your `.env.local` file or expose your secrets publicly.

### 4. Configure OAuth callback URLs

For local development, register these callback URLs in your OAuth apps:

```
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

For production, replace `http://localhost:3000` with your deployed origin.

### 5. Start the API server

Follow the setup steps in the [kindora-server README](https://github.com/encodeshohan/kindora-server), then keep it running.

### 6. Run the development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

---

## 🔐 How Authentication Works

Better Auth signs users in and issues a short-lived JWT. The client sends it as `Authorization: Bearer <token>`, and the API verifies it against this app's public keys at `/api/auth/jwks`.

Private pages are protected by `src/proxy.ts` and by a second session check inside each page, so reloading a private page keeps you signed in.

---

## 🚀 Deployment

KINDORA is deployed on [Vercel](https://vercel.com/).

1. Push your code to GitHub.
2. Import the `kindora` repository into Vercel.
3. Add all environment variables in the project settings.
4. Set `BETTER_AUTH_URL` to your deployed origin, and set `NEXT_PUBLIC_API_URL` to your deployed API URL.
5. Register the production OAuth callback URLs in Google Cloud and GitHub.
6. Make sure `CLIENT_URL` on the API server matches `BETTER_AUTH_URL`.
7. Deploy and test login, joining, creating and managing events.

---

## 📝 Notes

- Event dates are compared using Bangladesh time (Asia/Dhaka). An event happening today still counts as upcoming.
- In development, the browser console may show a React 19 warning about a script tag from `next-themes`. It is a known upstream issue, only appears in development, and does not affect production builds.

---

## 📌 Future Improvements

- 🔔 Email reminders before events you joined
- 🗺️ Map view of events near you
- 💬 Comments and updates on each event
- 📷 Image upload instead of thumbnail URLs
- 🧾 Pagination for long event lists
- 🌐 Bangla language support

---

## 👨‍💻 Author

**MD. SHOHANUR RAHMAN SHOHAN**

GitHub: [@encodeshohan](https://github.com/encodeshohan)

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.