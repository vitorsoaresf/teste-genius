const NUMBER_MAX_COLORS = 4;
const colorArray = ["red", "green", "yellow", "blue"];
let sequenceColors = null;
let countCompareColors = null;

const selectRandomColor = () => {
  return colorArray[Math.floor(Math.random() * NUMBER_MAX_COLORS)];
};

const addColorInTheList = () => {
  sequenceColors.push(selectRandomColor());
  console.log(sequenceColors);
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
