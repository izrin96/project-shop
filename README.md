# Sophic React + dotnet tech stack

This project is still under development. Please do not use yet.

## List of tech

- Database: Postgres
- Backend:
  - dotnet
  - Nextjs
- Database ORM:
  - Entity Framework (dotnet)
  - Prisma (Nextjs)
- Frontend: React (Nextjs)
- API communication:
  - REST
  - tRPC
  - Graphql
- Data fetching:
  - React Query + fetch
  - SWR + fetch
- Component UI:
  - Mantine UI
  - Chakra UI (can consider)
  - Ant Design (can consider)
  - Geistui (optional)
- Tailwind UI:
  - Preline
  - @shadcn/ui + Radix UI
- Deployment environment: Docker
- Authentication method: http-only cookie (Auth.js)
- Object storage: Minio
- Package manager: pnpm
- Other:
  - TailwindCSS
  - turborepo (caching/bundling system)

## Setup

Copy `.env.example` file to `.env` and update the variables.

```bash
cp .env.example .env
```

Install dependency using pnpm. 

```bash
pnpm install
```

To start development server for both Nextjs and dotnet project together:

```bash
pnpm dev
# or
pnpm dotenv -- turbo run dev --parallel
# or
pnpm dotenv -- pnpm --parallel dev
```

To start development server only on Nextjs project:

```bash
# we include dotenv to load .env file when starting nextapp development server
pnpm dotenv -- turbo run dev --filter nextapp
# or
pnpm dotenv -- pnpm --filter nextapp dev
```

To generate openapi types and its react query hook for making request to dotnet api, enter command below. Please make sure you run the apps first (`pnpm dev`) and run command below in separate terminal.

```bash
pnpm --filter nextapp openapi:gen
```

## Docker deployment

Install docker desktop or just docker engine.

Create a network manually:

```bash
docker network create app_network
```

Create and start the container. `-d` option is to start the container in detach mode. `--build` option is to build the image before creating the container. By default docker compose will read `.env` file.

```bash
docker compose up --build -d
```

You can specify another .env file by using `--env-file` flag:

```bash
docker compose --env-file .env.production.local up --build -d
```

List all the running compose project:

```bash
docker compose ls
```

## Roadmap

- [x] docker-compose
- [x] dotnet install graphql server
- [x] ui: dark mode
- [x] ui: font family
- [x] ui: login page
- [ ] ui: 404 page
- [ ] ui: access denied page
- [x] ui: admin dashboard layout (will improve)
- [x] ui: stats widget
- [ ] ui: table using react-table
- [x] ui: chart sample (will add more)
- [ ] ui: animate component using framer motion
- [ ] ui: form validation using react-hook-form, yup/zod
- [ ] ui: responsiveness
- [x] simple auth provider to get current user
- [x] ui: install storybook
- [x] dotnet api identity
- [x] dotnet auth controller
- [x] sample: upload file to object storage
- [ ] sample: realtime subscription using Graphql
- [x] react file-based routing react router
- [x] security: prevent CSRF attack by providing CSRF/XSRF token upon request (reference: https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery)
- [x] security: prevent XSS attack by using http-only cookie
- [x] pnpm workspace
- [x] openapi codegen
- [x] nextjs setup, prisma, trpc
