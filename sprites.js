import { hasTorch, setHasTorch, distance, distanceThreshold, updateDistanceThreshold } from './main.js';
import { playerCollidesWithTorch, playerCollidesWithGhost } from './collision.js';
import { checkTorchState, updateScreenBrightness } from './torches.js';

var player;
var cursors;
var playerSpeed = 200; 
var playerBlinking = false;
var ghosts;
var torches = [];
function create (scene)
{
    // Create the player sprite (remove the 'var' keyword)
    player = scene.physics.add.sprite(100, 550, 'player');
    player.setDisplaySize(100, 100);
    player.setCollideWorldBounds(true); // Prevent the player from going off-screen

    ghosts = scene.physics.add.group();
    // Define the path for the ghost to follow
    var path = scene.add.path(100, 100); 
    path.lineTo(300, 100); 
    var ghost = scene.add.follower(path, 100, 100, 'ghost');
    ghosts.add(ghost);
    ghost.setScale(0.1);
    ghost.startFollow({
        duration: 3000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

    // Define the path for the ghost to follow
    var path1 = scene.add.path(700, 100); 
    path1.lineTo(1100, 100);
    var ghost1 = scene.add.follower(path1, 700, 100, 'ghost');
    ghosts.add(ghost1);
    ghost1.setScale(0.1);
    ghost1.startFollow({
        duration: 6000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

        // Define the path for the ghost to follow
    var path2 = scene.add.path(550, 600); 
    path2.lineTo(550, 400); 
    var ghost2 = scene.add.follower(path2, 550, 600, 'ghost');
    ghosts.add(ghost2);
    ghost2.setScale(0.1);
    ghost2.startFollow({
        duration: 3000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });

            // Define the path for the ghost to follow
    var path3 = scene.add.path(800, 600); 
    path3.lineTo(800, 400); 
    path3.lineTo(1000, 400);
    var ghost3 = scene.add.follower(path3, 800, 600, 'ghost');
    ghosts.add(ghost3);
    ghost3.setScale(0.1);
    ghost3.startFollow({
        duration: 4000, 
        yoyo: true, // Make the ghost move back and forth on the path
        repeat: -1, // -1 means repeat indefinitely
    });
    ghosts.children.iterate(function (ghost) {
        ghost.setVisible(!hasTorch);
    });
    const torch1 = scene.physics.add.sprite(800, 600, 'torch');
    const torch2 = scene.physics.add.sprite(500, 100, 'torch');
    const torch3 = scene.physics.add.sprite(200, 300, 'torch');

    torch1.setDisplaySize(30, 30);
    torch2.setDisplaySize(30, 30);
    torch3.setDisplaySize(30, 30);

    torches.push(torch1, torch2, torch3);
    checkTorchState(player, distanceThreshold);
    console.log("Initial Threshold:", distanceThreshold);
    // Set up keyboard input
    cursors = scene.input.keyboard.createCursorKeys();
    scene.physics.add.overlap(player, torches, playerCollidesWithTorch, null, scene);
    scene.physics.add.overlap(player, ghosts.getChildren(), playerCollidesWithGhost, null, scene);
}

function PlayerMovement(scene) {
    // Initialize velocity values
    let velocityX = 0;
    let velocityY = 0;

    // Check for keyboard input to move the player
    if (cursors.left.isDown) {
        velocityX = -playerSpeed; // Move left
        checkTorchState(player, distanceThreshold);
    }
    if (cursors.right.isDown) {
        velocityX = playerSpeed; // Move right
        checkTorchState(player, distanceThreshold);
    }
    if (cursors.up.isDown) {
        velocityY = -playerSpeed; // Move up
        checkTorchState(player, distanceThreshold);
    }
    if (cursors.down.isDown) {
        velocityY = playerSpeed; // Move down
        checkTorchState(player, distanceThreshold);
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

export { create, ghosts, torches, PlayerMovement };