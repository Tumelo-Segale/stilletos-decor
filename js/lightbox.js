/* ==========================================================================
   Stilletos Decor — shared gallery lightbox
   Used by both the adult and kids gallery renderers to pop an image or
   video up into a full-screen preview.
   ========================================================================== */

window.STILLETOS_LIGHTBOX = (function () {
  let closeTimer = null;

  function isVideo(src) {
    return /\.mp4($|\?)/i.test(src || "");
  }

  function open(src, label) {
    const overlay = document.getElementById("lightbox-overlay");
    const stage = document.getElementById("lightbox-stage");
    if (!overlay || !stage || !src) return;

    clearTimeout(closeTimer);
    stage.innerHTML = "";

    let el;
    if (isVideo(src)) {
      el = document.createElement("video");
      el.src = src;
      el.autoplay = true;
      el.loop = true;
      el.muted = true;
      el.volume = 0;
      el.controls = true;
      el.playsInline = true;
      el.setAttribute("aria-label", label || "Preview video");
    } else {
      el = document.createElement("img");
      el.src = src;
      el.alt = label || "Preview image";
      el.referrerPolicy = "no-referrer";
    }
    stage.appendChild(el);

    overlay.classList.add("open");
    document.body.classList.add("lightbox-open");
  }

  function close() {
    const overlay = document.getElementById("lightbox-overlay");
    const stage = document.getElementById("lightbox-stage");
    if (!overlay) return;

    overlay.classList.remove("open");
    document.body.classList.remove("lightbox-open");

    if (stage) {
      const video = stage.querySelector("video");
      if (video) video.pause();
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        stage.innerHTML = "";
      }, 300);
    }
  }

  function init() {
    const overlay = document.getElementById("lightbox-overlay");
    const closeBtn = document.getElementById("lightbox-close");

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  return { init, open, close };
})();
