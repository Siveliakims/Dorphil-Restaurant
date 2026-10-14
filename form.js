document.addEventListener("DOMContentLoaded", () => {
  const phone = "260975868663";
  document.querySelectorAll("form[data-form-type]").forEach(form => {
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      dateInput.min = localDate;
    }
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const type = form.dataset.formType || "Enquiry";
      const lines = [`Hello Dorphil Restaurant. I'd like to make a ${type.toLowerCase()}.`];
      for (const [key, value] of data.entries()) {
        const cleaned = String(value).trim();
        if (cleaned) lines.push(`${key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}: ${cleaned}`);
      }
      lines.push("Please let me know availability and the next steps.");
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
      const status = form.querySelector(".form-status");
      if (status) status.textContent = "Opening WhatsApp. Review the message and press Send to contact the restaurant.";
      window.open(url, "_blank", "noopener");
    });
  });
});