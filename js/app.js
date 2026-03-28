const STORAGE_KEYS = {
  projects: "portfolio_projects",
  user: "portfolio_user",
};

const seedProjects = [
  {
    id: "p-1",
    title: "SCADA Security Hardening Blueprint",
    shortDescription: "Segmented control network with anomaly detection and secure remote access.",
    fullDescription: "# SCADA Security Hardening\n\nDesigned a defense-in-depth strategy for remote terminal units and supervisory control systems.\n\n## Highlights\n- VLAN segmentation and firewall policies\n- Syslog-based SIEM integration\n- NIST 800-82 aligned hardening checklist",
    tags: ["cybersecurity", "automation", "networking"],
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    attachments: [{ name: "SCADA-Hardening-Report.pdf", url: "#" }],
    visibility: "authenticated",
    status: "published",
    stack: ["Wireshark", "Suricata", "IEC 62443"],
    gallery: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "p-2",
    title: "Enterprise OSPF/BGP Lab Deployment",
    shortDescription: "Dual-stack routing architecture with failover and traffic engineering.",
    fullDescription: "# Enterprise Routing Lab\n\nBuilt a hybrid OSPF + BGP topology simulating multi-site upstream connectivity.",
    tags: ["networking", "devops"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    attachments: [{ name: "Routing-Diagram.pdf", url: "#" }],
    visibility: "public",
    status: "published",
    stack: ["Cisco Packet Tracer", "FRRouting", "NetBox"],
    gallery: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"],
  },
  {
    id: "p-3",
    title: "Predictive Maintenance Telemetry Pipeline",
    shortDescription: "Collected PLC telemetry and built alerting dashboards for pump station KPIs.",
    fullDescription: "# Predictive Maintenance\n\nAutomated ingestion and threshold alerting for field sensor anomalies.",
    tags: ["automation", "devops"],
    thumbnail: "https://images.unsplash.com/photo-1581093588401-22d4e3be40a0?auto=format&fit=crop&w=1200&q=80",
    attachments: [{ name: "Telemetry-Architecture.pdf", url: "#" }],
    visibility: "public",
    status: "draft",
    stack: ["Node-RED", "InfluxDB", "Grafana"],
    gallery: [],
  },
];

function bootstrapData() {
  if (!localStorage.getItem(STORAGE_KEYS.projects)) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(seedProjects));
  }
}

function getProjects() {
  bootstrapData();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || "[]");
}

function setProjects(projects) {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.user);
}

function hasAccess(project, user) {
  if (project.status !== "published") return false;
  if (project.visibility === "public") return true;
  return Boolean(user);
}

function canAdmin(user) {
  return user?.role === "admin";
}

function formatTags(tags = []) {
  return tags
    .map((tag) => `<span class="badge ${tag === "restricted" ? "restricted" : ""}">${tag}</span>`)
    .join("");
}

function renderNav() {
  const user = getCurrentUser();
  const navSlot = document.getElementById("auth-slot");
  const adminLink = document.getElementById("nav-admin");

  if (adminLink) {
    adminLink.classList.toggle("hidden", !canAdmin(user));
  }

  if (!navSlot) return;

  if (user) {
    navSlot.innerHTML = `
      <span class="auth-chip">${user.role.toUpperCase()} · ${user.email}</span>
      <button id="logout-btn" class="btn btn-ghost">Logout</button>
    `;
    document.getElementById("logout-btn")?.addEventListener("click", () => {
      clearCurrentUser();
      window.location.reload();
    });
  } else {
    navSlot.innerHTML = `<a class="btn btn-ghost" href="login.html">Login</a>`;
  }
}

function activateNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === current) a.classList.add("active");
  });
}

function markdownToHtml(md = "") {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
    .replace(/\n- (.*)/gim, "<li>$1</li>")
    .replace(/\n/g, "<br />");
}

bootstrapData();
renderNav();
activateNav();
