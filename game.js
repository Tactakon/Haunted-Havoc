var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 500,
    height: 250,
    backgroundColor: "0x000000",
    scene: [Scene1],
    scale:{
        zoom:2
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade:{
            debug:false
        }
    },
}
  
  
var game = new Phaser.Game(config);



function update() {
    // Initialize velocity values
    let velocityX = 0;
    let velocityY = 0;

    // Check for keyboard input to move the player
    if (cursors.left.isDown) {
        velocityX = -playerSpeed; // Move left
    }
    if (cursors.right.isDown) {
        velocityX = playerSpeed; // Move right
    }
    if (cursors.up.isDown) {
        velocityY = -playerSpeed; // Move up
    }
    if (cursors.down.isDown) {
        velocityY = playerSpeed; // Move down
    }

    // Normalize the diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
        const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = (velocityX / length) * playerSpeed;
        velocityY = (velocityY / length) * playerSpeed;
    }

    // Set the player's velocity
    player.setVelocity(velocityX, velocityY);

    // Check if no keys are pressed and stop the player
    if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
        player.setVelocity(0, 0);
    }
}
  