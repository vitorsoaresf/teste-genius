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
  loadingFeedbackColor(0);
};

const waitingTime = () => {
  return new Promise((res) => setTimeout(res, 1000));
};

const loadingFeedbackColor = async () => {
  for (let i = 0; i < sequenceColors.length; i++) {
    const color = sequenceColors[i];
    const img = document.getElementsByClassName(`square-${color}`)[0];
    img.classList.add(`square-${color}-feedback`);

    await waitingTime().then(() => {
      img.classList.remove(`square-${color}-feedback`);
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
