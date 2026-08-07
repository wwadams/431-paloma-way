// ===== Lightbox =====

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const photoCaption = document.getElementById("photoCaption");
const photoCounter = document.getElementById("photoCounter");

const closeButton = document.getElementById("closeLightbox");
const prevButton = document.getElementById("prevPhoto");
const nextButton = document.getElementById("nextPhoto");

let currentPhotos = [];
let currentIndex = 0;

function openLightbox(photoList, index) {

    currentPhotos = photoList;
    currentIndex = index;

    updateLightbox();

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";

}

function closeLightbox() {

    lightbox.style.display = "none";
    document.body.style.overflow = "";

}

function updateLightbox() {

    const photo = currentPhotos[currentIndex];

    lightboxImage.src = photo.file;

    lightboxImage.alt = photo.title;

    photoCaption.textContent = photo.title;

    photoCounter.textContent =
        `${currentIndex + 1} of ${currentPhotos.length}`;

}

function nextPhoto() {

    currentIndex++;

    if (currentIndex >= currentPhotos.length)
        currentIndex = 0;

    updateLightbox();

}

function previousPhoto() {

    currentIndex--;

    if (currentIndex < 0)
        currentIndex = currentPhotos.length - 1;

    updateLightbox();

}

closeButton.onclick = closeLightbox;

nextButton.onclick = nextPhoto;

prevButton.onclick = previousPhoto;

document.addEventListener("keydown", e => {

    if (lightbox.style.display !== "flex")
        return;

    if (e.key === "Escape")
        closeLightbox();

    if (e.key === "ArrowRight")
        nextPhoto();

    if (e.key === "ArrowLeft")
        previousPhoto();

});
