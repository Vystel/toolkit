let timerInterval;
let isTimerRunning = false;

function startStopTimer() {
    const button = document.getElementById("startStopButton");
    const timerDisplay = document.getElementById("timer");
    const estimatedTimeDisplay = document.getElementById("estimatedTime");

    if (!isTimerRunning) {
        const multiplyNumber = parseInt(document.getElementById("multiplyNumber").value);
        if (isNaN(multiplyNumber) || multiplyNumber <= 0) {
            alert("Please enter a valid number to multiply by.");
            return;
        }

        let seconds = 0;
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.innerText = `Timer: ${seconds} seconds`;
        }, 1000);

        button.innerText = "Stop Timer";
        isTimerRunning = true;
    } else {
        clearInterval(timerInterval);
        const seconds = parseInt(timerDisplay.innerText.split(":")[1]);
        const multiplyNumber = parseInt(document.getElementById("multiplyNumber").value);
        const estimatedSeconds = seconds * multiplyNumber;
        const estimatedDate = new Date(Date.now() + estimatedSeconds * 1000);
        estimatedTimeDisplay.innerText = `Estimated time ${estimatedSeconds} seconds from now is: ${estimatedDate.toLocaleTimeString()}`;

        button.innerText = "Start Timer";
        isTimerRunning = false;
    }
}