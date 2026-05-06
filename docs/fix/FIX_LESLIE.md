# 🔧 CORRECTIONS URGENTES — LESLIE

> Lis ce document en entier, puis envoie-le à ton IA.
> Il y a 2 bugs à corriger. Suis les étapes dans l'ordre.

---

## LES 2 BUGS QUE TU DOIS CORRIGER

### 🔴 BUG 1 — CRITIQUE : LoginPage et RegisterPage ne sont PAS dans le routeur
**Fichier :** `src/App.jsx`

**Problème :**
Dans App.jsx, la route `/login` affiche un simple `<div>` de placeholder :
```jsx
<Route path="/login" element={<div>Page de Connexion en construction</div>} />
```
Et `/register` **n'existe pas du tout** dans le routeur.

Résultat : **les utilisateurs ne peuvent pas accéder à ta page de connexion même si tu l'as codée.**

**Ce qu'il faut faire :**
- Importer `LoginPage` et `RegisterPage` dans App.jsx
- Remplacer le placeholder `/login` par `<LoginPage />`
- Ajouter la route `/register` avec `<RegisterPage />`

---

### 🟠 BUG 2 — IMPORTANT : Mauvais message d'erreur lors d'un mauvais mot de passe
**Fichier :** `src/services/authService.js`

**Problème :**
Quand l'utilisateur entre un mauvais mot de passe, le backend retourne une erreur **422** (pas 401).
Ton code vérifie `if (status === 401)` → il ne trouve pas 401 → il tombe dans le cas 422.
Le cas 422 retourne un objet `{ email: ["Les identifiants..."] }` (pas un string).
LoginPage essaie d'afficher `err.message` sur cet objet → affiche "Erreur de connexion" générique.

Résultat : **l'utilisateur voit "Erreur de connexion" au lieu de "Email ou mot de passe incorrect".**

**Ce qu'il faut faire :**
Dans le catch de la méthode `login()`, extraire le vrai message d'erreur :
```js
// Si c'est une erreur 422 avec errors.email
if (error.response?.data?.errors?.email) {
  throw new Error(error.response.data.errors.email[0])
}
// Sinon message générique
throw new Error('Email ou mot de passe incorrect')
```

---

## PROMPT À ENVOYER À TON IA

```
Tu es un expert React.js 18 avec Vite et React Router v6.
Je travaille sur MEDCAM, une app de commande de médicaments au Cameroun.

RÈGLES OBLIGATOIRES :
- React.js 18 + Vite UNIQUEMENT — JAMAIS Next.js
- Routing : react-router-dom v6 UNIQUEMENT (useNavigate, Link, Route, Routes)
- Composants fonctionnels avec Hooks uniquement

Je dois corriger 2 fichiers. Voici les corrections :

━━━ FICHIER 1 : src/App.jsx ━━━

Voici mon App.jsx ACTUEL : [colle ton App.jsx ici]

CORRECTIONS À FAIRE :
1. Importer LoginPage depuis './pages/auth/LoginPage'
2. Importer RegisterPage depuis './pages/auth/RegisterPage'
3. Trouver la route path="/login" qui a un <div> placeholder → remplacer par <LoginPage />
4. Ajouter une nouvelle route path="/register" avec element={<RegisterPage />}
   (cette route doit être publique, pas dans PrivateRoute)
5. Vérifier que ProfilePage est bien dans une route privée (PrivateRoute)

Le reste du fichier ne change pas.

━━━ FICHIER 2 : src/services/authService.js ━━━

Voici mon authService.js ACTUEL : [colle ton authService.js ici]

CORRECTIONS À FAIRE dans la méthode login() :
Dans le bloc catch, remplacer la logique de gestion d'erreur par :

```js
} catch (error) {
  // Le backend retourne 422 pour mauvais identifiants
  if (error.response?.data?.errors?.email) {
    throw new Error(error.response.data.errors.email[0])
  }
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message)
  }
  throw new Error('Email ou mot de passe incorrect')
}
```

Le reste de authService.js ne change pas.

Génère le code complet corrigé pour chacun des 2 fichiers.
```

---

## COMMITS APRÈS CORRECTION

```bash
git checkout develop
git pull origin develop
git checkout -b fix/leslie-auth-router-corrections

git add src/App.jsx
git commit -m "fix(router): ajout routes LoginPage et RegisterPage dans App.jsx"

git add src/services/authService.js
git commit -m "fix(auth): correction gestion erreur 422 mauvais mot de passe"

git push -u origin fix/leslie-auth-router-corrections
# → Ouvrir PR vers develop
```

---

## ✅ TEST APRÈS CORRECTION

1. Va sur `http://localhost:5173/login` → ta page doit s'afficher
2. Va sur `http://localhost:5173/register` → ta page doit s'afficher
3. Essaie de te connecter avec un mauvais mot de passe → tu dois voir le vrai message d'erreur
4. Connecte-toi avec de bons identifiants → tu dois être redirigé vers l'accueil
