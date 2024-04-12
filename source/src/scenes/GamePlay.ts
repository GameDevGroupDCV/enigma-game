import { GameData } from "../GameData";
import Player from "./GameObject/Player/Player";

export default class GamePlay extends Phaser.Scene {
  private map:Phaser.Tilemaps.Tilemap;
  private collisionLayer:Phaser.Tilemaps.TilemapLayer;
  private layerWorld:Phaser.Tilemaps.TilemapLayer;
  private backgroundLayer:Phaser.Tilemaps.TilemapLayer;
  private overlapLayer:Phaser.Tilemaps.TilemapLayer;
  private tileset:Phaser.Tilemaps.Tileset;
  private player:Player;
  private enigmaCompleted:boolean = false;

  constructor() {
    super({
      key: "GamePlay",
    });
  }


  create() {
    this.player = new Player({scene:this, x:200, y:100, key:'player-idle', life:1}).setScale(1.5);

    this.createMap();
    this.cameras.main.setViewport(140, 195, 900,250);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setAlpha(0.5);
    this.cameras.main.setZoom(1.58);
    
    this.physics.add.collider(this.player, this.collisionLayer, this.onCollision, null, this);
    this.physics.add.overlap(this.player, this.overlapLayer, this.onOverlap, null, this);
  }

  update(time: number, delta: number): void {
    this.player.updatePlayer(time, delta);
    if(this.enigmaCompleted){
      this.cameras.main.setViewport(0, 0, GameData.globals.gameWidth,GameData.globals.gameHeight);
      this.cameras.main.setAlpha(1);
      this.cameras.main.setZoom(1);
    }
  }

  createMap():void{
    if(this.map != null){this.map.destroy};
    this.map = this.make.tilemap({key:"level-1"});
    this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

    this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.tileset = this.map.addTilesetImage('cave2');

    this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
        .setDepth(2).setAlpha(0);

    this.layerWorld = this.map.createLayer("world", this.tileset, 0,0)
        .setDepth(2).setAlpha(9);
    
    this.backgroundLayer = this.map.createLayer("background", this.tileset, 0,0).setDepth(0);

    this.overlapLayer = this.map.createLayer("overlap", this.tileset,0,0).setDepth(1).setAlpha(0);

    this.collisionLayer.setCollisionByProperty({collide:true});
    this.overlapLayer.setCollisionByProperty({collide:true});
  }

  onOverlap(player:any, tile:any){
    if(tile.properties.death == true){
      console.log("death");
      if(this.enigmaCompleted){
        tile.properties.death = false;
      }
      else{
        if(this.player.decreaseLife()){
          this.scene.stop();
          this.scene.start('GameOver');
        }
      }
    }
    if(tile.properties.enigma == true){
      console.log("enigma")
      this.player.setPosition(125, 442);
      tile.properties.enigma = false;
      this.enigmaCompleted = true;
      this.scene.pause(this);
      this.scene.launch('enigma');
      this.scene.bringToTop('enigma');
    }

    if(tile.properties.interaction1 == true){
      tile.properties.interaction1 = false;
      this.registry.set("sign", 1);
      this.scene.launch('Sign');
      this.scene.bringToTop('Sign');
      this.scene.pause();
    }
    if(tile.properties.interaction2 == true){
      tile.properties.interaction2 = false;
      this.registry.set("sign", 2);
      this.scene.launch('Sign');
      this.scene.bringToTop('Sign');
      this.scene.pause();
    }
    if(tile.properties.interaction3 == true){
      tile.properties.interaction3 = false;
      this.registry.set("sign", 3);
      this.scene.launch('Sign');
      this.scene.bringToTop('Sign');
      this.scene.pause();
    }
  }

  onCollision(player: any, tile:any):void{
    if(tile.properties.boss == true){
      tile.properties.boss = false;
      this.scene.launch('bossRoom');
      this.scene.pause();
      this.scene.bringToTop('bossRoom');
      
    }
  }
}


