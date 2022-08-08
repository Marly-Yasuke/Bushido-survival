let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const gridRows = 10;
const cells = [];
let score = 0;
let currentPosition = 0;

function startNewGame() {
  createTheGrid();
  displayPlayer()
  distributeCollectibles()

}
const startButton = document.getElementById('new-game')
startButton.addEventListener('click', () => {
  startNewGame()

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



// This function will display the player
function displayPlayer() {
  const myPosition = cells[currentPosition]
  myPosition.classList.add('player')
}

function fisherYatesShuffle(arr) {
  for (let i = arr.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arr[j]
    arr[j] = arr[i - 1]
    arr[i - 1] = temp
  }
}

function getRandomSelection(n, array) {
  const cloned = Array.from(array)
  fisherYatesShuffle(cloned)
  const selected = cloned.slice(0, n)
  return selected
}



// this function will distribute collectibles on the board
function distributeCollectibles() {
  // iteration 2
  const randomCells = getRandomSelection(collectibles.length, cells)

  for (let i = 0; i < collectibles.length; i++) {
    // assign one cell to each collectible
    collectibles[i].cell = randomCells[i]
    collectibles[i].display()
  }
}


// I create an array of item that will be collectibles
class Collectible {
  constructor(className) {
    this.className = className
    this.cell = null
    this.isCollected = false
  }
  hide() {
    // reset behaviour
    this.cell.classList.remove(this.className)
  }
  collect() {
    // iteration 4
    this.hide()
    this.isCollected = true
    // prevent accidental matches
    this.cell = null
    inventory.add(this.className)
  }
  display() {
    // iteration 2
    this.cell.classList.add(this.className)
  }
}

const collectibles = [
  'carte-vitale',
  'titre-de-sejour',
  'sim-card',
  'compte-bancaire',
  'apartment',
  'job',
].map((c) => new Collectible(c))

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