class Obstacle {
  constructor(gameScreen, left, top, height, width) {
    this.gameScreen = gameScreen
    this.left = left
    this.top = top
    this.height = height
    this.width = width
    this.element = document.createElement('img')

    this.element.src = '../images/redCar.png'

    this.element.style.position = 'absolute'
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    this.element.style.height = `${this.height}px`
    this.element.style.width = `${this.width}px`

    this.gameScreen.appendChild(this.element)
  }

  move() {
    this.updatePosition()
    this.element.style.top = `${this.top}px`
  }

  updatePosition() {
    this.top += 1
  }
}
