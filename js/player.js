class Player {
  constructor(gameScreen, left, top, height, width) {
    this.gameScreen = gameScreen
    this.left = left
    this.top = top
    this.height = height
    this.width = width
    this.directionX = 0
    this.directionY = 0
    this.element = document.createElement('img')

    this.element.src = '../images/car.png'

    this.element.style.position = 'absolute'
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    this.element.style.height = `${this.height}px`
    this.element.style.width = `${this.width}px`

    this.gameScreen.appendChild(this.element)
  }

  move() {
    this.updatePosition()
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
  }

  updatePosition() {
    if (this.left < 50) {
      this.left = 50
    } else if (this.left > this.gameScreen.clientWidth - 50 - this.width) {
      this.left = this.gameScreen.clientWidth - 50 - this.width
    } else {
      this.left += this.directionX
    }

    if (this.top < 20) {
      this.top = 20
    } else if (this.top > this.gameScreen.clientHeight - 20 - this.height) {
      this.top = this.gameScreen.clientHeight - 20 - this.height
    } else {
      this.top += this.directionY
    }
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect()
    const obstacleRect = obstacle.element.getBoundingClientRect()

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true
    } else {
      return false
    }
  }
}
