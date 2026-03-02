/* assets/certificates-section.js
   Inserts a Certificates section right BEFORE the Work section (#work).
*/
(function () {
  // Update these paths to match your deployed folder structure.
  // Recommended: put images in ./assets/images/ then use href: "./assets/images/filename.jpg"
  const CERTS = [
    {
      title: "Intern of the Month",
      issuer: "Lucid Strategies LLC",
      year: "May 2025",
      href: "./images/intern-of-the-month.jpg"
    },
    {
      title: "Certificate of Internship",
      issuer: "Lucid Strategies LLC",
      year: "2025",
      href: "./images/certificate-of-internship.jpg"
    },
    {
      title: "ICpEP R4B CpExplore 2021 – Certificate of Participation",
      issuer: "Institute of Computer Engineers of the Philippines (ICpEP)",
      year: "2021",
      href: "./images/icpep-cpexplore-2021.jpg"
    },
    {
      title: "CERT Operations: Vulnerability Management",
      issuer: "Department of Information and Communications Technology (DICT)",
      year: "Nov 23, 2022",
      href: "./images/dict-cert-vulnerability-management-2022.jpg"
    }
  ];

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function injectStyles() {
    if (document.getElementById("certSectionStyles")) return;

    const style = document.createElement("style");
    style.id = "certSectionStyles";
    style.textContent = `
      .cert-section{
        background: radial-gradient(1200px 700px at 50% 0%, rgba(30, 58, 138, 0.14), rgba(2, 6, 23, 0.98));
        padding: clamp(48px, 6vw, 90px) 0;
        color: #e5e7eb;
      }
      .cert-wrap{
        width: min(1120px, calc(100% - 40px));
        margin: 0 auto;
        text-align: center;
      }
      .cert-kicker{
        color: #f59e0b;
        font-weight: 700;
        letter-spacing: 0.14em;
        font-size: 12px;
        margin: 0 0 10px;
      }
      .cert-title{
        font-size: clamp(32px, 4.6vw, 54px);
        line-height: 1.05;
        margin: 0 0 14px;
        color: #fff;
      }
      .cert-subtitle{
        max-width: 820px;
        margin: 0 auto 28px;
        color: rgba(226, 232, 240, 0.78);
        font-size: clamp(14px, 1.6vw, 18px);
        line-height: 1.6;
      }

      .cert-grid{
        display:grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
        text-align:left;
        align-items:stretch;
      }
      @media (max-width: 980px){
        .cert-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 640px){
        .cert-grid{ grid-template-columns: 1fr; }
      }

      .cert-card{
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.55);
        box-shadow: 0 12px 34px rgba(0,0,0,0.25);
        transition: transform 0.14s ease, border-color 0.14s ease;
        padding: 14px;
        text-decoration:none;
        color: inherit;
        display:flex;
        flex-direction:column;
        gap: 10px;
        min-height: 100%;
      }
      .cert-card:hover{
        transform: translateY(-2px);
        border-color: rgba(245, 158, 11, 0.35);
      }

      .cert-thumb{
        width: 100%;
        aspect-ratio: 16 / 10;
        border-radius: 14px;
        overflow: hidden;
        background: rgba(2,6,23,0.6);
        border: 1px solid rgba(148, 163, 184, 0.14);
      }
      .cert-thumb img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transform: scale(1.01);
      }

      .cert-top{
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap: 10px;
        margin-top: 2px;
      }
      .cert-year{
        background: rgba(245, 158, 11, 0.14);
        border: 1px solid rgba(245, 158, 11, 0.28);
        color: rgba(245, 158, 11, 0.95);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        white-space: nowrap;
        flex: 0 0 auto;
      }
      .cert-name{
        margin:0;
        font-size: 16px;
        color:#fff;
        line-height: 1.25;
      }
      .cert-issuer{
        margin:0;
        color: rgba(226,232,240,0.72);
        font-size: 14px;
        line-height: 1.5;
      }
      .cert-link{
        margin-top:auto;
        display:inline-flex;
        align-items:center;
        gap: 8px;
        color: rgba(226,232,240,0.85);
        font-size: 14px;
      }
      .cert-link span{
        color: rgba(245, 158, 11, 0.95);
      }
      .cert-link[aria-disabled="true"]{
        opacity: 0.6;
        pointer-events:none;
      }

      /* Lightbox */
      .cert-lightbox{
        position: fixed;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 22px;
        background: rgba(0,0,0,0.78);
        z-index: 9999;
      }
      .cert-lightbox.is-open{ display:flex; }
      .cert-modal{
        width: min(1100px, 96vw);
        background: rgba(10, 22, 40, 0.92);
        border: 1px solid rgba(148,163,184,0.22);
        border-radius: 18px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.55);
        overflow: hidden;
      }
      .cert-modalbar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
        padding: 12px 12px;
        border-bottom: 1px solid rgba(148,163,184,0.18);
      }
      .cert-modaltitle{
        margin: 0;
        font-size: 14px;
        color: rgba(226,232,240,0.9);
        line-height: 1.35;
      }
      .cert-actions{
        display:flex;
        align-items:center;
        gap: 10px;
      }
      .cert-btn{
        appearance: none;
        border: 1px solid rgba(148,163,184,0.22);
        background: rgba(15, 23, 42, 0.7);
        color: rgba(226,232,240,0.92);
        padding: 8px 10px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 13px;
        transition: transform 0.12s ease, border-color 0.12s ease;
      }
      .cert-btn:hover{
        transform: translateY(-1px);
        border-color: rgba(245, 158, 11, 0.35);
      }
      .cert-frame{
        background: rgba(2,6,23,0.85);
      }
      .cert-frame img{
        width: 100%;
        height: auto;
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  function lightboxHTML() {
    return `
      <div class="cert-lightbox" id="certLightbox" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="cert-modal" role="document">
          <div class="cert-modalbar">
            <p class="cert-modaltitle" id="certModalTitle">Certificate</p>
            <div class="cert-actions">
              <a class="cert-btn" id="certOpenNewTab" href="#" target="_blank" rel="noreferrer">Open in new tab</a>
              <button class="cert-btn" id="certCloseBtn" type="button">Close</button>
            </div>
          </div>
          <div class="cert-frame">
            <img id="certModalImg" src="" alt="Certificate preview" />
          </div>
        </div>
      </div>
    `;
  }

  function sectionHTML() {
    const cards = CERTS.map((c, idx) => {
      const href = String(c.href || "").trim();
      const disabled = !href;
      const safeHref = escapeHtml(href);
      const title = escapeHtml(c.title);
      const issuer = escapeHtml(c.issuer);
      const year = escapeHtml(c.year);

      // Use a button-like div when disabled, otherwise clickable anchor
      const tag = disabled ? "div" : "a";
      const attrs = disabled
        ? `class="cert-card" aria-disabled="true"`
        : `class="cert-card" href="${safeHref}" data-cert-index="${idx}"`;

      return `
        <${tag} ${attrs}>
          <div class="cert-thumb">
            ${
              disabled
                ? `<img src="" alt="${title}" style="opacity:0" />`
                : `<img src="${safeHref}" alt="${title}" loading="lazy" />`
            }
          </div>

          <div class="cert-top">
            <h3 class="cert-name">${title}</h3>
            <div class="cert-year">${year}</div>
          </div>

          <p class="cert-issuer">${issuer}</p>

          <div class="cert-link" ${disabled ? 'aria-disabled="true"' : ""}>
            <span>${disabled ? "Add file link" : "View certificate"}</span>
          </div>
        </${tag}>
      `;
    }).join("");

    return `
      <section id="certificates" class="cert-section">
        <div class="cert-wrap">
          <p class="cert-kicker">CREDENTIALS</p>
          <h2 class="cert-title">Certificates</h2>
          <p class="cert-subtitle">
            A quick list of credentials and training highlights that support my work in virtual assistance, technical support, and operations.
          </p>

          <div class="cert-grid">
            ${cards}
          </div>
        </div>

        ${lightboxHTML()}
      </section>
    `;
  }

  function openLightbox(title, href) {
    const lb = document.getElementById("certLightbox");
    const img = document.getElementById("certModalImg");
    const t = document.getElementById("certModalTitle");
    const openNew = document.getElementById("certOpenNewTab");

    if (!lb || !img || !t || !openNew) return;

    t.textContent = title || "Certificate";
    img.src = href;
    openNew.href = href;

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");

    // Prevent background scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("certLightbox");
    const img = document.getElementById("certModalImg");
    if (!lb) return;

    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");

    if (img) img.src = "";

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function bindLightboxEvents() {
    const lb = document.getElementById("certLightbox");
    const closeBtn = document.getElementById("certCloseBtn");
    if (!lb || !closeBtn) return;

    if (lb.dataset.bound === "1") return;
    lb.dataset.bound = "1";

    closeBtn.addEventListener("click", closeLightbox);

    // Click outside modal closes
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });

    // ESC closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });

    // Intercept card clicks to open modal
    const section = document.getElementById("certificates");
    if (!section) return;

    section.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a.cert-card") : null;
      if (!a) return;

      const href = a.getAttribute("href");
      const idx = a.getAttribute("data-cert-index");

      // If user holds Ctrl/Meta or middle-click, allow opening normally
      const isNewTabIntent = e.ctrlKey || e.metaKey || e.button === 1;
      if (isNewTabIntent) return;

      // Open modal instead of navigating
      e.preventDefault();

      const cert = CERTS[Number(idx)] || {};
      openLightbox(cert.title || "Certificate", href);
    });
  }

  function insertBeforeWork() {
    injectStyles();

    if (document.getElementById("certificates")) return true;

    const work = document.getElementById("work");
    if (!work) return false;

    work.insertAdjacentHTML("beforebegin", sectionHTML());

    // Now that it's in DOM, bind events
    bindLightboxEvents();

    return true;
  }

  let tries = 0;
  const maxTries = 60;

  const timer = setInterval(() => {
    tries += 1;
    if (insertBeforeWork() || tries >= maxTries) clearInterval(timer);
  }, 300);
})();

