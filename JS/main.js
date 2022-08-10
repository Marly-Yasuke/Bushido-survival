let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const restartButton = document.getElementById('restart')
const gameOver = document.getElementById('game-over')
const gridRows = 10;
const cells = [];
const shurikens = []
let scoreElement = document.getElementById('score')
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

    _detectCollisions(collectibles)
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


function hideStart() {
  startButton.style.visibility = 'hidden';
}


function startNewGame() {
  game.isStarted = true;
  createTheGrid();
  player.display()
  distributeCollectibles()
  shurikens.push(new Shuriken())
  setInterval(moveShurikens, 100)
  hideStart()

}

function moveShurikens() {
  shurikens.forEach(shuriken => {
    shuriken.move()
  })
  // !!!!!detect collision when shuriken moves
  // !!!!initialized line 260/266
  _detectShurikenCollisions()
  // !!!! check function above
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

/**
 * Class for shurikens
 */
class Shuriken {
  constructor() {
    this.className = 'shuriken'
    this.cell = this.getRandomColumn()
  }

  getRandomColumn() {
    return cells[Math.floor(Math.random() * 10) + 90]

  }

  hide() {
    this.cell.classList.remove('shuriken')
  }
  show() {
    this.cell.classList.add('shuriken')
  }
  move() {
    this.hide()
    const index = Number(this.cell.dataset.index)
    if (index - 10 < 0) {
      this.cell = cells[index + 90]
    } else {
      this.cell = cells[index - 10]
    }
    this.show()
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
    //this.cell = null
    //inventory.add(this.className)
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
// ******Check what find can be related to *******
// make this function work
// detect collision and collect if there is any
function _detectCollisions(array) {
  // iteration 4
  // how do we detect collisions with items
  console.log(array)
  const foundCollectible = array.find(
    (collectible) => {
      return Number(collectible.cell.dataset.index) === player.position && !collectible.isCollected
    })
  console.log(foundCollectible)
  if (foundCollectible) {
    foundCollectible.collect()
    score = score + 10;
    scoreElement.textContent = score
    shurikens.push(new Shuriken())
    console.log(scoreElement, score);
  }
}



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

// *******shuriken collision setup*****
// doesn't work
function _detectShurikenCollisions() {
  console.log(shurikens[0].cell.dataset.index, player.position);
  shurikens.forEach(shuriken => {
    if (parseInt(shuriken.cell.dataset.index) === player.position) {
      gameOver.classList.remove("hidden");
    }

  })

}
// call the section game-over and restart button
// hidden by default
// toogle game-over it when collision
// ad eventlistener to button that restarts the game
restart.addEventListener('click', () => {
  startNewGame()
})