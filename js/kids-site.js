/* ==========================================================================
   Stilletos Kids — kids site renderer
   ========================================================================== */

window.STILLETOS_KIDS = (function () {
  const DATA = window.STILLETOS_DATA;
  let galleryTimer = null;
  let galleryIndex = 0;
  const guestCounts = { glam: "10", standard: "10" };

  function svgCheck() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  }
  function svgCart() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path></svg>';
  }
  function svgPlus() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
  }
  function svgStar() {
    return '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>';
  }

  function makeBubbles() {
    const field = document.getElementById("bubble-field");
    if (!field) return;
    let html = "";
    for (let i = 0; i < 32; i++) {
      const size = Math.round(Math.random() * 55 + 15);
      const left = Math.round(Math.random() * 100);
      const delay = (Math.random() * 8).toFixed(2);
      const duration = (Math.random() * 12 + 6).toFixed(2);
      html +=
        '<div class="k-bubble" style="width:' +
        size +
        "px;height:" +
        size +
        "px;left:" +
        left +
        "%;animation-delay:" +
        delay +
        "s;animation-duration:" +
        duration +
        's;"></div>';
    }
    field.innerHTML = html;
  }

  function packageCard(pkg, cardClass, accentClass) {
    const count = guestCounts[pkg.key];
    const price = pkg.prices[count];
    const countButtons = ["10", "15", "20"]
      .map(
        (c) =>
          '<button type="button" class="count-btn' +
          (c === count ? " active " + accentClass : "") +
          '" data-pkg="' +
          pkg.key +
          '" data-count="' +
          c +
          '">' +
          c +
          " Kids</button>"
      )
      .join("");
    const bullets = pkg.bullets
      .map((b) => "<li>" + svgCheck() + "<span>" + b + "</span></li>")
      .join("");

    return (
      '<div class="package-card ' +
      cardClass +
      '" data-pkg-card="' +
      pkg.key +
      '">' +
      '<div class="package-head">' +
      '<div class="package-head-title">' +
      svgStar() +
      pkg.name +
      svgStar() +
      "</div>" +
      '<div class="package-sub">' +
      pkg.title +
      "</div>" +
      '<div class="count-toggle-label">Select Guest Count:</div>' +
      '<div class="count-toggle" data-count-toggle="' +
      pkg.key +
      '">' +
      countButtons +
      "</div>" +
      '<div class="package-price-block">' +
      '<span class="package-price-label">Package Price:</span>' +
      '<span class="package-price" data-price-display="' +
      pkg.key +
      '">' +
      price +
      "</span>" +
      '<span class="package-price-note">*Prices exclude transport</span>' +
      "</div>" +
      "</div>" +
      '<div class="package-body">' +
      '<p class="package-blurb">' +
      pkg.blurb +
      "</p>" +
      '<div class="package-included-label">What\'s Included:</div>' +
      '<ul class="package-bullets">' +
      bullets +
      "</ul>" +
      "</div>" +
      '<div class="package-footer">' +
      '<div><div class="package-footer-label">Selected Option</div><div class="package-footer-value" data-selected-display="' +
      pkg.key +
      '">' +
      count +
      " Kids Package</div></div>" +
      '<button type="button" class="package-add-btn" data-pkg-add="' +
      pkg.key +
      '">' +
      svgPlus() +
      " Add Package to Cart</button>" +
      "</div>" +
      "</div>"
    );
  }

  function renderPackages() {
    const glam = DATA.KIDS_PACKAGES.find((p) => p.key === "glam");
    const standard = DATA.KIDS_PACKAGES.find((p) => p.key === "standard");
    const extras = DATA.KIDS_EXTRAS.map(
      (ex) =>
        '<div class="extra-card">' +
        '<span class="extra-tag">' +
        ex.badge +
        "</span>" +
        "<h4>" +
        ex.name +
        "</h4>" +
        "<p>" +
        ex.desc +
        "</p>" +
        '<div class="extra-price">+ ' +
        ex.price +
        "</div>" +
        "</div>"
    ).join("");

    return (
      '<div class="k-section-head">' +
      '<span class="k-badge">Incredible Pricing Packages</span>' +
      "<h2>Our Package Pricelist</h2>" +
      "<p>Fully customizable packages to fit your party goals.</p>" +
      "</div>" +
      '<div class="packages-grid">' +
      packageCard(glam, "glam", "glam-active") +
      packageCard(standard, "standard", "standard-active") +
      "</div>" +
      '<div class="extras-panel">' +
      '<div class="extras-head">' +
      '<span class="k-badge">Available Custom Add-ons</span>' +
      "<h3>Package Extras &amp; Enhancements</h3>" +
      "<p>Upgrade your selected Glam or Standard package with these stunning custom details.</p>" +
      "</div>" +
      '<div class="extras-grid">' +
      extras +
      "</div>" +
      "</div>"
    );
  }

  function renderRentals() {
    const cards = DATA.KIDS_RENTALS.map(
      (item) =>
        '<div class="k-rental-card">' +
        "<h4>" +
        item.name +
        "</h4><p>" +
        item.description +
        "</p>" +
        '<div class="k-rental-footer">' +
        '<span class="k-rental-price">' +
        item.price +
        "</span>" +
        '<button type="button" class="k-add-btn" data-rental-id="' +
        item.id +
        '">' +
        svgCart() +
        " Add to Quote</button>" +
        "</div>" +
        "</div>"
    ).join("");
    return (
      '<div class="k-section-head"><h2>Kiddies Equipment Rentals</h2><p>Add colorful themed tables, butterfly chairs, and castles directly to your quote.</p></div>' +
      '<div class="k-rentals-grid">' +
      cards +
      "</div>"
    );
  }

  function isVideoSrc(src) {
    return /\.mp4($|\?)/i.test(src);
  }

  function mediaTag(src, i) {
    const label = "Kiddies setup " + (i + 1);
    if (isVideoSrc(src)) {
      return (
        '<video class="k-gallery-media" data-kids-gallery-tile="' +
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
      '<img class="k-gallery-media" data-kids-gallery-tile="' +
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
    const tiles = Array.from({ length: 24 })
      .map((_, i) => {
        const src =
          DATA.KIDS_GALLERY_IMAGES[i % DATA.KIDS_GALLERY_IMAGES.length];
        return (
          '<div class="k-gallery-tile" data-kids-gallery-tile-wrap="' +
          i +
          '">' +
          mediaTag(src, i) +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="k-section-head"><h2>Kiddies Setup Gallery</h2><p>Bespoke thematic setups by the Stilletos Kids team. Tap any tile to view it larger.</p></div>' +
      '<div class="k-gallery-frame" data-kids-gallery-frame><div class="k-gallery-grid">' +
      tiles +
      "</div></div>" +
      '<p class="k-gallery-caption"><span class="pulse-dot-pink"></span>The gallery cycles automatically every 10 seconds</p>'
    );
  }

  function startGalleryCycle() {
    stopGalleryCycle();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    galleryTimer = setInterval(() => {
      galleryIndex = (galleryIndex + 1) % DATA.KIDS_GALLERY_IMAGES.length;
      document
        .querySelectorAll("#kids-site [data-kids-gallery-tile-wrap]")
        .forEach((wrap, i) => {
          const src =
            DATA.KIDS_GALLERY_IMAGES[
              (galleryIndex + i) % DATA.KIDS_GALLERY_IMAGES.length
            ];
          const current = wrap.querySelector(".k-gallery-media");
          if (current && current.getAttribute("data-src") === src) return;

          if (current) current.classList.add("media-fade-out");
          setTimeout(() => {
            wrap.innerHTML = mediaTag(src, i);
            const next = wrap.querySelector(".k-gallery-media");
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
    const frame = root.querySelector("[data-kids-gallery-frame]");
    if (!frame) return;
    frame.addEventListener("click", (e) => {
      const tile = e.target.closest("[data-kids-gallery-tile-wrap]");
      if (!tile) return;
      const media = tile.querySelector(".k-gallery-media");
      if (!media) return;
      const src = media.getAttribute("data-src") || media.getAttribute("src");
      const label =
        media.getAttribute("alt") || media.getAttribute("aria-label");
      window.STILLETOS_LIGHTBOX.open(src, label);
    });
  }

  function updatePackageDisplay(key) {
    const pkg = DATA.KIDS_PACKAGES.find((p) => p.key === key);
    const count = guestCounts[key];
    document.querySelector('[data-price-display="' + key + '"]').textContent =
      pkg.prices[count];
    document.querySelector(
      '[data-selected-display="' + key + '"]'
    ).textContent = count + " Kids Package";
    const toggle = document.querySelector('[data-count-toggle="' + key + '"]');
    toggle.querySelectorAll(".count-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-count") === count;
      btn.classList.toggle("active", isActive);
      btn.classList.toggle(
        key === "glam" ? "glam-active" : "standard-active",
        isActive
      );
    });
  }

  function bindDynamicButtons(root) {
    root.querySelectorAll("[data-count-toggle] .count-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pkgKey = btn.getAttribute("data-pkg");
        guestCounts[pkgKey] = btn.getAttribute("data-count");
        updatePackageDisplay(pkgKey);
      });
    });
    root.querySelectorAll("[data-pkg-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-pkg-add");
        const pkg = DATA.KIDS_PACKAGES.find((p) => p.key === key);
        const count = guestCounts[key];
        const price = pkg.prices[count];
        window.STILLETOS_CART.addPackage(pkg, count + " Kids - " + price);
      });
    });
    root.querySelectorAll("[data-rental-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rental = DATA.KIDS_RENTALS.find(
          (r) => r.id === btn.getAttribute("data-rental-id")
        );
        if (rental) window.STILLETOS_CART.addRental(rental);
      });
    });
    bindGalleryClicks(root);
  }

  function setTab(tab) {
    const navLinks = document.getElementById("kids-nav-links");
    if (navLinks) {
      navLinks
        .querySelectorAll(".tab-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.getAttribute("data-tab") === tab)
        );
    }
    const site = document.getElementById("kids-site");
    site
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.toggle("active", p.id === "k-panel-" + tab));
    if (tab === "gallery") startGalleryCycle();
    else stopGalleryCycle();
  }

  function init() {
    const site = document.getElementById("kids-site");
    if (!site) {
      console.error("Stilletos: #kids-site not found");
      return;
    }

    makeBubbles();

    const packagesPanel = document.getElementById("k-panel-packages");
    const rentalsPanel = document.getElementById("k-panel-rentals");
    const galleryPanel = document.getElementById("k-panel-gallery");

    if (packagesPanel) packagesPanel.innerHTML = renderPackages();
    if (rentalsPanel) rentalsPanel.innerHTML = renderRentals();
    if (galleryPanel) galleryPanel.innerHTML = renderGallery();

    bindDynamicButtons(site);

    const navLinks = document.getElementById("kids-nav-links");
    if (navLinks) {
      navLinks.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          setTab(btn.getAttribute("data-tab"));
          const content = document.getElementById("kids-content");
          if (content)
            content.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
    site.querySelectorAll("[data-goto-tab-hero]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTab(btn.getAttribute("data-goto-tab-hero"));
        const content = document.getElementById("kids-content");
        if (content)
          content.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  return { init, startGalleryCycle, stopGalleryCycle };
})();
