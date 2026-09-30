# MEDCAM

MEDCAM est une application de recherche et de commande de médicaments auprès de pharmacies. Le dépôt contient une interface React et une API Laravel. Le paiement est **simulé** : aucun débit réel n'est effectué.

## Fonctionnalités

- Recherche de médicaments, filtrage par catégorie et consultation des pharmacies disposant de stock.
- Inscription et connexion des clients avec jetons Laravel Sanctum.
- Panier, commande, paiement simulé et suivi des commandes.
- Espace pharmacien pour consulter les commandes et gérer les stocks.

L'inscription publique crée uniquement des comptes clients. Les comptes pharmaciens sont associés à une pharmacie par les données de démonstration ou par une gestion administrative.

## Organisation du dépôt

| Dossier | Rôle | Technologies |
| --- | --- | --- |
| `frontend/medcam` | Application web | React 19, Vite 8, Redux Toolkit, Tailwind CSS 3 |
| `backend/MEDCAM` | API, base de données et page Laravel | PHP 8.3, Laravel 13, Sanctum, Tailwind CSS 4 |
| `docs` | Cahier des charges, diagrammes et maquettes | Markdown et images |

## Prérequis

- PHP 8.3 ou plus récent, Composer et les extensions PHP requises par Laravel et le pilote de base de données choisi.
- Node.js 20 ou plus récent et npm.
- PostgreSQL pour la configuration fournie dans `backend/MEDCAM/.env.example`. SQLite peut aussi être utilisé pour un environnement local.

## Installation locale

Depuis la racine du dépôt :

```bash
cd backend/MEDCAM
composer install
cp .env.example .env
php artisan key:generate
```

La configuration d'exemple utilise PostgreSQL (`DB_DATABASE=medcam`). Créez cette base et renseignez `DB_HOST`, `DB_PORT`, `DB_USERNAME` et `DB_PASSWORD` dans `.env`. Pour utiliser SQLite localement, créez `database/database.sqlite`, puis définissez `DB_CONNECTION=sqlite` et `DB_DATABASE` avec le chemin absolu du fichier dans `.env`.

Initialisez ensuite la base :

```bash
php artisan migrate --seed
php artisan serve
```

L'API est alors accessible sous `http://localhost:8000/api`. Les seeders ajoutent des comptes, pharmacies, médicaments, stocks et commandes de démonstration. Ces données et leurs mots de passe sont destinés au développement local.

Dans un autre terminal, démarrez l'interface :

```bash
cd frontend/medcam
npm ci
npm run dev
```

Ouvrez `http://localhost:5173`. L'interface utilise `http://localhost:8000/api` par défaut. Si l'API écoute ailleurs, créez `frontend/medcam/.env.local` avec `VITE_API_URL=http://votre-hote:port/api`, puis redémarrez Vite. Pour un autre hôte ou port côté interface, adaptez aussi les origines autorisées dans `backend/MEDCAM/config/cors.php`.

La page Laravel à la racine du backend utilise également Vite. Pour ses assets, exécutez `npm ci` puis `npm run dev` dans `backend/MEDCAM` depuis un terminal supplémentaire.

## Vérifications

```bash
cd backend/MEDCAM
php artisan test --compact
npm ci
npm run build

cd ../../frontend/medcam
npm ci
npm run lint
npm run build
```

Les tests Laravel utilisent SQLite en mémoire, sans toucher à la base configurée pour le développement. Le backend et le frontend possèdent chacun leur propre `package.json` et leurs propres dépendances npm.

## Repères API

| Parcours | Routes principales |
| --- | --- |
| Catalogue public | `GET /api/medicaments`, `/api/medicaments/search`, `/api/categories`, `/api/pharmacies` |
| Compte | `POST /api/auth/register`, `/api/auth/login`; `GET /api/auth/me` avec jeton |
| Commandes client | `GET/POST /api/orders`, `GET /api/orders/{id}`, `POST /api/orders/{id}/pay` |
| Espace pharmacien | `GET /api/pharmacist/orders`, `GET/POST /api/pharmacist/stock` |

Les routes privées attendent `Authorization: Bearer <token>`. La liste complète est disponible avec `php artisan route:list --path=api` dans `backend/MEDCAM`.

## État du projet

Le paiement est une simulation et la gestion des ordonnances n'est pas finalisée. N'utilisez pas les comptes de démonstration ni les réglages `.env.example` tels quels en production.

Pour contribuer, consultez [CONTRIBUTING.md](CONTRIBUTING.md). Les documents de conception se trouvent dans [docs](docs/).
