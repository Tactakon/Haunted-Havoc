class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("player", "assets/images/char.png");
        //this.load.image("background", "assets/images/background.jpg");
        this.load.image("tiles", "assets/map/tiles.png");
        this.load.tilemapTiledJSON("dungeon", "assets/map/dungeon.tmj")
    }
  
    create() {
        //this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        //this.background.setScale(2);

        

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        const map = this.make.tilemap({key: "dungeon"});
        const tileset = map.addTilesetImage("dungeon","tiles");
        map.createLayer("Ground",tileset);
        const wallLayer = map.createLayer("Walls",tileset);

        wallLayer.setCollisionByProperty({collides: true});

        /*
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        wallLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        */
        this.player = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "player");
        this.player.setScale(.03);
        this.physics.add.collider(this.player, wallLayer);
        this.player.body.setSize(550,550);
        this.player.body.offset.x = 180;
    }


    update(){
        this.movePlayerManager();

    }
    movePlayerManager(){

        this.player.setVelocity(0);
    
        if(this.cursorKeys.left.isDown){
          this.player.setVelocityX(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.right.isDown){
          this.player.setVelocityX(gameSettings.playerSpeed);
        }
    
        if(this.cursorKeys.up.isDown){
          this.player.setVelocityY(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.down.isDown){
          this.player.setVelocityY(gameSettings.playerSpeed);
        }
      }
  }

/*
  
  
const map = this.make.tilemap({key: "tiles"});
map.addTilesetImage("tiles") 


*/