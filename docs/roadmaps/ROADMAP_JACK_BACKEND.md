# 🗺️ ROADMAP BACKEND — JACK (Laravel PharmApp)

> **Tu es le seul sur le backend. Tout le monde dépend de toi.**
> Suis ce roadmap jour par jour. Sans l'API, le frontend ne peut pas avancer.

---

## 📌 PRIORITÉ ABSOLUE — Donnez ça à l'équipe frontend le Jour 1

Avant même de coder, crée ce fichier `backend/API_ENDPOINTS.md` et partage-le.
Le frontend en a besoin pour coder sans attendre l'API réelle.

---

## 📂 STRUCTURE DOSSIERS BACKEND

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/    ← Un controller par ressource
│   │   ├── Requests/           ← Validation des données
│   │   └── Middleware/         ← Auth, rôles
│   ├── Models/                 ← 12 modèles
│   └── Services/               ← Toute la logique métier
├── database/
│   └── migrations/             ← Structure BDD
└── routes/
    └── api.php                 ← Toutes les routes
```

---

## 🌿 BRANCHES GIT

```bash
# Une branche par fonctionnalité
feature/backend-auth
feature/backend-medicaments
feature/backend-orders
feature/backend-payments
feature/backend-notifications
feature/backend-pharmacien
feature/backend-admin
```

### Comment travailler

```bash
# Chaque matin
git checkout develop
git pull origin develop

# Créer ta branche de la journée
git checkout -b feature/backend-auth

# Coder...

# Committer régulièrement (toutes les heures)
git add .
git commit -m "feat(auth): ajout migration users + model"
git commit -m "feat(auth): ajout AuthController register et login"

# Pousser
git push -u origin feature/backend-auth

# Ouvrir PR vers develop sur GitHub
```

### Convention commits backend

```
feat(auth): description
feat(medicaments): description
feat(orders): description
feat(payments): description
feat(notifications): description
fix(auth): correction bug login
```

---

## 📋 BACKLOG COMPLET — JOUR PAR JOUR

---

### JOUR 1 — Setup + Authentification

#### Tâche 1.1 — Configuration initiale ✅ (déjà commencé)
- [ ] Déplacer `PHARMAPP/` → `backend/` dans le repo
- [ ] Configurer `.env` avec PostgreSQL
- [ ] Créer la base de données `pharmapp`
- [ ] Vérifier que `php artisan serve` fonctionne
- [ ] Commit : `chore(setup): configuration initiale Laravel + PostgreSQL`

#### Tâche 1.2 — Migration users
**Fichier :** `database/migrations/xxxx_create_users_table.php`

Colonnes à créer :
- `id` bigIncrements
- `name` string(100)
- `email` string(150) unique
- `password` string(255)
- `phone` string(20) nullable
- `role` string(20) default('client') — valeurs: client, pharmacien, admin
- `is_active` boolean default(true)
- `last_login` timestamp nullable
- `email_verified_at` timestamp nullable
- `deleted_at` timestamp nullable ← soft delete
- `created_at` / `updated_at` timestamps

```bash
php artisan make:migration create_users_table
php artisan migrate
git add . && git commit -m "feat(auth): migration table users avec soft delete"
```

#### Tâche 1.3 — Model User
**Fichier :** `app/Models/User.php`

Configurer :
- `$fillable` : name, email, password, phone, role, is_active
- `$hidden` : password, remember_token
- `SoftDeletes` trait
- `HasApiTokens` trait (Sanctum)
- Relations : `hasMany(Order)`, `hasMany(Notification)`, `hasMany(Review)`
- Méthodes : `isClient()`, `isPharmacien()`, `isAdmin()`

```bash
git add . && git commit -m "feat(auth): model User avec relations et méthodes de rôle"
```

#### Tâche 1.4 — Form Requests
**Fichiers :**
- `app/Http/Requests/Auth/RegisterRequest.php`
- `app/Http/Requests/Auth/LoginRequest.php`

**RegisterRequest — règles :**
- name: required, string, max:100
- email: required, email, unique:users
- password: required, min:8, confirmed
- phone: nullable, string, max:20
- role: required, in:client,pharmacien

**LoginRequest — règles :**
- email: required, email
- password: required

```bash
php artisan make:request Auth/RegisterRequest
php artisan make:request Auth/LoginRequest
git add . && git commit -m "feat(auth): form requests RegisterRequest et LoginRequest"
```

#### Tâche 1.5 — AuthService
**Fichier :** `app/Services/AuthService.php`

Méthodes :
- `register(array $data) : array` → crée user, retourne [user, token]
- `login(string $email, string $password) : array` → vérifie creds, retourne [user, token]
- `logout(User $user) : void` → révoque le token
- `me(User $user) : User` → retourne l'utilisateur

```bash
git add . && git commit -m "feat(auth): AuthService avec register, login, logout"
```

#### Tâche 1.6 — AuthController
**Fichier :** `app/Http/Controllers/Api/AuthController.php`

Méthodes :
- `register(RegisterRequest $request)` → appelle AuthService::register → retourne JSON {user, token}
- `login(LoginRequest $request)` → appelle AuthService::login → retourne JSON {user, token}
- `logout(Request $request)` → appelle AuthService::logout → retourne JSON {message}
- `me(Request $request)` → retourne l'utilisateur connecté

Format réponse JSON :
```json
{
  "success": true,
  "data": { "user": {...}, "token": "..." },
  "message": "Connexion réussie"
}
```

```bash
php artisan make:controller Api/AuthController
git add . && git commit -m "feat(auth): AuthController avec register, login, logout, me"
```

#### Tâche 1.7 — Routes Auth
**Fichier :** `routes/api.php`

```
POST /api/auth/register   → AuthController@register  (public)
POST /api/auth/login      → AuthController@login     (public)
POST /api/auth/logout     → AuthController@logout    (auth:sanctum)
GET  /api/auth/me         → AuthController@me        (auth:sanctum)
```

```bash
git add . && git commit -m "feat(auth): routes authentification configurées"
git push -u origin feature/backend-auth
# → Ouvrir PR vers develop
```

---

### JOUR 2 — Médicaments, Catégories, Pharmacies

#### Tâche 2.1 — Migrations (dans cet ordre)

**Migration 1 : categories**
- id, name string(100) not null, timestamps

**Migration 2 : medicaments**
- id, category_id (FK → categories, nullable), name string(200), active_substance string(200) nullable, description text nullable, dosage string(100) nullable, prescription_required boolean default(false), photo_url string(500) nullable, manufacturer string(200) nullable, deleted_at, timestamps

**Migration 3 : pharmacies**
- id, name string(200), license_number string(50) unique, address text, email string(150) nullable, phone string(20) nullable, latitude decimal(10,8), longitude decimal(11,8), opening_hours json nullable, is_open boolean default(true), rating decimal(3,2) default(0), timestamps

**Migration 4 : pharmacy_stocks**
- id, pharmacy_id (FK → pharmacies), medicament_id (FK → medicaments), quantity integer default(0), price decimal(10,2), is_available boolean default(true), min_stock_alert integer default(5), updated_at
- Contrainte : UNIQUE(pharmacy_id, medicament_id)

```bash
php artisan make:migration create_categories_table
php artisan make:migration create_medicaments_table
php artisan make:migration create_pharmacies_table
php artisan make:migration create_pharmacy_stocks_table
php artisan migrate
git add . && git commit -m "feat(medicaments): migrations categories, medicaments, pharmacies, stocks"
```

#### Tâche 2.2 — Models
- `Category` : `hasMany(Medicament)`
- `Medicament` : `belongsTo(Category)`, `belongsToMany(Pharmacy via pharmacy_stocks)`, `hasMany(OrderItem)`, SoftDeletes
- `Pharmacy` : `belongsToMany(Medicament via pharmacy_stocks)`, `hasMany(Order)`, `hasMany(Review)`
- `PharmacyStock` : `belongsTo(Pharmacy)`, `belongsTo(Medicament)`

```bash
git add . && git commit -m "feat(medicaments): models Category, Medicament, Pharmacy, PharmacyStock"
```

#### Tâche 2.3 — MedicamentService
**Fichier :** `app/Services/MedicamentService.php`

Méthodes :
- `search(string $query, array $filters) : LengthAwarePaginator`
  → Recherche LIKE dans name et active_substance
  → Filtre par category_id, prescription_required
  → Paginer à 20 par page

- `getById(int $id) : Medicament`
  → Retourne avec category eager loaded

- `getPharmaciesWithStock(int $medicamentId, float $lat, float $lng) : Collection`
  → Récupère toutes les pharmacies avec ce médicament en stock (quantity > 0, is_available = true)
  → Calcule la distance en km avec formule Haversine
  → Trie par distance croissante

**Formule Haversine (distance entre 2 points GPS) :**
```
distance = 6371 × acos(
  cos(radians(lat1)) × cos(radians(lat2)) ×
  cos(radians(lng2) - radians(lng1)) +
  sin(radians(lat1)) × sin(radians(lat2))
)
```

```bash
git add . && git commit -m "feat(medicaments): MedicamentService avec search et getPharmaciesWithStock"
```

#### Tâche 2.4 — MedicamentController
**Routes :**
```
GET /api/medicaments                           → index() (public)
GET /api/medicaments/search?q=terme            → search() (public)
GET /api/medicaments/{id}                      → show() (public)
GET /api/medicaments/{id}/pharmacies           → pharmacies() (public, ?latitude=&longitude=)
```

```bash
git add . && git commit -m "feat(medicaments): MedicamentController CRUD + search + pharmacies"
```

#### Tâche 2.5 — PharmacyController
**Routes :**
```
GET  /api/pharmacies              → index() (public)
GET  /api/pharmacies/{id}         → show() (public)
GET  /api/pharmacies/{id}/stock   → stock() (auth:sanctum)
PUT  /api/pharmacien/pharmacy     → update() (auth:sanctum, rôle pharmacien)
POST /api/pharmacien/stock        → addStock() (auth:sanctum, rôle pharmacien)
PATCH /api/pharmacien/stock/{id}  → updateStock() (auth:sanctum, rôle pharmacien)
```

```bash
git add . && git commit -m "feat(pharmacies): PharmacyController et routes"
git push -u origin feature/backend-medicaments
# → Ouvrir PR vers develop
```

---

### JOUR 3 — Commandes

#### Tâche 3.1 — Migrations

**Migration 1 : orders**
- id, user_id (FK), pharmacy_id (FK), total_amount decimal(10,2), delivery_fee decimal(10,2) default(0), discount_code string(50) nullable, tax_amount decimal(10,2) default(0), status string(20) default('pending'), delivery_address text, delivery_latitude decimal(10,8) nullable, delivery_longitude decimal(11,8) nullable, notes text nullable, deleted_at, timestamps, delivered_at nullable

**Migration 2 : order_items**
- id, order_id (FK), medicament_id (FK), quantity integer, unit_price decimal(10,2), created_at

**Migration 3 : prescriptions**
- id, user_id (FK), order_id (FK), photo_url string(500), verified_by_pharmacist boolean default(false), created_at

**Migration 4 : deliveries**
- id, order_id (FK unique), provider_name string(100) nullable, tracking_url string(500) nullable, status string(20) default('pending'), estimated_time timestamp nullable, delivered_at timestamp nullable, updated_at

**Migration 5 : payments**
- id, order_id (FK unique), amount decimal(10,2), method string(30), status string(20) default('pending'), transaction_id string(200) nullable, timestamps

```bash
php artisan migrate
git add . && git commit -m "feat(orders): migrations orders, items, prescriptions, deliveries, payments"
```

#### Tâche 3.2 — Models
- `Order` : `belongsTo(User)`, `belongsTo(Pharmacy)`, `hasMany(OrderItem)`, `hasOne(Payment)`, `hasOne(Delivery)`, `hasOne(Prescription)`, `hasOne(Review)`, SoftDeletes
- `OrderItem` : `belongsTo(Order)`, `belongsTo(Medicament)`
- `Payment` : `belongsTo(Order)`
- `Delivery` : `belongsTo(Order)`
- `Prescription` : `belongsTo(Order)`, `belongsTo(User)`

```bash
git add . && git commit -m "feat(orders): models Order, OrderItem, Payment, Delivery, Prescription"
```

#### Tâche 3.3 — OrderService
**Fichier :** `app/Services/OrderService.php`

Méthodes :

`createOrder(array $data, User $user) : Order`
- Ouvrir une transaction DB (`DB::transaction`)
- Vérifier le stock pour chaque item (pharmacy_stocks.quantity >= quantité demandée)
- Si stock insuffisant → lever une exception avec le nom du médicament
- Calculer total_amount = somme(unit_price × quantity) + delivery_fee
- Créer Order avec status='pending'
- Créer chaque OrderItem
- Décrémenter pharmacy_stocks.quantity pour chaque item
- Créer Payment avec status='pending', amount=total_amount
- Créer Delivery avec status='pending'
- Envoyer notification à la pharmacie
- Retourner la commande créée

`updateOrderStatus(Order $order, string $newStatus) : Order`
- Transitions autorisées : pending→confirmed, confirmed→preparing, preparing→ready, ready→shipped, shipped→delivered
- Si transition invalide → exception
- Mettre à jour order.status
- Si newStatus='delivered' → mettre order.delivered_at = now()
- Envoyer notification au client

`cancelOrder(Order $order) : void`
- Vérifier que status = 'pending'
- Remettre le stock (incrémenter pharmacy_stocks.quantity)
- Mettre order.status = 'cancelled'
- Si payment.status = 'paid' → mettre payment.status = 'refunded'

```bash
git add . && git commit -m "feat(orders): OrderService avec createOrder, updateStatus, cancel"
```

#### Tâche 3.4 — OrderController
**Routes :**
```
POST  /api/orders              → store()  (auth:sanctum, rôle client)
GET   /api/orders              → index()  (auth:sanctum)
GET   /api/orders/{id}         → show()   (auth:sanctum)
PATCH /api/orders/{id}/cancel  → cancel() (auth:sanctum)

GET   /api/pharmacien/orders              → pharmacienOrders() (auth:sanctum, rôle pharmacien)
PATCH /api/pharmacien/orders/{id}/status  → updateStatus()    (auth:sanctum, rôle pharmacien)
```

```bash
git add . && git commit -m "feat(orders): OrderController avec toutes les routes"
git push -u origin feature/backend-orders
# → Ouvrir PR vers develop
```

---

### JOUR 4 — Paiement + Notifications + Reviews

#### Tâche 4.1 — PaymentController et PaymentService
**Routes :**
```
POST /api/payments/{orderId}/initiate  → initiate() (auth:sanctum)
POST /api/payments/webhook             → webhook()  (public — appelé par MTN/Orange)
GET  /api/payments/{orderId}/status    → status()   (auth:sanctum)
```

**PaymentService — méthodes :**

`initiatePayment(Order $order, string $method, string $phone) : array`
- Vérifier que payment.status = 'pending'
- Pour MVP : simuler l'appel API Mobile Money
- Générer un transaction_id fictif
- Mettre payment.status = 'paid' (simulation)
- Appeler updateOrderStatus(order, 'confirmed')
- Envoyer notifications
- Retourner {success: true, transaction_id}

> Note dans le code : "TODO: remplacer par le vrai appel API MTN/Orange Money"

`handleWebhook(array $data) : void`
- Vérifier la signature du webhook (header secret)
- Trouver le payment par transaction_id
- Mettre à jour payment.status selon le callback
- Si paid → confirmer la commande

```bash
git add . && git commit -m "feat(payments): PaymentService + PaymentController (simulation MVP)"
```

#### Tâche 4.2 — Migrations notifications + reviews
**notifications :** id, user_id (FK), type string(30), message text, is_read boolean default(false), created_at

**reviews :** id, order_id (FK), user_id (FK), pharmacy_id (FK), rating integer, comment text nullable, is_visible boolean default(true), timestamps

```bash
php artisan migrate
git add . && git commit -m "feat(notifications): migrations notifications et reviews"
```

#### Tâche 4.3 — NotificationService + NotificationController
**Routes :**
```
GET   /api/notifications            → index()      (auth:sanctum)
PATCH /api/notifications/{id}/read  → markRead()   (auth:sanctum)
PATCH /api/notifications/read-all   → markAllRead() (auth:sanctum)
```

**NotificationService — méthodes :**
- `send(User $user, string $type, string $message) : Notification`
- `notifyPharmacy(Order $order) : void` → "Nouvelle commande reçue"
- `notifyClient(User $user, Order $order, string $event) : void` → statut changé

```bash
git add . && git commit -m "feat(notifications): NotificationService + Controller"
```

#### Tâche 4.4 — ReviewController
**Routes :**
```
POST /api/reviews                      → store()   (auth:sanctum, rôle client)
GET  /api/pharmacies/{id}/reviews      → index()   (public)
```

**Logique store() :**
- Vérifier que la commande appartient au client connecté
- Vérifier que order.status = 'delivered'
- Vérifier qu'il n'y a pas déjà un avis pour cette commande
- Créer le review
- Recalculer pharmacy.rating = AVG(rating) de tous ses reviews visibles

```bash
git add . && git commit -m "feat(reviews): ReviewController avec contrainte status=delivered"
git push -u origin feature/backend-notifications
# → Ouvrir PR vers develop
```

---

### JOUR 5 — Espace Pharmacien + Admin + Tests

#### Tâche 5.1 — PharmacienController (dashboard)
**Routes :**
```
GET /api/pharmacien/dashboard  → dashboard() (auth:sanctum, rôle pharmacien)
```
Retourne : commandes aujourd'hui, revenus du jour, stock faible (quantity < min_stock_alert)

#### Tâche 5.2 — AdminController
**Routes :**
```
GET  /api/admin/users              → index()  (auth:sanctum, rôle admin)
POST /api/admin/users/{id}/toggle  → toggle() (auth:sanctum, rôle admin)
GET  /api/admin/stats              → stats()  (auth:sanctum, rôle admin)
```

#### Tâche 5.3 — Middleware CheckRole
**Fichier :** `app/Http/Middleware/CheckRole.php`

Logique :
- Récupère le rôle attendu depuis le paramètre
- Vérifie que `$request->user()->role === $role`
- Si non → retourne JSON 403 Forbidden

```bash
php artisan make:middleware CheckRole
git add . && git commit -m "feat(middleware): CheckRole pour protection des routes par rôle"
```

#### Tâche 5.4 — Gestion globale des erreurs
**Fichier :** `app/Exceptions/Handler.php`

Toujours retourner du JSON :
- 404 → `{"success": false, "message": "Ressource introuvable", "code": 404}`
- 401 → `{"success": false, "message": "Non authentifié", "code": 401}`
- 403 → `{"success": false, "message": "Accès refusé", "code": 403}`
- 422 → `{"success": false, "message": "Données invalides", "errors": {...}, "code": 422}`
- 500 → `{"success": false, "message": "Erreur serveur", "code": 500}`

```bash
git add . && git commit -m "feat(errors): handler global erreurs JSON"
git push
```

---

## 📊 RÉCAPITULATIF ISSUES GITHUB À CRÉER

```
#20 feat: Setup Laravel + PostgreSQL + Auth API
#21 feat: API Médicaments + Catégories + Pharmacies + Stocks
#22 feat: API Commandes + Order Items
#23 feat: API Paiement Mobile Money (simulation)
#24 feat: API Notifications + Reviews
#25 feat: Espace Pharmacien (dashboard + statuts)
#26 feat: Espace Admin
#27 feat: Middleware CheckRole + Gestion erreurs globale
```

---

## ✅ FORMAT RÉPONSE API (à respecter partout)

```json
{
  "success": true,
  "message": "Description de l'action",
  "data": { ... }
}
```

```json
{
  "success": false,
  "message": "Description de l'erreur",
  "errors": { "email": ["L'email est requis"] }
}
```
