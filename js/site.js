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

        // Special case: Videos subpages highlight Photos
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

            // Initialize mobile menu AFTER header exists
            initMobileMenu();
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

// Unified mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    // Hamburger click toggles menu
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from bubbling
        const isOpen = navLinks.style.display === "flex";
        navLinks.style.display = isOpen ? "none" : "flex";
    });

    // Click anywhere outside nav closes it
    document.addEventListener("click", (e) => {
        if (
            navLinks.style.display === "flex" &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navLinks.style.display = "none";
        }
    });

    // Close menu on scroll
    window.addEventListener("scroll", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        }
    });

    // Optional: close menu when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            navLinks.style.display = "";
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