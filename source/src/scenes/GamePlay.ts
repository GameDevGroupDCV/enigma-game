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
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, this.collisionLayer, this.onCollision, null, this);
    this.physics.add.overlap(this.player, this.overlapLayer, this.onOverlap, null, this);

    
  }



  update(time: number, delta: number): void {
    this.player.updatePlayer(time, delta);
    this.updateMap();
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

    console.log(this.map.getTileAtWorldXY(this.player.x,this.player.y, false, this.cameras.main, this.layerWorld));
  }

  onOverlap(player:any, tile:any){
    if(tile.properties.text == true){
      console.log("Dialogo");
      tile.properties.text = false;
    }
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
    if(tile.properties.bag == true){
      this.scene.launch('LockZaino');
      this.scene.bringToTop('LockZaino');
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





  
  updateMap():void{
    const origin:Phaser.Tilemaps.Tile = this.map.getTileAt(this.player.x, this.player.y, false, this.layerWorld);
    //console.log(origin);
    this.map.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
      const dist:number = Phaser.Math.Distance.Snake(this.player.x, this.player.y, tile.x, tile.y);
      tile.setAlpha(1 - 0.1 * dist);
    },this);
    
  }
}


