class Player {
  constructor(gameScreen, left, top, height, width, idlePaths, runPaths, animationInterval) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    this.directionX = 0;
    this.directionY = 0;
    this.verticalVelocity = 0;
    this.idlePaths = idlePaths;
    this.runPaths = runPaths;
    this.currentImageIndex = 0;
    this.animationInterval = animationInterval;
    this.isFacingRight = true;

    this.element = new Image();
    this.element.src = this.idlePaths[this.currentImageIndex];

    this.element.style.position = 'absolute';
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);

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

    const timeElapsed = timestamp - this.lastAnimationTime;
    const framesToSkip = Math.floor(timeElapsed / this.animationInterval);

    if (framesToSkip > 0) {
      this.lastAnimationTime = timestamp;

      if (this.directionX > 0) {
        this.isFacingRight = true;
      } else if (this.directionX < 0) {
        this.isFacingRight = false;
      }

      if (this.isFacingRight) {
        this.element.style.transform = 'scaleX(1)';
      } else {
        this.element.style.transform = 'scaleX(-1)';
      }

      for (let i = 0; i < framesToSkip; i++) {
        if (this.directionX !== 0) {
          this.currentImageIndex++;
        }
      }

      if (this.directionX !== 0) {
        this.element.src = this.runPaths[this.currentImageIndex % this.runPaths.length];
      } else {
        this.element.src = this.idlePaths[this.currentImageIndex % this.idlePaths.length];
      }
    }

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

    if (this.top < 20) {
      this.top = 20;
    } else if (this.top > this.gameScreen.clientHeight - 20 - this.height) {
      this.top = this.gameScreen.clientHeight - 20 - this.height;
    } else {
      this.top += this.directionY;
    }
  }
}
