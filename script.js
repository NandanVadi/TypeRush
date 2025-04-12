const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast requires a lot of practice and patience.",
    "Speed and accuracy are key to improving typing skills.",
    "Artificial intelligence is transforming the world rapidly.",
    "Programming is both an art and a science.",
    "Coding is a skill that improves with consistency.",
    "Life is what happens when you're busy making other plans.",
    "Never trust atoms, they make up everything.",
    "A bug in the code is worth two in the documentation.",
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "Sundays are for coffee, code, and chill.",
    "The mitochondria is the powerhouse of the cell.",
    "Some infinities are bigger than other infinities.",
    "Time flies like an arrow, fruit flies like a banana.",
    "I'm silently correcting your grammar in my head.",
    "The best way to predict the future is to invent it.",
    "Sleep is for the weak, said the coder at 3 AM.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "A watched pot never boils, but an unwatched program always crashes.",
    "I put the 'pro' in procrastinate.",
    "When in doubt, semicolon it out.",
    "Be yourself; everyone else is already taken.",
    "To err is human, to debug is divine.",
    "Life’s too short to remove USB safely.",
    "CSS is like magic, except when it isn’t.",
    "It’s not a bug, it’s an undocumented feature.",
    "404 error: Motivation not found.",
    "Every pizza is a personal pizza if you believe in yourself.",
    "There’s no place like 127.0.0.1.",
    "Good code is its own best documentation.",
    "Typing fast is cool, but typing accurately is cooler.",
    "Java is to JavaScript what car is to carpet.",
    "Knowledge is knowing tomato is a fruit, wisdom is not putting it in a fruit salad.",
    "Coffee first, schemes later.",
    "Some people graduate with honors, I am just honored to graduate.",
    "You can’t have everything... where would you put it?",
    "Silence is golden unless you have kids, then it's suspicious.",
    "Error 418: I'm a teapot.",
    "I tried to be normal once. Worst two minutes ever.",
    "A semicolon walks into a bar; it pauses and leaves."
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
