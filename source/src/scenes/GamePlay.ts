import { Tilemaps } from "phaser";
import { GameData } from "../GameData";
import { playerData } from "../GameData";
import { audio_check } from "../GameData";
import Dialogs from "./Dialog";
import Flashback from "./FlashBack";
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
  private audio:Phaser.Sound.WebAudioSound;
  private FlashBackScene:Flashback;
	private _music: Phaser.Sound.BaseSound;
  private _dotExclamation: Phaser.GameObjects.Text;
  private _space: Phaser.Input.Keyboard.Key;
  private _dont_fall: boolean;
  private Dialog:Dialogs;
  
  constructor() {
    super({
      key: "GamePlay",
    });
  }


  stop_audio():void{
    this._music.pause();
  }

  resume_audio():void{
    this._music.resume();
  }

  create() {
    this._dont_fall = true;
    console.log("gameplay" + playerData.jump);
    this.player = new Player({scene:this, x:210, y:350, key:'player-idle', life:playerData.life, jump:playerData.jump}).setScale(1.5);
    this.FlashBackScene = <Flashback>this.scene.get('FlashBack');
    this.FlashBackScene.events.off('audio_resume',this.resume_audio,this);
    this.FlashBackScene.events.on('audio_resume',this.resume_audio,this);

    this.Dialog = <Dialogs>this.scene.get('Dialog');
    this.Dialog.events.off('stop_music',this.stop_audio,this);
    this.Dialog.events.on('stop_music',this.stop_audio,this);

    this._music = this.sound.add("music_game", { loop: true, volume: 5 });

    if(audio_check.value){
      console.log("ciao musica");
      this._music.play();
    }
    this.createMap();
    this._dotExclamation = this.add.text(0,0,"!",{font:"alagard"}).setAlpha(0).setFontSize(40);
    this._space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cameras.main.setViewport(140,195,900,250);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setAlpha(0.5);
    this.cameras.main.setZoom(1.58);

    this.physics.add.collider(this.player, this.collisionLayer, this.onCollision, null, this);
    this.physics.add.overlap(this.player, this.overlapLayer, this.onOverlap, null, this);
    
  }

  getSign(cartel:number):void{
    console.log("ok");
    this.registry.set("sign", cartel);
    this.scene.launch('Sign');
    this.scene.bringToTop('Sign');
    this.scene.pause();
  }
  
  position_bg_exterior():void{
    this._dotExclamation.x= this.player.x-10;
    this._dotExclamation.y= this.player.y-64;
  }

  update(time: number, delta: number): void {
    //console.log(audio_check.value);
    this.player.updatePlayer(time, delta);
    this.updateMap();
    /*
    if(!this._music.isPlaying){
      if(audio_check.value){
        console.log(audio_check);
        this._music.play();
      }
    }*/
    if(this.registry.get('zainoUnblocked')){
      this.events.emit('inventoryBag');
      console.log("zainoUnblocked è false")
      this.registry.set('zainoUnblocked', false);
    }

    if(this.enigmaCompleted){
      this.updateMap();
        this.cameras.main.setViewport(0, 0, GameData.globals.gameWidth,GameData.globals.gameHeight);
        this.cameras.main.setAlpha(1);
        this.cameras.main.setZoom(1);
      }

      this.position_bg_exterior();

      if(this.player.getVelocity() > 700){
        if(this._dont_fall){  
          playerData.life--;
          this.playerLife();
          console.log("vite:"+playerData.life);
          if((this.player.getlife() == 0) && this.player.getfloor()){
            this.scene.start('GameOver');
            this.audio.play('Rottura_Delle_Ossa');
            if(audio_check.value){
              this._music.stop();
            }
          }
          if(this.player.getfloor()){
            console.log("tocca terra");
          }
          if(this._dont_fall){
            this._dont_fall = false;
          }
        }
      }

  }

  createMap():void{
    this.audio = this.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
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
    if(tile.properties.introDialog == true){
      this.events.emit("onText", ["intro"]);
      console.log("dialogo di intro");
      this.overlapLayer.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
        if(tile.properties.introDialog == true){
          tile.properties.introDialog = false;
        }
      })
    }

    if(tile.properties.bagDialog == true){
      this.events.emit("onText", ["bag"]);
      console.log("dialogo di bag");
      this.overlapLayer.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
        if(tile.properties.bagDialog == true){
          tile.properties.bagDialog = false;
        }
      })
    }

    if(tile.properties.bossDialog == true){
      this.events.emit("onText", ["boss"]);
      console.log("dialogo di boss");
      this.overlapLayer.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
        if(tile.properties.bossDialog == true){
          tile.properties.bossDialog = false;
        }
      })
    }

    if(tile.properties.death == true){
      console.log("death");
      if(this.enigmaCompleted){
        tile.properties.death = false;
      }
      else{
        /*
        if(this.player.decreaseLife()){
          this.scene.stop();
          this.scene.start('GameOver');
          this.audio.play('Rottura_Delle_Ossa');
        }*/
        this.player.setPosition(210,350);
      }
    }

    if(tile.properties.enigma == true){
      console.log("enigma");
      this.player.setPosition(125, 442);
      tile.properties.enigma = false;
      this.enigmaCompleted = true;
      this.scene.pause(this);
      this.scene.launch('enigma');
      this.scene.bringToTop('enigma');
    }

    if(tile.properties.interaction1 == true){
      this._dotExclamation.setAlpha(1).setDepth(13);
      if (this._space.isDown) { 
        console.log("ciao");
        this.getSign(1);
      }
    }
    if(!tile.properties.interaction1 && !tile.properties.interaction2 && !tile.properties.interaction3){
      this._dotExclamation.setAlpha(0).setDepth(13);
    }

    if(tile.properties.interaction2 == true){
      this._dotExclamation.setAlpha(1).setDepth(13);
      if (this._space.isDown) { 
        console.log("ciao");
        this.getSign(2);
      }
    }

    if(tile.properties.interaction3 == true){
      this._dotExclamation.setAlpha(1).setDepth(13);
      if (this._space.isDown) { 
        console.log("ciao");
        this.getSign(3);
      }
    }
    if(tile.properties.bag == true){
      tile.properties.bag = false;
      this.scene.launch('LockZaino');
      this.scene.bringToTop('LockZaino');
      this.scene.bringToTop('Dialog');
      this.events.emit('textZaino');
      this.scene.pause();
    }
    if(tile.properties.exit){
      this.add.tween({
        targets:this.player,
        scale:0,
        duration:500,
        onComplete: () =>{
          this.scene.stop();
          this.scene.stop('Dialog');
          this.scene.start('win');
        }
      })
    }

  }

  onCollision(player: any, tile:any):void{

    if(tile.properties.boss == true){
      tile.properties.boss = false;
      this.scene.launch('bossRoom');
      this.scene.pause();
      this.scene.bringToTop('bossRoom');
      this.scene.bringToTop('Dialog');
      //this._music.stop();
    }
    this.map.forEachTile((tileMap:Phaser.Tilemaps.Tile) =>{
      const dist:number = Phaser.Math.Distance.Snake(tile.x, tile.y, tileMap.x, tileMap.y);
      tileMap.setAlpha(1 - 0.1 * dist);
    })
  }


  playerBlock():void{
    this.player.setDialog(true);
  }
  playerUnBLock():void{
    this.player.setDialog(false);
  }

  playerLife():void{
    this.player.setLife();
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


