/* assets/mobile-menu-blur.js
   Adds a full-screen blurred backdrop when the mobile dropdown menu is open.
*/
(function () {
  const OVERLAY_ID = "mobileMenuBackdrop";

  function injectStylesOnce() {
    if (document.getElementById("mobileMenuBackdropStyles")) return;

    const style = document.createElement("style");
    style.id = "mobileMenuBackdropStyles";
    style.textContent = `
      #${OVERLAY_ID}{
        position: fixed;
        inset: 0;
        z-index: 40; /* navbar is z-50 */
        background: rgba(10, 22, 40, 0.45);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
      }
      body.menu-open-no-scroll{
        overflow: hidden;
        touch-action: none;
      }
    `;
    document.head.appendChild(style);
  }

  function findNavbar() {
    // Your navbar is fixed and z-50
    return document.querySelector("nav.fixed.top-0.left-0.right-0.z-50");
  }

  function findMobileMenu(nav) {
    // This matches your dropdown container:
    // md:hidden absolute top-full left-0 right-0 ...
    if (!nav) return null;
    return nav.querySelector("div.md\\:hidden.absolute.top-full.left-0.right-0");
  }

  function findToggleButton(nav) {
    // The hamburger/X button is the md:hidden button inside navbar
    if (!nav) return null;
    return nav.querySelector("button.md\\:hidden");
  }

  function isMenuOpen(menuEl) {
    if (!menuEl) return false;
    // When open you set: opacity-100 translate-y-0
    // When closed: opacity-0 -translate-y-4 pointer-events-none
    const cls = menuEl.className || "";
    return cls.includes("opacity-100") && !cls.includes("pointer-events-none");
  }

  function ensureOverlay() {
    injectStylesOnce();

    const nav = findNavbar();
    const menu = findMobileMenu(nav);
    const btn = findToggleButton(nav);

    if (!nav || !menu) return false;

    const open = isMenuOpen(menu);
    let overlay = document.getElementById(OVERLAY_ID);

    if (open) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = OVERLAY_ID;

        // Click backdrop closes menu by clicking the toggle button
        overlay.addEventListener("click", () => {
          if (btn) btn.click();
        });

        document.body.appendChild(overlay);
      }
      document.body.classList.add("menu-open-no-scroll");
    } else {
      if (overlay) overlay.remove();
      document.body.classList.remove("menu-open-no-scroll");
    }

    return true;
  }

  function start() {
    const nav = findNavbar();
    if (!nav) return false;

    // Run once now
    ensureOverlay();

    // Observe changes in navbar (menu open/close changes classes)
    const obs = new MutationObserver(() => ensureOverlay());
    obs.observe(nav, { attributes: true, childList: true, subtree: true });

    // Also update on resize/scroll just in case
    window.addEventListener("resize", ensureOverlay, { passive: true });
    window.addEventListener("scroll", ensureOverlay, { passive: true });

    return true;
  }

  let tries = 0;
  const maxTries = 80;
  const timer = setInterval(() => {
    tries += 1;
    if (start() || tries >= maxTries) clearInterval(timer);
  }, 250);
})();