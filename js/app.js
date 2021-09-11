function hide(section1, section2) {
  section1.classList.toggle("hide");
  section2.classList.toggle("hide");
  if (section2 !== finishingScreen) {
    clickSound.play();
  }
}

arStartingButton.addEventListener("click", translateAll.bind(null, "ar"));
enStartingButton.addEventListener("click", translateAll.bind(null, "en"));

arStartingButton.addEventListener(
  "click",
  hide.bind(null, languageScreen, startingScreen)
);
enStartingButton.addEventListener(
  "click",
  hide.bind(null, languageScreen, startingScreen)
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
  headsColor.innerHTML = i18next.t("gameScreenH2Heads", { headsCounter: 0 });
  tailsColor.innerHTML = i18next.t("gameScreenH2Tails", { tailsCounter: 0 });
  randomWordsH1.innerHTML = i18next.t("gameScreenQuote", { bestOfCounter: 1 });
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
        headsColor.innerHTML = i18next.t("gameScreenH2Heads", {
          headsCounter: counterHeads,
        });
      }, 900);
    } else {
      coin = false;
      coinFlip.classList.add("tails", "rotate");
      setTimeout(() => {
        counterTails++;
        tailsColor.innerHTML = i18next.t("gameScreenH2Tails", {
          tailsCounter: counterTails,
        });
      }, 900);
    }
    setTimeout(() => {
      userCounter = isHeads ? counterHeads : counterTails;
      pcCounter = !isHeads ? counterHeads : counterTails;

      if (coin !== isHeads) {
        bestUpdate = true;
      }

      if (pcCounter > userCounter && bestUpdate) {
        const quotes = i18next.t("RandomQuote", {
          returnObjects: true,
          bestOfCounter: pcCounter * 2 + 1,
        });
        const randomElement = quotes[Math.floor(Math.random() * quotes.length)];
        randomWordsH1.innerHTML = randomElement;
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
