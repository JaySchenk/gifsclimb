class Player {
  constructor(gameScreen, left, top, height, width) {
    this.gameScreen = gameScreen
    this.left = left
    this.top = top
    this.height = height
    this.width = width

    this.element = document.createElement('img')
    this.element.src = './img/car.png'
    this.element.style.position = 'absolute'
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    this.element.style.height = `${this.height}px`
    this.element.style.width = `${this.width}px`

    this.faceLeft = false;
    this.gravity = 0.5;
    this.jumpStrength = 15;
    this.moveSpeed = 5;
    this.position = {
      x: 400,
      y: 250,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };


    this.gameScreen.appendChild(this.element)
  }

  move() {
    this.updatePosition()

    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';

  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // Check the left boundary
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    // Check the right boundary
    const maxX = this.gameScreen.clientWidth - this.width;
    if (this.position.x > maxX) {
      this.position.x = maxX;
    }
    // Check the top boundary
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    // Check the bottom boundary
    const maxY = this.gameScreen.clientHeight - this.height;
    if (this.position.y > maxY) {
      this.position.y = maxY;
    }
    if (this.position.y < maxY) {
      this.velocity.y += this.gravity;
      console.log(`adding grav`)
    } else {
      this.velocity.y = 0;
      this.position.y = maxY;
      console.log('max grav')
    }
  }
}
