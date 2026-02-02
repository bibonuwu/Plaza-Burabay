/* rooms.js — meal plan toggle (Breakfast / Full board) */
(function () {
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  function getLang(){
    const saved = localStorage.getItem("lang");
    return saved || "ru";
  }

  function onRequestLabel(){
    const lang = getLang();
    if (lang === "en") return "On request";
    if (lang === "kk") return "Сұрау бойынша";
    return "По запросу";
  }

  function setPlan(plan){
    qsa("[data-plan-btn]").forEach(btn=>{
      const active = btn.getAttribute("data-plan") === plan;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    qsa(".room-card").forEach(card=>{
      const b = card.getAttribute("data-breakfast") || "";
      const f = card.getAttribute("data-fullboard") || "";
      const out = qs(".js-price-value", card);
      if (!out) return;

      if (!b && !f){
        out.textContent = onRequestLabel();
        return;
      }

      const val = (plan === "fullboard") ? f : b;
      out.textContent = val;
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    const buttons = qsa("[data-plan-btn]");
    if (!buttons.length) return;

    let plan = "breakfast";
    setPlan(plan);

    buttons.forEach(btn=>{
      btn.addEventListener("click", ()=>{
        plan = btn.getAttribute("data-plan");
        setPlan(plan);
      });
    });

    // If language changes, update "on request" label without breaking prices
    window.addEventListener("storage", (e)=>{
      if (e.key === "lang") setPlan(plan);
    });
  });
})();