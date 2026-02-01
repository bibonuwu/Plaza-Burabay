/* =========================================================
   rooms.js Ч Rooms only
   Price toggle: Breakfast / Full board
   ========================================================= */

(function () {
    const qs = (s, el = document) => el.querySelector(s);
    const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

    function initPriceToggle() {
        const buttons = qsa("[data-plan-btn]");
        const cards = qsa(".room-card");

        if (!buttons.length || !cards.length) return;

        const setActive = (plan) => {
            buttons.forEach((btn) => {
                const isActive = btn.dataset.plan === plan;
                btn.classList.toggle("is-active", isActive);
                btn.setAttribute("aria-selected", String(isActive));
            });

            cards.forEach((card) => {
                const priceEl = qs(".js-price-value", card);
                if (!priceEl) return;

                // Cottage or missing values => "по запросу"
                const breakfast = card.dataset.breakfast?.trim();
                const fullboard = card.dataset.fullboard?.trim();

                if (!breakfast || !fullboard) {
                    priceEl.textContent = "по запросу";
                    return;
                }

                priceEl.textContent = plan === "fullboard" ? fullboard : breakfast;
            });
        };

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => setActive(btn.dataset.plan));
        });

        // Default
        setActive("breakfast");
    }

    document.addEventListener("DOMContentLoaded", initPriceToggle);
})();
