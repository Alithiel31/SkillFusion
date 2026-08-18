# SkillFusion — Client

Client web de SkillFusion, construit avec [SvelteKit](https://svelte.dev/docs/kit) et TypeScript.

## Prérequis

- Node.js et npm
- L'API SkillFusion doit être accessible (voir le `README.md` à la racine du dépôt pour lancer l'ensemble du projet avec Docker)

## Configuration

Copier `.env.example` en `.env` et renseigner l'URL de l'API :

```sh
cp .env.example .env
```

## Développement

```sh
npm install
npm run dev

# ou pour ouvrir automatiquement un onglet navigateur
npm run dev -- --open
```

## Build

```sh
npm run build
```

Prévisualiser le build de production avec `npm run preview`.

## Qualité

```sh
npm run lint        # vérification ESLint + Prettier
npm run lint:fix     # correction automatique
npm run check        # vérification des types (svelte-check)
npm run test          # tests unitaires (Vitest)
```
