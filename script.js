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
let currentSentence = "";
let typedSentence = "";

const sentenceDisplay = document.getElementById("sentence");
const typingArea = document.getElementById("typing-area");
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const speedDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

function startTest() {
    resetTest();
    currentSentence = getRandomSentence();
    sentenceDisplay.innerText = currentSentence;
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
    sentenceDisplay.innerText = "Click 'Start' to begin!";
    typingArea.value = "";
    timerDisplay.innerText = timer;
    speedDisplay.innerText = "0";
    accuracyDisplay.innerText = "0.00";
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

typingArea.addEventListener("input", () => {
    typedSentence = typingArea.value;
    checkAccuracy();
    if (typedSentence === currentSentence) {
        typedWords += currentSentence.split(" ").length;
        currentSentence = getRandomSentence();
        sentenceDisplay.innerText = currentSentence;
        typingArea.value = "";
    }
});

function checkAccuracy() {
    let correct = 0;
    for (let i = 0; i < typedSentence.length; i++) {
        if (typedSentence[i] === currentSentence[i]) {
            correct++;
        } else {
            errors++;
        }
    }
    let accuracy = (correct / typedSentence.length) * 100 || 0;
    accuracyDisplay.innerText = accuracy.toFixed(2);
}

function endTest() {
    clearInterval(timerInterval);
    let wpm = Math.round(typedWords / (30 / 60)) || 0;
    speedDisplay.innerText = wpm;
    typingArea.disabled = true;
}

startButton.addEventListener("click", startTest);