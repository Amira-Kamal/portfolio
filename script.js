// =========================================================
// AMIRA KAMAL — PORTFOLIO JAVASCRIPT
// =========================================================


// =========================================================
// MOBILE MENU
// =========================================================

const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {

    menuIcon.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuIcon.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // Close menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuIcon.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


// =========================================================
// NAVBAR SCROLL EFFECT
// =========================================================

const header = document.querySelector(".header");

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


// =========================================================
// SCROLL REVEAL ANIMATION
// =========================================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// =========================================================
// ACTIVE NAVIGATION LINK
// =========================================================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


// =========================================================
// LIGHTBOX
// =========================================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");


// Open Lightbox

let currentGallery = [];
let currentImageIndex = 0;

function openLightbox(imagePath, isGallery = false) {

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = imagePath;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");
    const counter = document.querySelector(".gallery-counter");

    if (isGallery) {

        if (prev) prev.style.display = "flex";
        if (next) next.style.display = "flex";
        if (counter) counter.style.display = "block";

    } else {

        if (prev) prev.style.display = "none";
        if (next) next.style.display = "none";
        if (counter) counter.style.display = "none";

    }
}

function openGallery(images) {

    if (!images || images.length === 0) return;

    currentGallery = images;
    currentImageIndex = 0;

    openLightbox(
        currentGallery[currentImageIndex],
        true
    );

    updateGalleryCounter();
}
function nextImage() {

    if (currentGallery.length === 0) return;

    currentImageIndex++;

    if (currentImageIndex >= currentGallery.length) {
        currentImageIndex = 0;
    }

    lightboxImage.src = currentGallery[currentImageIndex];

    updateGalleryCounter();
}

function previousImage() {

    if (currentGallery.length === 0) return;

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.length - 1;
    }

    lightboxImage.src = currentGallery[currentImageIndex];

    updateGalleryCounter();
}

function updateGalleryCounter() {

    const counter = document.querySelector(".gallery-counter");

    if (!counter) return;

    counter.textContent =
        `${currentImageIndex + 1} / ${currentGallery.length}`;
}


// Close Lightbox

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


// =========================================================
// PROJECT IMAGES
// =========================================================

document.querySelectorAll(".image-view-btn").forEach(button => {

    button.addEventListener("click", () => {

        const imagePath = button.getAttribute("data-image");

        openLightbox(imagePath);

    });

});


// =========================================================
// PROJECT GALLERY BUTTON
// =========================================================

const galleries = {

    library: [

        "images/Screenshot 2026-10-01 224101.png",
        "images/Screenshot 2026-10-01 230130.png",
        "images/Screenshot 2026-10-01 230200.png",
        "images/Screenshot 2026-10-01 230225.png"

    ]

};


document.querySelectorAll(".project-gallery-btn").forEach(button => {

    button.addEventListener("click", () => {

        const galleryName = button.getAttribute("data-gallery");

        const images = galleries[galleryName];

        openGallery(images);

    });

});


const galleryNext = document.querySelector(".gallery-next");
const galleryPrev = document.querySelector(".gallery-prev");

if (galleryNext) {
    galleryNext.addEventListener("click", nextImage);
}

if (galleryPrev) {
    galleryPrev.addEventListener("click", previousImage);
}

// =========================================================
// CERTIFICATE IMAGES
// =========================================================

document.querySelectorAll(".certificate-view").forEach(button => {

    button.addEventListener("click", () => {

        const imagePath = button.getAttribute("data-image");

        openLightbox(imagePath);

    });

});


// =========================================================
// CLOSE LIGHTBOX
// =========================================================

if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);

}


// Click outside image

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


// Press ESC to close

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            alert("Please fill in all fields.");

            return;

        }


        alert(
            `Thank you, ${name}! Your message has been received.`
        );


        contactForm.reset();

    });

}


// =========================================================
// SMOOTH SCROLL
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length <= 1
        ) {
            return;
        }


        const targetElement =
            document.querySelector(targetId);


        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================================================
// IMAGE ERROR HANDLING
// =========================================================

// This prevents ugly broken-image icons
// while you haven't added your images yet.

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        if (
            image.closest(".hero-image") ||
            image.closest(".project-image") ||
            image.closest(".certificate-image")
        ) {

            image.style.opacity = "0.15";

        }

    });

});


// =========================================================
// PAGE LOADED
// =========================================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});