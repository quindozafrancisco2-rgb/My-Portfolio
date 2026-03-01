/* assets/work-section.js
   - Landscape videos: embedded Drive preview
   - Portrait videos: thumbnail + open in new tab (prevents cropping)
*/

(function () {
  const CONFIG = {
    // For portrait vids, add a thumbnail image you upload to ./images/
    videos: [
      {
        title: "Festival Cuts",
        desc: "Short highlight edit for event footage.",
        fileId: "1s-k4OhodcbhGxk6vWvSiE9jetPrY1Nxi",
        ratio: "landscape"
      },
      {
        title: "Canned Drinks Clips",
        desc: "Short product montage.",
        fileId: "1FkVGjSa7MBlP9Fg7qGWBrAOlHgZcaGJn",
        ratio: "portrait",
        thumb: "./images/video-thumb-canned.jpg"
      },
      {
        title: "Smoothie Clips",
        desc: "Short product montage.",
        fileId: "1duQarrqFCnwShNmkKkgQDa_1f2a47Rnj",
        ratio: "portrait",
        thumb: "./images/video-thumb-smoothie.jpg"
      }
      // Add more videos by copying the object above
    ],

    canvaDesigns: [
      { title: "Festival Poster", desc: "Bright event poster layout and typography.", src: "./images/portfolio-design-1.jpg" },
      { title: "Coffee Promo", desc: "Product creative with bold focal point.", src: "./images/portfolio-design-2.jpg" },
      { title: "Portfolio Cover", desc: "Modern geometric key visual.", src: "./images/portfolio-design-3.jpg" }
    ],

    photoshopEdits: [
      { title: "Before and After Retouch", desc: "Skin tone balance, clarity, and background cleanup.", src: "./images/portfolio-photo-1.jpg" },
      { title: "Color and Lighting", desc: "Contrast tuning and color grading for a cleaner look.", src: "./images/portfolio-photo-2.jpg" }
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

      /* Landscape embed only */
      .video-embed{
        position:relative;
        width:100%;
        aspect-ratio: 16 / 9;
        background: rgba(2,6,23,0.75);
      }
      .video-embed iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
        display:block;
      }

      /* Portrait card: thumbnail + button */
      .video-thumb{
        width:100%;
        aspect-ratio: 16 / 9; /* keep grid consistent */
        background: rgba(2,6,23,0.75);
        position: relative;
        overflow:hidden;
      }
      .video-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
        filter: saturate(1.02);
      }
      .video-thumb .play{
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        pointer-events:none;
      }
      .video-thumb .play span{
        width:54px;
        height:54px;
        border-radius:999px;
        background: rgba(245, 158, 11, 0.92);
        display:grid;
        place-items:center;
        box-shadow: 0 14px 30px rgba(0,0,0,0.35);
      }
      .video-thumb .play span:before{
        content:"";
        display:block;
        width:0;height:0;
        border-left: 14px solid #0b1220;
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        margin-left: 3px;
      }

      .open-link{
        position:absolute;
        top:10px;
        right:10px;
        width:30px;
        height:30px;
        border-radius:10px;
        background: rgba(2,6,23,0.6);
        border:1px solid rgba(148,163,184,0.25);
        display:grid;
        place-items:center;
      }
      .open-link svg{
        width:16px;height:16px;
        opacity:0.9;
        fill: #e5e7eb;
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

  function openIcon() {
    return `
      <span class="open-link" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
          <path d="M5 5h7v2H7v12h12v-5h2v7H5V5z"></path>
        </svg>
      </span>
    `;
  }

  function buildCardVideo(v) {
    const isPortrait = (v.ratio || "").toLowerCase() === "portrait";
    const previewUrl = `https://drive.google.com/file/d/${encodeURIComponent(v.fileId)}/preview`;
    const viewUrl = `https://drive.google.com/file/d/${encodeURIComponent(v.fileId)}/view`;

    // Portrait: thumbnail card to avoid Drive player cropping
    if (isPortrait) {
      const thumb = v.thumb || "";
      const thumbHtml = thumb
        ? `<img src="${thumb}" alt="${escapeHtml(v.title)} thumbnail" loading="lazy" />`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(226,232,240,0.7);font-size:14px;">
             Portrait Video
           </div>`;

      return `
        <a class="work-card" href="${viewUrl}" target="_blank" rel="noreferrer">
          <div class="video-thumb">
            ${thumbHtml}
            ${openIcon()}
            <div class="play"><span></span></div>
          </div>
          <div class="work-meta">
            <h3 class="work-name">${escapeHtml(v.title)}</h3>
            <p class="work-desc">${escapeHtml(v.desc)}</p>
          </div>
        </a>
      `;
    }

    // Landscape: embed
    return `
      <article class="work-card">
        <div class="video-embed">
          <iframe src="${previewUrl}" allow="autoplay" title="${escapeHtml(v.title)}"></iframe>
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

  function sectionHTML() {
    return `
      <section id="work" class="work-section">
        <div class="work-wrap">
          <p class="work-kicker">MY WORK</p>
          <h2 class="work-title">My Creative Work</h2>
          <p class="work-subtitle">
            Welcome to my portfolio. This is where I share my edited videos, creative designs, and graphic work.
            Each piece shows what I can do and what I enjoy working on.
          </p>

          <div class="work-tabs" role="tablist" aria-label="Creative work tabs">
            <button class="work-tab is-active" type="button" role="tab" aria-selected="true" data-tab="videos">Videos</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="canva">Canva Designs</button>
            <button class="work-tab" type="button" role="tab" aria-selected="false" data-tab="photoshop">Photoshop Edits</button>
          </div>

          <div class="work-panel is-active" role="tabpanel" data-panel="videos">
            <div class="work-grid">
              ${CONFIG.videos.map(buildCardVideo).join("")}
            </div>
          </div>

          <div class="work-panel" role="tabpanel" data-panel="canva">
            <div class="work-grid">
              ${CONFIG.canvaDesigns.map((i) => buildCardImage(i, "Canva Design")).join("")}
            </div>
          </div>

          <div class="work-panel" role="tabpanel" data-panel="photoshop">
            <div class="work-grid">
              ${CONFIG.photoshopEdits.map((i) => buildCardImage(i, "Photoshop Edit")).join("")}
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
    activate("videos");
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
