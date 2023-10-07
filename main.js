var config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 700,
    canvas: document.getElementById('canvas'),
    backgroundColor: 0xFFFFFF,

    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update, // Don't forget to add the update function here
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var playerSpeed = 200; // You can adjust this value to change the player's movement speed.

function preload ()
{
    this.load.image('player', 'assets/char.png')
}

function create ()
{

    // Create the player sprite (remove the 'var' keyword)
    player = this.physics.add.sprite(100, 550, 'player');
    player.setDisplaySize(100, 100);
    player.setCollideWorldBounds(true); // Prevent the player from going off-screen

    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}

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

