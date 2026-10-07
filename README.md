# Reconnais la Pièce

Quiz pour apprendre à reconnaître 177 pièces de plomberie, chauffage et débouchage, avec photos, noms en français et en néerlandais, et 3 niveaux (Année 1, 2, 3).
Application web installable (PWA) : elle fonctionne hors ligne une fois installée.

## Installer sur Android
1. Ouvre l'adresse GitHub Pages du dépôt dans **Chrome**.
2. Touche **Installer l'application** (ou menu ⋮ → *Installer l'application*).

## Mettre à jour
1. Remplace `index.html`.
2. Dans `sw.js`, change `VERSION` (par exemple `rlp-v3`) pour que les téléphones téléchargent la nouvelle version.
3. Commit et push.

## Fichiers
- `index.html` — le jeu complet (aucune dépendance à installer)
- `manifest.webmanifest` — nom, icônes, couleurs de l'application
- `sw.js` — cache hors ligne
- `icons/` — icônes de l'application
- `photos/` — une photo par pièce (`<id>.jpg`), mises en cache pour le hors ligne. Usage personnel d'étude : photos issues du catalogue Facq, ne pas redistribuer.
