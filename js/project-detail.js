const detailRoot = document.getElementById("project-detail");

if (detailRoot) {
  const user = getCurrentUser();
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = getProjects().find((p) => p.id === projectId);

  if (!project) {
    detailRoot.innerHTML = `<section class="card form-card"><h1>Project Not Found</h1><p>This project does not exist.</p></section>`;
  } else if (!hasAccess(project, user)) {
    detailRoot.innerHTML = `
      <section class="card form-card">
        <h1>Restricted Project</h1>
        <p>This project is only visible to authenticated viewers. Please sign in to continue.</p>
        <a class="btn btn-primary" href="login.html">Sign In</a>
      </section>
    `;
  } else {
    detailRoot.innerHTML = `
      <section class="detail-layout">
        <article class="card">
          <img src="${project.thumbnail}" alt="${project.title}" style="max-height:350px;width:100%;object-fit:cover;" />
          <div class="card-content">
            <div class="badges">
              ${formatTags(project.tags)}
              ${project.visibility === "authenticated" ? '<span class="badge restricted">authenticated</span>' : ""}
            </div>
            <h1>${project.title}</h1>
            <p>${project.shortDescription}</p>
            <div>${markdownToHtml(project.fullDescription)}</div>
          </div>
        </article>
        <aside class="grid">
          <section class="card form-card">
            <h3>Tech Stack</h3>
            <div class="badges">${(project.stack || []).map((s) => `<span class="badge">${s}</span>`).join("")}</div>
          </section>
          <section class="card form-card">
            <h3>Attachments</h3>
            <ul class="info-list">
              ${(project.attachments || []).map((a) => `<li><a style="color:var(--primary);" href="${a.url}" target="_blank" rel="noreferrer">${a.name}</a></li>`).join("")}
            </ul>
          </section>
        </aside>
      </section>
      <section style="margin-top:1rem;">
        <h2>Diagram Gallery</h2>
        <div class="grid projects-grid">
          ${(project.gallery || []).map((img) => `<article class="card"><img src="${img}" alt="Project visual" style="height:180px;width:100%;object-fit:cover;" /></article>`).join("") || "<p>No gallery media available.</p>"}
        </div>
      </section>
    `;
  }
}
