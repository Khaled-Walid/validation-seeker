const startingButton = document.getElementById("starting-button");
const startingScreen = document.getElementById("starting-screen");
const chooseScreen = document.getElementById("choose-screen");
const gameScreen = document.getElementById("game-screen");
const finalBest = document.getElementById("final-best");

let isHeads = true;
let coin;
let counterHeads = 0;
let counterTails = 0;

const headsButton = document.getElementById("heads");
const tailsButton = document.getElementById("tails");
const flipButton = document.getElementById("flip");

const headsCounter = document.getElementById("heads-counter");
const tailsCounter = document.getElementById("tails-counter");

const finishingScreen = document.getElementById("finishing-screen");
const againButton = document.getElementById("again-button");
const bestOf = document.getElementById("best-of")
const headsColor = document.getElementById("heads-color")
const tailsColor = document.getElementById("tails-color")

function hide(section1, section2) {
  section1.classList.toggle("hide");
  section2.classList.toggle("hide");
}
startingButton.addEventListener(
  "click",
  hide.bind(null, startingScreen, chooseScreen)
);

function hide2(section1, section2, choice) {
  hide(section1, section2);
  isHeads = choice;
  counterHeads=0
  counterTails=0
  headsCounter.innerHTML = `${counterHeads}`
  tailsCounter.innerHTML = `${counterTails}`
  bestOf.innerHTML=`1`
  if (isHeads) {
    headsColor.style.color=("green")
    tailsColor.style.color=("red")
  }
  else {
    headsColor.style.color=("red")
    tailsColor.style.color=("green")
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
  hide.bind(null, chooseScreen, finishingScreen)
);

function flip() {
  let userCounter;
  let pcCounter;
  const random = Math.random();
  if (random >= 0.5) {
    coin = true;
    counterHeads++;
    headsCounter.innerHTML = `${counterHeads}`;
  } else {
    coin = false;
    counterTails++;
    tailsCounter.innerHTML = `${counterTails}`;
  }
  userCounter = isHeads ? counterHeads : counterTails;
  pcCounter = !isHeads ? counterHeads : counterTails;

  if (pcCounter>userCounter){
    bestOf.innerHTML=`${(pcCounter*2)+1}`
  }

  
  if (userCounter > pcCounter) {
    hide(gameScreen, finishingScreen);
    finalBest.innerHTML=`${(pcCounter*2)+1}` 
  }
}

flipButton.addEventListener("click", flip);
