/* assets/work-section.js
   Tabbed gallery section:
   1) Website Builds (3 unique website concepts)
   2) Videos (Google Drive preview embeds in a consistent 16:9 frame)
   3) Graphic Designs (images)
*/

(function () {
  const CONFIG = {
    websiteBuilds: [
      {
        type: "Fast Food Chain",
        title: "QuickBite Fast Food",
        desc: "Menu layout, featured deals, store locations, and strong order now calls to action.",
        href: "https://quindozafrancisco2-rgb.github.io/Fast-Food-Website/"
      },
      {
        type: "Medical Clinic",
        title: "ClearCare Medical Clinic",
        desc: "Services, doctor profiles, appointment booking section, and trust-focused design.",
        href: "https://YOUR-CLINIC-LINK-HERE.com"
      },
      {
        type: "SaaS Landing Page",
        title: "FlowPilot SaaS",
        desc: "Modern landing page with features, pricing, testimonials, and conversion sections.",
        href: "https://YOUR-SAAS-LINK-HERE.com"
      }
    ],

    videos: [
      {
        title: "Festival Cuts",
        desc: "Short highlight edit for event footage.",
        fileId: "1s-k4OhodcbhGxk6vWvSiE9jetPrY1Nxi"
      },
      {
        title: "Canned Drinks Clips",
        desc: "Short product montage.",
        fileId: "1FkVGjSa7MBlP9Fg7qGWBrAOlHgZcaGJn"
      },
      {
        title: "Smoothie Clips",
        desc: "Short product montage.",
        fileId: "1duQarrqFCnwShNmkKkgQDa_1f2a47Rnj"
      }
    ],

    graphicDesigns: [
      { title: "Festival Poster", desc: "Bright event poster layout and typography.", src: "./images/portfolio-design-1.jpg" },
      { title: "Coffee Promo", desc: "Product creative with bold focal point.", src: "./images/portfolio-design-2.jpg" },
      { title: "Poster Design", desc: "Modern style key visual.", src: "./images/portfolio-design-3.jpg" }
    ]
  };

  function injectStyles() {
    if (document.getElementById("workSectionStyles")) return;

    const style = document.createElement("style");
    style.id = "workSectionStyles";
    style.textContent = `
      .work-section{
        background: radial-gradient(1200px 700px at 50% 0%, rgba(30, 58, 138, 0.16), rgba(2, 6, 23, 0.98));
        padding: clamp(48px, 6vw, 90px) 0;
        color: #e5e7eb;
      }
      .work-wrap{
        width: min(1120px, calc(100% - 40px));
        margin: 0 auto;
        text-align: center;
      }
      .work-kicker{
        color: #f59e0b;
        font-weight: 700;
        letter-spacing: 0.14em;
        font-size: 12px;
        margin: 0 0 10px;
      }
      .work-title{
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.05;
        margin: 0 0 14px;
        color: #fff;
      }
      .work-subtitle{
        max-width: 820px;
        margin: 0 auto 28px;
        color: rgba(226, 232, 240, 0.78);
        font-size: clamp(14px, 1.6vw, 18px);
        line-height: 1.6;
      }

      .work-tabs{
        display:flex;
        gap:14px;
        justify-content:center;
        flex-wrap:wrap;
        margin: 10px 0 26px;
      }
      .work-tab{
        appearance:none;
        border:1px solid rgba(148, 163, 184, 0.22);
        background: rgba(15, 23, 42, 0.6);
        color: rgba(226, 232, 240, 0.75);
        padding:12px 22px;
        border-radius:14px;
        font-size:16px;
        cursor:pointer;
        transition: transform 0.12s ease, background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
      }
      .work-tab:hover{
        transform: translateY(-1px);
        border-color: rgba(148, 163, 184, 0.35);
      }
      .work-tab.is-active{
        background:#f59e0b;
        color:#0b1220;
        border-color: transparent;
      }

      .work-panel{ display:none; }
      .work-panel.is-active{ display:block; }

      .work-grid{
        display:grid;
        grid-template-columns: repeat(3, minmax(0,1fr));
        gap:18px;
        text-align:left;
        align-items:start;
      }
      @media (max-width: 980px){
        .work-grid{ grid-template-columns: repeat(2, minmax(0,1fr)); }
      }
      @media (max-width: 640px){
        .work-grid{ grid-template-columns: 1fr; }
      }

      .work-card{
        border-radius:18px;
        overflow:hidden;
        border:1px solid rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.55);
        box-shadow: 0 12px 34px rgba(0,0,0,0.25);
        transition: transform 0.14s ease, border-color 0.14s ease;
        display:flex;
        flex-direction:column;
        min-height:100%;
        text-decoration:none;
        color: inherit;
      }
      .work-card:hover{
        transform: translateY(-2px);
        border-color: rgba(245, 158, 11, 0.35);
      }

      .work-meta{
        padding:14px 14px 16px;
      }
      .work-type{
        display:inline-flex;
        align-items:center;
        gap:8px;
        font-size:12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(226, 232, 240, 0.68);
        margin: 0 0 8px;
      }
      .work-type .dot{
        width: 8px;
        height: 8px;
        border-radius: 99px;
        background: rgba(245, 158, 11, 0.9);
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.12);
        flex: 0 0 auto;
      }

      .work-name{
        margin:0 0 6px;
        font-size:18px;
        color:#fff;
      }
      .work-desc{
        margin:0;
        color: rgba(226,232,240,0.72);
        font-size:14px;
        line-height:1.5;
      }

      .image-thumb{
        width:100%;
        aspect-ratio: 16 / 10;
        background: rgba(2,6,23,0.6);
        overflow:hidden;
      }
      .image-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      /* WEBSITE BUILDS */
      .site-thumb{
        width:100%;
        aspect-ratio: 16 / 10;
        background: rgba(2,6,23,0.6);
        position:relative;
        overflow:hidden;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .site-thumb:before{
        content:"";
        position:absolute;
        inset:-45%;
        background:
          radial-gradient(circle at 25% 25%, rgba(245,158,11,0.20), transparent 60%),
          radial-gradient(circle at 70% 65%, rgba(30,58,138,0.20), transparent 60%);
        transform: rotate(8deg);
      }
      .site-badge{
        position:absolute;
        left:12px;
        top:12px;
        background: rgba(15, 23, 42, 0.70);
        border: 1px solid rgba(148, 163, 184, 0.22);
        color: rgba(226, 232, 240, 0.90);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
      }
      .site-cta{
        position:absolute;
        right:12px;
        top:12px;
        background: rgba(245, 158, 11, 0.14);
        border: 1px solid rgba(245, 158, 11, 0.28);
        color: rgba(245, 158, 11, 0.95);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
      }
      .site-icon{
        position:relative;
        width:56px;
        height:56px;
        border-radius:18px;
        background: rgba(245, 158, 11, 0.12);
        border: 1px solid rgba(245, 158, 11, 0.22);
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .site-icon svg{
        width:28px;
        height:28px;
        fill:#f59e0b;
      }

      /* VIDEO: always landscape 16:9 */
      .video-embed{
        position:relative;
        width:100%;
        aspect-ratio: 16 / 9;
        background: rgba(2,6,23,0.8);
        overflow:hidden;
      }
      .video-embed iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
        display:block;
      }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildCardVideo(v) {
    const src = `https://drive.google.com/file/d/${encodeURIComponent(v.fileId)}/preview`;
    return `
      <article class="work-card">
        <div class="video-embed">
          <iframe src="${src}" allow="autoplay" title="${escapeHtml(v.title)}"></iframe>
        </div>
        <div class="work-meta">
          <h3 class="work-name">${escapeHtml(v.title)}</h3>
          <p class="work-desc">${escapeHtml(v.desc)}</p>
        </div>
      </article>
    `;
  }

  function buildCardImage(i, altPrefix) {
    return `
      <a class="work-card" href="${i.src}" target="_blank" rel="noreferrer">
        <div class="image-thumb">
          <img src="${i.src}" alt="${escapeHtml(altPrefix)} - ${escapeHtml(i.title)}" loading="lazy" />
        </div>
        <div class="work-meta">
          <h3 class="work-name">${escapeHtml(i.title)}</h3>
          <p class="work-desc">${escapeHtml(i.desc)}</p>
        </div>
      </a>
    `;
  }

  function buildCardWebsite(w) {
    const href = String(w.href || "").trim();
    const safeHref = href || "#";
    const disabled = !href;

    return `
      <a class="work-card" href="${escapeHtml(safeHref)}" target="_blank" rel="noreferrer" ${disabled ? 'aria-disabled="true" onclick="return false;"' : ""}>
        <div class="site-thumb">
          <span class="site-badge">${escapeHtml(w.type)}</span>
          <span class="site-cta">${disabled ? "Add link" : "Open site"}</span>
          <div class="site-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
              <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"></path>
            </svg>
          </div>
        </div>
        <div class="work-meta">
          <p class="work-type"><span class="dot"></span>${escapeHtml(w.type)}</p>
          <h3 class="work-name">${escapeHtml(w.title)}</h3>
          <p class="work-desc">${escapeHtml(w.desc)}</p>
        </div>
      </a>
    `;
  }

  function sectionHTML() {
    return `
      <section id="work" class="work-section">
        <div class="work-wrap">
          <p class="work-kicker">MY WORK</p>
          <h2 class="work-title">My Creative Work</h2>
          <p class="work-subtitle">
            Welcome to my portfolio. This is where I share my website builds, edited videos, and creative designs.
            Each piece shows what I can do and what I enjoy working on.
          </p>

          <div class="work-tabs" role="tablist" aria-label="Creative work tabs">
            <button class="work-tab is-active" type="button" role="tab" aria-selected="true" data-tab="websites">Website Builds</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="videos">Videos</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="graphic">Graphic Designs</button>
          </div>

          <div class="work-panel is-active" role="tabpanel" data-panel="websites">
            <div class="work-grid">
              ${CONFIG.websiteBuilds.map(buildCardWebsite).join("")}
            </div>
          </div>

          <div class="work-panel" role="tabpanel" data-panel="videos">
            <div class="work-grid">
              ${CONFIG.videos.map(buildCardVideo).join("")}
            </div>
          </div>

          <div class="work-panel" role="tabpanel" data-panel="graphic">
            <div class="work-grid">
              ${CONFIG.graphicDesigns.map((i) => buildCardImage(i, "Graphic Designs")).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function wireTabs(container) {
    const tabs = Array.from(container.querySelectorAll(".work-tab"));
    const panels = Array.from(container.querySelectorAll(".work-panel"));

    function activate(name) {
      tabs.forEach((t) => {
        const on = t.dataset.tab === name;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach((p) => {
        const on = p.dataset.panel === name;
        p.classList.toggle("is-active", on);
      });
    }

    tabs.forEach((btn) => btn.addEventListener("click", () => activate(btn.dataset.tab)));
    activate("websites");
  }

  function findTargetSection() {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
    const h = headings.find((x) => (x.textContent || "").trim().toLowerCase() === "my creative work");
    if (!h) return null;
    return h.closest("section") || h.closest("div");
  }

  function replaceSection() {
    injectStyles();

    const target = findTargetSection();
    if (!target) return false;

    target.outerHTML = sectionHTML();

    const newSection = document.getElementById("work");
    if (newSection) wireTabs(newSection);

    return true;
  }

  let tries = 0;
  const maxTries = 40;

  const timer = setInterval(() => {
    tries += 1;
    if (replaceSection() || tries >= maxTries) clearInterval(timer);
  }, 300);
})();



