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

  // ---------- Mobile nav sidebar ----------
  // Rather than duplicating markup (and click handlers) for a second copy of
  // the nav links, the real #adult-nav-links / #kids-nav-links elements are
  // physically relocated between the desktop header row and the mobile
  // sidebar depending on viewport width. Their existing hidden-toggle logic
  // (driven by updateHeaderForExperience) keeps working unchanged either way.
  const desktopNavQuery = window.matchMedia("(min-width: 861px)");

  function relocateNavLinks() {
    const headerNavSlot = document.getElementById("header-nav-slot");
    const sidebarLinks = document.getElementById("nav-sidebar-links");
    const adultLinks = document.getElementById("adult-nav-links");
    const kidsLinks = document.getElementById("kids-nav-links");
    if (!headerNavSlot || !sidebarLinks || !adultLinks || !kidsLinks) return;

    const target = desktopNavQuery.matches ? headerNavSlot : sidebarLinks;
    if (adultLinks.parentElement !== target) target.appendChild(adultLinks);
    if (kidsLinks.parentElement !== target) target.appendChild(kidsLinks);
  }

  function openNavSidebar() {
    const sidebar = document.getElementById("nav-sidebar");
    const backdrop = document.getElementById("nav-sidebar-backdrop");
    const hamburger = document.getElementById("nav-hamburger");
    if (sidebar) sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-sidebar-open");
  }
  function closeNavSidebar() {
    const sidebar = document.getElementById("nav-sidebar");
    const backdrop = document.getElementById("nav-sidebar-backdrop");
    const hamburger = document.getElementById("nav-hamburger");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-sidebar-open");
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

    closeNavSidebar();

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
      if (next === "kids" && window.STILLETOS_KIDS) {
        safeInit("bubble rise recalculation", function () {
          window.STILLETOS_KIDS.updateBubbleRise();
        });
      }
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

  // ---------- Permanent video mute ----------
  // 'volumechange' does not bubble, but a capture-phase listener still
  // fires for it, so this single listener catches every video on the page
  // (gallery tiles + lightbox), present now or added later.
  function initForcedMute() {
    document.addEventListener(
      "volumechange",
      (e) => {
        const el = e.target;
        if (el instanceof HTMLMediaElement && !el.muted) {
          el.muted = true;
        }
      },
      true
    );
  }

  function initNavSidebar() {
    relocateNavLinks();
    if (desktopNavQuery.addEventListener) {
      desktopNavQuery.addEventListener("change", relocateNavLinks);
    } else if (desktopNavQuery.addListener) {
      // Safari < 14 fallback
      desktopNavQuery.addListener(relocateNavLinks);
    }

    const hamburger = document.getElementById("nav-hamburger");
    const closeBtn = document.getElementById("nav-sidebar-close");
    const backdrop = document.getElementById("nav-sidebar-backdrop");
    const sidebarLinks = document.getElementById("nav-sidebar-links");

    if (hamburger) hamburger.addEventListener("click", openNavSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeNavSidebar);
    if (backdrop) backdrop.addEventListener("click", closeNavSidebar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNavSidebar();
    });
    // Close the sidebar once a link inside it is tapped, so picking a
    // section doesn't leave the drawer sitting open over the page.
    if (sidebarLinks) {
      sidebarLinks.addEventListener("click", (e) => {
        if (e.target.closest(".tab-btn")) closeNavSidebar();
      });
    }
  }

  function init() {
    safeInit("cart", window.STILLETOS_CART.init);
    safeInit("lightbox", window.STILLETOS_LIGHTBOX.init);
    safeInit("adult site", window.STILLETOS_ADULT.init);
    safeInit("kids site", window.STILLETOS_KIDS.init);
    safeInit("nav sidebar", initNavSidebar);
    safeInit("forced video mute", initForcedMute);

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
