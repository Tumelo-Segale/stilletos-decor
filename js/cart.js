/* ==========================================================================
   Stilletos Decor — quote cart
   Handles cart state, localStorage persistence, drawer rendering,
   and building the WhatsApp inquiry message.
   ========================================================================== */

window.STILLETOS_CART = (function () {
  const STORAGE_KEY = "stilletos_cart";
  const DATA = window.STILLETOS_DATA;

  let items = []; // { id, name, price, category, type: 'rental'|'package', qty, option }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      items = [];
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* storage unavailable */
    }
  }

  function findIndex(id, option) {
    return items.findIndex(
      (it) => it.id === id && (it.option || "") === (option || "")
    );
  }

  function totalCount() {
    return items.reduce((sum, it) => sum + it.qty, 0);
  }

  function addRental(rental) {
    const idx = findIndex(rental.id, undefined);
    if (idx > -1) {
      items[idx].qty += 1;
    } else {
      items.push({
        id: rental.id,
        name: rental.name,
        price: rental.price,
        category: rental.category,
        type: "rental",
        qty: 1,
        option: null,
      });
    }
    persist();
    render();
    showToast(rental.name + " added to your quote");
    openDrawer();
  }

  function addPackage(pkg, optionLabel) {
    const idx = findIndex(pkg.key, optionLabel);
    if (idx > -1) {
      items[idx].qty += 1;
    } else {
      items.push({
        id: pkg.key,
        name: pkg.name,
        price: null,
        category: "package",
        type: "package",
        qty: 1,
        option: optionLabel,
      });
    }
    persist();
    render();
    showToast(pkg.name + " added to your quote");
    openDrawer();
  }

  function removeItem(id, option) {
    const idx = findIndex(id, option);
    if (idx > -1) {
      items.splice(idx, 1);
      persist();
      render();
    }
  }

  function updateQty(id, option, qty) {
    if (qty <= 0) {
      removeItem(id, option);
      return;
    }
    const idx = findIndex(id, option);
    if (idx > -1) {
      items[idx].qty = qty;
      persist();
      render();
    }
  }

  function clearAll() {
    items = [];
    persist();
    render();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function svgTrash() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path></svg>';
  }
  function svgMinus() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
  }
  function svgPlus() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
  }
  function svgBag() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>';
  }
  function svgSend() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
  }
  function svgCheck() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  }

  function render() {
    const badgeEls = document.querySelectorAll(".cart-badge");
    const count = totalCount();
    badgeEls.forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });

    const list = document.getElementById("cart-list");
    const footer = document.getElementById("cart-footer");
    if (!list) return;

    if (items.length === 0) {
      list.innerHTML =
        '<div class="cart-empty">' +
        '<div class="cart-empty-icon">' +
        svgBag() +
        "</div>" +
        "<p>Your inquiry cart is empty</p>" +
        "<p>Add items from equipment rentals or kid packages to build a custom quote request.</p>" +
        "</div>";
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    list.innerHTML = items
      .map((it) => {
        const key = it.id + "|" + (it.option || "");
        const priceHtml =
          it.type === "package"
            ? '<span class="cart-item-tag">Package: ' +
              escapeHtml(it.option || "") +
              "</span>"
            : '<div class="cart-item-price">' +
              escapeHtml(it.price || "") +
              "</div>";
        return (
          '<div class="cart-item" data-key="' +
          key +
          '">' +
          '<div class="cart-item-name">' +
          escapeHtml(it.name) +
          "</div>" +
          priceHtml +
          '<div class="cart-item-controls">' +
          '<div class="qty-control">' +
          '<button type="button" data-action="dec" data-id="' +
          it.id +
          '" data-option="' +
          escapeHtml(it.option || "") +
          '" ' +
          (it.qty <= 1 ? "disabled" : "") +
          ">" +
          svgMinus() +
          "</button>" +
          '<span class="qty-value">' +
          it.qty +
          "</span>" +
          '<button type="button" data-action="inc" data-id="' +
          it.id +
          '" data-option="' +
          escapeHtml(it.option || "") +
          '">' +
          svgPlus() +
          "</button>" +
          "</div>" +
          '<button type="button" class="cart-item-delete" data-action="remove" data-id="' +
          it.id +
          '" data-option="' +
          escapeHtml(it.option || "") +
          '">' +
          svgTrash() +
          "</button>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    document.getElementById("cart-distinct-count").textContent = items.length;
    document.getElementById("cart-total-count").textContent = count;

    list.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const option = btn.getAttribute("data-option") || undefined;
        const action = btn.getAttribute("data-action");
        if (action === "remove") {
          removeItem(id, option);
          return;
        }
        const idx = findIndex(id, option);
        if (idx === -1) return;
        const current = items[idx].qty;
        updateQty(id, option, action === "inc" ? current + 1 : current - 1);
      });
    });
  }

  function buildWhatsAppMessage() {
    let text = "*STILLETOS DECOR - NEW QUOTE INQUIRY*\n";
    text += "===============================\n\n";
    text +=
      "Hello Stilletos Team! I would like to request a quote for the following items:\n\n";

    items.forEach((it, index) => {
      if (it.type === "package") {
        text += index + 1 + ". *" + it.name + "* (Kids Package)\n";
        text += "   - Option: " + (it.option || "Standard") + "\n";
        text += "   - Qty: " + it.qty + "\n\n";
      } else {
        text +=
          index + 1 + ". *" + it.name + "* (" + it.category + " rental)\n";
        text += "   - Price: " + it.price + "\n";
        text += "   - Qty: " + it.qty + "\n\n";
      }
    });

    text += "===============================\n";
    text +=
      "Please let me know availability and pricing including transport to my location.\n";
    text += "Thank you!";

    return (
      "https://wa.me/" +
      DATA.BUSINESS_INFO.whatsappNumber +
      "?text=" +
      encodeURIComponent(text)
    );
  }

  function openDrawer() {
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-backdrop").classList.add("open");
    document.body.classList.add("cart-open");
  }
  function closeDrawer() {
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-backdrop").classList.remove("open");
    document.body.classList.remove("cart-open");
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = svgCheck() + "<span>" + escapeHtml(message) + "</span>";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function init() {
    load();
    render();

    document
      .querySelectorAll(".cart-trigger")
      .forEach((btn) => btn.addEventListener("click", openDrawer));

    const closeBtn = document.getElementById("cart-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    const backdrop = document.getElementById("cart-backdrop");
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    const clearBtn = document.getElementById("cart-clear-btn");
    if (clearBtn) clearBtn.addEventListener("click", clearAll);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });

    const waLink = document.getElementById("cart-whatsapp-link");
    if (waLink) {
      waLink.addEventListener("click", (e) => {
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        waLink.setAttribute("href", buildWhatsAppMessage());
      });
    }
  }

  return { init, addRental, addPackage, openDrawer, closeDrawer, showToast };
})();
