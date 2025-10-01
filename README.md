# API Adaction

## Aperçu
- Base de données: SQLite (fichier `database.db`)
- Framework HTTP: Express
- Requêtes SQL paramétrées (sécurisées)
- Structure en dossiers: `routes/`, `services/`, `db/`, `middlewares/`, `sql/`

## Prérequis
- Node.js 18+
- npm
- (Optionnel) CLI SQLite pour initialiser la base: `sqlite3`

## Installation
```bash
npm install
```

## Initialiser la base de données
Deux options:

1) Via la CLI SQLite (recommandé rapide)
```bash
sqlite3 database.db < sql/schema.sql
sqlite3 database.db < sql/seed.sql
```

2) Via un outil GUI (DB Browser for SQLite, TablePlus, etc.) en important les deux fichiers SQL dans l’ordre: `schema.sql` puis `seed.sql`.

## Lancer l’API
- Mode production:
```bash
npm start
```
- Mode dev (si vous avez installé nodemon):
```bash
npm run dev
```

Par défaut l’API écoute sur `http://localhost:3000`.

## Endpoints principaux
- Bénévoles
  - GET `/volunteer` → liste publique des bénévoles (sans email/password)
  - GET `/volunteer/point/:id` → points d’un bénévole
- Associations
  - GET `/association` → liste des associations
- Dons
  - POST `/donate` → effectue un don de points (body: `{ "volunteer_id": number, "association_id": number }`)
- Dashboard
  - GET `/dashboard/:date` → stats mensuelles (format `YYYY-MM`, ex: `2025-10`)

Exemples rapide (curl):
```bash
curl http://localhost:3000/association
curl http://localhost:3000/volunteer
curl http://localhost:3000/volunteer/point/1
curl http://localhost:3000/dashboard/2025-10
curl -X POST http://localhost:3000/donate \
  -H 'Content-Type: application/json' \
  -d '{"volunteer_id":1, "association_id":1}'
```
b
```
