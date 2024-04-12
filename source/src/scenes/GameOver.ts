import { GameData } from "../GameData";

export default class GameOver extends Phaser.Scene {

  protected _graphics: Phaser.GameObjects.Graphics; 
  protected _button_gameOver: Phaser.GameObjects.Image;
  protected _credict_container:Phaser.GameObjects.Container;
  protected _modal: Phaser.GameObjects.Image;
  protected _text: Phaser.GameObjects.Text;
  protected _bg: Phaser.GameObjects.TileSprite;

  constructor() {
    super({
      key: "GameOver",
    });
  }


  create() {
    console.log("GameOver");
    this._bg = this.add.tileSprite(0,0,1280,640,"bg1").setOrigin(0,0);
    this._text = this.add.text((this.game.canvas.width / 2),(this.game.canvas.height / 2),"Game Over").setFontSize(40).setOrigin(0.5,0.5).setFontFamily('enigmaFont');
    this._button_gameOver = this.add.image((this.game.canvas.width / 2),(this.game.canvas.height / 2)+100,"b_unpressed").setScale(.07);
    this.bottoni();
  }

  bottoni():void{
      this._button_gameOver.on(
          "pointerover",()=>{
              this._button_gameOver = this.add.image((this.game.canvas.width / 2),(this.game.canvas.height / 2)+100,"b_pressed").setScale(.07);
          }
      ).on(
          "pointerout",()=>{
              this._button_gameOver = this.add.image((this.game.canvas.width / 2),(this.game.canvas.height / 2)+100,"b_unpressed").setScale(.07);
          }
      ).on(
          "pointerdown",()=>{
              this.scene.stop("GameOver");
              this.scene.start("GamePlay");
          }
      ).setInteractive();

  }

  update(time:number,delta:number):void{
    this._bg.tilePositionX += 0.2;
  }

}
