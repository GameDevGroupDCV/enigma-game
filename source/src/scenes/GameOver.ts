import { GameData } from "../GameData";
import { playerData } from "../GameData";
import { audio_check } from "../GameData";
export default class GameOver extends Phaser.Scene {

  protected _graphics: Phaser.GameObjects.Graphics; 
  protected _button_gameOver: Phaser.GameObjects.Sprite;
  protected _credict_container:Phaser.GameObjects.Container;
  protected _modal: Phaser.GameObjects.Image;
  protected _text: Phaser.GameObjects.Text;
  protected _bg: Phaser.GameObjects.TileSprite;
  private audio:Phaser.Sound.WebAudioSound;
  private _music: Phaser.Sound.BaseSound;


  constructor() {
    super({
      key: "GameOver",
    });
  }


  create() {
    this.scene.stop("Dialog");
    playerData.life = 1;
    playerData.jump = -520;
    console.log("GameOver");
    this.audio = this.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
    this._bg = this.add.tileSprite(0,0,1280,640,"bg1").setOrigin(0,0);
    this._text = this.add.text((this.game.canvas.width / 2),(this.game.canvas.height / 2),"Game Over").setFontSize(40).setOrigin(0.5,0.5).setFontFamily('enigmaFont');
    this._button_gameOver = this.add.sprite((this.game.canvas.width / 2),(this.game.canvas.height / 2)+100,"restart_button",0).setScale(.07);
    this._music = this.sound.add("music", { loop: true, volume: 0.7 });
    if(audio_check.value){
      this._music.play();
    }
    this.bottoni();
  }

  bottoni():void{
      this._button_gameOver.on(
          "pointerover",()=>{
              this._button_gameOver.setFrame(1);
          }
      ).on(
          "pointerout",()=>{
              this._button_gameOver.setFrame(0);
          }
      ).on(
          "pointerdown",()=>{
              this.audio.play('Click');
              this.scene.stop("GamePlay");
              this.scene.stop("bossRoom");
              this.scene.stop("lockZaino");
              this.scene.stop("FlashBack");
              this.scene.stop("Dialog");
              this.scene.stop("Enigma");
              this.scene.stop("Sign");
              this.scene.stop("GameOver");
              this.scene.start("Intro");
          }
      ).setInteractive();

  }

  update(time:number,delta:number):void{
    this._bg.tilePositionX += 0.2;
  }

}
