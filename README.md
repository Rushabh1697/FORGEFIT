# ForgeFit - Production-Ready Fitness Tracking

ForgeFit is a modern, mobile-first fitness tracking application built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Secure login/signup with Supabase Auth (including Google Login support).
- **Workout Tracking**: Log muscle groups, exercises, sets, reps, and weight.
- **Weight Tracking**: Daily weight logs with trend visualization.
- **Analytics**: Progress graphs for workout frequency and muscle distribution using Recharts.
- **Responsive Design**: Clean, dark-themed UI optimized for both desktop and mobile.
- **Production Ready**: Server Actions for data mutations, TypeScript for type safety, and Shadcn UI for accessible components.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **Database/Auth**: Supabase
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### 1. Prerequisites
- Node.js 20+
- A Supabase account

### 2. Set up Supabase
- Create a new project in the [Supabase Dashboard](https://supabase.com).
- Run the SQL script found in `supabase/schema.sql` in the Supabase SQL Editor to create the necessary tables and RLS policies.
- Copy your Project URL and Anon Key.

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Project
```bash
npm run dev
```

## Folder Structure
- `src/app`: Routes and page layouts.
- `src/components`: UI components (Shadcn UI + Custom).
- `src/lib`: Supabase singleton, server actions, and utilities.
- `src/types`: TypeScript definitions.
- `supabase`: Database migration scripts.

## License
MIT
