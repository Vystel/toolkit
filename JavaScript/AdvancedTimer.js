// AdvancedTimer.js

function updateCountdown() {
    const startDateInput = document.getElementById("startDateTime").value;
    const targetDateInput = document.getElementById("targetDateTime").value;
    const startNumber = parseFloat(document.getElementById("startNumber").value);
    const endNumber = parseFloat(document.getElementById("endNumber").value);
    const startDate = new Date(startDateInput);
    const targetDate = new Date(targetDateInput);
    const now = new Date();

    if (now < startDate) {
        document.getElementById("countdown").innerHTML = "Countdown will start soon!";
    } else if (now >= startDate && now <= targetDate) {
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
    if (event.target === modal) {
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

const startDateTimeInput = document.getElementById("startDateTime");
const targetDateTimeInput = document.getElementById("targetDateTime");
const startNumberInput = document.getElementById("startNumber");
const endNumberInput = document.getElementById("endNumber");
const timePerSliceInput = document.getElementById("timePerSlice");
const timeUnitSelect = document.getElementById("timeUnit");

startDateTimeInput.addEventListener("input", generateTimeSlices);
targetDateTimeInput.addEventListener("input", generateTimeSlices);
startNumberInput.addEventListener("input", generateTimeSlices);
endNumberInput.addEventListener("input", generateTimeSlices);
timePerSliceInput.addEventListener("input", generateTimeSlices);
timeUnitSelect.addEventListener("change", generateTimeSlices);


function generateTimeSlices() {
    const startDateInput = document.getElementById("startDateTime").value;
    const targetDateInput = document.getElementById("targetDateTime").value;
    const startNumber = parseFloat(document.getElementById("startNumber").value);
    const endNumber = parseFloat(document.getElementById("endNumber").value);
    const timePerSlice = parseFloat(document.getElementById("timePerSlice").value);
    const timeUnit = document.getElementById("timeUnit").value;
    const startDate = new Date(startDateInput);
    const targetDate = new Date(targetDateInput);

    if (isNaN(timePerSlice) || timePerSlice <= 0) {
        document.getElementById("timeSlices").innerHTML = "";
        return;
    }

    let totalSlices = 0;
    let currentTime = startDate;

    while (currentTime < targetDate) {
        totalSlices++;

        if (timeUnit === "days") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 24 * 60 * 60 * 1000)); // Days
        } else if (timeUnit === "hours") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 60 * 60 * 1000)); // Hours
        } else if (timeUnit === "minutes") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 60 * 1000)); // Minutes
        } else if (timeUnit === "seconds") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 1000)); // Seconds
        }

        if (totalSlices > 250) {
            alert("Error: The number of slices exceeds 250. Please adjust your input.");
            document.getElementById("timeSlices").innerHTML = "";
            return;
        }
    }
    const timeSlicesContainer = document.getElementById("timeSlices");
    timeSlicesContainer.innerHTML = "";

    currentTime = startDate;

    while (currentTime < targetDate) {
        const timeElapsed = (currentTime - startDate) / 1000;
        const currentNumber = startNumber - (timeElapsed * ((startNumber - endNumber) / ((targetDate - startDate) / 1000)));

        const sliceEntry = document.createElement("p");
        sliceEntry.textContent = `${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}\t${currentNumber.toFixed(2)}`;

        timeSlicesContainer.appendChild(sliceEntry);

        // Calculate the next time slice based on the selected time unit
        if (timeUnit === "days") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 24 * 60 * 60 * 1000)); // Days
        } else if (timeUnit === "hours") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 60 * 60 * 1000)); // Hours
        } else if (timeUnit === "minutes") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 60 * 1000)); // Minutes
        } else if (timeUnit === "seconds") {
            currentTime = new Date(currentTime.getTime() + (timePerSlice * 1000)); // Seconds
        }
    }
}
