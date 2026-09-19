const grid = document.getElementById("projects-grid");
const toolbar = document.getElementById("filter-toolbar");

if (grid && toolbar) {
  const user = getCurrentUser();
  const all = getProjects().filter((p) => hasAccess(p, user));
  const tags = [...new Set(all.flatMap((p) => p.tags))];

  let activeTag = "all";

  function renderToolbar() {
    const opts = ["all", ...tags];
    toolbar.innerHTML = opts
      .map(
        (tag) =>
          `<button class="btn ${activeTag === tag ? "btn-primary" : "btn-ghost"}" data-tag="${tag}">${tag}</button>`
      )
      .join("");

    toolbar.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTag = btn.dataset.tag;
        renderToolbar();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const filtered = activeTag === "all" ? all : all.filter((p) => p.tags.includes(activeTag));
    grid.innerHTML = filtered
      .map(
        (p) => `
        <article class="card">
          <img src="${p.thumbnail}" alt="${p.title}" style="height:175px;width:100%;object-fit:cover;" />
          <div class="card-content">
            <div class="badges">
              ${formatTags(p.tags)}
              ${p.visibility === "authenticated" ? '<span class="badge restricted">authenticated</span>' : ""}
            </div>
            <h3>${p.title}</h3>
            <p>${p.shortDescription}</p>
            <a class="btn btn-primary" href="project.html?id=${p.id}">View</a>
          </div>
        </article>
      `
      )
      .join("");

    if (!filtered.length) {
      grid.innerHTML = `<p>No projects found for this filter.</p>`;
    }
  }

  renderToolbar();
  renderGrid();
}
