window.addEventListener('load', () => {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  let game;
  let isMovingLeft = false;
  let isMovingRight = false;

  function startGame() {
    console.log('start game');
    game = new Game();
    game.start();
  }

  startButton.addEventListener('click', function () {
    startGame();
  });

  restartButton.addEventListener('click', function () {
    game.player.element.remove();
    startGame();
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      isMovingLeft = true;
      isMovingRight = false; // Reset the right movement flag
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      isMovingRight = true;
      isMovingLeft = false; // Reset the left movement flag
    }

    // Set the player's direction based on the flags
    if (isMovingLeft) {
      game.player.directionX = -2.5;
    } else if (isMovingRight) {
      game.player.directionX = 2.5;
    }
  });

  document.addEventListener('keyup', event => {
    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && !isMovingRight) {
      isMovingLeft = false;
      game.player.directionX = 0;
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && !isMovingLeft) {
      isMovingRight = false;
      game.player.directionX = 0;
    }
  });
});
