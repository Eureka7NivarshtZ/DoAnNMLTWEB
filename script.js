document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("gifGrid");
  const counter = document.getElementById("gifCounter");
  const sortButtons = document.querySelectorAll(".SortBtn");
  let currentSort = "trending";

  let allGifs = [];
  async function init() {
    const res = await fetch("./gif.json");
    allGifs = await res.json();
    currentSort = "trending";
    sortAndRender();
  }

  function sortAndRender() {
    let sortedGifs = [...allGifs];

    if (currentSort === "likes") {
      sortedGifs.sort((a, b) => b.likes - a.likes);
    } else if (currentSort === "newest") {
      sortedGifs.sort((a, b) => b.id - a.id);
    } else if (currentSort === "trending") {
      sortedGifs.sort((a, b) => b.views - a.views);
    }

    renderGifs(sortedGifs);
    counter.textContent = `${sortedGifs.length} GIFs`;
  }
  function renderGifs(gifs) {
    grid.innerHTML = "";

    gifs.forEach((gif) => {
      const card = document.createElement("div");
      card.className = "GifCard";

      card.innerHTML = `
        <div class="GifCard-overlay">
          <button class="GifCard-action">🔗 Copy</button>
        </div>

        <img class="GifCard-media" src="${gif.url}" alt="${gif.title}" />

        <div class="GifCard-body">
          <div class="GifCard-title">${gif.title}</div>

          <div class="GifCard-tags">
            ${gif.tags
              .map((tag) => `<span class="GifCard-tag">#${tag}</span>`)
              .join("")}
          </div>

          <div class="GifCard-meta">
            <span>${gif.likes} ❤️</span>
            <span>${gif.views} 👁</span>
          </div>
        </div>
      `;

      // Click anywhere on card → go to detail page
      card.addEventListener("click", (e) => {
        // Don't navigate if clicking the copy button
        if (e.target.closest(".GifCard-action")) return;
        window.location.href = `gif-detail.html?id=${gif.id}`;
      });

      grid.appendChild(card);
    });
  }

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentSort = button.dataset.sort;

      sortButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      sortAndRender();
    });
  });

  init();
});

const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  if (window.pageYOffset <= 10) {
    footer.classList.remove("hidden");
  } else {
    footer.classList.add("hidden");
  }
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const toggleBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");

  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");

    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");

    toggleBtn.textContent = "🌙";
  }
});
