document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const gallery = document.querySelector(".image-gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image")

    const images = [
        {src: "img/nature1.jpg", category: "nature"},
        {src: "img/nature2.jpg", category: "nature"},
        {src: "img/animals1.jpg", category: "animals"},
        {src: "img/animals2.jpg", category: "animals"},
        {src: "img/architecture1.jpg", category: "architecture"},
        {src: "img/architecture2.jpg", category: "architecture"}
    ];

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter;
            filterImages(category);
        })
    });
    
    const filterImages = (category) => {
        const filteredImages = category === "all" ? images : images.filter((img) => img.category === category);
        populateGallery(filteredImages)
    };
    
    const populateGallery = (images) => {
        gallery.innerHTML = "";
        images.forEach((image) => {
        const item = document.createElement("div");
        item.classList.add("image-item");
        item.innerHTML = `<img src="${image.src}" alt = "${image.category}" />`;
        gallery.appendChild(item);
        })
    }
    populateGallery(images);

        
    gallery.addEventListener("click", (e) => {
        if(e.target.tagName === "IMG") {
            const src = e.target.src;
            openLightbox(src);
        };
})
    const openLightbox = (src) => {
        lightboxImage.src = src;
        lightbox.style.display = "block";
    };

    const closeLightbox = () => {
        lightbox.style.display = "none";
    };

    window.closeLightbox = closeLightbox;

});