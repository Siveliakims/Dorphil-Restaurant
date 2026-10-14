document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("menu-search");
  const buttons = [...document.querySelectorAll(".filter-btn")];
  const cards = [...document.querySelectorAll(".dish-card")];
  const categories = [...document.querySelectorAll(".menu-category")];
  const empty = document.getElementById("menu-empty");
  let activeFilter = "all";

  function updateMenu() {
    const term = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = (card.dataset.name + " " + card.textContent).toLowerCase().includes(term);
      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) shown++;
    });
    categories.forEach(category => {
      category.hidden = ![...category.querySelectorAll(".dish-card")].some(card => !card.hidden);
    });
    if (empty) empty.hidden = shown !== 0;
  }
  buttons.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    buttons.forEach(item => item.classList.toggle("active", item === button));
    updateMenu();
  }));
  search?.addEventListener("input", updateMenu);
  document.querySelectorAll(".order-dish").forEach(button => button.addEventListener("click", () => {
    const dish = button.dataset.dish || "a menu item";
    const message = `Hello Dorphil Restaurant, I'd like to enquire about ${dish}. Please confirm availability.`;
    window.open(`https://wa.me/260975868663?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }));
});