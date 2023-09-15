const player = document.getElementById('player');
const gravity = 0.5;
const jumpStrength = -15;

let playerPositionY = 300;
let playerVelocityY = 0;
let isJumping = false;

function updatePlayer() {
    player.style.top = playerPositionY + 'px';
}

function applyGravity() {
    if (playerPositionY < 300) {
        playerVelocityY += gravity;
    } else {
        playerVelocityY = 0;
        playerPositionY = 300;
        isJumping = false;
    }
}

function jump() {
    if (!isJumping) {
        playerVelocityY = jumpStrength;
        isJumping = true;
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            player.style.left = (parseInt(player.style.left) || 0) + 5 + 'px';
            break;
        case 'a':
            player.style.left = (parseInt(player.style.left) || 0) - 5 + 'px';
            break;
        case 'w':
            jump();
            break;
    }
});

function gameLoop() {
    applyGravity();
    playerPositionY += playerVelocityY;
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();
