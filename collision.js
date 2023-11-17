import { hasTorch, setHasTorch, distance, distanceThreshold, updateDistanceThreshold } from './main.js';
import { create, ghosts, torches, PlayerMovement } from './sprites.js';
import { checkTorchState, updateScreenBrightness } from './torches.js';


var playerBlinking = false;
var blinkDuration = 2000; // 2 seconds
var blinkInterval = 250; // Blink every 250ms
var blinkCount = 0;
var blinkIntervalId;

function playerCollidesWithTorch(player, torch) {
    updateDistanceThreshold();
    console.log("Threshold when you obtain a torch:", distanceThreshold);
    // Handle the player obtaining a torch
    console.log('Torch collected'); // Debugging line
    setHasTorch(true, ghosts, distance);
    const torchIndex = torches.indexOf(torch);
    console.log('You got this torch:', torchIndex);
    if (torchIndex !== -1) {
        // Remove the torch from the array and destroy it
        torches.splice(torchIndex, 1);
        torch.destroy();
    }

    // Update the torch state and screen brightness
    checkTorchState(player, distanceThreshold)

    // Perform other actions when the player obtains a torch
}


function playerCollidesWithGhost(player, ghosts) {
    if (!hasTorch) {
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
}

export { playerCollidesWithTorch, playerCollidesWithGhost };




