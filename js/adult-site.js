/* ==========================================================================
   Stilletos Decor — adult site renderer
   ========================================================================== */

window.STILLETOS_ADULT = (function () {
  const DATA = window.STILLETOS_DATA;
  let galleryTimer = null;
  let galleryIndex = 0;

  function svgCheck() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  }
  function svgCart() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path></svg>';
  }
  function svgCalendar() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';
  }

  function renderServices() {
    const cards = DATA.ADULT_SERVICES.map(
      (svc) =>
        '<div class="service-card">' +
        '<div class="service-media"><img src="' +
        svc.image +
        '" alt="' +
        svc.title +
        '" loading="lazy" referrerpolicy="no-referrer"></div>' +
        '<div class="service-body">' +
        "<div><h3>" +
        svc.title +
        "</h3><p>" +
        svc.description +
        "</p></div>" +
        '<ul class="service-features">' +
        svc.features
          .map((f) => "<li>" + svgCheck() + "<span>" + f + "</span></li>")
          .join("") +
        "</ul>" +
        "</div>" +
        "</div>"
    ).join("");

    return (
      '<div class="services-grid">' +
      cards +
      "</div>" +
      '<div class="quote-banner">' +
      "<h3>Planning a Special Event?</h3>" +
      "<p>Contact our lead styling and event coordinators. We custom curate table settings, luxury chairs, backdrops, and event setups for groups up to 350 people.</p>" +
      '<div class="quote-banner-actions">' +
      '<a class="btn btn-gold" href="' +
      DATA.BUSINESS_INFO.socials.whatsapp +
      '" target="_blank" rel="noreferrer">' +
      " Book Consultation</a>" +
      '<button type="button" class="btn btn-ghost-gold" data-goto-tab="rentals">Browse Rental Items</button>' +
      "</div>" +
      "</div>"
    );
  }

  function renderRentals() {
    const cards = DATA.ADULT_RENTALS.map(
      (item) =>
        '<div class="rental-card">' +
        "<div><h4>" +
        item.name +
        "</h4><p>" +
        item.description +
        "</p></div>" +
        '<div class="rental-footer">' +
        '<span class="rental-price">' +
        item.price +
        "</span>" +
        '<button type="button" class="add-btn" data-rental-id="' +
        item.id +
        '">' +
        svgCart() +
        " Add to Quote</button>" +
        "</div>" +
        "</div>"
    ).join("");
    return (
      '<div class="a-section-head"><h2>Premium Equipment Catalog</h2><p>Add items to your inquiry cart to compile a quick, direct quote request on WhatsApp.</p></div>' +
      '<div class="rentals-grid">' +
      cards +
      "</div>"
    );
  }

  function isVideoSrc(src) {
    return /\.mp4($|\?)/i.test(src);
  }

  function mediaTag(src, i) {
    const label = "Signature setup " + (i + 1);
    if (isVideoSrc(src)) {
      return (
        '<video class="gallery-media" data-gallery-tile="' +
        i +
        '" data-src="' +
        src +
        '" src="' +
        src +
        '" autoplay loop muted playsinline preload="metadata" aria-label="' +
        label +
        '"></video>'
      );
    }
    return (
      '<img class="gallery-media" data-gallery-tile="' +
      i +
      '" data-src="' +
      src +
      '" src="' +
      src +
      '" alt="' +
      label +
      '" loading="lazy" referrerpolicy="no-referrer">'
    );
  }

  function renderGallery() {
    const tiles = Array.from({ length: 21 })
      .map((_, i) => {
        const src =
          DATA.ADULT_GALLERY_IMAGES[i % DATA.ADULT_GALLERY_IMAGES.length];
        return (
          '<div class="gallery-tile" data-gallery-tile-wrap="' +
          i +
          '">' +
          mediaTag(src, i) +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="a-section-head"><h2>Our Signature Gallery</h2><p>Bespoke signature setups by the Stilletos Decor team. Tap any tile to view it larger.</p></div>' +
      '<div class="gallery-frame" data-gallery-frame><div class="gallery-grid">' +
      tiles +
      "</div></div>" +
      '<p class="gallery-caption"><span class="pulse-dot"></span>The gallery cycles automatically every 10 seconds</p>'
    );
  }

  function startGalleryCycle() {
    stopGalleryCycle();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    galleryTimer = setInterval(() => {
      galleryIndex = (galleryIndex + 1) % DATA.ADULT_GALLERY_IMAGES.length;
      document
        .querySelectorAll("#adult-site [data-gallery-tile-wrap]")
        .forEach((wrap, i) => {
          const src =
            DATA.ADULT_GALLERY_IMAGES[
              (galleryIndex + i) % DATA.ADULT_GALLERY_IMAGES.length
            ];
          const current = wrap.querySelector(".gallery-media");
          if (current && current.getAttribute("data-src") === src) return;

          if (current) current.classList.add("media-fade-out");
          setTimeout(() => {
            wrap.innerHTML = mediaTag(src, i);
            const next = wrap.querySelector(".gallery-media");
            if (!next) return;
            next.classList.add("media-fade-pending");
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                next.classList.remove("media-fade-pending");
              });
            });
          }, 1500);
        });
    }, 10000);
  }
  function stopGalleryCycle() {
    if (galleryTimer) {
      clearInterval(galleryTimer);
      galleryTimer = null;
    }
  }

  function bindGalleryClicks(root) {
    const frame = root.querySelector("[data-gallery-frame]");
    if (!frame) return;
    frame.addEventListener("click", (e) => {
      const tile = e.target.closest("[data-gallery-tile-wrap]");
      if (!tile) return;
      const media = tile.querySelector(".gallery-media");
      if (!media) return;
      const src = media.getAttribute("data-src") || media.getAttribute("src");
      const label =
        media.getAttribute("alt") || media.getAttribute("aria-label");
      window.STILLETOS_LIGHTBOX.open(src, label);
    });
  }

  function bindDynamicButtons(root) {
    root.querySelectorAll("[data-rental-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rental = DATA.ADULT_RENTALS.find(
          (r) => r.id === btn.getAttribute("data-rental-id")
        );
        if (rental) window.STILLETOS_CART.addRental(rental);
      });
    });
    root.querySelectorAll("[data-goto-tab]").forEach((btn) => {
      btn.addEventListener("click", () =>
        setTab(btn.getAttribute("data-goto-tab"))
      );
    });
    bindGalleryClicks(root);
  }

  function setTab(tab) {
    const navLinks = document.getElementById("adult-nav-links");
    if (navLinks) {
      navLinks
        .querySelectorAll(".tab-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.getAttribute("data-tab") === tab)
        );
    }
    const site = document.getElementById("adult-site");
    site
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.toggle("active", p.id === "a-panel-" + tab));
    if (tab === "gallery") startGalleryCycle();
    else stopGalleryCycle();
  }

  function init() {
    const site = document.getElementById("adult-site");
    if (!site) {
      console.error("Stilletos: #adult-site not found");
      return;
    }

    const servicesPanel = document.getElementById("a-panel-services");
    const rentalsPanel = document.getElementById("a-panel-rentals");
    const galleryPanel = document.getElementById("a-panel-gallery");

    if (servicesPanel) servicesPanel.innerHTML = renderServices();
    if (rentalsPanel) rentalsPanel.innerHTML = renderRentals();
    if (galleryPanel) galleryPanel.innerHTML = renderGallery();

    bindDynamicButtons(site);

    const navLinks = document.getElementById("adult-nav-links");
    if (navLinks) {
      navLinks.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          setTab(btn.getAttribute("data-tab"));
          const content = document.getElementById("adult-content");
          if (content)
            content.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
    site.querySelectorAll("[data-goto-tab-hero]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTab(btn.getAttribute("data-goto-tab-hero"));
        const content = document.getElementById("adult-content");
        if (content)
          content.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  return { init, startGalleryCycle, stopGalleryCycle };
})();
