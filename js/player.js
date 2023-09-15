class Player {
  constructor(gameScreen, left, top, height, width, imagePaths, animationInterval) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    this.directionX = 0;
    this.imagePaths = imagePaths;
    this.currentImageIndex = 0;
    this.animationInterval = animationInterval; // Pass animation interval as a parameter

    this.element = new Image();
    this.element.src = this.imagePaths[this.currentImageIndex];

    this.element.style.position = 'absolute';
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);

    // Set up the idle animation
    this.setupIdleAnimation();
  }

  setupIdleAnimation() {
    this.lastAnimationTime = 0;
    this.animate();
  }

  animate(timestamp) {
    if (!this.lastAnimationTime) {
      this.lastAnimationTime = timestamp;
    }

    if (timestamp - this.lastAnimationTime >= this.animationInterval) {
      this.lastAnimationTime = timestamp;

      // Change the character image
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imagePaths.length;
      this.element.src = this.imagePaths[this.currentImageIndex];
    }

    // Request the next frame
    requestAnimationFrame((timestamp) => this.animate(timestamp));
  }

  move() {
    this.updatePosition();
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  updatePosition() {
    if (this.left < 50) {
      this.left = 50;
    } else if (this.left > this.gameScreen.clientWidth - 50 - this.width) {
      this.left = this.gameScreen.clientWidth - 50 - this.width;
    } else {
      this.left += this.directionX;
    }
  }
}
