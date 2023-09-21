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
  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.createCollisionBlocks();
    this.player = new Player(this.gameScreen, 230, 550, 73, 100, this.colissionBlocks)
    this.gameLoop()
  }

  gameLoop() {
    this.update()
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    // Check if 1 second has passed
    if (deltaTime >= 1) {
      this.timer--;
      document.getElementById('score').innerText = this.timer;
      this.lastUpdateTime = currentTime;
    }


    if (this.timer <= 0) {
      this.gameOver = true;
    }

    if (this.lives < 1) {
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
          console.log('draw a block here');
          this.colissionBlocks.push(new colissionSprite(this.gameScreen, {
            x: x * 16,
            y: y * 16
          }));
        }
      });
    });
  }
}

