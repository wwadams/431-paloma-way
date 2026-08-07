import PhotoSwipeLightbox from
    'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js';

const tabsContainer = document.getElementById("galleryTabs");
const grid = document.getElementById("galleryGrid");

let currentCategory = "All";

function getCategories() {
    return [
        "All",
        ...new Set(galleryData.map(photo => photo.category))
    ];
}

function createTabs() {

    tabsContainer.innerHTML = "";

    getCategories().forEach(category => {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = category;

        if (category === currentCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            currentCategory = category;

            createTabs();
            renderGallery();

        });

        tabsContainer.appendChild(button);

    });
}

function renderGallery() {

    grid.innerHTML = "";

    const photos = currentCategory === "All"
        ? galleryData
        : galleryData.filter(
            photo => photo.category === currentCategory
        );

    photos.forEach(photo => {

        const link = document.createElement("a");

        link.className = "gallery-card";

        link.href = photo.file;

        link.dataset.pswpWidth = photo.width;
        link.dataset.pswpHeight = photo.height;

        link.dataset.pswpCaption = photo.title;

        link.innerHTML = `
            <div class="gallery-thumb">
                <img
                    src="${photo.file}"
                    alt="${photo.title}"
                    loading="lazy">
            </div>

            <div class="gallery-title">
                ${photo.title}
            </div>
        `;

        grid.appendChild(link);

    });

    initializePhotoSwipe();
}

let lightbox;

function initializePhotoSwipe() {

    if (lightbox) {
        lightbox.destroy();
    }

    lightbox = new PhotoSwipeLightbox({

        gallery: "#galleryGrid",

        children: "a",

        pswpModule: () =>
            import(
                "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js"
            ),

        preload: [1, 2],

        bgOpacity: 0.95,

        loop: true,

        wheelToZoom: true

    });

    lightbox.init();
}

createTabs();
renderGallery();
