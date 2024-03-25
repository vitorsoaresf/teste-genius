const NUMBER_MAX_COLORS = 4;

const colorArray = ["red", "green", "red", "blue"];

const selectRandomColor = () => {
  return colorArray[Math.floor(Math.random() * NUMBER_MAX_COLORS)];
};

for (let i = 0; i < NUMBER_MAX_COLORS; i++) {
  console.log(selectRandomColor());
}
