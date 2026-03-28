const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      createdAt: new Date().toISOString(),
    };

    const previous = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
    previous.push(payload);
    localStorage.setItem("portfolio_messages", JSON.stringify(previous));
    contactForm.reset();
    document.getElementById("contact-status")?.classList.remove("hidden");
  });
}
