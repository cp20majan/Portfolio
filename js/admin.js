const adminGuard = document.getElementById("admin-guard");
const blocked = document.getElementById("admin-blocked");
const user = getCurrentUser();

if (adminGuard && blocked) {
  if (!canAdmin(user)) {
    blocked.classList.remove("hidden");
  } else {
    adminGuard.classList.remove("hidden");
    initAdmin();
  }
}

function initAdmin() {
  const list = document.getElementById("admin-project-list");
  const form = document.getElementById("project-form");
  const resetBtn = document.getElementById("reset-form");
  const formTitle = document.getElementById("form-title");

  function renderList() {
    const projects = getProjects();
    list.innerHTML = projects
      .map(
        (p) => `
        <article class="card form-card">
          <h3>${p.title}</h3>
          <p style="font-size:0.92rem;">${p.shortDescription}</p>
          <div class="badges">
            <span class="badge">${p.status}</span>
            <span class="badge ${p.visibility === "authenticated" ? "restricted" : ""}">${p.visibility}</span>
          </div>
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap; margin-top:0.5rem;">
            <button class="btn btn-ghost" data-action="edit" data-id="${p.id}">Edit</button>
            <button class="btn btn-secondary" data-action="delete" data-id="${p.id}">Delete</button>
          </div>
        </article>
      `
      )
      .join("");

    list.querySelectorAll("button[data-action]").forEach((btn) => {
      const id = btn.dataset.id;
      if (btn.dataset.action === "edit") {
        btn.addEventListener("click", () => loadProjectToForm(id));
      } else {
        btn.addEventListener("click", () => {
          const remaining = getProjects().filter((p) => p.id !== id);
          setProjects(remaining);
          renderList();
        });
      }
    });
  }

  function parseAttachmentInput(raw = "") {
    return raw
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((entry) => {
        const [name, url] = entry.split(":");
        return { name: (name || "Attachment").trim(), url: (url || "#").trim() };
      });
  }

  function loadProjectToForm(id) {
    const project = getProjects().find((p) => p.id === id);
    if (!project) return;
    formTitle.textContent = `Edit Project — ${project.title}`;
    document.getElementById("project-id").value = project.id;
    document.getElementById("title").value = project.title;
    document.getElementById("shortDescription").value = project.shortDescription;
    document.getElementById("fullDescription").value = project.fullDescription;
    document.getElementById("tags").value = project.tags.join(", ");
    document.getElementById("thumbnail").value = project.thumbnail || "";
    document.getElementById("attachments").value = (project.attachments || []).map((a) => `${a.name}:${a.url}`).join(", ");
    document.getElementById("stack").value = (project.stack || []).join(", ");
    document.getElementById("gallery").value = (project.gallery || []).join(", ");
    document.getElementById("visibility").value = project.visibility;
    document.getElementById("status").value = project.status;
  }

  function clearForm() {
    form.reset();
    document.getElementById("project-id").value = "";
    formTitle.textContent = "Upload New Project";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("project-id").value || `p-${Date.now()}`;

    const payload = {
      id,
      title: document.getElementById("title").value,
      shortDescription: document.getElementById("shortDescription").value,
      fullDescription: document.getElementById("fullDescription").value,
      tags: document.getElementById("tags").value.split(",").map((t) => t.trim()).filter(Boolean),
      thumbnail: document.getElementById("thumbnail").value || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      attachments: parseAttachmentInput(document.getElementById("attachments").value),
      stack: document.getElementById("stack").value.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: document.getElementById("gallery").value.split(",").map((g) => g.trim()).filter(Boolean),
      visibility: document.getElementById("visibility").value,
      status: document.getElementById("status").value,
    };

    const projects = getProjects();
    const idx = projects.findIndex((p) => p.id === id);
    if (idx >= 0) projects[idx] = payload;
    else projects.unshift(payload);

    setProjects(projects);
    clearForm();
    renderList();
  });

  resetBtn?.addEventListener("click", clearForm);
  renderList();
}
