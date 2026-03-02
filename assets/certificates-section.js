/* assets/certificates-section.js
   Inserts a Certificates section right BEFORE the Work section (#work).
*/
(function () {
  const CERTS = [
    // Replace these with your real certificates
    { title: "Civil Service Certificate – Professional", issuer: "Civil Service Commission", year: "2024", href: "" },
    { title: "ICT Internship Certificate", issuer: "LGU-BOAC, Marinduque", year: "2024", href: "" }
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
        padding: 16px;
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
      .cert-top{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
      }
      .cert-year{
        background: rgba(245, 158, 11, 0.14);
        border: 1px solid rgba(245, 158, 11, 0.28);
        color: rgba(245, 158, 11, 0.95);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        white-space: nowrap;
      }
      .cert-name{
        margin:0;
        font-size: 18px;
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
    `;
    document.head.appendChild(style);
  }

  function sectionHTML() {
    const cards = CERTS.map((c) => {
      const href = String(c.href || "").trim();
      const disabled = !href;
      const tag = disabled ? "div" : "a";
      const attrs = disabled
        ? `class="cert-card" aria-disabled="true"`
        : `class="cert-card" href="${escapeHtml(href)}" target="_blank" rel="noreferrer"`;

      return `
        <${tag} ${attrs}>
          <div class="cert-top">
            <h3 class="cert-name">${escapeHtml(c.title)}</h3>
            <div class="cert-year">${escapeHtml(c.year)}</div>
          </div>
          <p class="cert-issuer">${escapeHtml(c.issuer)}</p>
          <div class="cert-link" ${disabled ? 'aria-disabled="true"' : ""}>
            <span>${disabled ? "Add link" : "View certificate"}</span>
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
      </section>
    `;
  }

  function insertBeforeWork() {
    injectStyles();

    if (document.getElementById("certificates")) return true;

    const work = document.getElementById("work");
    if (!work) return false;

    work.insertAdjacentHTML("beforebegin", sectionHTML());
    return true;
  }

  let tries = 0;
  const maxTries = 60;

  const timer = setInterval(() => {
    tries += 1;
    if (insertBeforeWork() || tries >= maxTries) clearInterval(timer);
  }, 300);
})();