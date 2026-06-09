# Nnamdi — Developer Portfolio

A modern, professional, fully responsive one-page portfolio website built with HTML5, Vanilla CSS, and Vanilla JavaScript.

---

## 📁 Folder Structure

```
portfolio/
│
├── index.html              ← Main HTML file (all sections live here)
│
├── css/
│   └── style.css           ← All styles, CSS variables, responsive rules
│
├── js/
│   └── script.js           ← All interactivity (nav, animations, form)
│
├── images/
│   ├── profile-photo.jpg   ← Your professional headshot (replace this)
│   └── project-images/     ← Screenshots for each project card
│       ├── survey-form.jpg
│       ├── tailwind-landing.jpg
│       └── mamaput.jpg
│
├── assets/
│   └── resume.pdf          ← Your downloadable resume (replace this)
│
└── README.md               ← This file
```

---

## ✅ Features

- **Sticky navbar** with hamburger menu on mobile
- **Hero section** with typewriter role text animation
- **About section** with stat cards
- **Skills section** split into Proficient / Currently Learning
- **Projects section** with hover animations and "Currently Building" badge
- **Contact section** with JavaScript form validation
- **Scroll fade-in animations** using Intersection Observer API
- **Back-to-top button**
- **Active nav link** tracking on scroll
- **Footer** with dynamic copyright year
- Fully accessible (ARIA labels, keyboard navigation, semantic HTML)
- CSS custom properties (design tokens) for easy theming

---

## 🔧 Personalisation Checklist

Before publishing, update these items:

### index.html
- [ ] Replace all `href="https://github.com/"` with your real GitHub URL
- [ ] Replace all `href="https://linkedin.com/"` with your LinkedIn URL
- [ ] Replace all `href="https://x.com/"` with your X/Twitter URL
- [ ] Replace all `href="https://youtube.com/"` with your YouTube URL
- [ ] Replace `nnamdi@email.com` with your real email address
- [ ] Update each project card's GitHub URL and Live Demo URL
- [ ] Update project titles, descriptions, and tech tags as you build more

### images/
- [ ] Add `profile-photo.jpg` — a professional headshot works best
- [ ] Add `project-images/survey-form.jpg` — screenshot of your form project
- [ ] Add `project-images/tailwind-landing.jpg` — screenshot of your landing page
- [ ] Add `project-images/mamaput.jpg` — screenshot of MamaPutOnline

> **Image tip:** Use 600×340px (16:9 ratio) screenshots for project cards. You can take these directly from your browser using F12 → device toolbar.

### assets/
- [ ] Add your `resume.pdf` (ATS-friendly, exported from Google Docs or Canva)

---

## 🚀 Deploying to GitHub Pages (Free Hosting)

GitHub Pages gives you a free public URL like: `https://yourusername.github.io/portfolio`

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it `portfolio` (or your preferred name)
4. Set it to **Public**
5. Do NOT initialise with README (we have our own)
6. Click **Create repository**

### Step 2 — Push your code
Open your terminal in VS Code (`Ctrl + ~`) and run:

```bash
# Navigate into your portfolio folder
cd portfolio

# Initialise git
git init

# Stage all files
git add .

# Make your first commit
git commit -m "Initial portfolio commit"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. Click **Pages** (left sidebar)
4. Under "Branch", select `main` → `/ (root)` → click **Save**
5. Wait 1–2 minutes, then visit: `https://YOUR_USERNAME.github.io/portfolio`

### Updating the site
Every time you make changes:
```bash
git add .
git commit -m "Update: describe what you changed"
git push
```
GitHub Pages will automatically rebuild within ~1 minute.

---

## 🔮 Future Enhancement Ideas

Once you're comfortable with the current build, here are upgrades to consider:

1. **Dark/light mode toggle** — add a sun/moon button that switches CSS variables
2. **Project filter tabs** — filter by HTML, CSS, JavaScript
3. **Animated skill bars or radial progress rings**
4. **Testimonials section** — add quotes from programme instructors or collaborators
5. **Blog/articles section** — link to your LinkedIn articles or YouTube videos
6. **Real contact form backend** — use EmailJS or Formspree to actually receive emails
7. **Loading screen** — a brief animated intro before the portfolio appears
8. **Lazy loading images** — images already use `loading="lazy"`, but consider blur-up placeholders

---

## 📌 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and semantics |
| CSS3 (Vanilla) | Styling, CSS variables, responsive layout |
| JavaScript (Vanilla) | Interactivity, animations, form validation |
| Remix Icons (CDN) | Icon library |
| Google Fonts (CDN) | Bebas Neue, Lato, JetBrains Mono |
| Intersection Observer API | Scroll animations, active nav detection |

No frameworks. No build tools. No dependencies to install.

---

## 📄 Licence

Personal portfolio — feel free to adapt for your own use.

---

*Built during the #BiP60 Build in Public challenge — Turing Tech LLC, Enugu Nigeria.*
