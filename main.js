var config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 700,
    canvas: document.getElementById('canvas'),
    backgroundColor: 0xFFFFFF,

    physics: {
        default: 'arcade',
        debug: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update, 
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var playerSpeed = 200; 
var playerBlinking = false;

function preload ()
{
    this.load.image('player', 'assets/char.png')
    this.load.image('ghost', 'assets/ghost.png');
}

function create ()
{

    // Create the player sprite (remove the 'var' keyword)
    player = this.physics.add.sprite(100, 550, 'player');
    player.setDisplaySize(100, 100);
    player.setCollideWorldBounds(true); // Prevent the player from going off-screen

    var ghosts = this.physics.add.group();
    // Define the path for the ghost to follow
    var path = this.add.path(100, 100); 
    path.lineTo(300, 100); 
    var ghost = this.add.follower(path, 100, 100, 'ghost');
    ghosts.add(ghost);
    ghost.setScale(0.1);
    ghost.startFollow({
        duration: 3000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

    // Define the path for the ghost to follow
    var path1 = this.add.path(700, 100); 
    path1.lineTo(1100, 100);
    var ghost1 = this.add.follower(path1, 700, 100, 'ghost');
    ghosts.add(ghost1);
    ghost1.setScale(0.1);
    ghost1.startFollow({
        duration: 6000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

        // Define the path for the ghost to follow
    var path2 = this.add.path(550, 600); 
    path2.lineTo(550, 400); 
    var ghost2 = this.add.follower(path2, 550, 600, 'ghost');
    ghosts.add(ghost2);
    ghost2.setScale(0.1);
    ghost2.startFollow({
        duration: 3000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

            // Define the path for the ghost to follow
    var path3 = this.add.path(800, 600); 
    path3.lineTo(800, 400); 
    path3.lineTo(1000, 400);
    var ghost3 = this.add.follower(path3, 800, 600, 'ghost');
    ghosts.add(ghost3);
    ghost3.setScale(0.1);
    ghost3.startFollow({
        duration: 4000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(player, ghosts.getChildren(), playerCollidesWithGhost, null, this);
}

function playerCollidesWithGhost(player, ghosts) {
    // Check if the player is already blinking to avoid multiple calls
    if (!playerBlinking) {
        playerBlinking = true;
        player.setAlpha(0); // Make the player sprite invisible

        // Use a timer to make the player reappear after a delay
        this.time.delayedCall(100, function () {
            player.setAlpha(1); // Make the player sprite visible
        });

        // Repeat the blinking effect two more times (for a total of 3)
        this.time.delayedCall(200, function () {
            player.setAlpha(0);
        });
        this.time.delayedCall(350, function () {
            player.setAlpha(1);
        });
        this.time.delayedCall(450, function () {
            player.setAlpha(0);
        });
        this.time.delayedCall(600, function () {
            player.setAlpha(1);
        });
        this.time.delayedCall(2000, function () {
            playerBlinking = false;
        }); // Reset the blinking flag
    }
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

