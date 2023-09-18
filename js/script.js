window.addEventListener('load', () => {
  const startButton = document.getElementById('start-button')
  const restartButton = document.getElementById('restart-button')

  let game

  function startGame() {
    console.log('start game')
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
        break;
      case 'a':
        game.player.velocity.x = -game.player.moveSpeed;
        break;
      case 'w':
        if (game.player.velocity.y === 0) {
          game.player.velocity.y = -game.player.jumpStrength;
          break;
        }
    }
  })

  document.addEventListener('keyup', event => {
    console.log('up', event)
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
