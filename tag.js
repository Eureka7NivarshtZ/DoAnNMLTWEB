document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const selectedTag = params.get("tag");

  const res = await fetch("./gif.json");
  const gifs = await res.json();

  const filtered = gifs.filter((gif) => gif.tags.includes(selectedTag));

  document.getElementById("tagTitle").textContent = selectedTag.replace(
    "-",
    " ",
  );

  document.getElementById("tagCount").textContent = `${filtered.length} POSTS`;

  const grid = document.getElementById("gifGrid");

  filtered.forEach((gif) => {
    const card = document.createElement("div");
    card.className = "GifCard";

    card.innerHTML = `
      <img class="GifCard-media" src="${gif.url}" alt="${gif.title}">
      <div class="GifCard-body">
        <div class="GifCard-title">${gif.title}</div>
        <div class="GifCard-tags">
          ${gif.tags.map((tag) => `<span class="GifCard-tag">#${tag}</span>`).join("")}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
});
