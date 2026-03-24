// Determine folder depth
function getPathPrefix() {
    const path = window.location.pathname;
    const repoBase = "";
    const pathParts = path
        .replace(repoBase, "")
        .split("/")
        .filter(p => p !== "" && !p.includes(".html"));

    return "../".repeat(pathParts.length);
}


// Highlight active navigation link
function initNavigation() {
    const links = document.querySelectorAll("header .nav-links a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        // Homepage link
        if (currentPath === "/" && linkPath === "/") {
            link.classList.add("active");
            return;
        }

        // Skip the homepage link for subpage matching
        if (linkPath === "/") return;

        // Activate for current page or any subpage
        if (currentPath === linkPath || currentPath.startsWith(linkPath)) {
            link.classList.add("active");
        }

        // Activate for current page or any subpage
        if (linkPath === "/photos/" && currentPath.startsWith("/videos/")) {
            link.classList.add("active");
        }
    });
}


// Load header
function loadHeader() {
    const prefix = getPathPrefix();

    fetch(prefix + "header.html")
        .then(res => {
            if (!res.ok) throw new Error("Could not load header");
            return res.text();
        })
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Run navigation highlighting AFTER header loads
            initNavigation();
        })
        .catch(err => console.error(err));
}


// Load footer
function loadFooter() {
    const prefix = getPathPrefix();

    fetch(prefix + "footer.html")
        .then(res => {
            if (!res.ok) throw new Error("Could not load footer");
            return res.text();
        })
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(err => console.error(err));
}


// Mobile hamburger
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) return;

    navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
}


// Header scroll effect
function initHeaderScroll() {
    window.addEventListener("scroll", function () {

        const header = document.querySelector("header");
        if (!header) return;

        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });
}


// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
    loadHeader();
    loadFooter();
    initHeaderScroll();
});

function link(path){
    return BASE_PATH + path;
}