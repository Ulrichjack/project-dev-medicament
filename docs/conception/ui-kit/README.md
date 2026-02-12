


# UI Kit – PharmApp

Ce dossier contient la charte graphique officielle de l’application.

## Fichiers

- charte-graphique.md → couleurs, typographie, boutons, inputs, cards, icônes

## Utilisation

Importer les polices :

<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;500&display=swap" rel="stylesheet">

#  UI Kit – PharmApp
Charte Graphique Officielle

Ce document regroupe toutes les règles de design de l’application PharmApp.
Il permet de garantir une interface cohérente, moderne et professionnelle.

Tous les développeurs doivent respecter ces styles.

---

#  Palette de couleurs

## Primaire (actions principales)
- Hex : #2C5F8D
- RGB : rgb(44,95,141)

## Secondaire / Succès
- Hex : #27AE60
- RGB : rgb(39,174,96)

## Danger / Erreur
- Hex : #E74C3C
- RGB : rgb(231,76,60)

## Warning / Avertissement
- Hex : #F39C12
- RGB : rgb(243,156,18)

## Fond principal
- #FFFFFF

## Fond secondaire
- #F5F7FA

## Texte principal
- #2C3E50

## Texte secondaire
- #7F8C8D

---

#  Variables CSS globales

À placer dans `style.css` ou `App.css`

```css
:root {
  --color-primary: #2C5F8D;
  --color-secondary: #27AE60;
  --color-danger: #E74C3C;
  --color-warning: #F39C12;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F7FA;
  --color-text: #2C3E50;
  --color-text-light: #7F8C8D;
}


Définir les variables CSS :

:root {
  --color-primary: #2C5F8D;
  --color-secondary: #27AE60;
  --color-danger: #E74C3C;
}
