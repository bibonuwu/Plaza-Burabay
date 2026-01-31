/* ===========================
   SULTAN PLAZA BOROVOE
   Vanilla JS: nav, reveal, hero parallax, accordion, active menu, price toggle
   =========================== */

(function () {
    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* -------- Helpers -------- */
    const formatKZT = (n) => {
        const x = Number(n);
        if (!Number.isFinite(x)) return String(n ?? "");
        // space thousands: 130000 -> "130 000"
        return x.toLocaleString("ru-RU").replace(/\u00A0/g, " ");
    };

    /* -------- Mobile nav -------- */
    const header = document.querySelector("[data-header]");
    const nav = document.querySelector("[data-nav]");
    const navToggle = document.querySelector("[data-nav-toggle]");

    function closeNav() {
        if (!header || !navToggle) return;
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }
    function openNav() {
        if (!header || !navToggle) return;
        header.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
    }

    if (navToggle && header) {
        navToggle.addEventListener("click", () => {
            header.classList.contains("is-open") ? closeNav() : openNav();
        });
    }

    if (nav) {
        nav.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (a) closeNav();
        });
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeNav();
    });

    window.addEventListener("click", (e) => {
        if (!header || !header.classList.contains("is-open")) return;
        if (!header.contains(e.target)) closeNav();
    });

    /* -------- Scroll reveal -------- */
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* -------- Hero parallax (very subtle) -------- */
    const heroBg = document.querySelector(".hero-bg");
    function onScroll() {
        if (!heroBg) return;
        const y = window.scrollY || 0;
        heroBg.style.transform = `scale(1.02) translateY(${Math.min(y * 0.03, 18)}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* -------- Accordion -------- */
    document.querySelectorAll("[data-accordion]").forEach((wrap) => {
        wrap.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-acc-btn]");
            if (!btn) return;

            const item = btn.closest("[data-acc-item]");
            const panel = item?.querySelector("[data-acc-panel]");
            if (!item || !panel) return;

            const isOpen = item.classList.toggle("is-open");
            btn.setAttribute("aria-expanded", String(isOpen));
            panel.hidden = !isOpen;
        });
    });

    /* -------- Active menu highlight for sections (index only) -------- */
    const navLinks = Array.from(document.querySelectorAll("[data-navlink]"));
    const sectionIds = navLinks
        .map(a => (a.getAttribute("href") || "").trim())
        .filter(h => h.startsWith("#"))
        .map(h => h.slice(1));

    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActive(id) {
        navLinks.forEach(a => {
            const href = a.getAttribute("href") || "";
            a.classList.toggle("is-active", href === `#${id}`);
        });
    }

    if ("IntersectionObserver" in window && sections.length) {
        const secObs = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) setActive(visible.target.id);
        }, { threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -55% 0px" });

        sections.forEach(s => secObs.observe(s));
    }

    /* -------- Price toggle (rooms + room pages) -------- */
    const STORAGE_KEY = "sp_rate_plan";
    const toggleWraps = Array.from(document.querySelectorAll("[data-price-toggle]"));
    const priceEls = Array.from(document.querySelectorAll("[data-price]"));

    const applyPlan = (plan) => {
        // buttons state
        toggleWraps.forEach((wrap) => {
            const btns = Array.from(wrap.querySelectorAll(".seg-btn"));
            btns.forEach((b) => {
                const isActive = b.getAttribute("data-plan") === plan;
                b.classList.toggle("is-active", isActive);
                b.setAttribute("aria-pressed", String(isActive));
            });
        });

        // prices
        priceEls.forEach((el) => {
            const v = plan === "full" ? el.getAttribute("data-full") : el.getAttribute("data-breakfast");
            if (v == null) return;
            el.textContent = formatKZT(v);
        });

        try { localStorage.setItem(STORAGE_KEY, plan); } catch (_) { }
    };

    if (toggleWraps.length && (priceEls.length || toggleWraps.length)) {
        let plan = "breakfast";
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "full" || saved === "breakfast") plan = saved;
        } catch (_) { }

        applyPlan(plan);

        toggleWraps.forEach((wrap) => {
            wrap.addEventListener("click", (e) => {
                const btn = e.target.closest(".seg-btn");
                if (!btn) return;
                const next = btn.getAttribute("data-plan");
                if (next !== "full" && next !== "breakfast") return;
                applyPlan(next);
            });
        });
    }
})();
