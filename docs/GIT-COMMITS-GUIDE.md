# 🚀 Guide Commits Git – PharmApp (Version Simple)

> **Objectif :** Tout le monde écrit ses commits de la même façon. À imprimer et garder à portée de main.

---

## ✅ LA FORMULE (à retenir par cœur)

```
type(module): ce que tu as fait
```

C'est tout. Rien de plus.

---

## 📋 LES TYPES — lequel choisir ?

| Type | Quand l'utiliser | Exemple |
|------|-----------------|---------|
| `docs` | Tu écris/modifies un fichier `.md`, un diagramme | `docs(ux): ajout parcours inscription` |
| `feat` | Tu ajoutes du CODE (une fonctionnalité) | `feat(auth): ajout formulaire de login` |
| `fix` | Tu corriges une erreur (texte ou code) | `fix(typo): correction fautes module 1` |
| `style` | Tu changes des couleurs/CSS sans toucher à la logique | `style(ui): mise à jour couleurs boutons` |
| `chore` | Tâche technique (config, renommer fichier...) | `chore: ajout fichier .gitignore` |

---

## 📦 LES MODULES — ton "scope"

| Module | Mot-clé à utiliser |
|--------|-------------------|
| Cadrage & Besoins (Module 1) | `cadrage` |
| Produit & Périmètre (Module 2) | `produit` |
| UX & Parcours (Module 3) | `ux` |
| Architecture & Données (Module 4) | `archi` |
| Pilotage & Sécurité (Module 5) | `securite` |
| Charte graphique | `charte` |
| Authentification | `auth` |
| Recherche | `search` |
| Commandes | `orders` |
| Profil | `profil` |

---

## ✅ BONS EXEMPLES

```bash
docs(cadrage): ajout introduction et contexte du projet
docs(ux): ajout diagramme use case pharmacien
feat(auth): création page de connexion
fix(typo): correction fautes dans module 2
style(charte): mise à jour palette de couleurs
docs(archi): ajout justification choix PostgreSQL
feat(search): ajout barre de recherche médicaments
```

---

## ❌ MAUVAIS EXEMPLES (à ne JAMAIS faire)

```bash
# Trop vague — on ne sait pas ce qui a changé
update
modif
ok
ça marche
fini
test
wip

# Sans type — pas de catégorie
ajout du formulaire
correction bug
```

---

## ⚡ COMMANDES RAPIDES (copier-coller)

### Situation 1 : Tu viens de modifier un fichier

```bash
git add nom-du-fichier.md
git commit -m "docs(module): description courte"
git push
```

### Situation 2 : Tu veux ajouter TOUS tes fichiers modifiés

```bash
git add .
git commit -m "docs(ux): ajout parcours utilisateur"
git push
```

### Situation 3 : Vérifier où tu en es

```bash
git status          # Voir les fichiers modifiés
git branch          # Voir sur quelle branche tu es
git log --oneline   # Voir l'historique des commits
```

---

## 🔄 LE WORKFLOW COMPLET EN 6 ÉTAPES

```
1. git checkout develop
2. git pull origin develop
3. git checkout -b docs/nom-de-ta-tache
4. [Travaille sur tes fichiers]
5. git add . && git commit -m "type(module): description"
6. git push -u origin docs/nom-de-ta-tache
   → Ouvre une Pull Request sur GitHub
```

---

## ⚠️ RÈGLES D'OR

1. **JAMAIS** pousser directement sur `main` ou `develop`
2. **TOUJOURS** créer une branche avant de travailler
3. **TOUJOURS** `git pull origin develop` avant de créer ta branche
4. Un commit = **une seule chose** faite (pas 5 tâches en 1 commit)
5. Committer **souvent** (toutes les 30 min / 1h)

---

## 🆘 SOS — Problèmes fréquents

| Problème | Solution rapide |
|----------|----------------|
| J'ai travaillé sur `develop` directement | `git checkout -b docs/ma-tache` → tes modifs suivent |
| J'ai oublié de faire `pull` avant | `git pull origin develop` sur ta branche, résoudre les conflits |
| Je ne sais plus sur quelle branche je suis | `git branch` (l'étoile ★ montre la branche active) |
| J'ai fait une faute dans mon commit message | `git commit --amend -m "nouveau message"` (avant le push seulement) |

---

> 📞 **Besoin d'aide ?** Contacte Jack : WhatsApp +237652588197
