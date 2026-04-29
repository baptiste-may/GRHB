# GRHB - Groupe de Recherches Historiques de Busnes

Site web du Groupe de Recherches Historiques de Busnes (GRHB), construit avec Nuxt 4, Prisma et Tailwind CSS.

## 🚀 Stack Technique

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **Runtime:** [Bun](https://bun.sh/)
- **Base de données:** [PostgreSQL](https://www.postgresql.org/) avec [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Éditeur de texte:** [Tiptap](https://tiptap.dev/) (Markdown support)
- **Authentification:** [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils)
- **Contenu:** [Nuxt Content v3](https://content.nuxt.com/)
- **Tests:** [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

## 🛠 Installation

### Pré-requis

- [Bun](https://bun.sh/) installé sur votre machine.
- Une instance PostgreSQL (ou utilisez Docker).

### Configuration

1. Cloner le dépôt :
   ```bash
   git clone <repository-url>
   cd grhb
   ```

2. Installer les dépendances :
   ```bash
   bun install
   ```

3. Configurer les variables d'environnement :
   Copiez le fichier `.env.example` en `.env` et remplissez les valeurs :
   ```bash
   cp .env.example .env
   ```

4. Initialiser la base de données :
   ```bash
   bun prisma migrate dev
   ```

## 💻 Développement

Lancer le serveur de développement :
```bash
bun run dev
```

L'application sera disponible sur `http://localhost:3000`.

Accéder à l'interface d'administration : `/admin` (nécessite le mot de passe configuré dans `ADMIN_PASSWORD`).

### Scripts utiles

- **Linting:** `bun run lint` (ESLint + Typecheck)
- **Fix linting:** `bun run lint:fix`
- **Nettoyage des images:** `bun run cleanup` (supprime les images non utilisées dans `/public/uploads`)
- **Prisma Studio:** `bun x prisma studio` (interface pour explorer la BDD)

## 🧪 Tests

### Tests Unitaires & Composants (Vitest)
```bash
bun run test
```

### Tests E2E (Playwright)
```bash
bun run test:e2e
```

## 🐳 Docker

Le projet inclut des configurations Docker pour la production et le développement, utilisant Traefik comme reverse proxy.

### Production
```bash
docker-compose up -d
```

### Développement
```bash
docker-compose -f docker-compose.dev.yml up -d
```

## 📦 Production

Pour construire l'application manuellement :
```bash
bun run build
bun run preview
```

## 📄 Licence

Ce projet est privé. Tous droits réservés.
