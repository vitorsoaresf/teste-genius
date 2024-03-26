const NUMBER_MAX_COLORS = 4;
const COLOR_ARRAY = ["red", "blue", "yellow", "green"];
const bannerLoser = document.getElementsByClassName(
  "container-square_banner-loser"
)[0];
const score = document.getElementById("score");
const btPlayGame = document.getElementsByClassName(
  "container-square_bt-play-game"
)[0];

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

const removeColorSquareWithoutEmphasis = (color) => {
  const listOtherElements = COLOR_ARRAY.filter((item) => item !== color);

  listOtherElements.forEach((color) => {
    const square = document.getElementsByClassName(
      `container-square_${color}`
    )[0];

    square.classList.add("remove-color");
  });
};

const addColorSquareWithoutEmphasis = (color) => {
  const listOtherElements = COLOR_ARRAY.filter((item) => item !== color);

  listOtherElements.forEach((color) => {
    const square = document.getElementsByClassName(
      `container-square_${color}`
    )[0];
    square.classList.remove("remove-color");
  });
};

const removePointersEventContainers = () => {
  COLOR_ARRAY.forEach((color) => {
    const square = document.getElementsByClassName(
      `container-square_${color}`
    )[0];
    square.style.pointerEvents = "none";
  });
};

const addPointersEventContainers = () => {
  COLOR_ARRAY.forEach((color) => {
    const square = document.getElementsByClassName(
      `container-square_${color}`
    )[0];
    square.style.pointerEvents = "auto";
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

const waitingTime = (time) => {
  return new Promise((res) => setTimeout(res, time));
};

const formatAnimationColorizeColorCurrent = async (color, timeWaiting) => {
  const img = document.getElementsByClassName(`container-square_${color}`)[0];

  await waitingTime(timeWaiting).then(() => {
    img.classList.add(`container-square_${color}-feedback`);
    playSoundColor(color);
    removePointersEventContainers();
    removeColorSquareWithoutEmphasis(color);
  });

  await waitingTime(timeWaiting).then(() => {
    img.classList.remove(`container-square_${color}-feedback`);
    addColorSquareWithoutEmphasis(color);
  });
};

const loadingFeedbackColor = async () => {
  for (const color of sequenceColors) {
    await formatAnimationColorizeColorCurrent(color, 1000);
  }
  addPointersEventContainers();
};

const verifyIfCurrentColorIsTheLastElementFromListColors = () => {
  return sequenceColors.length === countCompareColors;
};

const resetInitalValues = () => {
  bannerLoser.style.visibility = "visible";
  btPlayGame.classList.add("container-square_pulse");
  sequenceColors = null;
  countCompareColors = null;
  valueSumCorrectSquareSelected = null;
};

const compareColorPressed = async (colorSelected) => {
  if (sequenceColors?.length) {
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
  btPlayGame.classList.remove("container-square_pulse");
  score.innerHTML = "🎉" + 0;
  countCompareColors = 0;
  sequenceColors = [];
  valueSumCorrectSquareSelected = 0;
  addColorInTheListSortedColor();
};
