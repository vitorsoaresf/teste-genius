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
  score.innerHTML = "🎉" + valueSumCorrectSquareSelected;
};

const addColorInTheListSortedColor = () => {
  const color = selectRandomColor();
  sequenceColors.push(color);
  loadingFeedbackColor();
};

const waitingTime = () => {
  return new Promise((res) => setTimeout(res, 1500));
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

const playSoundColorItenSequence = (color) => {
  switch (color) {
    case "red":
      return "play-fa";
    case "green":
      return "play-la";
    case "yellow":
      return "play-sol";
    default:
      return "play-mi";
  }
};

const playSoundColor = (color) => {
  const audio = document.getElementById(playSoundColorItenSequence(color));
  audio.play();
};

const loadingFeedbackColor = async () => {
  for (let count = 0; count < sequenceColors.length; count++) {
    const color = sequenceColors[count];
    const img = document.getElementsByClassName(`square-${color}`)[0];

    await waitingTime().then(() => {
      img.classList.add(`square-${color}-feedback`);
      playSoundColor(color);
      removeColorSquareWithoutEmphasis(color);
    });

    await waitingTime().then(() => {
      img.classList.remove(`square-${color}-feedback`);
      addColorSquareWithoutEmphasis(color);
    });
  }
};

const verifyIfCurrentColorIsTheLastElementFromListColors = () => {
  return sequenceColors.length === countCompareColors;
};

const resetInitalValues = () => {
  bannerLoser.style.visibility = "visible";
  btPlayGame.classList.add("pulse");
  sequenceColors = null;
  countCompareColors = null;
  valueSumCorrectSquareSelected = null;
};

const compareColorPressed = async (colorSelected) => {
  if (sequenceColors) {
    if (sequenceColors[countCompareColors] === colorSelected) {
      countCompareColors++;

      if (verifyIfCurrentColorIsTheLastElementFromListColors()) {
        countCompareColors = 0;
        sumScoreWhenColorSelectedIsCorrect();
        addColorInTheListSortedColor();
      }
    } else {
      resetInitalValues();
    }
  }
};

const resetGame = () => {
  bannerLoser.style.visibility = "hidden";
  btPlayGame.classList.remove("pulse");
  score.innerHTML = "🎉" + 0;
  countCompareColors = 0;
  sequenceColors = [];
  valueSumCorrectSquareSelected = 0;
  addColorInTheListSortedColor();
};
