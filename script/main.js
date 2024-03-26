const NUMBER_MAX_COLORS = 4;
const COLOR_ARRAY = ["red", "green", "yellow", "blue"];
const bannerLoser = document.getElementsByClassName("banner-loser")[0];
const score = document.getElementById("score");
const btPlayGame = document.getElementsByClassName("bt-play-game")[0];

let sequenceColors = null;
let countCompareColors = null;
let valueSumCorrectSquareSelected = null;

const selectRandomColor = () => {
  return COLOR_ARRAY[Math.floor(Math.random() * NUMBER_MAX_COLORS)];
};

const sumScoreWhenColorSelectedIsCorrect = () => {
  valueSumCorrectSquareSelected += 100;
  score.innerHTML = valueSumCorrectSquareSelected;
};

const addColorInTheList = () => {
  const color = selectRandomColor();
  sequenceColors.push(color);
  loadingFeedbackColor();
};

const waitingTime = () => {
  return new Promise((res) => setTimeout(res, 1000));
};

const removeColorSquareWithoutEmphasis = (color) => {
  const listOtherElements = COLOR_ARRAY.filter((item) => item !== color);

  listOtherElements.forEach((color) => {
    const square = document.getElementsByClassName(`square-${color}`)[0];
    square.classList.add("remove-color");
  });
};

const addColorSquareWithoutEmphasis = (color) => {
  const listOtherElements = COLOR_ARRAY.filter((item) => item !== color);

  listOtherElements.forEach((color) => {
    const square = document.getElementsByClassName(`square-${color}`)[0];
    square.classList.remove("remove-color");
  });
};

const loadingFeedbackColor = async () => {
  for (let i = 0; i < sequenceColors.length; i++) {
    const color = sequenceColors[i];
    const img = document.getElementsByClassName(`square-${color}`)[0];

    await waitingTime().then(() => {
      img.classList.add(`square-${color}-feedback`);
      removeColorSquareWithoutEmphasis(color);
    });

    await waitingTime().then(() => {
      img.classList.remove(`square-${color}-feedback`);
      addColorSquareWithoutEmphasis(color);
    });
  }
};

const verifyIfLastElementIsActive = () => {
  return sequenceColors.length === countCompareColors;
};

const compareColorPressed = async (colorSelected) => {
  if (sequenceColors) {
    if (sequenceColors[countCompareColors] === colorSelected) {
      countCompareColors++;

      if (verifyIfLastElementIsActive()) {
        countCompareColors = 0;
        sumScoreWhenColorSelectedIsCorrect();
        addColorInTheList();
      }
    } else {
      bannerLoser.style.visibility = "visible";
      btPlayGame.classList.add("pulse");
      sequenceColors = null;
      countCompareColors = null;
      valueSumCorrectSquareSelected = null;
    }
  }
};

const resetGame = () => {
  bannerLoser.style.visibility = "hidden";
  btPlayGame.classList.remove("pulse");
  score.innerHTML = 0;
  countCompareColors = 0;
  sequenceColors = [];
  valueSumCorrectSquareSelected = 0;
  addColorInTheList();
};
