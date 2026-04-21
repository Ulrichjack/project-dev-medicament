# 🗺️ ROADMAP FRONTEND — LESLIE (Pages Auth & Profil)

> **Tu travailles sur l'authentification — le point d'entrée de toute l'app.**
> Attends que Sonia pousse App.jsx et les composants UI avant de commencer.
> Préviens Sonia sur Discord dès que tu as besoin de Button ou Input.

---

## 📌 TES RESPONSABILITÉS

| Fichier | Description |
|---------|-------------|
| `src/pages/auth/LoginPage.jsx` | Page de connexion |
| `src/pages/auth/RegisterPage.jsx` | Page d'inscription |
| `src/pages/auth/ProfilePage.jsx` | Profil utilisateur |
| `src/services/authService.js` | Appels API auth |
| `src/store/authSlice.js` | État global utilisateur |

---

## 🌿 TA BRANCHE GIT

```bash
# Avant de commencer (attends que Sonia pousse d'abord)
git checkout develop
git pull origin develop   # récupère le travail de Sonia
git checkout -b feature/frontend-auth

# Coder...

# Pusher
git add .
git commit -m "feat(auth): description de ce que tu as fait"
git push -u origin feature/frontend-auth

# Quand une tâche est finie → PR vers develop
```

### Tes commits

```
feat(auth): ajout authSlice Redux avec actions setCredentials et logout
feat(auth): ajout authService avec login, register, logout, getMe
feat(auth): ajout page LoginPage avec formulaire et gestion erreurs
feat(auth): ajout page RegisterPage avec validation côté client
feat(auth): ajout page ProfilePage avec infos utilisateur
fix(auth): correction redirection après login
```

---

## 📋 BACKLOG DÉTAILLÉ

---

### JOUR 1 — Store Redux Auth (commence par ça)

#### Tâche L-1 : authSlice.js

**Fichier :** `src/store/authSlice.js`

State initial :
```js
{
  user: null,           // objet user { id, name, email, phone, role }
  token: null,          // string token Sanctum
  isAuthenticated: false,
  loading: false,
  error: null
}
```

Actions à créer :
- `setCredentials({ user, token })` → stocke user + token dans Redux ET dans localStorage
- `logout()` → vide Redux ET supprime de localStorage
- `setLoading(bool)` → pour afficher les spinners
- `setError(string)` → pour afficher les erreurs

Au démarrage de l'app → lire localStorage pour restaurer la session :
```js
// Dans le state initial
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user') || 'null')
```

Commit : `feat(auth): ajout authSlice Redux avec persistance localStorage`

---

#### Tâche L-2 : authService.js

**Fichier :** `src/services/authService.js`

Importe `api` depuis `src/services/api.js` (configuré par Sonia).

Méthodes :

`login(email, password)`
- POST `/auth/login` avec body `{ email, password }`
- Retourne `{ user, token }`
- En cas d'erreur 401 → throw new Error("Email ou mot de passe incorrect")

`register(data)`
- POST `/auth/register` avec body `{ name, email, password, password_confirmation, phone, role }`
- Retourne `{ user, token }`
- En cas d'erreur 422 → throw les erreurs de validation

`logout()`
- POST `/auth/logout`
- Ne retourne rien d'important

`getMe()`
- GET `/auth/me`
- Retourne l'utilisateur connecté

Commit : `feat(auth): ajout authService avec login, register, logout, getMe`

---

### JOUR 2 — Pages Auth

#### Tâche L-3 : LoginPage.jsx

**Fichier :** `src/pages/auth/LoginPage.jsx`

Structure de la page :
- Fond `#F5F7FA`
- Card centrée (max-width 400px)
- Logo PharmApp en haut de la card
- Titre "Connexion"

Formulaire :
- Input email (label: "Email", type: email, icône: fa-envelope)
- Input password (label: "Mot de passe", type: password, icône: fa-lock)
- Bouton "Se connecter" (variant primary, size lg, full width)
- Lien "Mot de passe oublié ?" (gris, petite taille, à droite)
- Séparateur "ou"
- Lien "Pas encore de compte ? S'inscrire" → navigue vers /register

Logique :
1. Au submit → dispatch setLoading(true)
2. Appel authService.login(email, password)
3. Si succès → dispatch setCredentials({user, token}) → navigate('/')
4. Si erreur → afficher message d'erreur sous le formulaire en rouge
5. dispatch setLoading(false)

Gestion des états :
- loading=true → bouton affiche spinner, désactivé
- error → message rouge sous le formulaire

Validation côté client (avant envoi) :
- Email : format valide
- Password : minimum 1 caractère

Commit : `feat(auth): ajout LoginPage avec formulaire et gestion erreurs`

---

#### Tâche L-4 : RegisterPage.jsx

**Fichier :** `src/pages/auth/RegisterPage.jsx`

Structure identique à LoginPage (card centrée).

Formulaire :
- Input name (label: "Nom complet", icône: fa-user)
- Input email (label: "Email", type: email)
- Input phone (label: "Téléphone", type: tel, placeholder: "6XXXXXXXX")
- Select role : "Je suis un client" / "Je suis pharmacien"
- Input password (label: "Mot de passe", type: password)
- Input password_confirmation (label: "Confirmer le mot de passe", type: password)
- Bouton "Créer mon compte" (variant primary, size lg, full width)
- Lien "Déjà un compte ? Se connecter" → /login

Validation côté client :
- Tous les champs requis
- Email : format valide
- Password : minimum 8 caractères
- password_confirmation = password

Logique :
1. Valider côté client → afficher erreurs inline si invalide
2. Appel authService.register(data)
3. Si succès → dispatch setCredentials → navigate('/') avec toast "Bienvenue sur PharmApp !"
4. Si erreur 422 → afficher les erreurs de validation Laravel sous chaque champ

Commit : `feat(auth): ajout RegisterPage avec validation complète`

---

#### Tâche L-5 : ProfilePage.jsx

**Fichier :** `src/pages/auth/ProfilePage.jsx`

Contenu :
- En-tête avec avatar (initiales du nom sur fond bleu) + nom + rôle (badge)
- Section "Mes informations" :
  - Nom (fa-user) : valeur
  - Email (fa-envelope) : valeur
  - Téléphone (fa-phone) : valeur ou "Non renseigné"
  - Membre depuis (fa-calendar) : date d'inscription formatée
- Bouton "Se déconnecter" (variant danger, outline)

Logique déconnexion :
1. Appel authService.logout()
2. dispatch logout()
3. navigate('/login')

Commit : `feat(auth): ajout ProfilePage avec informations utilisateur`

---

### JOUR 3 — Finalisation et tests

#### Tâche L-6 : Tests manuels complets

- [ ] Inscription avec un nouvel email → vérifier redirection vers /
- [ ] Inscription avec email existant → vérifier message d'erreur
- [ ] Connexion avec mauvais mot de passe → vérifier message d'erreur
- [ ] Connexion réussie → vérifier token dans localStorage
- [ ] Actualiser la page → vérifier que la session est conservée
- [ ] Déconnexion → vérifier redirection vers /login
- [ ] Accéder à /profile sans être connecté → vérifier redirection vers /login

Commit : `test(auth): vérification complète flux authentification`

---

## 📊 ISSUES GITHUB À CRÉER (toi)

```
#27 feat(frontend): Store authSlice + authService
#28 feat(frontend): Pages Auth - Login, Register, Profile
```

---

## ⚠️ DÉPENDANCES

Tu as besoin de :
- `Button.jsx` (Sonia) ← pour le bouton de connexion
- `Input.jsx` (Sonia) ← pour les champs email/password
- `api.js` (Sonia) ← pour les appels API
- `PrivateRoute.jsx` (Sonia) ← pour protéger ProfilePage

Préviens Sonia sur Discord si ces fichiers ne sont pas encore disponibles.
