const tabsContainer = document.getElementById("galleryTabs");
const grid = document.getElementById("galleryGrid");

let currentCategory = "All";

function categories() {
    return ["All", ...new Set(galleryData.map(p => p.category))];
}

function createTabs() {

    categories().forEach(cat => {

        const button = document.createElement("button");

        button.textContent = cat;

        if (cat === "All")
            button.classList.add("active");

        button.onclick = () => {

            currentCategory = cat;

            document
                .querySelectorAll(".gallery-tabs button")
                .forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            renderGallery();
        };

        tabsContainer.appendChild(button);

    });

}

function renderGallery() {

    grid.innerHTML = "";

    const photos =
        currentCategory === "All"
            ? galleryData
            : galleryData.filter(
                p => p.category === currentCategory
            );

    photos.forEach(photo => {

        const card = document.createElement("div");
        card.className = "gallery-card";

        card.innerHTML = `
            <div class="gallery-thumb">
                <img loading="lazy"
                     src="${photo.file}"
                     alt="${photo.title}">
            </div>

            <div class="gallery-title">
                ${photo.title}
            </div>
        `;

        grid.appendChild(card);

    });

}

createTabs();
renderGallery();
