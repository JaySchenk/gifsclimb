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
    this.hitbox = {
      position: {
        x: 40,
        y: 250
      },
      width: 28,
      height: 32,
    }
    this.hitboxElement = document.createElement('img');
    this.hitboxElement.src = './img/playerHitbox.png'; // Set the image source
    this.hitboxElement.style.position = 'absolute';
    this.hitboxElement.style.left = `${this.hitbox.position.x}px`; // Position it based on player's position
    this.hitboxElement.style.top = `${this.hitbox.position.y}px`; // Position it based on player's position
    this.hitboxElement.style.height = `32px`;
    this.hitboxElement.style.width = `28px`;


    this.gameScreen.appendChild(this.hitboxElement);
    console.log(this.height, this.width)

  }

  move() {
    this.position.x += this.velocity.x;
    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
    this.updateHitbox()
    this.checkForHortCol()

    this.applyGravity()
    this.updateHitbox()

    this.checkForVertCol()

    if (this.velocity.x === 0 /*&& this.velocity.y === 0*/) {
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
  updateHitbox() {
    this.hitbox.position.x = this.position.x + 25
    this.hitbox.position.y = this.position.y + 28
    this.hitboxElement.style.left = `${this.position.x + 21}px`; // Position it based on player's position
    this.hitboxElement.style.top = `${this.position.y + 28}px`; // Position it based on player's position

  }

  checkForHortCol() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          console.log(`detectededge`)
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break
        }
        if (this.velocity.x < 0) {
          console.log(`detectededge2`)
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
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
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break
        }
      }
    }
  }



}


