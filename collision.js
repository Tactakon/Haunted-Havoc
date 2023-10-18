import { create, PlayerMovement } from './sprites.js';

var playerBlinking = false;
var blinkDuration = 2000; // 2 seconds
var blinkInterval = 250; // Blink every 250ms
var blinkCount = 0;
var blinkIntervalId;

function playerCollidesWithGhost(player, ghosts) {
    if (!playerBlinking) {
        console.log("hit");
        playerBlinking = true;
        blinkCount = 0;
        player.visible = true; // Ensure the player is initially visible

        // Start the blinking interval
        blinkIntervalId = setInterval(() => {
            player.visible = !player.visible; // Toggle player visibility
            blinkCount += blinkInterval;
            
            if (blinkCount >= blinkDuration) {
                // Blinking duration is over
                player.visible = true; // Ensure the player is fully visible
                playerBlinking = false; // Reset the blinking flag
                clearInterval(blinkIntervalId); // Clear the blinking interval
            }
        }, blinkInterval);
    }
}

export { playerCollidesWithGhost };




