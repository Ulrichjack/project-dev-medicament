# 🔧 CORRECTIONS URGENTES — JACK (Backend)

> Ces corrections sont pour toi seul.
> Certaines sont bloquantes pour toute l'équipe frontend.

---

## ORDRE DES CORRECTIONS (du plus urgent au moins urgent)

---

### 🔴 PRIORITÉ 1 — Standardiser les noms de champs en anglais dans les API Resources

**Fichiers :**
- `app/Http/Resources/MedicamentResource.php`
- `app/Http/Resources/OrderResource.php`
- `app/Http/Resources/UserResource.php`

**Problème :**
Les Resources retournent des clés en **français** (`nom`, `statut`, `telephone`, etc.)
mais le frontend attend des clés en **anglais** (`name`, `status`, `phone`, etc.)

**Corrections :**

Dans `MedicamentResource.php` :
```php
// ❌ AVANT
'nom' => $this->name,
'prix_moyen' => $this->price_min,
'ordonnance' => $this->prescription_required,
'image' => $this->photo_url,

// ✅ APRÈS
'name' => $this->name,
'price_min' => $this->price_min,
'prescription_required' => $this->prescription_required,
'photo_url' => $this->photo_url,
```

Dans `OrderResource.php` :
```php
// ❌ AVANT
'statut' => $this->status,
'total' => $this->total_amount,
'frais_livraison' => $this->delivery_fee,
'articles' => OrderItemResource::collection($this->items),
'paiement' => new PaymentResource($this->payment),

// ✅ APRÈS
'status' => $this->status,
'total_amount' => $this->total_amount,
'delivery_fee' => $this->delivery_fee,
'items' => OrderItemResource::collection($this->items),
'payment' => new PaymentResource($this->payment),
```

Dans `UserResource.php` :
```php
// ❌ AVANT
'nom' => $this->name,
'telephone' => $this->phone,
'pharmacie_id' => $this->pharmacy_id,

// ✅ APRÈS
'name' => $this->name,
'phone' => $this->phone,
'pharmacy_id' => $this->pharmacy_id,
```

Commit :
```bash
git commit -m "fix(resources): standardisation clés API en anglais (name, status, phone...)"
```

---

### 🔴 PRIORITÉ 2 — Ajouter les routes de paiement

**Fichier :** `routes/api.php`
**Et créer :** méthodes dans `PaymentController.php`

**Problème :**
Le frontend d'Ange appelle `POST /orders/{id}/pay`.
Cette route **existe déjà** (`PaymentController::simulate`) — c'est bon.

Mais il manque des routes pour que le frontend puisse récupérer le statut du paiement.
Ange va adapter son code pour n'utiliser que `POST /orders/{id}/pay`.
**Aucune action de ta part nécessaire ici si la route `/orders/{id}/pay` marche bien.**

Vérifie juste que cette route est bien accessible en testant avec Postman :
```
POST http://localhost:8000/api/orders/1/pay
Authorization: Bearer {token}
Body: { "method": "mtn_mobile_money", "phone_number": "677000000" }
```
Si ça retourne la commande confirmée → OK ✅

---

### 🟠 PRIORITÉ 3 — Aligner les frais de livraison à 1000 FCFA

**Fichier :** `app/Services/OrderService.php`

La valeur est déjà à 1000 FCFA côté backend.
Ange va corriger le frontend pour mettre 1000 aussi.
**Aucune action nécessaire de ta part ici.**

---

### 🟠 PRIORITÉ 4 — Ajouter la route `/categories`

**Fichier :** `routes/api.php`

Linus a besoin d'une route pour charger les catégories de médicaments dans l'interface.

Ajouter dans la section routes publiques :
```php
Route::get('/categories', [CategoryController::class, 'index']);
```

Créer le controller si pas encore fait :
```bash
php artisan make:controller CategoryController
```

Méthode `index()` :
```php
public function index()
{
    $categories = Category::all();
    return response()->json(['success' => true, 'data' => $categories]);
}
```

Commit :
```bash
git commit -m "feat(categories): ajout route GET /categories pour le frontend"
```

---

### 🟡 PRIORITÉ 5 — Supprimer les 4 fichiers fantômes à la racine du backend

Ces fichiers ont été créés par accident (sortie de `php artisan tinker` ou commandes pager) :

```bash
cd backend/MEDCAM

# Supprimer les fichiers avec des noms bizarres
ls  # → tu verras des fichiers comme "Pharmacy::first();" ou "s' => 'Test Street'"

# Les supprimer un par un
rm "Pharmacy::first();"
rm "Pharmacy::where('name', 'Pharmacie de Test')->first();"
rm "' => 'confirmed']);"
rm "s' => 'Test Street'"

# Vérifier qu'ils sont supprimés
ls
```

Commit :
```bash
git commit -m "chore: suppression fichiers tinker accidentellement commites"
```

Ajouter dans `.gitignore` pour éviter que ça recommence :
```
# Tinker output
*::*
```

---

### 🟡 PRIORITÉ 6 — Supprimer la route dupliquée

**Fichier :** `routes/api.php`

Dans le groupe pharmacien, tu as deux fois la même route :
```php
Route::get('/orders', [PharmacistController::class, 'getOrders']);
Route::get('/orders', [PharmacistController::class, 'getOrders']); // ← SUPPRIMER CETTE LIGNE
```

Commit :
```bash
git commit -m "fix(routes): suppression route GET /pharmacist/orders en double"
```

---

## ORDRE DE PUSH RECOMMANDÉ

```bash
git checkout develop
git pull origin develop
git checkout -b fix/jack-backend-corrections

# Faire toutes les corrections dans l'ordre
# Puis :

git add app/Http/Resources/
git commit -m "fix(resources): clés API standardisées en anglais"

git add routes/api.php
git commit -m "feat: ajout route categories + suppression route dupliquee"

git add app/Http/Controllers/CategoryController.php
git commit -m "feat(categories): CategoryController avec index()"

git rm "Pharmacy::first();" "Pharmacy::where('name', 'Pharmacie de Test')->first();" "' => 'confirmed']);" "s' => 'Test Street'"
git commit -m "chore: suppression fichiers accidentels"

git push -u origin fix/jack-backend-corrections
# → Merger toi-même (tu es le Lead)
```

---

## ✅ VÉRIFICATION FINALE

Après ces corrections, teste avec Postman :
1. `POST /api/auth/login` → doit retourner `{ success: true, data: { user: { name, phone, ... }, token } }`
2. `GET /api/medicaments` → doit retourner `{ data: { data: [{ name, photo_url, prescription_required, ... }] } }`
3. `POST /api/orders/{id}/pay` → doit retourner commande confirmée
4. `GET /api/categories` → doit retourner la liste des catégories
