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
let totalTypedCharacters = 0;
let totalCorrectCharacters = 0;
let typedWords = 0;
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
    totalTypedCharacters = 0;
    totalCorrectCharacters = 0;
    typedWords = 0;
    streak = 0;
    sentenceDisplay.innerText = "Click 'Start' to begin!";
    typingArea.value = "";
    timerDisplay.innerText = timer;
    speedDisplay.innerText = "0";
    accuracyDisplay.innerText = "0.00";
    streakDisplay.innerText = "0";
    typingArea.style.color = "#ffffff";
    typingArea.disabled = true;
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
    typedSentence = "";
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
    const typed = typedSentence;
    const expected = currentSentence;

    let correct = 0;
    let mistake = false;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === expected[i]) {
            correct++;
        } else {
            mistake = true;
        }
    }

    totalTypedCharacters++;
    totalCorrectCharacters = correct;

    const accuracy = totalTypedCharacters > 0 ? (totalCorrectCharacters / totalTypedCharacters) * 100 : 0;
    accuracyDisplay.innerText = accuracy.toFixed(2);

    const elapsedMinutes = (new Date().getTime() - startTime) / 60000;
    const wpm = Math.round(typedWords / elapsedMinutes);
    speedDisplay.innerText = isNaN(wpm) || !isFinite(wpm) ? "0" : wpm;

    typingArea.style.color = mistake ? "red" : "lightgreen";
}

function endTest() {
    clearInterval(timerInterval);
    typingArea.disabled = true;
}

startButton.addEventListener("click", startTest);
