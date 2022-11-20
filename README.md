<p align="center">
   <h3 align="center">NextAuth + Postgres + Prisma Example App</h3>
   <p align="center">
   Open Source. Full Stack App.
   </p>
</p>

## Overview

This template is intended to get a nextAuth + prisma + postgres app set up and running in minutes.

The stack used in this app template is as follows:

- Next.js
- NextAuth.js for Authentication
- Prisma ORM
- PostgreSQL as a database

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/RatulMaharaj/instavoice.git
cd instavoice
pnpm install
```

### 2. Configure your local environment

Note that you will need to set up a local or cloud based postgres instance.

Create a `.env` file with your database connection string as follows:

```sh
DATABASE_URL="postgresql://postgres@localhost:5432/instavoice?schema=public"
```

Create a `.env.local` file with the following variables:

```sh
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="supersecret"
```

### 3. Run prisma migrations

```sh
pnpm run migrate:dev
```

### 4. Start the app

```sh
pnpm run dev
```

You can then create an account by navigating to the `/signup` page.

## License

MIT
