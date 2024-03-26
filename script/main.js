const NUMBER_MAX_COLORS = 4;
const colorArray = ["red", "green", "yellow", "blue"];
let sequenceColors = null;
let countCompareColors = null;

const selectRandomColor = () => {
  return colorArray[Math.floor(Math.random() * NUMBER_MAX_COLORS)];
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
  const listOtherElements = colorArray.filter((item) => item !== color);

  listOtherElements.forEach((color) => {
    const square = document.getElementsByClassName(`square-${color}`)[0];
    square.classList.add("remove-color");
  });
};

const addColorSquareWithoutEmphasis = (color) => {
  const listOtherElements = colorArray.filter((item) => item !== color);

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

const resetGame = () => {
  countCompareColors = 0;
  sequenceColors = [];
  addColorInTheList();
};

const verifyIfLastElementIsActive = () => {
  return sequenceColors.length === countCompareColors;
};

const compareColorPressed = (colorSelected) => {
  if (sequenceColors[countCompareColors] === colorSelected) {
    countCompareColors++;

    if (verifyIfLastElementIsActive()) {
      countCompareColors = 0;
      addColorInTheList();
    }
  } else {
    resetGame();
    alert("vc perdeu");
  }
};

resetGame();
