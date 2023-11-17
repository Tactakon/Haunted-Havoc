import { create, ghosts, torches, PlayerMovement } from './sprites.js';
import { playerCollidesWithTorch, playerCollidesWithGhost } from './collision.js';
import { checkTorchState, updateScreenBrightness } from './torches.js';

var hasTorch = false;
const distance = 300;
var distanceThreshold = 0; 
function setHasTorch(value, ghosts) {
    hasTorch = value;
    ghosts.children.iterate(function (ghost) {
        ghost.setVisible(!hasTorch);
    });
}

function updateDistanceThreshold() {
    distanceThreshold += distance;
}

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
};

var game = new Phaser.Game(config);
var cursors;

game.scene.add('collision', {
    preload: function preload () {
        this.load.image('player', 'assets/char.png');
        this.load.image('ghost', 'assets/ghost.png');
        this.load.image('torch', 'assets/torch.png');
    },
    create: function () {
        create(this);
        cursors = this.input.keyboard.createCursorKeys();
    },
    update: function () {
        PlayerMovement(this);
    }
});

game.scene.start('collision');

export { hasTorch, setHasTorch, distance, distanceThreshold, updateDistanceThreshold };