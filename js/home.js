const featuredContainer = document.getElementById("featured-projects");

if (featuredContainer) {
  const user = getCurrentUser();
  const cards = getProjects()
    .filter((p) => hasAccess(p, user))
    .slice(0, 3)
    .map(
      (p) => `
      <article class="card">
        <img src="${p.thumbnail}" alt="${p.title}" style="height:170px;width:100%;object-fit:cover;" />
        <div class="card-content">
          <div class="badges">
            ${formatTags(p.tags)}
            ${p.visibility === "authenticated" ? '<span class="badge restricted">restricted</span>' : ""}
          </div>
          <h3>${p.title}</h3>
          <p>${p.shortDescription}</p>
          <a class="btn btn-primary" href="project.html?id=${p.id}">View</a>
        </div>
      </article>
    `
    )
    .join("");

  featuredContainer.innerHTML = cards || `<p>No published projects available for this role.</p>`;
}
