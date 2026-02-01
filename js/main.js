/* =========================================================
   main.js — common interactions (vanilla)
   - sticky header blur
   - mobile burger menu (drawer)
   - scroll reveal (IntersectionObserver)
   ========================================================= */

(function () {
    const qs = (s, el = document) => el.querySelector(s);
    const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

    function setYear() {
        const yearEl = qs("[data-year]");
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    }

    function stickyHeader() {
        const header = qs("[data-header]");
        if (!header) return;

        let ticking = false;

        const update = () => {
            const isScrolled = window.scrollY > 8;
            header.classList.toggle("is-scrolled", isScrolled);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    function mobileDrawer() {
        const burger = qs("[data-burger]");
        const drawer = qs("[data-drawer]");
        const closeBtns = qsa("[data-drawer-close]");
        const body = document.body;

        if (!burger || !drawer) return;

        const open = () => {
            drawer.classList.add("is-open");
            drawer.setAttribute("aria-hidden", "false");
            burger.setAttribute("aria-expanded", "true");
            body.classList.add("no-scroll");
        };

        const close = () => {
            drawer.classList.remove("is-open");
            drawer.setAttribute("aria-hidden", "true");
            burger.setAttribute("aria-expanded", "false");
            body.classList.remove("no-scroll");
        };

        burger.addEventListener("click", () => {
            const isOpen = drawer.classList.contains("is-open");
            isOpen ? close() : open();
        });

        closeBtns.forEach((btn) => btn.addEventListener("click", close));

        // Close on Escape
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
        });

        // Close when clicking a link in drawer
        qsa(".drawer .nav__link").forEach((a) => a.addEventListener("click", close));
    }

    function scrollReveal() {
        const items = qsa("[data-reveal]");
        if (!items.length) return;

        // If reduced motion, show all
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            items.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
        );

        items.forEach((el) => io.observe(el));
    }

    // Prevent background scroll when drawer open
    function lockBodyScrollCSS() {
        const style = document.createElement("style");
        style.textContent = `
      body.no-scroll { overflow: hidden; }
    `;
        document.head.appendChild(style);
    }

    document.addEventListener("DOMContentLoaded", () => {
        lockBodyScrollCSS();
        setYear();
        stickyHeader();
        mobileDrawer();
        scrollReveal();
    });
})();
