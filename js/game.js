class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.height = 800
    this.width = 1280
    this.player = new Player(this.gameScreen, 230, 550, 73, 100)
    this.obstacles = []
    this.animateId = 0
    this.timer = 300
    this.lastUpdateTime = 0;
    this.lives = 3
    this.gameOver = false
  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`

    this.gameLoop()
  }

  gameLoop() {
    this.update()
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds

    // Check if enough time has passed (e.g., 1 second) to update the game
    if (deltaTime >= 1) {

      // Decrement the timer by one second
      this.timer--;

      // Update the timer display
      document.getElementById('score').innerText = this.timer;

      // Update the last update time
      this.lastUpdateTime = currentTime;
    }

    // Check if the timer has reached zero
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
}
