
class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.height = 800
    this.width = 1280
    this.obstacles = []
    this.animateId = 0
    this.timer = 300
    this.lastUpdateTime = 0;
    this.lives = 3
    this.gameOver = false
    this.colissionBlocks = [];
    this.timerElement = document.createElement('div');
    this.timerElement.id = 'timer';
    this.timerElement.style.position = 'absolute';
    this.timerElement.style.left = '10px';
    this.timerElement.style.top = '10px';
    this.timerElement.style.color = 'black';
    this.timerElement.classList.add('04B_03__');
    this.timerElement.style.fontSize = '24px';
    this.timerElement.style.zIndex = '1000';
    this.gameScreen.appendChild(this.timerElement);


  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.createCollisionBlocks();
    this.player = new Player(this.gameScreen, 20, 550, 60, 70, this.colissionBlocks)
    this.gameLoop()
  }

  gameLoop() {
    this.update();
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    // Check if 1 second has passed
    if (deltaTime >= 1) {
      this.timer--;
      this.lastUpdateTime = currentTime;
    }

    // Update the timer element's text content
    this.timerElement.innerText = `Remaining time: ${this.timer}`;

    if (this.timer <= 0) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      this.gameScreen.style.display = 'none';
      this.gameEndScreen.style.display = 'block';

    } if (this.player.canMove === false) {
      console.log('cannotmove');
      this.player.element.className = '';
      this.player.element.classList.add('idle-animation');

      const images = [
        {
          src: './img/ninja1.png',
          x: 780,
          y: 80,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/mat1.png',
          x: 713,
          y: 5,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/ninja2.png',
          x: 830,
          y: 45,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/mat2.png',
          x: 680,
          y: 15,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/ninja3.png',
          x: 740,
          y: 50,
          scale: 0.3,
          duration: 4000, // 4 seconds
        },
        {
          src: './img/mat4.png',
          x: 916,
          y: 85,
          scale: 0.3,
        },
      ];

      const displayImagesSequentially = (index) => {
        if (index >= images.length) {
          setTimeout(() => {
            this.gameOver = true;
            this.gameScreen.style.display = 'none';
            this.gameEndScreen.style.display = 'block';
          }, 7000); // 7 seconds in milliseconds

          return;
        }


        const imageConfig = images[index];
        const image = document.createElement('img');
        image.src = imageConfig.src;
        image.style.position = 'absolute';
        image.style.left = `${imageConfig.x}px`;
        image.style.top = `${imageConfig.y}px`;
        image.style.transform = `scale(${imageConfig.scale})`;

        this.gameScreen.appendChild(image);
        setTimeout(() => {
          this.gameScreen.removeChild(image);
          displayImagesSequentially(index + 1);
        }, imageConfig.duration);
      };
      displayImagesSequentially(0);
    }

    if (this.player.canMove === false) {
      console.log('cannotmove');
      this.player.element.className = '';
      this.player.element.classList.add('idle-animation');


      const images = [
        {
          src: './img/ninja1.png',
          x: 780,
          y: 80,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/mat1.png',
          x: 713,
          y: 5,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/ninja2.png',
          x: 830,
          y: 45,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/mat2.png',
          x: 680,
          y: 15,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/ninja3.png',
          x: 740,
          y: 50,
          scale: 0.3,
          duration: 4000, // 4 seconds
        },
        {
          src: './img/mat3.png',
          x: 740,
          y: 15,
          scale: 0.3,
          duration: 3000, // 3 seconds
        },
        {
          src: './img/mat4.png',
          x: 670,
          y: 10,
          scale: 0.3,
          duration: 3000,
        },
      ];
      const displayImagesSequentially = (index) => {
        if (index >= images.length) {
          return;
        }

        const imageConfig = images[index];
        const image = document.createElement('img');
        image.src = imageConfig.src;
        image.style.position = 'absolute';
        image.style.left = `${imageConfig.x}px`;
        image.style.top = `${imageConfig.y}px`;
        image.style.transform = `scale(${imageConfig.scale})`;

        this.gameScreen.appendChild(image);
        setTimeout(() => {
          this.gameScreen.removeChild(image);
          displayImagesSequentially(index + 1);
        }, imageConfig.duration);
      };
      displayImagesSequentially(0);
    }


    else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  update() {
    this.player.move()
  }

  createCollisionBlocks() {
    const floorCollision2d = [];
    for (let i = 0; i < floorCollision.length; i += 80) {
      floorCollision2d.push(floorCollision.slice(i, i + 80));
    }

    this.colissionBlocks = [];
    floorCollision2d.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 429) {
          this.colissionBlocks.push(new colissionSprite(this.gameScreen, {
            x: x * 16,
            y: y * 16
          }));
        }
      });
    });
  }
}

