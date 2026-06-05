<div align="center">

# 🧞 AppGenie — AI Application Generator

**Generate full-stack, production-ready applications from a single natural language prompt.**

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-4caf96?logo=postgresql)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

**🌐 Live Demo:** `[Deployment Link — Coming Soon]`

</div>

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Core Architecture](#core-architecture)
3. [Feature Breakdown](#feature-breakdown)
4. [Tech Stack](#tech-stack)
5. [Database Schema](#database-schema)
6. [API Reference](#api-reference)
7. [Local Development Setup](#local-development-setup)
8. [Environment Variables](#environment-variables)
9. [Deployment Guide](#deployment-guide)
9. [Project Structure](#project-structure)
10. [AI Generation Pipeline](#ai-generation-pipeline)

---

## Overview

AppGenie is a **full-stack AI application generator** that turns natural language prompts into fully operational CRUD applications — complete with dynamic forms, data tables, a live dashboard, bulk data import, and secure user authentication — all in real-time.

It is architected around a **JSON Schema Engine** as its core. The AI layer (Google Gemini) acts as a co-pilot that automatically writes the JSON configuration you would otherwise write manually. The distinction is important:

> **The JSON engine is the product. AI is the interface.**

This means every generated app is deterministic, auditable, and can be fine-tuned by the user before generation — making it meaningfully different from a pure LLM wrapper.

### What it does end-to-end

```
User Prompt (Natural Language)
        ↓
  Gemini AI (gemini-2.5-flash)
        ↓
  Raw JSON Output
        ↓
  Zod Schema Validation (guardrails)
        ↓
  Validated AppConfig JSON
        ↓
  JSON Editor (user can review & modify)
        ↓
  "Generate Application" →  POST /api/apps
        ↓
  Prisma ORM → Neon PostgreSQL
        ↓
  Dynamic App Page (/app/[id])
    ├── Dynamic Form (create records)
    ├── Dynamic Table (read/delete records)
    ├── Dashboard Widgets (stats)
    └── CSV Bulk Import
```

---

## Core Architecture

```
Next.js 15 (Frontend + API Routes)
        │
        ├── /app/*                    → Page routing (App Router)
        ├── /api/auth/*               → NextAuth.js sessions
        ├── /api/apps/*               → CRUD for generated applications
        ├── /api/apps/[id]/records/*  → CRUD for application data records
        └── /api/generate             → Gemini AI JSON generation endpoint
        │
Prisma ORM (type-safe DB client)
        │
Neon PostgreSQL (serverless cloud database)
```

All data access is user-scoped. Every API route verifies `session.user.id === app.userId` before returning or mutating data.

---

## Feature Breakdown

### 🤖 AI-Powered Schema Generation
- **Prompt Interface**: A dedicated textarea on the Builder page allows natural language input.
- **Quick Examples**: Pre-filled prompt badges (*Student CRM*, *Inventory Management*, *HR Portal*, *Library App*) allow instant one-click testing.
- **Gemini Integration**: Uses Google Gemini (`gemini-2.5-flash`) with `responseMimeType: "application/json"` for strict structured outputs.
- **Zod Guardrails**: The raw AI response is immediately validated against `AppConfigSchema` using Zod's `safeParse`. Invalid outputs are rejected with a clear error — the frontend **never receives malformed data**.
- **Editable Schema**: The generated JSON is inserted into an editable code textarea. Users can modify any field before generating the final app.

### 🔐 Authentication (Google OAuth)
- Powered by **NextAuth.js v4** with Google OAuth 2.0 provider.
- Uses `@next-auth/prisma-adapter` to persist sessions, accounts, and users directly into PostgreSQL.
- The homepage dynamically renders a **Login** state or an authenticated **Profile Pill** (Google Avatar + Name + "Online" badge) using `getServerSession`.
- **Sign Out** is available on every authenticated page (Homepage, Dashboard, Builder, App Details sidebar).

### 📱 Application Dashboard
- Lists all AI-generated applications owned by the logged-in user.
- Live **search** filtering by name.
- Each application card shows name, version, and last-updated timestamp.
- "Create New App" CTA routes directly to the Builder.
- Empty state provides guided onboarding.

### 🏗️ Dynamic App Engine (`/app/[id]`)
Each generated application is a fully functional standalone CRUD app:

| Feature | Implementation |
|---|---|
| **Dynamic Forms** | `react-hook-form` renders inputs based on field schemas. Supports `text`, `email`, `number`, `date`, `textarea`, `select`, and `boolean` field types. |
| **Dynamic Tables** | Custom `TableRenderer` renders columns based on entity field definitions. Shows boolean values as styled badges. |
| **Create Record** | Form submission → `POST /api/apps/[id]/records` → Prisma → Neon |
| **Delete Record** | Row action button → `DELETE /api/apps/[id]/records/[recordId]` → Prisma |
| **Entity Switcher** | Left sidebar lists all entities in the schema. Clicking switches the active form and table. |
| **Dashboard Widgets** | Stat and chart widgets defined in the schema render live record counts. Shows "No data yet" when empty. |
| **CSV Bulk Import** | PapaParse parses uploaded `.csv` headers → maps each row to a POST request → shows total import count in a toast. |

### 📊 Dashboard Widgets
- Widgets are defined inside the app's JSON config under `widgets: []`.
- Each widget displays the record count for its associated entity.
- Color-coded (emerald, teal, purple, amber) with animated card entrance.
- Progress bars animate based on relative data volume.
- Empty state: Shows "No data yet" with an icon when no records exist.

### 📥 CSV Import (PapaParse)
- Available on every generated app page.
- Click the **CSV Import** button, select a file.
- PapaParse reads headers and maps columns to records.
- Each non-empty row is sent as a separate `POST` to the records API.
- Success toast shows `"Imported X records successfully!"`.

### 🔔 In-App Notifications
- Toast notifications fire for all create, update, delete, and import actions.
- Success: Emerald-themed slide-in from top-right.
- Error: Red-themed with an alert icon.
- Auto-dismiss after 5 seconds with a manual close button.

### 📲 Progressive Web App (PWA)
- Configured via `next-pwa` in `next.config.ts`.
- `public/manifest.json` defines app name, icons, theme color, and `"display": "standalone"`.
- Service Worker is registered automatically in **production** (disabled in development to prevent cache conflicts).
- Supports **Add to Home Screen** on mobile devices.

### 🔄 Workflow Automation
- `Workflow` model in Prisma schema stores trigger/action pairs per app.
- `executeWorkflows` is called automatically on record creation events.
- Foundation for building automation rules on top of generated apps.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework |
| **Language** | TypeScript 5 | Type safety across frontend and backend |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with custom animations |
| **UI Components** | Lucide React | Icon library |
| **Forms** | React Hook Form | Performant, uncontrolled form management |
| **Validation** | Zod | Runtime schema validation (API + AI guardrails) |
| **State Management** | Zustand | Lightweight global client state |
| **Server Queries** | TanStack Query v5 | Async data fetching and caching |
| **Authentication** | NextAuth.js v4 | Google OAuth 2.0, session management |
| **Database** | PostgreSQL on Neon | Serverless cloud PostgreSQL |
| **ORM** | Prisma v5 | Type-safe database client and migrations |
| **AI Provider** | Google Gemini (`@google/generative-ai`) | Natural language → structured JSON |
| **CSV Processing** | PapaParse | Client-side CSV parsing |
| **Animations** | Custom CSS Keyframes + Tailwind | Premium Vibe Coder motion design |
| **PWA** | next-pwa | Service Worker, manifest, offline support |
| **Deployment** | Vercel | Hosting for Next.js apps |
| **DB Hosting** | Neon | Serverless PostgreSQL with connection pooling |

---

## Database Schema

```prisma
model User {
  id       String  @id @default(cuid())
  name     String?
  email    String? @unique
  image    String?
  accounts Account[]
  sessions Session[]
  apps     App[]
  notifications Notification[]
}

model App {
  id        String   @id @default(cuid())
  name      String
  config    Json      // Full AppConfig JSON schema
  userId    String    // FK → User (user isolation)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  records   Record[]
  workflows Workflow[]
}

model Record {
  id         String   @id @default(cuid())
  appId      String    // FK → App
  entityName String    // Which entity this row belongs to
  data       Json      // Dynamic record payload
  createdAt  DateTime @default(now())
}

model Workflow {
  id      String @id @default(cuid())
  trigger String  // e.g. "RECORD_CREATED"
  action  String  // e.g. "SEND_EMAIL"
  appId   String
}

model Notification {
  id        String   @id @default(cuid())
  message   String
  userId    String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

### App Config JSON Structure

Every generated application is stored as this JSON shape in the `config` column:

```json
{
  "name": "Student CRM",
  "entities": [
    {
      "name": "Student",
      "fields": [
        { "name": "fullName", "type": "text", "required": true },
        { "name": "email", "type": "email", "required": true },
        { "name": "age", "type": "number" },
        { "name": "enrollmentDate", "type": "date" },
        { "name": "status", "type": "select", "options": ["Active", "Inactive", "Graduated"] }
      ]
    }
  ],
  "widgets": [
    { "type": "stats", "title": "Total Students", "entity": "Student" }
  ]
}
```

Supported field types: `text` · `email` · `number` · `date` · `textarea` · `select` · `boolean`

---

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth/session` | Get current session |
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth handler (Google OAuth) |

### Applications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/apps` | List all apps for logged-in user |
| `POST` | `/api/apps` | Create new app from JSON config |
| `GET` | `/api/apps/[appId]` | Get single app details |
| `DELETE` | `/api/apps/[appId]` | Delete an app |

### Records (Dynamic CRUD)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/apps/[appId]/records` | List all records (filterable by `?entity=`) |
| `POST` | `/api/apps/[appId]/records` | Create a new record |
| `PUT` | `/api/apps/[appId]/records/[recordId]` | Update a record |
| `DELETE` | `/api/apps/[appId]/records/[recordId]` | Delete a record |

### AI Generation

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate` | Generate app JSON from a text prompt |

**Request body:**
```json
{ "prompt": "Create a Student CRM with attendance tracking" }
```

**Success response:**
```json
{
  "name": "Student CRM",
  "entities": [...],
  "widgets": [...]
}
```

**Error responses:**
```json
{ "error": "GEMINI_API_KEY is missing from environment variables." }
{ "error": "Invalid schema generated by AI." }
{ "error": "Unauthorized" }
```

---

## Local Development Setup

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A **Neon** account (free tier works fine): [neon.tech](https://neon.tech)
- A **Google Cloud** project with OAuth 2.0 credentials
- A **Google AI Studio** API key: [aistudio.google.com](https://aistudio.google.com)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AppGenie.git
cd AppGenie
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure environment variables

Create a `.env` file in the project root:

```env
# PostgreSQL — Neon connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"

# Google OAuth — from Google Cloud Console
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-secret"

# NextAuth — generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini AI — from Google AI Studio
GEMINI_API_KEY="your-gemini-api-key"
```

#### Getting your credentials

**Neon Database URL:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project → copy the connection string from the dashboard

**Google OAuth Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

**Gemini API Key:**
1. Visit [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create API key** (free tier available)

---

### Step 4 — Run Prisma migrations

```bash
npx prisma generate
npx prisma db push
```

This creates all required tables (`User`, `Account`, `Session`, `App`, `Record`, `Workflow`, `Notification`) on your Neon database.

To visually inspect your database:

```bash
npx prisma studio
```

### Step 5 — Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** PWA service workers are disabled in development mode automatically. They will activate on your production Vercel deployment.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string |
| `GOOGLE_CLIENT_ID` | ✅ Yes | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ Yes | Google OAuth Client Secret |
| `NEXTAUTH_SECRET` | ✅ Yes | Random string for session encryption |
| `NEXTAUTH_URL` | ✅ Yes | Base URL (`http://localhost:3000` locally, your Vercel URL in prod) |
| `GEMINI_API_KEY` | ✅ Yes | Google AI Studio API key for prompt generation |

---

## Deployment Guide

### Deploy to Vercel (Recommended)

1. Push your code to a **GitHub repository**
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. In the **Environment Variables** section, add all 6 variables from the table above
   - Set `NEXTAUTH_URL` to your Vercel deployment URL (e.g. `https://appgenie.vercel.app`)
4. Click **Deploy**

5. **Update Google OAuth Redirect URI:**
   - Go to Google Cloud Console → Your OAuth Client
   - Add `https://YOUR_VERCEL_URL/api/auth/callback/google` to Authorized redirect URIs

6. **Run Prisma migration on production:**
   - In Vercel project settings, go to **Deployments** → open the deployment terminal
   - Or add to your build command: `prisma generate && prisma db push && next build`

### Production Checklist

- [ ] All 6 environment variables set on Vercel
- [ ] `NEXTAUTH_URL` points to your Vercel domain
- [ ] Google OAuth redirect URI updated to Vercel domain
- [ ] Neon database is accessible (check connection string)
- [ ] Prisma migrations applied (`prisma db push`)

---

## Project Structure

```
AppGenie/
├── prisma/
│   └── schema.prisma            → Database models
├── public/
│   ├── manifest.json            → PWA manifest
│   └── icons/                   → PWA icons
├── src/
│   ├── app/
│   │   ├── layout.tsx           → Root layout + providers
│   │   ├── page.tsx             → Homepage (server component)
│   │   ├── globals.css          → Global styles + animations
│   │   ├── login/
│   │   │   └── page.tsx         → Google OAuth sign-in page
│   │   ├── dashboard/
│   │   │   └── page.tsx         → App listing dashboard
│   │   ├── builder/
│   │   │   └── page.tsx         → AI prompt + JSON editor + generation
│   │   ├── app/
│   │   │   └── [id]/
│   │   │       └── page.tsx     → Dynamic generated app view
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/route.ts   → Auth handler
│   │       ├── apps/
│   │       │   ├── route.ts                 → GET/POST apps
│   │       │   └── [appId]/
│   │       │       ├── route.ts             → GET/DELETE app
│   │       │       └── records/
│   │       │           ├── route.ts         → GET/POST records
│   │       │           └── [recordId]/route.ts → PUT/DELETE record
│   │       ├── generate/
│   │       │   └── route.ts     → Gemini AI generation endpoint
│   │       └── notifications/
│   │           └── route.ts     → Notification API
│   ├── components/
│   │   ├── Providers.tsx        → NextAuth + TanStack Query providers
│   │   ├── SignOutButton.tsx    → Reusable client-side logout button
│   │   └── dynamic/
│   │       ├── FormRenderer.tsx     → Dynamic form based on entity schema
│   │       ├── FieldRenderer.tsx    → Individual field type renderers
│   │       ├── TableRenderer.tsx    → Dynamic data table
│   │       ├── DashboardRenderer.tsx → Widget stats dashboard
│   │       └── ErrorBoundary.tsx    → React error boundary
│   ├── lib/
│   │   ├── auth.ts              → NextAuth config + Prisma adapter
│   │   ├── prisma.ts            → Prisma client singleton
│   │   ├── validator.ts         → Zod schemas (AppConfig, Entity, Field)
│   │   └── workflows.ts         → Workflow execution engine
│   └── types/
│       └── index.ts             → Shared TypeScript interfaces
└── next.config.ts               → Next.js + PWA configuration
```

---

## AI Generation Pipeline

```
1. User types a prompt into the Builder textarea
         ↓
2. POST /api/generate { prompt }
         ↓
3. Server checks:
   - Session authentication (NextAuth)
   - GEMINI_API_KEY presence
         ↓
4. GoogleGenerativeAI client sends prompt to gemini-2.5-flash
   with system instructions enforcing the AppConfig JSON structure
   and responseMimeType: "application/json"
         ↓
5. Raw response text is parsed: JSON.parse(aiText)
         ↓
6. AppConfigSchema.safeParse(parsed) [ZOD GUARDRAIL]
   ├── PASS → return validated JSON to client (200)
   └── FAIL → return { error: "Invalid schema generated by AI." } (400)
         ↓
7. Client receives JSON → populates the JSON editor textarea
         ↓
8. User reviews / modifies the JSON
         ↓
9. User clicks "Generate Application"
         ↓
10. POST /api/apps { name, config }
          ↓
11. Prisma creates App record in Neon PostgreSQL
          ↓
12. Router.push(`/app/${app.id}`) → Dynamic app view renders
```


---

<div align="center">
  Built with ❤️ using Next.js, Gemini AI, and Neon PostgreSQL
</div>
