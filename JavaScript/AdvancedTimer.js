function updateCountdown() {
    const startDateInput = document.getElementById("startDateTime").value;
    const targetDateInput = document.getElementById("targetDateTime").value;
    const startNumber = parseFloat(document.getElementById("startNumber").value);
    const endNumber = parseFloat(document.getElementById("endNumber").value);
    const startDate = new Date(startDateInput);
    const targetDate = new Date(targetDateInput);
    const now = new Date();
    if(now < startDate) {
        document.getElementById("countdown").innerHTML = "Countdown will start soon!";
    } else if(now >= startDate && now <= targetDate) {
        const timeDiff = targetDate - startDate;
        const timeElapsed = now - startDate;
        const progress = timeElapsed / timeDiff;
        const currentNumber = startNumber - (progress * (startNumber - endNumber));
        document.getElementById("countdown").innerHTML = "Current Number: " + currentNumber.toFixed(2);
    } else {
        document.getElementById("countdown").innerHTML = "Countdown has ended!";
    }
}
setInterval(updateCountdown, 1);
updateCountdown();

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
    if(event.target === modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const currentMinute = now.getMinutes();

    const endMinute = (currentMinute + 1) % 60;
    const oneMinuteLater = new Date(now);
    oneMinuteLater.setMinutes(endMinute);

    const timezoneOffset = now.getTimezoneOffset();
    const currentDateTime = new Date(now.getTime() - (timezoneOffset * 60 * 1000)).toISOString().slice(0, 16);
    const oneMinuteLaterDateTime = new Date(oneMinuteLater.getTime() - (timezoneOffset * 60 * 1000)).toISOString().slice(0, 16);

    document.getElementById("startDateTime").value = currentDateTime;
    document.getElementById("targetDateTime").value = oneMinuteLaterDateTime;
    document.getElementById("startNumber").value = 0;
    document.getElementById("endNumber").value = 100;
});