# ALPHA ET OMEGA GOLD — Suivi de Projet

> Site vitrine pour l'intermédiaire aurifère burkinabè
> Dernière mise à jour : 7 mai 2026 — v3 Stitch Design System

---

## Structure des fichiers

```
omega_gold/
├── aogold-preview.html   ← Structure HTML (328 lignes)
├── styles.css            ← Design system v3 Stitch (~2000 lignes)
├── script.js             ← Interactivité JavaScript (228 lignes)
└── PROGRESS.md           ← Ce fichier de suivi
```

## Projet Stitch

- **ID** : `projects/17865167227898320140`
- **Design System** : Aureum Burkina — Minimalist-Lux, Sharp, Ghost-Gold, Tonal Elevation
- **Typo** : Cormorant Garamond (headings) + Manrope (body) + Italiana (accents)
- **Palette générée** : Material Design 3 — surface `#121414`, primary `#e5c365`, gold-grad

---

## Images (Unsplash) — Respect des métiers

| Emplacement | Thème | Photo ID | Crop | Contenu |
|-------------|-------|----------|------|---------|
| Hero | Général | `photo-1570723265645` | 1920×1080 | Mine d'or à ciel ouvert |
| About | Contexte | `photo-1605281317010` | 800×1000 | Site minier Burkina Faso |
| **Services 1** | **Travaux Miniers** | `photo-1578662996442` | 800×500 | Excavatrice — chantier minier |
| **Services 2** | **Recherche & Exploitation** | `photo-1518709268805` | 800×500 | Terrain géologique — prospection |
| **Services 3** | **Achat d'Or** | `photo-1624365168968` | 800×500 | Lingots d'or — négoce |
| Galerie tall | Or brut | `photo-1589998059171` | 800×1200 | Pépites naturelles |
| Galerie wide | Certification | `photo-1610375461246` | 1200×600 | Lingots certifiés LBMA |
| Galerie 3 | Travaux | `photo-1605281317010` | 800×500 | Chantier minier |
| Galerie 4 | Titrage | `photo-1589998059171` | 800×500 | Pesée de contrôle |
| Galerie wide 2 | Achat | `photo-1610375461246` | 1200×600 | Transaction sécurisée |
| CTA bg | Or | `photo-1610375461246` | 1920 | Lingots d'or (fond) |

---

## À faire (prochaines sessions)

### Haute priorité
- [ ] Remplacer les numéros de téléphone `+226 XX XX XX XX` par le vrai numéro
- [ ] Remplacer `contact@aogold.com` par l'email réel
- [ ] Connecter le formulaire à un vrai endpoint (Netlify, Formspree, API custom)
- [ ] Vérifier les images Unsplash (certaines peuvent expirer)

### Priorité moyenne
- [ ] Ajouter une page dédiée "Traçabilité" avec schéma
- [ ] Galerie lightbox au clic sur les images
- [ ] Version anglaise du site (i18n)
- [ ] Animation de particules d'or subtile en fond du hero
- [ ] SEO : balises OG, Twitter Card, schema.org

### Priorité basse
- [ ] Mode sombre/clair (actuellement dark uniquement)
- [ ] Blog / actualités du secteur minier burkinabè
- [ ] Dashboard admin pour gérer les demandes de contact

---

## Notes techniques

- **API cours de l'or** : `api.gold-api.com/price/XAU` — gratuit, pas de clé API
- **FCFA** : Conversion fixe à 608 FCFA/USD (à ajuster selon taux réel)
- **Formulaire** : Simulation locale, pas d'envoi réel (remplacer `Promise` par `fetch`)
- **Police Google Fonts** : Cormorant Garamond + Italiana + Manrope (3 requêtes)
- **Compatibilité** : Chrome, Firefox, Safari, Edge (dernières versions)
- **Pas de dépendance JS** : Vanilla JS uniquement, 0 framework

---

## Commandes utiles

```bash
# Lancer un serveur local
python3 -m http.server 8080

# Minifier le CSS (optionnel)
npx csso styles.css -o styles.min.css

# Minifier le JS (optionnel)
npx terser script.js -o script.min.js
```
