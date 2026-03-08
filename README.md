# BetterMove# Better Move – AI Landing Page

## Opis projektu
Profesjonalna strona landing page / portfolio dla firmy **Better Move** – specjalistów od wdrożeń AI i automatyzacji procesów biznesowych (MŚP). Strona zbudowana w stylistyce **Dark Mode + Glassmorphism** z animowanym tłem particle canvas, neonowymi efektami glow i pełnym RWD (Mobile First).

---

## ✅ Zrealizowane funkcjonalności

| Sekcja | Opis |
|--------|------|
| **Navbar** | Sticky navigation z efektem blur po scrollu, aktywne linki, hamburger menu (mobile) |
| **Hero** | Animowany SVG neural network, particles canvas, liczniki statystyk z animacją, CTA buttons |
| **O nas** | Glass cards z ikonami SVG, historia i misja firmy |
| **Oferta (Bento Grid)** | 5 kart usług: Agentic Workflows, Szkolenia, Audyt, Raporty AI, Integracje |
| **Aktualności** | 6 dynamicznie renderowanych kart z rynku AI |
| **Kontakt** | Formularz lead magnet (Name, Company, Email, Phone, Message) z walidacją i zapisem do API |
| **Footer** | Linki nawigacyjne, branding, social media |

### Efekty wizualne
- ✅ Animowane tło – canvas particles z flow pulses
- ✅ Glassmorphism – `backdrop-filter: blur` na wszystkich kartach
- ✅ Neon glow – cyan/blue na przyciskach, ikonach, hover efektach
- ✅ SVG Neural Network z animowanymi przepływami danych (animateMotion)
- ✅ Tilt 3D na kartach Bento Grid (JavaScript)
- ✅ Scroll reveal (IntersectionObserver)
- ✅ Counter animation na statystykach Hero
- ✅ Aktywne linki nawigacyjne podczas scrollowania
- ✅ Neon divider lines między sekcjami

---

## 📁 Struktura plików

```
index.html          ← Główna strona
css/
  style.css         ← Wszystkie style (Dark Mode, Glassmorphism, Animations, RWD)
js/
  main.js           ← JS: Particles, Navbar, Reveal, Form, Tilt, News
README.md
```

---

## 🗄️ Baza danych (Table API)

### Tabela: `contacts`
Zbiera leady z formularza kontaktowego.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | text | UUID rekordu |
| `name` | text | Imię i Nazwisko |
| `company` | text | Nazwa firmy |
| `email` | text | Adres e-mail |
| `phone` | text | Telefon (opcjonalny) |
| `message` | rich_text | Opis wyzwania biznesowego |
| `status` | text | Status leadu: new / contacted / qualified / closed |

### Endpointy API
- `GET tables/contacts` – lista kontaktów
- `POST tables/contacts` – zapis nowego leadu (formularz)
- `PATCH tables/contacts/{id}` – aktualizacja statusu
- `DELETE tables/contacts/{id}` – usunięcie

---

## 🚀 Jak wdrożyć

Przejdź do zakładki **Publish**, aby opublikować stronę i otrzymać publiczny URL.

---

## 📋 Rekomendowane kolejne kroki

1. **Dodanie bloga / CMS** – integracja z Contentful lub Notion API
2. **Rozbudowa sekcji Case Studies** – dedykowane podstrony z opisem projektów
3. **Chatbot AI** – widget czatu oparty na LLM (np. integracja przez publiczne API)
4. **Analytics** – Google Analytics 4 lub Plausible
5. **SEO** – Open Graph tags, sitemap.xml, robots.txt
6. **Animacje wideo** – zastąpienie SVG neural network animacją Lottie lub WebGL Three.js

---

## 🎨 Design System

| Zmienna | Wartość |
|---------|---------|
| `--bg-primary` | `#050508` |
| `--cyan` | `#00d4ff` |
| `--blue-royal` | `#1a6fc4` |
| `--glass-bg` | `rgba(8,16,32,0.6)` |
| `--font-main` | Inter, Montserrat |

---

*Better Move © 2025 | Powered by AI*
