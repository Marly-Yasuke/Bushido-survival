let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const gridRows = 10;
const cells = [];
let score = 0;

function startNewGame() {
  createTheGrid();
  getRandomSelection();
  distributeCollectibles()
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

// I create an array of item that will be collectibles
const collectibles = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
]

// DistributeCollectibles function will randomly display collectibles when launching the game

// Keyboard setup
document.addEventListener('keydown', (event) => {
  if (!game.isStarted) {
    return
  }

  switch (event.code) {
    case 'ArrowUp':
      player.move('up')
      break
    case 'ArrowDown':
      player.move('down')
      break
    case 'ArrowLeft':
      player.move('left')
      break
    case 'ArrowRight':
      player.move('right')
      break
  }
})