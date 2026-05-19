# Export thomasbordron.com en PDF

Petit script Node.js qui ouvre le site dans un Chromium headless (Puppeteer) et le sauvegarde en PDF. Fonctionne sur Mac / Linux / Windows.

## Pré-requis

- Node.js 20+ ([nodejs.org](https://nodejs.org))
- Une connexion réseau qui peut atteindre `thomasbordron.com` (donc à lancer sur **ta machine**, pas depuis l'environnement cloud Claude Code qui bloque les hosts non-autorisés)

## Installation

```bash
cd pdf-export
npm install
```

Première exécution ≈ 200 Mo téléchargés (Puppeteer embarque son propre Chromium).

## Usage

### Page d'accueil uniquement (par défaut)

```bash
node export.js
```

→ Produit `thomasbordron.pdf` dans le dossier courant.

### Toutes les pages du site (détection auto via sitemap.xml ou liens internes)

```bash
node export.js --all
```

### Une sélection de pages

```bash
node export.js --pages "https://thomasbordron.com,https://thomasbordron.com/about,https://thomasbordron.com/projects"
```

### Options utiles

| Flag | Défaut | Description |
|---|---|---|
| `--url <url>` | `https://thomasbordron.com` | Page de départ |
| `--out <fichier>` | `thomasbordron.pdf` | Nom du PDF de sortie |
| `--format <A4\|Letter\|...>` | `A4` | Format papier |
| `--landscape` | off | Orientation paysage |
| `--no-bg` | off | Désactive les fonds (impression sobre) |
| `--single-page` | off | Une seule très longue page (hauteur = scroll complet) |
| `--width <px>` | `1440` | Largeur du viewport pendant le rendu |
| `--height <px>` | `900` | Hauteur du viewport |
| `--scale <n>` | `1` | Échelle (0.5–2) |
| `--margin <Xmm>` | `0mm` | Marges du PDF |
| `--wait <ms>` | `2500` | Attente supplémentaire après chargement (utile pour animations Framer) |

### Exemples

PDF "pleine page" continu (pratique pour un portfolio Framer one-page) :

```bash
node export.js --single-page --out thomas-onepage.pdf
```

Toutes les pages, format A4, fonds inclus :

```bash
node export.js --all --out thomas-full.pdf
```

Tester sur une URL Framer staging :

```bash
node export.js --url https://thomas-new.framer.website --out thomas-staging.pdf
```

## Notes Framer

- Les sites Framer chargent souvent les images en lazy. Le script scrolle automatiquement de haut en bas avant l'export pour forcer le chargement.
- Si certaines animations cachent du contenu (effets reveal-on-scroll), augmente `--wait 5000` ou plus.
- Si tu veux un PDF qui reflète exactement le look mobile, lance avec `--width 390 --height 844`.

## Dépannage

- **`Failed to launch the browser process`** → installe les libs système (Linux uniquement) : `sudo apt install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libxss1 libasound2 libgbm1`.
- **403 Forbidden** → ta connexion est filtrée (VPN d'entreprise, Cloudflare). Lance depuis un autre réseau.
- **PDF blanc** → augmente `--wait 8000` et `--width 1920` pour laisser le temps aux scripts de tourner.
