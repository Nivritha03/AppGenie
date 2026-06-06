<div align="center">

# 🧞 AppGenie — AI Application Generator

**Generate full-stack, production-ready applications from a single natural language prompt.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-4caf96?logo=postgresql)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

**🌐 Live Demo:** `https://appgenie-zeta.vercel.app/`

</div>

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [End-to-End Platform Status](#end-to-end-platform-status)
3. [Key Features](#key-features)
4. [Tech Stack](#tech-stack)
5. [Database Schema](#database-schema)
6. [API Reference](#api-reference)
7. [Local Development Setup](#local-development-setup)
8. [AI Generation Pipeline](#ai-generation-pipeline)

---

## Overview

AppGenie is a **full-stack AI application generator** that turns natural language prompts into fully operational CRUD applications. It is architected around a **JSON Schema Engine** that interprets AI-generated configurations to render dynamic forms, data tables, dashboards, and automated workflows in real-time.

---

## End-to-End Platform Status

AppGenie is a complete, production-grade platform meeting all core requirements and several advanced bonus features.

### 🏗️ Core Architecture (100% Complete)
- [x] **Frontend Rendering Engine**: Metadata-driven UI that renders dynamic forms, tables, and dashboards.
- [x] **Backend Runtime**: Robust Next.js 16 API layer handling logic, validation, and AI synthesis.
- [x] **Database Architecture**: Relational PostgreSQL schema managed by Prisma ORM and hosted on Neon.
- [x] **Authentication**: Secure Multi-provider auth via NextAuth.js (Google + Local Credentials).
- [x] **Deployment**: Fully optimized for Vercel with automated CI/CD and production-ready environment.

### 🌟 Bonus Features (4 Implemented)
- [x] **CSV Import**: Bulk data processing using PapaParse for instant record creation.
- [x] **In-App Notifications**: Real-time user feedback system for all system actions.
- [x] **Workflow Automation**: Built-in trigger/action engine (e.g., auto-notifications on record creation).
- [x] **Mobile/PWA Support**: Offline-capable Progressive Web App with service worker and manifest.

---

## Key Features

### 🤖 AI-Powered Synthesis
- **Architect Mode**: Describe your app (e.g., "Student CRM") and watch Gemini AI generate a complete relational schema.
- **Zod Guardrails**: 100% type-safe. Every AI output is validated against strict Zod schemas before reaching the client.
- **Live Preview**: An interactive "JSON Stream" view allows you to audit and edit the architecture before deployment.

### 🎨 Premium "Vibe Coder" UI
- **Emerald Dark Aesthetic**: A high-end, futuristic dark mode featuring glassmorphism, glowing accents, and smooth transitions.
- **Dynamic Dashboards**: Auto-generated widgets that visualize your data immediately after app creation.
- **Optimized Layouts**: Focused, information-dense sidebars and headers for better data management.

### 🔄 Dynamic CRUD & Workflows
- **Dynamic Forms**: Supports text, email, number, date, textarea, select, and boolean field types.
- **Real-time Tables**: Filterable, sortable, and searchable tables for exploring your data.
- **Workflow Engine**: Server-side logic that can trigger actions (emails, webhooks, notifications) when data changes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4 (Custom Motion Utilities) |
| **Database** | PostgreSQL on Neon |
| **ORM** | Prisma v5 (Type-safe client) |
| **Authentication** | NextAuth.js v4 (Google OAuth + Credentials) |
| **AI Provider** | Google Gemini (Gemini-2.5-flash) |
| **Animation** | Framer Motion (Staggered entrances + Page transitions) |

---

## Database Schema

```prisma
model User {
  id       String  @id @default(cuid())
  apps     App[]
  notifications Notification[]
}

model App {
  id        String   @id @default(cuid())
  config    Json     // Relational configuration
  records   Record[]
  workflows Workflow[]
}

model Record {
  data       Json    // Dynamic record payload
  entityName String  // Scoped to generated entity
}

model Workflow {
  trigger    String  // RECORD_CREATED, etc.
  action     String  // SEND_NOTIFICATION, etc.
}
```

---

## Local Development Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AppGenie.git
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` with `DATABASE_URL` (Neon), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, and `GEMINI_API_KEY`.

3. **Database Push**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Launch**:
   ```bash
   npm run dev
   ```

---

<div align="center">
  Built with ❤️ for the Next Generation of App Builders.
</div>
