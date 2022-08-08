let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const gridRows = 10;
const cells = [];

function startNewGame() {
  createTheGrid();
}
const startButton = document.getElementById('new-game')
startButton.addEventListener('click', () => {
  startNewGame()
  createTheGrid()
})

function createTheGrid() {
  for (let i = 0; i < gridColumns * gridRows; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = i;
    gridElement.append(div);
    cells.push(div);
  }
}