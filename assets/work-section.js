/* assets/work-section.js
   Tabbed gallery section:
   1) Website Builds
   2) Videos
   3) Graphic Designs
   4) Engineering Projects

   Updates requested:
   - Graphic Designs: keep original behavior (click opens image in a new tab)
   - Engineering Projects: behave the same as Graphic Designs when clicked
     - If href exists, card opens href
     - If href is empty, card opens the image src in a new tab
   - Remove the "Add link" text under Engineering Projects cards (no CTA when no href)
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
        href: "https://quindozafrancisco2-rgb.github.io/Clinic-Website/"
      },
      {
        type: "SaaS Landing Page",
        title: "FlowPilot SaaS",
        desc: "Modern landing page with features, pricing, testimonials, and conversion sections.",
        href: "https://quindozafrancisco2-rgb.github.io/SAAS-Website/"
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
      { title: "Festival Poster", desc: "Bright event poster layout and typography.", src: "images/portfolio-design-1.jpg" },
      { title: "Coffee Promo", desc: "Product creative with bold focal point.", src: "images/portfolio-design-2.jpg" },
      { title: "Poster Design", desc: "Modern style key visual.", src: "images/portfolio-design-3.jpg" }
    ],

    engineeringProjects: [
      {
        type: "Computer Vision & Embedded System",
        title: "Firefly Detection System",
        desc: "AI-assisted firefly detection and monitoring system using ESP32-CAM with real-time image capture, RTC-based logging, and web server integration for environmental observation.",
        tech: ["ESP32-CAM", "Computer Vision", "RTC (DS3231)", "WiFi Web Server"],
        src: "images/engineering-firefly-system.jpg",
        href: ""
      },
      {
        type: "Embedded System",
        title: "ESP32-CAM Monitoring with RTC Logging",
        desc: "Camera capture workflow with reliable timekeeping, logging, and stability improvements for long runs.",
        tech: ["ESP32-CAM", "RTC (DS3231)", "WiFi", "Web Server"],
        src: "images/engineering-esp32cam.jpg",
        href: ""
      },
      {
        type: "Robotics",
        title: "Real-Time Obstacle Detection using Time-of-Flight Sensor",
        desc: "Real-time detection using a ToF sensor with microcontroller integration for responsive distance sensing.",
        tech: ["ToF Sensor", "Arduino", "Real-Time Sensing"],
        src: "images/engineering-obstacle-detection.jpg",
        href: ""
      }
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
      .work-card[aria-disabled="true"]{
        opacity: 0.55;
        pointer-events:none;
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

      /* ENGINEERING PROJECTS */
      .chip-row{
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin-top: 12px;
      }
      .chip{
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.10);
        border: 1px solid rgba(148, 163, 184, 0.18);
        color: rgba(226, 232, 240, 0.78);
        white-space: nowrap;
      }
      .card-cta{
        margin-top: 12px;
        display:inline-flex;
        align-items:center;
        gap: 8px;
        color: rgba(226,232,240,0.85);
        font-size: 14px;
      }
      .card-cta span{
        color: rgba(245, 158, 11, 0.95);
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

  // Graphic Designs: original behavior (opens image in new tab)
  function buildCardImage(i, altPrefix) {
    const src = String(i.src || "").trim();
    const safeHref = src || "#";
    const disabled = !src;

    return `
      <a class="work-card" href="${escapeHtml(safeHref)}" target="_blank" rel="noreferrer" ${disabled ? 'aria-disabled="true" onclick="return false;"' : ""}>
        <div class="image-thumb">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(altPrefix)} - ${escapeHtml(i.title)}" loading="lazy" />
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

  // Engineering Projects: same behavior as Graphic Designs when clicked
  // - If href exists -> open href
  // - If href empty -> open image src
  // - No "Add link" CTA under the card
  function buildCardEngineering(p) {
    const href = String(p.href || "").trim();
    const src = String(p.src || "").trim();

    const finalHref = href || src || "#";
    const disabled = !href && !src;

    const typeLine = p.type ? `<p class="work-type"><span class="dot"></span>${escapeHtml(p.type)}</p>` : "";

    const chips =
      Array.isArray(p.tech) && p.tech.length
        ? `<div class="chip-row">${p.tech.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</div>`
        : "";

    const cta = href
      ? `
        <div class="card-cta">
          <span>View project</span>
        </div>
      `
      : "";

    const thumb = src
      ? `
        <div class="image-thumb">
          <img src="${escapeHtml(src)}" alt="Engineering Project - ${escapeHtml(p.title)}" loading="lazy" />
        </div>
      `
      : `
        <div class="site-thumb">
          <span class="site-badge">Engineering</span>
          <span class="site-cta">Add image</span>
          <div class="site-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.11-.2-.36-.28-.57-.2l-2.39.96c-.5-.38-1.04-.7-1.64-.94l-.36-2.54A.488.488 0 0014 1h-4c-.24 0-.44.17-.48.4l-.36 2.54c-.6.24-1.15.56-1.64.94l-2.39-.96c-.21-.08-.46 0-.57.2L.63 7.44c-.11.2-.06.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L.75 14.52c-.18.14-.23.41-.12.61l1.92 3.32c.11.2.36.28.57.2l2.39-.96c.5.38 1.04.7 1.64.94l.36 2.54c.04.23.24.4.48.4h4c.24 0 .44-.17.48-.4l.36-2.54c.6-.24 1.15-.56 1.64-.94l2.39.96c.21.08.46 0 .57-.2l1.92-3.32c.11-.2.06-.47-.12-.61l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>
            </svg>
          </div>
        </div>
      `;

    return `
      <a class="work-card" href="${escapeHtml(finalHref)}" target="_blank" rel="noreferrer" ${disabled ? 'aria-disabled="true" onclick="return false;"' : ""}>
        ${thumb}
        <div class="work-meta">
          ${typeLine}
          <h3 class="work-name">${escapeHtml(p.title)}</h3>
          <p class="work-desc">${escapeHtml(p.desc)}</p>
          ${chips}
          ${cta}
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
            Welcome to my portfolio. This is where I share my website builds, edited videos, creative designs, and engineering projects.
            Each piece shows what I can do and what I enjoy working on.
          </p>

          <div class="work-tabs" role="tablist" aria-label="Creative work tabs">
            <button class="work-tab is-active" type="button" role="tab" aria-selected="true" data-tab="websites">Website Builds</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="videos">Videos</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="graphic">Graphic Designs</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="engineering">Engineering Projects</button>
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

          <div class="work-panel" role="tabpanel" data-panel="engineering">
            <div class="work-grid">
              ${CONFIG.engineeringProjects.map(buildCardEngineering).join("")}
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
