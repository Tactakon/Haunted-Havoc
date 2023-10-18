import { create, PlayerMovement } from './sprites.js';
import { playerCollidesWithGhost } from './collision.js';

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