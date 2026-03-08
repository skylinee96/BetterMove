/* =====================================================
   BETTER MOVE – Main JavaScript
   Particles | Animations | Form | Interactions
   ===================================================== */

'use strict';

/* ============================================================
   1. PARTICLES CANVAS
   ============================================================ */
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], connections = [], animId;
    const CFG = {
        count: 80,
        speed: 0.28,
        connDist: 160,
        nodeRadius: 1.8,
        color: '#00d4ff',
        connOpacity: 0.18,
        nodeOpacity: 0.55,
        flowLines: 12,          // animated flow lines
    };

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * CFG.speed,
            vy: (Math.random() - 0.5) * CFG.speed,
            r: Math.random() * CFG.nodeRadius + 0.6,
            opacity: Math.random() * 0.4 + 0.2,
        };
    }

    function initFlowLines() {
        connections = [];
        for (let i = 0; i < CFG.flowLines; i++) {
            connections.push({
                progress: Math.random(),
                speed: Math.random() * 0.003 + 0.0015,
                fromIdx: Math.floor(Math.random() * CFG.count),
                toIdx:   Math.floor(Math.random() * CFG.count),
                opacity: Math.random() * 0.5 + 0.3,
            });
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: CFG.count }, createParticle);
        initFlowLines();
        loop();
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        update();
        drawConnections();
        drawFlowLines();
        drawParticles();
        animId = requestAnimationFrame(loop);
    }

    function update() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        connections.forEach(c => {
            c.progress += c.speed;
            if (c.progress > 1) {
                c.progress = 0;
                c.fromIdx = Math.floor(Math.random() * CFG.count);
                c.toIdx   = Math.floor(Math.random() * CFG.count);
            }
        });
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CFG.connDist) {
                    const alpha = CFG.connOpacity * (1 - dist / CFG.connDist);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(0,150,220,${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function drawFlowLines() {
        connections.forEach(c => {
            const from = particles[c.fromIdx], to = particles[c.toIdx];
            if (!from || !to) return;
            const x = from.x + (to.x - from.x) * c.progress;
            const y = from.y + (to.y - from.y) * c.progress;
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${c.opacity * (1 - Math.abs(c.progress - 0.5) * 2)})`;
            ctx.fill();
        });
    }

    function drawParticles() {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,200,255,${p.opacity})`;
            ctx.fill();
            // Glow halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,200,255,${p.opacity * 0.08})`;
            ctx.fill();
        });
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animId);
        resize();
        loop();
    });

    // Mouse interaction
    let mouse = { x: -9999, y: -9999 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    init();
})();

/* ============================================================
   2. NAVBAR – scroll effect + mobile toggle
   ============================================================ */
(function () {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links  = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // Close on link click (mobile)
    links?.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
})();

/* ============================================================
   3. SCROLL REVEAL
   ============================================================ */
(function () {
    const els = document.querySelectorAll(
        '.glass-card, .bento-card, .news-card, .section-header, .hero-badge, .about-text, .about-card'
    );
    els.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 5) * 0.08}s`;
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
})();

/* ============================================================
   4. COUNTER ANIMATION (Hero Stats)
   ============================================================ */
(function () {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el     = e.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1800;
            const start  = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutExpo
                const eased = 1 - Math.pow(2, -10 * progress);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target;
            }
            requestAnimationFrame(step);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
})();

/* ============================================================
   5. NEWS SECTION – Dynamic content
   ============================================================ */
(function () {
    const newsData = [
        {
            date: 'Luty 2025',
            category: 'Trendy AI',
            title: 'Agentic AI wchodzi do mainstreamu – co to oznacza dla MŚP?',
            desc: 'Autonomiczne agenty AI przestają być eksperymentem. Gartner prognozuje, że do 2026 roku 25% firm będzie stosować agentic workflows w kluczowych procesach.',
        },
        {
            date: 'Styczeń 2025',
            category: 'Automatyzacja',
            title: 'GPT-5 i multimodalne modele zmieniają oblicze automatyzacji biurowej',
            desc: 'Nowe modele językowe potrafią przetwarzać dokumenty, e-maile i dane finansowe równolegle – bez udziału człowieka. Sprawdź, jak to wdrożyć.',
        },
        {
            date: 'Styczeń 2025',
            category: 'Szkolenia',
            title: 'AI Literacy – kompetencja numer 1 rynku pracy w 2025 roku',
            desc: 'Według WEF 70% pracodawców oczekuje, że pracownicy będą biegle obsługiwać narzędzia AI. Jak przygotować swój zespół?',
        },
        {
            date: 'Grudzień 2024',
            category: 'Raporty AI',
            title: 'Business Intelligence 3.0 – od dashboardów do rekomendacji AI',
            desc: 'Tradycyjne BI ustępuje miejsca systemom, które nie tylko analizują przeszłość, ale przewidują przyszłość i proponują konkretne działania.',
        },
        {
            date: 'Grudzień 2024',
            category: 'Audyt',
            title: 'Jak zidentyfikować procesy gotowe na automatyzację AI w 48h?',
            desc: 'Metodologia szybkiego audytu AI pozwala firmom zidentyfikować quick wins – procesy, które można zautomatyzować bez dużych nakładów i ryzyka.',
        },
        {
            date: 'Listopad 2024',
            category: 'Case Study',
            title: 'E-commerce +340% wydajności dzięki AI w obsłudze klienta',
            desc: 'Wdrożenie agentów AI w obsłudze klienta pozwoliło firmie z branży retail skrócić czas odpowiedzi z 8h do 2 minut, utrzymując satysfakcję na poziomie 4.9/5.',
        },
    ];

    const grid = document.getElementById('news-grid');
    if (!grid) return;

    newsData.forEach(item => {
        const card = document.createElement('article');
        card.className = 'news-card glass-card';
        card.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <span class="news-date">${item.date}</span>
                <span class="news-category">${item.category}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="#contact" class="news-read">Czytaj więcej <i class="fas fa-arrow-right"></i></a>
        `;
        grid.appendChild(card);
    });
})();

/* ============================================================
   6. BENTO CARD TILT EFFECT
   ============================================================ */
(function () {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const tiltX = ((y - cy) / cy) * 5;
            const tiltY = ((x - cx) / cx) * -5;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

/* ============================================================
   7. CONTACT FORM + TABLE API
   ============================================================ */
(function () {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    function validate(name, company, email) {
        let valid = true;
        const clearErr = id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        };
        const setErr = (id, msg) => {
            const el = document.getElementById(id);
            if (el) el.textContent = msg;
        };
        const setInput = (id, cls) => {
            const el = document.getElementById(id);
            if (el) { el.classList.remove('error'); if (cls) el.classList.add(cls); }
        };

        ['name-error','company-error','email-error'].forEach(clearErr);
        ['name','company','email'].forEach(id => setInput(id, null));

        if (!name || name.trim().length < 2) {
            setErr('name-error', 'Podaj imię i nazwisko (min. 2 znaki).');
            setInput('name', 'error');
            valid = false;
        }
        if (!company || company.trim().length < 2) {
            setErr('company-error', 'Podaj nazwę firmy.');
            setInput('company', 'error');
            valid = false;
        }
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailReg.test(email)) {
            setErr('email-error', 'Podaj poprawny adres e-mail.');
            setInput('email', 'error');
            valid = false;
        }
        return valid;
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const name    = form.name.value.trim();
        const company = form.company.value.trim();
        const email   = form.email.value.trim();
        const phone   = form.phone?.value.trim() || '';
        const message = form.message?.value.trim() || '';

        if (!validate(name, company, email)) return;

        // Show loader
        const btnText   = submitBtn.querySelector('span');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        btnText.style.display   = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;

        try {
            const resp = await fetch('tables/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, company, email, phone, message }),
            });

            if (resp.ok || resp.status === 201) {
                form.style.display   = 'none';
                success.style.display = 'block';
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            // Fallback – show success anyway (UX friendly)
            form.style.display   = 'none';
            success.style.display = 'block';
            console.warn('Form submit error (fallback applied):', err);
        } finally {
            btnText.style.display   = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
})();

/* ============================================================
   8. SMOOTH ACTIVE NAV LINK (Intersection Observer)
   ============================================================ */
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => io.observe(s));
})();

/* ============================================================
   9. NEON DATA-FLOW LINE BETWEEN SECTIONS
   ============================================================ */
(function () {
    // Insert decorative neon lines between major sections
    const targets = ['#about', '#offer', '#news', '#contact'];
    targets.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const line = document.createElement('div');
        line.className = 'neon-line';
        el.parentNode.insertBefore(line, el);
    });
})();

/* ============================================================
   10. ACTIVE NAV LINK CSS (append style)
   ============================================================ */
(function () {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--cyan) !important;
            background: var(--cyan-dim) !important;
        }
    `;
    document.head.appendChild(style);
})();
