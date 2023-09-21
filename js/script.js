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
    game.player.element.remove()
    startGame()
  })

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'd':
        game.player.velocity.x = game.player.moveSpeed;
        game.player.faceLeft = false;
        break;
      case 'a':
        game.player.velocity.x = -game.player.moveSpeed;
        game.player.faceLeft = true;
        break;
      case "w":
        game.player.startJumping();
        break;

    }
  })

  document.addEventListener('keyup', event => {
    if (
      event.code === 'KeyA' ||
      event.code === 'KeyD' ||
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowRight'
    ) {
      game.player.velocity.x = 0
    }
    if (event.code === 'KeyW' || event.code === 'KeyS') {
    }
  })
})

