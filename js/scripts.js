// Laedt Navigationsleiste und Fussbereich und startet den Besucherzaehler.

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

// Klassischer Hit-Counter: zaehlt die Besuche in diesem Browser hoch.
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

    // Grundstock, damit die Seite nicht ganz so verlassen wirkt
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

include("navbar-placeholder", "navbar.html");
include("footer-placeholder", "footer.html").then(() => {
    startCounter();
    showLastModified();
});
