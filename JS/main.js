//****** VARIABLES DECLARATION******


let newGame = document.getElementById("new-game");
const gridElement = document.querySelector('.grid')
const gridColumns = 10;
const looseRestart = document.getElementById('looseRestart')
const winRestart = document.getElementById('winRestart')
const gameOver = document.getElementById('game-over')
const youWin = document.getElementById('win')
const gridRows = 10;
const cells = [];
let shurikens = []
let scoreElement = document.getElementById('score')
let score = 0;




// ****** START/RESTART GAME******


const game = {
  isStarted: false
}

function hideStart() {
  startButton.style.visibility = 'hidden';
}

let intervalId

function startNewGame() {
  game.isStarted = true;
  createTheGrid();
  player.display()
  distributeCollectibles()
  shurikens.push(new Shuriken())
  intervalId = setInterval(moveShurikens, 100)
  hideStart()


}

function resetGame() {
  removePlayer()
  player.position = 0;
  removeCollectibleNewGame()
  removeShurikenNewGame()
  score = 0;
  scoreElement.textContent = score
}

function startGame() {
  game.isStarted = true;
  player.display()
  distributeCollectibles()
  shurikens.push(new Shuriken())
  intervalId = setInterval(moveShurikens, 100)

}



// ****GAME OVER********


winRestart.addEventListener('click', () => {
  startGame()
  youWin.classList.add('hidden');
  gameOver.classList.add('hidden');

})
looseRestart.addEventListener('click', () => {
  startGame()
  youWin.classList.add('hidden');
  gameOver.classList.add('hidden');
})



// ******PLAYER*******


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


  display() {
    let myPosition = cells[this.position]
    myPosition.classList.add('player')
  }
};

function movePlayer(newPosition) {
  console.log(newPosition)
  if (newPosition < 0 || newPosition > 99) {
    return false
  }

  removePlayer()
  player.position = newPosition
  player.display()

}

function removePlayer() {
  cells[player.position].classList.remove('player')
}



// ******COLLECTIBLES*****


function distributeCollectibles() {
  const randomCells = getRandomSelection(collectibles.length, cells)

  for (let i = 0; i < collectibles.length; i++) {
    collectibles[i].cell = randomCells[i]
    collectibles[i].display()
  }
}

class Collectible {
  constructor(className) {
    this.className = className
    this.cell = null
    this.isCollected = false
  }
  hide() {
    this.cell.classList.remove(this.className)
  }
  collect() {
    this.hide()
    this.isCollected = true
  }
  display() {
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




// ******SHURIKENS*****


function moveShurikens() {
  shurikens.forEach(shuriken => {
    shuriken.move()
  })
  _detectShurikenCollisions()
}
const startButton = document.getElementById('new-game')
startButton.addEventListener('click', () => {
  startNewGame()

})

Try to use touch start to make the game start when touching
startButton.addEventListener('touchend', (event)=>{
  startGame()
  console.log('it works')
})


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



// ****ENVIRONMENT*******



function createTheGrid() {
  for (let i = 0; i < gridColumns * gridRows; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = i;
    gridElement.append(div);
    cells.push(div);
  }
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

function _detectCollisions(array) {
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
    if (score === 60) {
      youWin.classList.remove("hidden");
      resetGame()
    }

  }

}

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

function _detectShurikenCollisions() {

  shurikens.forEach(shuriken => {
    if (parseInt(shuriken.cell.dataset.index) === player.position) {
      gameOver.classList.remove("hidden");

      resetGame()
    }

  })

}

function removeShurikenNewGame() {
  clearInterval(intervalId)
  for (let i = 0; i < shurikens.length; i++) {
    shurikens[i].hide()
  }
  shurikens = [];
}

function removeCollectibleNewGame() {
  for (let i = 0; i < collectibles.length; i++) {
    collectibles[i].hide()
    collectibles[i].isCollected = false
  }
}

const myAudio = document.getElementById('audio');
console.log(myAudio);
myAudio.currentTime = 83
