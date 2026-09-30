# 🤖 PROMPT BACKEND — JACK (Laravel PharmApp)

> Copie-colle ce prompt entier dans Gemini, Claude, ou ChatGPT
> avant de commencer à coder chaque fonctionnalité.

---

## CONTEXTE DU PROJET (à inclure au début de chaque session)

```
Tu es un expert Laravel 10 et PostgreSQL. Tu m'aides à développer le backend
de PharmApp, une application de commande de médicaments au Cameroun.

STACK :
- Laravel 10, PHP 8.2
- PostgreSQL 15 avec PostGIS pour la géolocalisation
- Laravel Sanctum pour l'authentification par token
- Architecture : Controllers → Services → Models (la logique métier est dans les Services)
- Réponses toujours en JSON, pas de vues Blade
- Soft deletes sur User, Order, Medicament
- ENUM remplacés par VARCHAR avec validation Laravel (Rule::in([...]))

BASE DE DONNÉES (12 tables) :
- users : id, name, email(unique), password, phone, role(varchar: client/pharmacien/admin),
  is_active(bool), last_login, email_verified_at, deleted_at, created_at, updated_at
- pharmacies : id, name, license_number(unique), address, email, phone,
  latitude(decimal 10,8), longitude(decimal 11,8), opening_hours(json), is_open(bool),
  rating(decimal 3,2), created_at, updated_at
- categories : id, name, created_at, updated_at
- medicaments : id, category_id(FK null), name, active_substance, description, dosage,
  prescription_required(bool), photo_url, manufacturer, deleted_at, created_at, updated_at
- pharmacy_stocks : id, pharmacy_id(FK), medicament_id(FK), quantity, price(decimal 10,2),
  is_available(bool), min_stock_alert(int=5), updated_at, UNIQUE(pharmacy_id, medicament_id)
- orders : id, user_id(FK), pharmacy_id(FK), total_amount, delivery_fee, discount_code,
  tax_amount, status(varchar: pending/confirmed/preparing/ready/shipped/delivered/cancelled),
  delivery_address, delivery_latitude, delivery_longitude, notes, deleted_at, created_at,
  updated_at, delivered_at
- order_items : id, order_id(FK), medicament_id(FK), quantity, unit_price, created_at
- prescriptions : id, user_id(FK), order_id(FK), photo_url, verified_by_pharmacist(bool), created_at
- deliveries : id, order_id(FK unique), provider_name, tracking_url, status(varchar),
  estimated_time, delivered_at, updated_at
- payments : id, order_id(FK unique), amount(decimal 10,2), method(varchar: mtn_mobile_money/orange_money),
  status(varchar: pending/paid/failed/refunded), transaction_id, created_at, updated_at
- notifications : id, user_id(FK), type(varchar), message(text), is_read(bool), created_at
- reviews : id, order_id(FK), user_id(FK), pharmacy_id(FK), rating(int 1-5),
  comment(text), is_visible(bool), created_at, updated_at

RÈGLES IMPORTANTES :
1. Jamais de logique métier dans les Controllers — tout dans les Services
2. Toujours utiliser des Form Requests pour la validation
3. Toujours retourner des API Resources pour formater les réponses
4. Utiliser des transactions DB pour les opérations critiques (commandes, paiements)
5. Toutes les routes sont préfixées par /api
6. Les routes admin sont protégées par middleware CheckRole:admin
7. Les routes pharmacien sont protégées par middleware CheckRole:pharmacien
```

---

## PROMPTS SPÉCIFIQUES PAR FONCTIONNALITÉ

### 🔐 Pour l'authentification :

```
En utilisant le contexte du projet PharmApp ci-dessus, génère-moi :

1. La migration create_users_table avec toutes les colonnes listées
2. Le Model User avec :
   - Les relations hasMany vers Order, Notification, Review
   - Les méthodes isClient(), isPharmacien(), isAdmin()
   - SoftDeletes activé
   - Le fillable complet
3. La Form Request RegisterRequest avec ces règles de validation :
   - name : required, string, max 100
   - email : required, email, unique:users
   - password : required, min 8, confirmed
   - phone : required, string
   - role : required, in:client,pharmacien
4. Le AuthController avec les méthodes register(), login(), logout(), me()
5. Les routes correspondantes dans api.php

Respecte l'architecture Controllers → Services → Models.
Réponds avec le code complet et les commentaires en français.
```

---

### 💊 Pour les médicaments :

```
En utilisant le contexte du projet PharmApp ci-dessus, génère-moi :

1. Les migrations : create_categories_table, create_medicaments_table,
   create_pharmacies_table, create_pharmacy_stocks_table
2. Les Models : Category, Medicament, Pharmacy, PharmacyStock avec toutes leurs relations
3. Le MedicamentService avec les méthodes :
   - searchMedicaments(string $query, array $filters) : recherche LIKE dans name et active_substance
   - getPharmaciesWithStock(int $medicamentId, float $lat, float $lng) : retourne les pharmacies
     avec leur stock, triées par distance via la formule Haversine
4. Le MedicamentController avec index(), search(), show(), pharmacies()
5. Les routes correspondantes (publiques, pas d'auth requise)
6. Les API Resources pour formater les réponses JSON

Focus particulier sur la méthode getPharmaciesWithStock :
elle doit calculer la distance en km entre le client et chaque pharmacie
et trier du plus proche au plus loin.
```

---

### 🛒 Pour les commandes :

```
En utilisant le contexte du projet PharmApp ci-dessus, génère-moi :

1. Les migrations : create_orders_table, create_order_items_table,
   create_payments_table, create_deliveries_table, create_prescriptions_table
2. Les Models avec toutes leurs relations
3. Le OrderService avec les méthodes :
   - createOrder(array $data, User $user) : crée la commande + items + payment(pending)
     dans une transaction DB, décrémente le stock, envoie notification pharmacie
   - updateOrderStatus(Order $order, string $newStatus) : valide la transition de statut,
     met à jour, notifie le client
   - cancelOrder(Order $order) : vérifie status=pending, remet le stock, rembourse si payé
4. Le OrderController avec store(), index(), show(), cancel()
5. Les Form Requests avec validation complète
6. La logique de vérification du stock avant création de commande

Utilise des transactions DB pour createOrder.
La commande échoue si un médicament n'a pas assez de stock.
```

---

### 💳 Pour le paiement :

```
En utilisant le contexte du projet PharmApp ci-dessus, génère-moi :

1. Le PaymentService avec :
   - initiatePayment(Order $order, string $method, string $phoneNumber)
     qui simule un appel à l'API MTN/Orange Money
   - handleWebhook(array $webhookData) qui traite le callback de confirmation
   - Si le paiement est confirmé : order.status → confirmed, notification client + pharmacie
2. Le PaymentController avec initiate() et webhook()
3. Les routes correspondantes

Pour le MVP, on peut simuler la réponse de MTN/Orange Money
(retourner directement status=paid après 2 secondes).
Prévoir quand même la structure pour le vrai appel API plus tard.
Note dans le code les endroits où brancher la vraie API.
```

---

### 🔔 Pour les notifications :

```
En utilisant le contexte du projet PharmApp ci-dessus, génère-moi :

1. Le NotificationService avec :
   - sendNotification(User $user, string $type, string $message)
   - notifyPharmacy(Pharmacy $pharmacy, Order $order) : commande reçue
   - notifyClient(User $user, Order $order, string $event) : statut changé, livré, etc.
2. Le NotificationController avec index(), markAsRead(), markAllRead()
3. Les routes correspondantes
```

---

## RÈGLE POUR CHAQUE SESSION

Commence toujours par :
```
"Je travaille sur le backend Laravel de PharmApp.
Contexte : [colle le contexte du projet ci-dessus]
Aujourd'hui je dois implémenter : [décris la fonctionnalité]"
```

Et termine toujours par demander :
```
"Quels tests unitaires dois-je écrire pour vérifier que ça marche ?"
```
