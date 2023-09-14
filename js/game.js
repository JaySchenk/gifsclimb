class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.height = 600
    this.width = 500
    this.player = new Player(this.gameScreen, 230, 550, 80, 40)
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

    if (this.animateId % 500 === 0) {
      this.obstacles.push(
        new Obstacle(
          this.gameScreen,
          Math.random() * (this.gameScreen.clientWidth - 40 - 100) + 50,
          -200,
          80,
          40
        )
      )
    }

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
    console.log(this.obstacles)
    const nextObstacles = []
    this.obstacles.forEach(obstacle => {
      obstacle.move()
      if (this.player.didCollide(obstacle)) {
        this.lives -= 1
        obstacle.element.remove()
      } else if (obstacle.top > this.gameScreen.clientHeight) {
        this.score += 1
        obstacle.element.remove()
      } else {
        nextObstacles.push(obstacle)
      }
    })
    this.obstacles = nextObstacles
  }
}
