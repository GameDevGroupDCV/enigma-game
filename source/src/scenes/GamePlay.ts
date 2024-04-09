import { GameData } from "../GameData";
import Player from "./GameObject/Player/Player";

export default class GamePlay extends Phaser.Scene {
  private map:Phaser.Tilemaps.Tilemap;
  private collisionLayer:Phaser.Tilemaps.TilemapLayer;
  private layerWorld:Phaser.Tilemaps.TilemapLayer;
  private backgroundLayer:Phaser.Tilemaps.TilemapLayer;
  private tileset:Phaser.Tilemaps.Tileset;
  private player:Player;

  constructor() {
    super({
      key: "GamePlay",
    });
  }


  create() {
    this.player = new Player({scene:this, x:100, y:100, key:'player-idle'}).setScale(2);
    console.log("gamepaly");
    this.createMap();
    this.physics.add.collider(this.player, this.collisionLayer);
  }

  update(time: number, delta: number): void {
    this.player.updatePlayer(time, delta);

  }

  createMap():void{
    if(this.map != null){this.map.destroy};
    this.map = this.make.tilemap({key:"level-1"});
    this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.tileset = this.map.addTilesetImage('cave2');

    this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
        .setDepth(9).setAlpha(0);

    this.layerWorld = this.map.createLayer("world", this.tileset, 0,0)
        .setDepth(2).setAlpha(1);
    
    this.backgroundLayer = this.map.createLayer("background", this.tileset, 0,0);

    this.collisionLayer.setCollisionByProperty({collide:true});
  }


}
