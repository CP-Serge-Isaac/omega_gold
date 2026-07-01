# ALPHA ET OMEGA GOLD — Site vitrine

Site vitrine de **Alpha & Oméga Gold**, intermédiaire aurifère au Burkina Faso
(travaux miniers, recherche & exploitation, achat d'or).

- 🌐 **En ligne** : https://omegagold.vercel.app
- 💻 **Code** : https://github.com/CP-Serge-Isaac/omega_gold
- 🛠️ **Stack** : HTML / CSS / JavaScript purs — aucun framework, aucune compilation.
- 🌍 **Bilingue** : Français / Anglais (sélecteur dans le menu).

---

## 📁 Structure du projet

```
omega_gold/
├── index.html              ← Page d'accueil (HTML + données SEO)
├── mentions-legales.html   ← Mentions légales (FR/EN)
├── confidentialite.html    ← Politique de confidentialité (FR/EN)
├── assets/
│   ├── css/
│   │   └── styles.css       ← 🎨 Tout le design
│   ├── js/
│   │   ├── i18n.js          ← 🌍 Traductions FR/EN + bascule de langue
│   │   └── main.js          ← ⚙️ Interactions (menu, galerie, cours de l'or, formulaire…)
│   ├── img/                 ← 🖼️ Photos (WebP + repli JPG)
│   ├── logo.png, logo-light.png, favicon.*  ← Logos & icônes
├── vercel.json              ← Configuration de déploiement
├── robots.txt, sitemap.xml  ← SEO
└── README.md                ← Ce fichier
```

---

## 👁️ Voir le site en local

Dans un terminal :

```bash
cd ~/Téléchargements/APK_MOBILE/omega_gold
python3 -m http.server 8091
```

Puis ouvrir **http://localhost:8091/** dans le navigateur.
*(Après chaque modification d'un fichier, il suffit de rafraîchir l'onglet — pas de compilation.)*

---

## 📝 Que modifier, et où ?

| Je veux changer…                     | Fichier à ouvrir            |
|--------------------------------------|-----------------------------|
| Les couleurs, polices, mise en page  | `assets/css/styles.css`     |
| Une traduction FR ou EN              | `assets/js/i18n.js`         |
| Un comportement (menu, galerie…)     | `assets/js/main.js`         |
| Un texte, une image, la structure    | `index.html`                |
| Les pages légales                    | `mentions-legales.html` / `confidentialite.html` |

### Ajouter / remplacer une image
1. Placer le fichier dans `assets/img/`.
2. Idéalement créer une version WebP : `magick photo.jpg -quality 80 photo.webp`.
3. La référencer dans `index.html` (les images de contenu utilisent `<picture>` : source WebP + repli JPG).

---

## 🚀 Publier les changements en ligne

Le site se redéploie **automatiquement** à chaque envoi sur GitHub :

```bash
cd ~/Téléchargements/APK_MOBILE/omega_gold
git add -A
git commit -m "Description de mes modifications"
git push
```

➡️ Vercel met à jour https://omegagold.vercel.app en ~30 secondes.

---

## ⚠️ Points importants

- Dans `styles.css`, les images se réfèrent en **`../img/…`** (le CSS est dans `assets/css/`), pas `assets/img/…`.
- Le fichier **`i18n.js` doit se charger AVANT `main.js`** (l'ordre est déjà en place dans `index.html`).
- Ne pas modifier les blocs `<script type="application/ld+json">` de `index.html` sans raison : ce sont les **données SEO** (Google).
- Tout est sauvegardé sur GitHub : même en cas de problème sur l'ordinateur, le projet n'est pas perdu.

---

## ✅ À compléter par le propriétaire (facultatif)

Ces informations n'ont pas été fournies et peuvent être ajoutées plus tard :

- **Forme juridique** et **directeur de la publication** → `mentions-legales.html`
- **N° RCCM / IFU** → `mentions-legales.html`
- **Formulaire de contact** : actuellement en simulation (aucun envoi réel).
  À brancher sur un service type Formspree ou une fonction serverless pour
  recevoir les messages sur `alphaeomegagold@gmail.com`.
- **Vraies photos** de l'entreprise (équipe, site, bureau) et **vrais témoignages**.
- **Google Analytics / Vercel Analytics** : le script est déjà présent,
  il suffit d'activer « Analytics » dans le tableau de bord Vercel.
