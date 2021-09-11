const languageScreen = document.getElementById("language-screen");
const startingScreen = document.getElementById("starting-screen");
const chooseScreen = document.getElementById("choose-screen");
const gameScreen = document.getElementById("game-screen");

const arStartingButton = document.getElementById("ar");
const enSartingButton = document.getElementById("en");
const startingButton = document.getElementById("starting-button");

const flipSound = document.getElementById("flip-sound");
const clickSound = document.getElementById("click-sound");
const victory = document.getElementById("victory-sound");

const finalBest = document.getElementById("final-best");

let isHeads = true;
let appLanguage = "en";
let coin;
let counterHeads = 0;
let counterTails = 0;
let flipStop = false;
let bestUpdate = false;

const headsButton = document.getElementById("heads");
const tailsButton = document.getElementById("tails");
const flipButton = document.getElementsByClassName("flip");
const coinFlip = document.getElementById("coin");

const headsCounter = document.getElementById("heads-counter");
const tailsCounter = document.getElementById("tails-counter");

const finishingScreen = document.getElementById("finishing-screen");
const againButton = document.getElementById("again-button");
const bestOf = document.getElementById("best-of");
const headsColor = document.getElementById("heads-color");
const tailsColor = document.getElementById("tails-color");
const randomWordsH1 = document.getElementById("random-words");
const randomWords = [
  "طب نخلي <br> الفورة من",
  "طب نجرب نخليها <br> من",
  "تعالى نجربلك <br> فورة من",
  "طب نجرب مثلاً <br> فورة من",
  "خلاص خلي <br> الفورة من",
];

function hide(section1, section2, language) {
  section1.classList.toggle("hide");
  section2.classList.toggle("hide");
  if (section2 !== finishingScreen) {
    clickSound.play();
  }
  appLanguage = language;
}
arStartingButton.addEventListener(
  "click",
  hide.bind(null, languageScreen, startingScreen, "ar")
);
enSartingButton.addEventListener(
  "click",
  hide.bind(null, languageScreen, startingScreen, "en")
);
startingButton.addEventListener(
  "click",
  hide.bind(null, startingScreen, chooseScreen)
);

function hide2(section1, section2, choice) {
  hide(section1, section2);
  isHeads = choice;
  counterHeads = 0;
  counterTails = 0;
  headsCounter.innerHTML = `${counterHeads}`;
  tailsCounter.innerHTML = `${counterTails}`;
  randomWordsH1.innerHTML = `الفورة من <span id="best-of">1</span>`;
  bestOf.innerHTML = `1`;
  coinFlip.className = "";
  flipStop = false;

  if (isHeads) {
    headsColor.style.color = "#01B636";
    tailsColor.style.color = "#BF0000";
  } else {
    headsColor.style.color = "#BF0000";
    tailsColor.style.color = "#01B636";
  }
}

headsButton.addEventListener(
  "click",
  hide2.bind(null, chooseScreen, gameScreen, true)
);
tailsButton.addEventListener(
  "click",
  hide2.bind(null, chooseScreen, gameScreen, false)
);
againButton.addEventListener(
  "click",
  hide.bind(null, finishingScreen, chooseScreen)
);

function flip() {
  let userCounter;
  let pcCounter;
  if (flipStop) {
    return;
  }
  flipSound.play();
  flipStop = true;
  coinFlip.classList.remove("heads");
  coinFlip.classList.remove("tails");
  const random = Math.random();
  setTimeout(() => {
    if (random >= 0.5) {
      coin = true;
      coinFlip.classList.remove("rotate");
      coinFlip.classList.add("heads");
      setTimeout(() => {
        counterHeads++;
        headsCounter.innerHTML = `${counterHeads}`;
      }, 900);
    } else {
      coin = false;
      coinFlip.classList.add("tails", "rotate");
      setTimeout(() => {
        counterTails++;
        tailsCounter.innerHTML = `${counterTails}`;
      }, 900);
    }
    setTimeout(() => {
      userCounter = isHeads ? counterHeads : counterTails;
      pcCounter = !isHeads ? counterHeads : counterTails;

      if (coin !== isHeads) {
        bestUpdate = true;
      }

      if (pcCounter > userCounter && bestUpdate) {
        const randomElement =
          randomWords[Math.floor(Math.random() * randomWords.length)];
        randomWordsH1.innerHTML = `${randomElement} <span id="best-of">${
          pcCounter * 2 + 1
        }</span> ؟ `;
        bestUpdate = false;
      }

      if (userCounter > pcCounter) {
        setTimeout(() => {
          hide(gameScreen, finishingScreen);
          finalBest.innerHTML = `${pcCounter * 2 + 1}`;
          victory.play();
        }, 500);
      } else {
        flipStop = false;
      }
    }, 900);
  }, 100);
}

flipButton[0].addEventListener("click", flip);
flipButton[1].addEventListener("click", flip);
