# GRHB - Groupe de Recherches Historiques de Busnes

The official website for the Groupe de Recherches Historiques de Busnes (GRHB), built with Nuxt 4, Prisma, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **Runtime:** [Bun](https://bun.sh/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/) (Markdown support)
- **Authentication:** [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils)
- **Content:** [Nuxt Content v3](https://content.nuxt.com/)
- **Infrastructure:** [Docker](https://www.docker.com/) & [Traefik](https://traefik.io/) (Reverse Proxy + Auto SSL)
- **Testing:** [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

## 🛠 Installation

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A PostgreSQL instance (or use the provided Docker setup).

### Configuration

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grhb
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```

   **Important for deployment:**
   - `DOMAIN_NAME`: Your website domain (e.g., `grhb-busnes.fr`)
   - `TRAEFIK_ACME_EMAIL`: Email for Let's Encrypt SSL certificates.
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Credentials for the internal database.

4. Initialize the database (local development):
   ```bash
   bun x prisma migrate dev
   ```

## 💻 Development

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

Access the admin interface at `/admin` (requires the password configured in `ADMIN_PASSWORD`).

### Useful Scripts

- **Linting:** `bun run lint` (ESLint + Typecheck)
- **Fix linting:** `bun run lint:fix`
- **Image Cleanup:** `bun run cleanup` (removes unused images in `/public/uploads`)
- **Prisma Studio:** `bun x prisma studio` (GUI to explore the database)

## 🐳 Deployment (Docker & Traefik)

The project is designed to be self-hosted using Docker Compose and Traefik for automatic HTTPS management.

### Production Start

1. Ensure your `.env` file is correctly filled with production values.
2. Launch the stack:
   ```bash
   docker compose up -d --build
   ```

This will start:
- **Nuxt App:** The website (built with Bun, running with automatic Prisma migrations).
- **PostgreSQL:** Database with persistent storage.
- **Traefik:** Reverse proxy with automated Let's Encrypt SSL and dashboard.

### Dashboard Traefik
The dashboard is available at `https://dashboard.<DOMAIN_NAME>`.

### Persistence
The following data is persisted via Docker volumes:
- `db_data`: All database records.
- `uploads`: All images uploaded via the admin interface (mapped to `/app/public/uploads`).
- `traefik_certs`: SSL certificates.

## 🧪 Testing

### Unit & Component Tests (Vitest)
```bash
bun run test
```

### E2E Tests (Playwright)
```bash
bun run test:e2e
```

## 📄 License

This project is private. All rights reserved.
