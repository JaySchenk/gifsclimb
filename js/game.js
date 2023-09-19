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
    this.score = 0
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

    document.getElementById('score').innerText = this.score
    document.getElementById('lives').innerText = this.lives

    if (this.lives < 1) {
      this.gameOver = true
    }

    if (this.gameOver) {
      this.gameScreen.style.display = 'none'
      this.gameEndScreen.style.display = 'block'
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop())
    }
  }

  update() {
    this.player.move()

  }
}
