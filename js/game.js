const idlePaths = [
  '../images/idle_0.png',
  '../images/idle_1.png',
  '../images/idle_2.png',
  '../images/idle_3.png'
];

const characterRunPaths = [
  '../images/run_0.png',
  '../images/run_1.png',
  '../images/run_2.png',
  '../images/run_3.png',
  '../images/run_4.png'
];

class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.height = 800;
    this.width = 1024;
    this.player = new Player(
      this.gameScreen,
      230,
      550,
      145 / 3,
      200 / 3,
      idlePaths,
      characterRunPaths,
      50
    );
    this.obstacles = [];
    this.animateId = 0;
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;

    this.yellowBoxTop = this.height - 40;
  }

  start() {
    this.startScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';

    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.lastFrameTime = 0;
    this.targetFrameTime = 1000 / 60;

    this.gameLoop();
  }

  gameLoop(timestamp) {
    const timeElapsed = timestamp - this.lastFrameTime;

    if (timeElapsed >= this.targetFrameTime) {
      this.lastFrameTime = timestamp;
      this.update();

      document.getElementById('score').innerText = this.score;
      document.getElementById('lives').innerText = this.lives;

      if (this.lives < 1) {
        this.gameOver = true;
      }

      if (this.gameOver) {
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
      } else {
        this.animateId = requestAnimationFrame(() => this.gameLoop());
      }
    }
    this.animateId = requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update() {
    this.player.move();
  }
}
