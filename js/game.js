/*
width 80 blocks

height 50 blocks

16/16 blocks */

class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.height = 800
    this.width = 1280
    this.obstacles = []
    this.animateId = 0
    this.timer = 300
    this.lastUpdateTime = 0;
    this.lives = 3
    this.gameOver = false
    this.colissionBlocks = [];
    this.timerElement = document.createElement('div');
    this.timerElement.id = 'timer';
    this.timerElement.style.position = 'absolute';
    this.timerElement.style.left = '10px';
    this.timerElement.style.top = '10px';
    this.timerElement.style.color = 'black'; // Change the text color to black
    this.timerElement.classList.add('04B_03__'); // Apply the 04b_03 font class
    this.timerElement.style.fontSize = '24px'; // Set the font size
    this.timerElement.style.zIndex = '1000'; // Set the z-index to make sure it's above other elements
    this.gameScreen.appendChild(this.timerElement);


  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.createCollisionBlocks();
    this.player = new Player(this.gameScreen, 20, 550, 60, 70, this.colissionBlocks)
    this.gameLoop()
  }

  gameLoop() {
    this.update();
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    // Check if 1 second has passed
    if (deltaTime >= 1) {
      this.timer--;
      this.lastUpdateTime = currentTime;
    }

    // Update the timer element's text content
    this.timerElement.innerText = `Remaining time: ${this.timer}`;

    if (this.timer <= 0) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      this.gameScreen.style.display = 'none';
      this.gameEndScreen.style.display = 'block';
    } else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  update() {
    this.player.move()
  }

  createCollisionBlocks() {
    const floorCollision2d = [];
    for (let i = 0; i < floorCollision.length; i += 80) {
      floorCollision2d.push(floorCollision.slice(i, i + 80));
    }

    this.colissionBlocks = [];
    floorCollision2d.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 429) {
          this.colissionBlocks.push(new colissionSprite(this.gameScreen, {
            x: x * 16,
            y: y * 16
          }));
        }
      });
    });
  }
}

