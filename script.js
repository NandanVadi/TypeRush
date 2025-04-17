const sentences = [
    "the quick brown fox jumps over the lazy dog",
    "typing fast requires a lot of practice and patience",
    "speed and accuracy are key to improving typing skills",
    "artificial intelligence is transforming the world rapidly",
    "programming is both an art and a science",
    "coding is a skill that improves with consistency",
    "life is what happens when youre busy making other plans",
    "never trust atoms they make up everything",
    "a bug in the code is worth two in the documentation",
    "debugging is like being the detective in a crime movie where you are also the murderer",
    "sundays are for coffee code and chill",
    "the mitochondria is the powerhouse of the cell",
    "some infinities are bigger than other infinities",
    "time flies like an arrow fruit flies like a banana",
    "im silently correcting your grammar in my head",
    "the best way to predict the future is to invent it",
    "sleep is for the weak said the coder at 3 am",
    "why dont skeletons fight each other they dont have the guts",
    "a watched pot never boils but an unwatched program always crashes",
    "i put the pro in procrastinate",
    "when in doubt semicolon it out",
    "be yourself everyone else is already taken",
    "to err is human to debug is divine",
    "lifes too short to remove usb safely",
    "css is like magic except when it isnt",
    "its not a bug its an undocumented feature",
    "error 404 motivation not found",
    "every pizza is a personal pizza if you believe in yourself",
    "theres no place like 127001",
    "good code is its own best documentation",
    "typing fast is cool but typing accurately is cooler",
    "java is to javascript what car is to carpet",
    "knowledge is knowing tomato is a fruit wisdom is not putting it in a fruit salad",
    "coffee first schemes later",
    "some people graduate with honors i am just honored to graduate",
    "you cant have everything where would you put it",
    "silence is golden unless you have kids then its suspicious",
    "error 418 im a teapot",
    "i tried to be normal once worst two minutes ever",
    "a semicolon walks into a bar it pauses and leaves"
  ];
  
  let timer = 30;
  let timerInterval;
  let startTime;
  let totalTypedCharacters = 0;
  let totalCorrectCharacters = 0;
  let typedWords = 0;
  let streak = 0;
  let currentSentence = "";
  
  const displayText = document.getElementById("displayText");
  const typingInput = document.getElementById("typingInput");
  const startButton = document.getElementById("start-button");
  const timerDisplay = document.getElementById("timer");
  const speedDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  const streakDisplay = document.getElementById("streak");
  
  function startTest() {
    resetTest();
    loadNewSentence();
    typingInput.disabled = false;
    typingInput.focus();
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
    displayText.innerHTML = "Click 'Start' to begin!";
    typingInput.value = "";
    timerDisplay.innerText = timer;
    speedDisplay.innerText = "0";
    accuracyDisplay.innerText = "0.00";
    streakDisplay.innerText = "0";
    typingInput.disabled = true;
  }
  
  function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
  }
  
  function updateTimer() {
    timer--;
    timerDisplay.innerText = timer;
    if (timer === 0) endTest();
  }
  
  function loadNewSentence() {
    currentSentence = getRandomSentence();
    displayText.innerHTML = "";
    for (let char of currentSentence) {
      const span = document.createElement("span");
      span.textContent = char;
      displayText.appendChild(span);
    }
  }
  
  typingInput.addEventListener("input", () => {
    const typed = typingInput.value;
    const spans = displayText.querySelectorAll("span");
  
    let correctCount = 0;
    for (let i = 0; i < spans.length; i++) {
      const char = typed[i];
      if (char == null) {
        spans[i].classList.remove("correct", "incorrect");
      } else if (char === spans[i].textContent) {
        spans[i].classList.add("correct");
        spans[i].classList.remove("incorrect");
        correctCount++;
      } else {
        spans[i].classList.add("incorrect");
        spans[i].classList.remove("correct");
      }
    }
  
    const currentTyped = typed.length;
    const currentCorrect = correctCount;
  
    // Calculate WPM using all previous completed words + current ones
    const elapsedMinutes = (new Date().getTime() - startTime) / 60000;
    const liveWords = typed.trim().split(/\s+/).length;
    const wpm = Math.round((typedWords + liveWords - 1) / elapsedMinutes);
    speedDisplay.innerText = isNaN(wpm) ? "0" : wpm;
  
    const accuracy = currentTyped > 0 ? (currentCorrect / currentTyped) * 100 : 0;
    accuracyDisplay.innerText = accuracy.toFixed(2);
  
    if (typed === currentSentence) {
      totalTypedCharacters += currentTyped;
      totalCorrectCharacters += currentCorrect;
      typedWords += currentSentence.trim().split(/\s+/).length;
      streak++;
      streakDisplay.innerText = streak;
  
      typingInput.value = "";
      setTimeout(() => loadNewSentence(), 100);
    }
  });
  
  function endTest() {
    clearInterval(timerInterval);
    typingInput.disabled = true;
  }
  
  startButton.addEventListener("click", startTest);
