const languageScreen = document.getElementById("language-screen");
const startingScreen = document.getElementById("starting-screen");
const chooseScreen = document.getElementById("choose-screen");
const gameScreen = document.getElementById("game-screen");

const arStartingButton = document.getElementById("ar");
const enStartingButton = document.getElementById("en");
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

const finishingScreen = document.getElementById("finishing-screen");
const againButton = document.getElementById("again-button");
const bestOf = document.getElementById("best-of");
const headsColor = document.getElementById("heads-color");
const tailsColor = document.getElementById("tails-color");
const randomWordsH1 = document.getElementById("random-words");
const enRandomWords = [
  "How about<br>a best of {{bestOfCounter}} ?",
  "Let's try<br>a best of {{bestOfCounter}} ?",
  "Make it<br>a best of {{bestOfCounter}} ?",
  "Maybe<br>a best of {{bestOfCounter}} ?",
  "A best of {{bestOfCounter}}<br>you say?",
];
const arRandomWords = [
  "طب نخلي <br> الفورة من {{bestOfCounter}} ",
  "طب نجرب نخليها <br> من {{bestOfCounter}}",
  "تعالى نجربلك <br> فورة من {{bestOfCounter}}",
  "طب نجرب مثلاً <br> فورة من {{bestOfCounter}}",
  "خلاص خلي <br> الفورة من {{bestOfCounter}}",
];

i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        startingScreen: `
        Have you ever been indecisive about making a decision or hesitant to buy this or that?<br>
      While being indecisive, you're still inclined to choose a certain option, however, all you require is someone to validate your decision.<br>
      You then approach friends and family, deep down hoping someone would give you the green light on the decision you're inclined to make.<br>
      If this is normally what you'd do, here's a game for you!<br>
      This game, through tossing a  coin, would satisfy your validation-seeking needs.<br>
      How it works?<br>
      Choose heads or tails then flip the coin.<br>
      If the coin toss outcome validates your choice, you win.<br>
      If not, you'd toss for best out of 3, then 5 then 7...until you win.<br>
      Inevitably winning, means inevitably having your choice validated. Enjoy :)
      `,
        startingScreenBtn: "Play The Game",
        chooseScreen: "Heads OR Tails?",
        chooseScreenTails: "Tails",
        chooseScreenHeads: "Heads",
        gameScreenQuote: " Best of {{bestOfCounter}}",
        gameScreenH2Heads: "Heads: {{headsCounter}}",
        gameScreenH2Tails: "Tails: {{tailsCounter}}",
        gameScreenH4: "Tap The Coin",
        finishingScreenH1_1: " Your choice has won within a best of ",
        finishingScreenH1_2:
          "Go ahead, have your decision validated! :)",
        finishingScreenBtn: "Have another decision validated?",
        RandomQuote: enRandomWords,
      },
    },
    ar: {
      translation: {
        startingScreen: `عارف انت لما تبقى محتار تعمل حاجة معينة ولا لأ؟ أو متردد تشتري دا ولا دا؟
        بس تبقى في الحقيقة ميّال لخيار منهم وكل إللي محتاجه إن حد يقرّك ويؤيّدك على الخيار دا؟
        <br>
        بدل ما تقرف صحابك وتلف عليهم واحد واحد لحد ما تلاقي إللي هيأيدك على خيارك ممكن تعمل حاجة بسيطة تانية. هتجيب شلن
        وتلعب ملك وكتابة<br>
        بس دا هيخلي الاحتمالات 50%:50% برضو مش كدا؟
        مش بالظبط. احنا ماحددناش لسه الفورة هتبقى من كام. الخيار بتاعك هيبقي كسبان دايماً في فورة ما <br> كل إللي الموقع
        دا بيقدمهولك إنه هيساعدك تلاقي الفورة دي`,
        startingScreenBtn: "تمام فهمتك",
        chooseScreen: "ملك ولا كتابة؟",
        chooseScreenTails: "كتابة",
        chooseScreenHeads: "ملك",
        gameScreenQuote: " الفورة من {{bestOfCounter}}",
        gameScreenH2Heads: "ملك: {{headsCounter}}",
        gameScreenH2Tails: "كتابة: {{tailsCounter}}",
        gameScreenH4: "دوس على الكوين",
        finishingScreenH1_1: "خيارك كسب في فورة من",
        finishingScreenH1_2:
          "تقدر تروح تعمل إللي كنت عاوز تعمله وانت مرتاح نفسياً",
        finishingScreenBtn: "تحب أكسِّبلك خيار تاني؟",
        RandomQuote: arRandomWords,
      },
    },
  },
});

async function translateAll(language) {
  await i18next.changeLanguage(language);
  startingScreen.querySelector("p").innerHTML = i18next.t("startingScreen");
  startingButton.innerHTML = i18next.t("startingScreenBtn");
  chooseScreen.querySelector("h1").innerHTML = i18next.t("chooseScreen");
  randomWordsH1.innerHTML = i18next.t("gameScreenQuote", { bestOfCounter: 1 });
  tailsButton.innerHTML = i18next.t("chooseScreenTails");
  headsButton.innerHTML = i18next.t("chooseScreenHeads");
  headsColor.innerHTML = i18next.t("gameScreenH2Heads", { headsCounter: 0 });
  tailsColor.innerHTML = i18next.t("gameScreenH2Tails", { tailsCounter: 0 });
  gameScreen.querySelector("h4").innerHTML = i18next.t("gameScreenH4");
  finishingScreen.querySelector("#final-quote").innerHTML = i18next.t(
    "finishingScreenH1_1"
  );
  finishingScreen.querySelector("#final-quote-2").innerHTML = i18next.t(
    "finishingScreenH1_2"
  );
  finishingScreen.querySelector("button").innerHTML =
    i18next.t("finishingScreenBtn");
}
