import { hasTorch, setHasTorch, distance, distanceThreshold, updateDistanceThreshold } from './main.js';
import { playerCollidesWithTorch, playerCollidesWithGhost } from './collision.js';
import { create, ghosts, torches, PlayerMovement } from './sprites.js';

let movementCount = 0;
function updateScreenBrightness() {
    console.log(hasTorch);
    const content = document.getElementById("content");
    if (hasTorch) {
        // If the player has a torch, set the brightness to maximum
        content.style.filter = "brightness(100%)";
    } else {
        // If the player doesn't have a torch, dim the screen
        content.style.filter = "brightness(40%)"; // Adjust this value to control the dimness
    }
}

function checkTorchState(player, distanceThreshold) {
    console.log("Initial hasTorch value:", hasTorch); // Debugging line

    if (hasTorch) {
        if (player.body.velocity.x !== 0 || player.body.velocity.y !== 0) {
            // Player is moving, so increment the movement count
            movementCount++;
        }
        if (movementCount >= distanceThreshold) {
            console.log('Distance exceeded, updating hasTorch to false'); // Debugging line
            setHasTorch(false, ghosts); // This updates the global hasTorch variable
        }
    }

    console.log("Updated hasTorch value:", hasTorch); // Debugging line

    // Update the screen brightness based on the torch state
    updateScreenBrightness();
}


export { updateScreenBrightness, checkTorchState };


