const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    setCurrentUser({ email, role });
    window.location.href = role === "admin" ? "admin.html" : "projects.html";
  });
}
