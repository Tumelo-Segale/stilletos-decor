/* ==========================================================================
   Stilletos Decor — app controller
   Wires up the adult/kids experience toggle (with curtain transition)
   and boots the cart + both site renderers.
   ========================================================================== */

(function () {
  let experience = "adult";
  let isTransitioning = false;

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setSrc(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
  }
  function setTitle(id, title) {
    const el = document.getElementById(id);
    if (el) el.title = title;
  }

  function updateHeaderForExperience(exp) {
    const isKids = exp === "kids";
    setSrc(
      "header-logo",
      isKids
        ? "assets/images/StilletosKidsLogo.jpeg"
        : "assets/images/StilletosLogo.jpeg"
    );
    setText("header-brand-name", isKids ? "Stilletos Kids" : "Stilletos Decor");
    setText(
      "header-brand-sub",
      isKids ? "Themed Party Planner" : "Styling & Rentals"
    );
    setSrc(
      "footer-logo",
      isKids
        ? "assets/images/StilletosKidsLogo.jpeg"
        : "assets/images/StilletosLogo.jpeg"
    );
    setText(
      "footer-brand-title",
      isKids ? "Stilletos Kids" : "Stilletos Decor"
    );

    // Toggle button shows the OTHER experience's logo/hint, so tapping it makes sense
    setSrc(
      "toggle-btn-img",
      isKids
        ? "assets/images/StilletosLogo.jpeg"
        : "assets/images/StilletosKidsLogo.jpeg"
    );
    setText(
      "toggle-hint-small",
      isKids ? "Go to Elegant Decor" : "Go to Kids Parties"
    );
    setText(
      "toggle-hint-strong",
      isKids ? "Stilletos Decor" : "Stilletos Kids"
    );
    setTitle(
      "experience-toggle",
      isKids ? "Switch to Adult Styling" : "Switch to Kids Party Planner"
    );

    const adultSite = document.getElementById("adult-site");
    const kidsSite = document.getElementById("kids-site");
    if (adultSite) adultSite.classList.toggle("active", !isKids);
    if (kidsSite) kidsSite.classList.toggle("active", isKids);

    const adultNavLinks = document.getElementById("adult-nav-links");
    const kidsNavLinks = document.getElementById("kids-nav-links");
    if (adultNavLinks) adultNavLinks.hidden = isKids;
    if (kidsNavLinks) kidsNavLinks.hidden = !isKids;

    document.body.classList.toggle("experience-kids", isKids);
    document.body.classList.toggle("experience-adult", !isKids);

    // pause/resume gallery auto-cycling for the panel that's now hidden/visible
    if (isKids) {
      if (window.STILLETOS_ADULT) window.STILLETOS_ADULT.stopGalleryCycle();
      const activeKidsTab = document.querySelector(
        "#kids-site .tab-btn.active"
      );
      if (
        window.STILLETOS_KIDS &&
        activeKidsTab &&
        activeKidsTab.getAttribute("data-tab") === "gallery"
      )
        window.STILLETOS_KIDS.startGalleryCycle();
    } else {
      if (window.STILLETOS_KIDS) window.STILLETOS_KIDS.stopGalleryCycle();
      const activeAdultTab = document.querySelector(
        "#adult-site .tab-btn.active"
      );
      if (
        window.STILLETOS_ADULT &&
        activeAdultTab &&
        activeAdultTab.getAttribute("data-tab") === "gallery"
      )
        window.STILLETOS_ADULT.startGalleryCycle();
    }
  }

  function switchExperience() {
    if (isTransitioning) return;
    isTransitioning = true;
    const next = experience === "adult" ? "kids" : "adult";

    const curtain = document.getElementById("curtain");
    if (curtain) {
      curtain.classList.remove("to-kids", "to-adult");
      curtain.classList.add(next === "kids" ? "to-kids" : "to-adult");
      curtain.classList.add("run");
    }
    setText(
      "curtain-title",
      next === "kids" ? "Stilletos Kids" : "Stilletos Decor"
    );
    setText(
      "curtain-caption",
      next === "kids"
        ? "PREPARING THE WONDERLAND…"
        : "LOADING SIGNATURE TABLESCAPES…"
    );

    setTimeout(() => {
      experience = next;
      safeInit("header theming (toggle)", function () {
        updateHeaderForExperience(experience);
      });
    }, 750);

    setTimeout(() => {
      if (curtain) curtain.classList.remove("run");
      isTransitioning = false;
    }, 1500);
  }

  // Run each module's init independently: if one throws (bad data, a
  // missing element, a browser quirk), the others still run instead of the
  // whole page silently ending up with dead buttons.
  function safeInit(label, fn) {
    try {
      fn();
    } catch (err) {
      console.error("Stilletos: " + label + " failed to initialize", err);
    }
  }

  function init() {
    safeInit("cart", window.STILLETOS_CART.init);
    safeInit("lightbox", window.STILLETOS_LIGHTBOX.init);
    safeInit("adult site", window.STILLETOS_ADULT.init);
    safeInit("kids site", window.STILLETOS_KIDS.init);

    const toggleBtn = document.getElementById("experience-toggle");
    if (toggleBtn) toggleBtn.addEventListener("click", switchExperience);

    safeInit("header theming", function () {
      updateHeaderForExperience(experience);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
