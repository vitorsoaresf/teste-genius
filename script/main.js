const NUMBER_MAX_COLORS = 4;

const colorArray = ["red", "green", "yellow", "blue"];

const selectRandomColor = () => {
  return colorArray[Math.floor(Math.random() * NUMBER_MAX_COLORS)];
};

const sequenceColors = [];
sequenceColors.push(selectRandomColor());

const verifyWhatColorPressed = (event) => {
  console.log(event);
};
