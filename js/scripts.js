// Loads the navigation bar and footer and starts the visitor counter.

function include(placeholderId, file) {
    return fetch(file)
        .then(response => response.text())
        .then(html => {
            const target = document.getElementById(placeholderId);
            if (target) {
                target.innerHTML = html;
            }
        });
}

// Classic hit counter: counts up visits in this browser.
function startCounter() {
    const display = document.getElementById("hitcounter");
    if (!display) {
        return;
    }

    let hits = parseInt(localStorage.getItem("hits") || "0", 10);
    if (isNaN(hits)) {
        hits = 0;
    }
    hits += 1;
    localStorage.setItem("hits", String(hits));

    // Base value so the page doesn't feel too deserted
    const total = 13337 + hits;
    display.textContent = String(total).padStart(7, "0");
}

function showLastModified() {
    const target = document.getElementById("lastmod");
    if (!target) {
        return;
    }
    const date = new Date(document.lastModified);
    const pad = value => String(value).padStart(2, "0");
    target.textContent = pad(date.getDate()) + "." + pad(date.getMonth() + 1) + "." + date.getFullYear();
}

// Easter egg: click the hidden white rabbit for a digital rain effect.
function initWhiteRabbit() {
    const rabbit = document.getElementById("white-rabbit");
    if (!rabbit) {
        return;
    }
    rabbit.addEventListener("click", triggerDigitalRain);
}

function triggerDigitalRain() {
    if (document.getElementById("digital-rain-overlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "digital-rain-overlay";
    const canvas = document.createElement("canvas");
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    const ctx = canvas.getContext("2d");
    const fontSize = 16;
    let columns;
    let drops;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1);
    }
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#3ef58b";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 40);
    requestAnimationFrame(() => overlay.classList.add("active"));

    function stop() {
        clearInterval(interval);
        window.removeEventListener("resize", resize);
        overlay.removeEventListener("click", stop);
        window.removeEventListener("keydown", stop);
        overlay.classList.remove("active");
        setTimeout(() => overlay.remove(), 400);
    }

    overlay.addEventListener("click", stop);
    window.addEventListener("keydown", stop);
    setTimeout(stop, 6000);
}

include("navbar-placeholder", "navbar.html");
include("footer-placeholder", "footer.html").then(() => {
    startCounter();
    showLastModified();
    initWhiteRabbit();
});
