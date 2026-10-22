
// =====================================================
// AMIRA KAMAL — PORTFOLIO JAVASCRIPT
// =====================================================

// MOBILE MENU
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuIcon.setAttribute("aria-expanded", String(isOpen));

        const icon = menuIcon.querySelector("i");
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuIcon.setAttribute("aria-expanded", "false");

            const icon = menuIcon.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });
}

// NAVBAR SCROLL EFFECT
const header = document.querySelector(".header");

function handleHeaderScroll() {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
}

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("show"));
}

// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// LIGHTBOX AND GALLERY
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryCounter = document.querySelector(".gallery-counter");

let currentGallery = [];
let currentImageIndex = 0;

function openLightbox(imagePath, galleryMode = false) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = imagePath;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const displayMode = galleryMode ? "flex" : "none";

    if (galleryPrev) galleryPrev.style.display = displayMode;
    if (galleryNext) galleryNext.style.display = displayMode;
    if (galleryCounter) galleryCounter.style.display = galleryMode ? "block" : "none";
}

function openGallery(images) {
    if (!images || images.length === 0) return;

    currentGallery = images;
    currentImageIndex = 0;

    openLightbox(currentGallery[currentImageIndex], true);
    updateGalleryCounter();
}

function showGalleryImage() {
    if (!currentGallery.length || !lightboxImage) return;

    lightboxImage.src = currentGallery[currentImageIndex];
    updateGalleryCounter();
}

function nextImage() {
    if (!currentGallery.length) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    showGalleryImage();
}

function previousImage() {
    if (!currentGallery.length) return;
    currentImageIndex =
        (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    showGalleryImage();
}

function updateGalleryCounter() {
    if (galleryCounter) {
        galleryCounter.textContent =
            `${currentImageIndex + 1} / ${currentGallery.length}`;
    }
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lightboxImage) lightboxImage.src = "";
}

document.querySelectorAll(".image-view-btn, .certificate-view").forEach(button => {
    button.addEventListener("click", () => {
        const imagePath = button.getAttribute("data-image");
        if (imagePath) openLightbox(imagePath);
    });
});

// Replace these filenames with the exact names of your gallery screenshots.

const galleries = {
    library: [
        "images/Screenshot 2026-10-01 224101.png",
        "images/Screenshot 2026-10-01 230130.png",
        "images/Screenshot 2026-10-01 230200.png",
        "images/Screenshot 2026-10-01 230225.png"
    ],

    portfolio: [
        "images/Screenshot 2026-10-22 204556.jpg",
        "images/Screenshot 2026-10-22 204612.jpg",
        "images/Screenshot 2026-10-22 204627.jpg",
        "images/Screenshot 2026-10-22 204645.jpg",
        "images/Screenshot 2026-10-22 204709.jpg",
        "images/Screenshot 2026-10-22 204725.jpg",
        "images/Screenshot 2026-10-22 204738.jpg"
  
    ],

    lms: [
        "images/Screenshot 2026-10-22 203156.jpg",
        "images/Screenshot 2026-10-22 203248.jpg",
        "images/Screenshot 2026-10-22 203327.jpg",
        "images/Screenshot 2026-10-22 203345.jpg",
        "images/Screenshot 2026-10-22 203407.jpg",
        "images/Screenshot 2026-10-22 203505.jpg",
        "images/Screenshot 2026-10-22 203544.jpg",
        "images/Screenshot 2026-10-22 203630.jpg"
       
    ]
};

document.querySelectorAll(".project-gallery-btn").forEach(button => {
    button.addEventListener("click", () => {
        const galleryName = button.getAttribute("data-gallery");
        openGallery(galleries[galleryName]);
    });
});


document.querySelectorAll(".project-gallery-btn").forEach(button => {
    button.addEventListener("click", () => {
        const galleryName = button.getAttribute("data-gallery");
        openGallery(galleries[galleryName]);
    });
});

if (galleryNext) galleryNext.addEventListener("click", nextImage);
if (galleryPrev) galleryPrev.addEventListener("click", previousImage);
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });
}

document.addEventListener("keydown", event => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") previousImage();
});

// CONTACT FORM
// This is a front-end demo. It does not send an email without a backend or email service.
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

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:m7264102@gmail.com?subject=${subject}&body=${body}`;
    });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// IMAGE FALLBACK
document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        image.classList.add("image-unavailable");
    });
});

// PAGE LOADED
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
