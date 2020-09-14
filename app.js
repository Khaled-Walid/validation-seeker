const startingButton = document.getElementById("starting-button");
const startingScreen = document.getElementById("starting-screen");
const chooseScreen = document.getElementById("choose-screen");
const gameScreen = document.getElementById("game-screen");
const finalBest = document.getElementById("final-best");

let isHeads = true;
let coin;
let counterHeads = 0;
let counterTails = 0;
let flipStop = false;

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
  counterHeads = 0;
  counterTails = 0;
  headsCounter.innerHTML = `${counterHeads}`;
  tailsCounter.innerHTML = `${counterTails}`;
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
  hide.bind(null, chooseScreen, finishingScreen)
);

function flip() {
  let userCounter;
  let pcCounter;
  if (flipStop) {
    return;
  }
  flipStop = true;
  coinFlip.classList.remove("heads");
  coinFlip.classList.remove("tails");
  const random = Math.random();
  setTimeout(() => {
    if (random >= 0.5) {
      coin = true;
      coinFlip.classList.add("heads");
      setTimeout(() => {
        counterHeads++;
        headsCounter.innerHTML = `${counterHeads}`;
      }, 1900);
    } else {
      coin = false;
      coinFlip.classList.add("tails" , "rotate");
      setTimeout(() => {
        counterTails++;
        tailsCounter.innerHTML = `${counterTails}`;
      }, 1900);
    }
    setTimeout(() => {
      userCounter = isHeads ? counterHeads : counterTails;
      pcCounter = !isHeads ? counterHeads : counterTails;

      if (pcCounter > userCounter) {
        bestOf.innerHTML = `${pcCounter * 2 + 1}`;
      }

      if (userCounter > pcCounter) {
        hide(gameScreen, finishingScreen);
        finalBest.innerHTML = `${pcCounter * 2 + 1}`;
      }
      flipStop = false;
    }, 1900);
  }, 100);
}

flipButton[0].addEventListener("click", flip);
flipButton[1].addEventListener("click", flip);

/*
jQuery(document).ready(function($){

  $('#coin').on('click', function(){
    var flipResult = Math.random();
    $('#coin').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#coin').addClass('heads');
        console.log('it is head');
      }
      else{
        $('#coin').addClass('tails');
        console.log('it is tails');
      }
    }, 100);
  });
});
*/
