function openModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}