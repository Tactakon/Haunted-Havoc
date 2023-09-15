var config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 700,
    canvas: document.getElementById('canvas'),

    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('player', 'assets/char.png')
    this.load.image('floor', 'assets/ground.png');
}

function create ()
{
    // Create the floor background
    var floor = this.add.image(725, 650, 'floor');
    floor.setDisplaySize(1700, 400);
    // Create the player sprite
    var player = this.physics.add.sprite(100, 550, 'player');
    player.setDisplaySize(100,100);
    player.setCollideWorldBounds(true); // Prevent the player from going off-screen

    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}
