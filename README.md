# 2jira — Jira Clone

Full-stack task management app: workspaces, projects, tasks (Kanban / Table / Calendar), analytics, members and invite links.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Hono** — API layer (`/api/*` route handlers)
- **Appwrite** — database, storage, auth (incl. GitHub/Google OAuth)
- **TanStack Query / Table**, **Tailwind CSS**, **shadcn/ui**, **@hello-pangea/dnd**, **recharts**

## Local Development

1. Copy the env template and fill in the values from your Appwrite console:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies and start the dev server:

   ```bash
   bun install
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

> `NEXT_PUBLIC_APP_URL` is optional — on the client the API base URL falls back to the current origin (`window.location.origin`).

## Deploy on Vercel

The app requires a Node.js runtime (API routes + server-only Appwrite key), so static hosts like GitHub Pages are not supported. Vercel works out of the box:

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new) import the repository — the Next.js framework is detected automatically.
3. Add environment variables (Project → Settings → Environment Variables) from `.env.example`, including the server secret `NEXT_APPWRITE_KEY`.
4. Deploy.
5. In the **Appwrite console** add the resulting domain (e.g. `https://2jira.vercel.app`) as a **Web platform** (Settings → Platforms) and as an allowed OAuth redirect origin, otherwise auth and image uploads will fail due to CORS.
6. (Optional) Set `NEXT_PUBLIC_APP_URL` to the final domain and redeploy.
