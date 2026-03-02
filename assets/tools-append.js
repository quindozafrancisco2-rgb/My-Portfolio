/* assets/tools-append.js
   Adds extra tools to the Tools and Software I Use section (#tools).
*/
(function () {
  const EXTRA_TOOLS = [
    { name: "React.js", icon: "Re", color: "#61DAFB" },
    { name: "Node.js", icon: "Nd", color: "#3C873A" },
    { name: "Next.js", icon: "Nx", color: "#FFFFFF" },
    { name: "Python", icon: "Py", color: "#3776AB" },
    { name: "HTML", icon: "Ht", color: "#E34F26" },
    { name: "C#", icon: "C#", color: "#9B4F96" },
    { name: "C++", icon: "C+", color: "#00599C" },
    { name: "Notion", icon: "No", color: "#FFFFFF" },
    { name: "Email.js", icon: "EJ", color: "#F7DF1E" },
    { name: "Kimi.ai", icon: "Ki", color: "#F59E0B" },
    { name: "Claude.ai", icon: "Cl", color: "#F59E0B" }
  ];

  function norm(s) {
    return String(s || "").trim().toLowerCase();
  }

  function findToolsGrid() {
    const section = document.getElementById("tools");
    if (!section) return null;

    // Your Tools.tsx uses a grid container under #tools
    // We locate the first element inside #tools that looks like the grid of cards.
    const grid = section.querySelector("div.grid");
    if (grid) return grid;

    // Fallback: search for a container that has multiple tool cards
    const candidates = Array.from(section.querySelectorAll("div")).filter((el) => {
      const cls = el.className || "";
      return cls.includes("grid-cols") && cls.includes("gap");
    });

    return candidates[0] || null;
  }

  function toolAlreadyExists(grid, toolName) {
    const spans = grid.querySelectorAll("span");
    const wanted = norm(toolName);
    for (const s of spans) {
      if (norm(s.textContent) === wanted) return true;
    }
    return false;
  }

  function cardHTML(tool) {
    const name = String(tool.name || "").trim();
    const icon = String(tool.icon || "").trim();
    const color = String(tool.color || "#94a3b8").trim();

    // This matches your existing card markup and Tailwind classes.
    return `
      <div class="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#152238] border border-[#1e3a5f] hover:border-[#f59e0b]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f59e0b]/10" data-added-tool="1">
        <div class="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110"
             style="background-color:${color}20;color:${color}">
          ${icon}
        </div>
        <span class="text-gray-400 text-sm font-medium text-center group-hover:text-white transition-colors duration-300">
          ${name}
        </span>
      </div>
    `;
  }

  function inject() {
    const grid = findToolsGrid();
    if (!grid) return false;

    // Prevent double insert
    if (grid.dataset.toolsAppended === "1") return true;

    for (const t of EXTRA_TOOLS) {
      if (!toolAlreadyExists(grid, t.name)) {
        grid.insertAdjacentHTML("beforeend", cardHTML(t));
      }
    }

    grid.dataset.toolsAppended = "1";
    return true;
  }

  let tries = 0;
  const maxTries = 80;

  const timer = setInterval(() => {
    tries += 1;
    if (inject() || tries >= maxTries) clearInterval(timer);
  }, 250);
})();