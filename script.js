const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast requires a lot of practice and patience.",
    "Speed and accuracy are key to improving typing skills.",
    "Artificial intelligence is transforming the world rapidly.",
    "Programming is both an art and a science.",
    "Coding is a skill that improves with consistency."
];

let timer = 30;
let timerInterval;
let startTime;
let typedWords = 0;
let errors = 0;
let streak = 0;
let currentSentence = "";
let typedSentence = "";

const sentenceDisplay = document.getElementById("sentence");
const typingArea = document.getElementById("typing-area");
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const speedDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const streakDisplay = document.getElementById("streak");

function startTest() {
    resetTest();
    loadNewSentence();
    typingArea.disabled = false;
    typingArea.focus();
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function resetTest() {
    clearInterval(timerInterval);
    timer = 30;
    errors = 0;
    typedWords = 0;
    streak = 0;
    sentenceDisplay.innerText = "Click 'Start' to begin!";
    typingArea.value = "";
    timerDisplay.innerText = timer;
    speedDisplay.innerText = "0";
    accuracyDisplay.innerText = "0.00";
    streakDisplay.innerText = "0";
    typingArea.style.color = "#ffffff";
}

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function updateTimer() {
    timer--;
    timerDisplay.innerText = timer;
    if (timer === 0) {
        endTest();
    }
}

function loadNewSentence() {
    currentSentence = getRandomSentence();
    sentenceDisplay.innerText = currentSentence;
    typingArea.value = "";
}

typingArea.addEventListener("input", () => {
    typedSentence = typingArea.value;
    checkAccuracy();

    if (typedSentence === currentSentence) {
        typedWords += currentSentence.trim().split(/\s+/).length;
        streak++;
        streakDisplay.innerText = streak;
        loadNewSentence();
    }
});

function checkAccuracy() {
    let correct = 0;
    let mistake = false;

    for (let i = 0; i < typedSentence.length; i++) {
        if (typedSentence[i] === currentSentence[i]) {
            correct++;
        } else {
            mistake = true;
        }
    }

    let accuracy = typedSentence.length > 0 ? (correct / typedSentence.length) * 100 : 0;
    accuracy = Math.min(accuracy, 100); // Limit to 100%
    accuracyDisplay.innerText = accuracy.toFixed(2);

    // WPM update
    const elapsed = (new Date().getTime() - startTime) / 60000;
    const wpm = Math.round(typedWords / elapsed);
    speedDisplay.innerText = isNaN(wpm) ? "0" : wpm;

    // Color feedback
    typingArea.style.color = mistake ? "red" : "white";
}

function endTest() {
    clearInterval(timerInterval);
    typingArea.disabled = true;
}

startButton.addEventListener("click", startTest);
