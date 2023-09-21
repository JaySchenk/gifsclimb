class Player {
  constructor(gameScreen, left, top, height, width, colissionBlocks) {
    this.gameScreen = gameScreen
    this.left = left
    this.top = top
    this.height = height
    this.width = width

    this.element = document.createElement('img')
    this.element.src = './img/hitbox.png'

    this.element.style.position = 'absolute'
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    this.element.style.height = `${this.height}px`
    this.element.style.width = `${this.width}px`

    this.faceLeft = false;
    this.gravity = 0.5;
    this.jumpStrength = 10;
    this.moveSpeed = 5;
    this.position = {
      x: 40,
      y: 250,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.collisionBlocks = colissionBlocks

    this.gameScreen.appendChild(this.element)
  }

  move() {
    this.updatePosition() // or this.position.x += this.velocity.x;
    // this.checkForHortCol()
    // this.applyGravity()
    // this.checkForVertCol()
    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      // Player is not moving
      if (this.faceLeft) {
        this.element.className = '';
        this.element.classList.add('idle-animation-mirrored');
      } else {
        this.element.className = '';
        this.element.classList.add('idle-animation');
      }
    } else {
      // Player is moving
      if (this.faceLeft) {
        this.element.className = '';
        this.element.classList.add('run-animation-mirrored');
      } else {
        this.element.className = '';
        this.element.classList.add('run-animation');
      }
    }

  }
  /*

checkForHortCol() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.position,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x + this.width + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }
  checkForVertCol() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.position,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + this.height + 0.01
          break
        }
      }
    }
  }
*/

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
