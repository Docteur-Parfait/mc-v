# mc-v : version de Miabe Campus

`version.json` indique à l'application Miabe Campus (Android) quelle est la dernière version publiée. Au démarrage, le jeu lit ce fichier et propose la mise à jour si sa version est plus ancienne.

| Champ | Rôle |
|---|---|
| `version` | dernière version publiée sur Google Play (ex. `2.0.1`). Les applications plus anciennes affichent un avis « Mettre à jour » que le joueur peut repousser. |
| `minVersion` | version minimale acceptée. En dessous, l'avis bloque le jeu jusqu'à la mise à jour (à réserver aux versions critiques). |
| `storeUrl` | fiche Google Play ouverte par le bouton |
| `message` | texte affiché dans l'avis (facultatif) |

## Publier une mise à jour
1. Publiez la nouvelle version sur Google Play.
2. Quand elle est disponible pour les joueurs, changez `version` ici (et `minVersion` si la mise à jour est obligatoire), puis poussez sur `main`.

Pour vérifier le fichier avant de pousser : `node scripts/check-version.mjs`. La même vérification tourne sur chaque PR qui touche `version.json`.

Ne changez `version` qu'**après** la mise en ligne sur le Play Store, sinon les joueurs sont invités à installer une version qu'ils ne trouvent pas encore.

Adresse lue par le jeu : https://raw.githubusercontent.com/Docteur-Parfait/mc-v/main/version.json
