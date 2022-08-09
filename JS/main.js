let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const gridRows = 10;
const cells = [];
let score = 0;

const player = {
  position: 0,
  move(direction) {



    removePlayer()
    switch (direction) {
      case 'right':
        if (movePlayer(this.position + 1))
          this.position += 1
        break
      case 'left':
        if (movePlayer(this.position - 1))
          this.position -= 1
        break
      case 'up':
        if (movePlayer(this.position - 10)) {
          this.position -= 10
        }
        break
      case 'down':
        if (movePlayer(this.position + 10)) {
          this.position += 10
        }
        break
    }

    this.display()
  },

  // This function will display the player
  display() {
    const myPosition = cells[this.position]
    myPosition.classList.add('player')
  }
};
const game = {
  isStarted: false
}


function startNewGame() {
  game.isStarted = true;
  createTheGrid();
  player.display()
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





// to move the player change its current position, then call display player

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
// !!!check if new game ok!!!
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

function movePlayer(newPosition) {
  console.log(newPosition)
  if (newPosition < 0 || newPosition > 99) {
    return false
  }

  removePlayer()
  player.position = newPosition
  player.display()

  console.log(cells[player.position])
  // if (isItASign(cells[player.position])) {
  //   cells[player.position].className = 'cell player'
  //   score += 10
  //   scoreElement.textContent = score
  //   if (score === 120) {
  //     winTheGame()
  //   }
  // }
}

function removePlayer() {
  cells[player.position].classList.remove('player')
}

//I want to check if the player's current position is on the same one than collectible
// If it is the case, there is a collision
// hide collectible and add  10 to score



// to check if the player is outside the grid
// if player < grid length he is out
// if player > grid length he is out
// if player > grid height he is out
// if player < grid height he is out