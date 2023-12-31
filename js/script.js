window.addEventListener('load', () => {
  const startButton = document.getElementById('start-button')
  const restartButton = document.getElementById('restart-button')

  let game

  function startGame() {
    game = new Game()
    game.start()
  }

  startButton.addEventListener('click', function () {
    startGame()
  })

  restartButton.addEventListener('click', function () {
    location.reload()
  })

  let isLeftPressed = false;
  let isRightPressed = false;


  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyA':
      case 'ArrowLeft':
        isLeftPressed = true;
        game.player.velocity.x = -game.player.moveSpeed;
        game.player.faceLeft = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        isRightPressed = true;
        game.player.velocity.x = game.player.moveSpeed;
        game.player.faceLeft = false;
        break;
      case 'KeyW':
        game.player.startJumping();
        break;
      case 'KeyP':
        if (isLeftPressed) {
          game.player.position.x = 1050;
          game.player.position.y = 180;
          game.player.element.style.left = '1050px';
          game.player.element.style.top = '180px';
        }
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyA':
      case 'ArrowLeft':
        isLeftPressed = false;
        if (!isRightPressed) {
          game.player.velocity.x = 0;
        }
        break;
      case 'KeyD':
      case 'ArrowRight':
        isRightPressed = false;
        if (!isLeftPressed) {
          game.player.velocity.x = 0;
        }
        break;
      case 'KeyW':
        // Handle keyup for 'W' if needed
        break;
    }
  });
})

