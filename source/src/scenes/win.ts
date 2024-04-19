import { GameData } from "../GameData";
import { playerData } from "../GameData";
import { audio_check } from "../GameData";
export default class Win extends Phaser.Scene {

  protected _graphics: Phaser.GameObjects.Graphics; 
  protected _button_win: Phaser.GameObjects.Sprite;
  protected _credict_container:Phaser.GameObjects.Container;
  protected _modal: Phaser.GameObjects.Image;
  protected _text: Array<Phaser.GameObjects.Text>
  protected _bg: Phaser.GameObjects.TileSprite;
  private audio:Phaser.Sound.WebAudioSound;
  private _music: Phaser.Sound.BaseSound;
  private _logo:Phaser.GameObjects.Image;
  private logoPhaser:Phaser.GameObjects.Image;
  private dcv:Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "win",
    });
  }

private scrollSpeed:number = 2;

  create() {
    this.logoPhaser = this.add.image(1175,520,"phaser").setScale(0.2).setAlpha(1).setDepth(10);
    this._logo = this.add.image((this.game.canvas.width / 2),220,"logo").setScale(0.3).setAlpha(0.8).setDepth(10);
    this.dcv = this.add.image(1195,115,"dcv").setScale(0.06).setAlpha(1).setDepth(10);
    this.audio = this.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
    this._bg = this.add.tileSprite(0,0,1280,640,"bg1").setOrigin(0,0);
    this._text = [
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"HAI VINTO! ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Creato dal Team: NOVA DREAMERS ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Coders: ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Christian 'pychri' Ostoni").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Bruno 'BG' Galluzzo").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Game Designers: ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Vincenzo 'Gaser' Luciano").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Roberto 'Robertide69' Salsano").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Graphic Designers: ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Lorenzo 'AyarLory' Blasio").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Ivan 'Positiv4ik' Andrusenko").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Suoni e Musiche: ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height," ").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Gioacchino 'shijpvp' Vitale").setVisible(false).setOrigin(0.5),
                    this.add.text(this.game.canvas.width/6,this.game.canvas.height,"Manuel 'Simien' Alfano").setVisible(false).setOrigin(0.5),
                ]
    this._text.forEach((text:Phaser.GameObjects.Text) =>{
        text.setFontFamily('alagard');
        text.setFontSize(20)
    })

    this._button_win = this.add.sprite((this.game.canvas.width / 2),(this.game.canvas.height / 2)+100,"restart_button",0).setScale(.07);
    this._music = this.sound.add("music", { loop: true, volume: 0.7 });
    if(audio_check.value){
      this._music.play();
    }
  }
update(){
    this._bg.tilePositionX += 0.2;


    this._text.forEach((value:Phaser.GameObjects.Text, index:number) =>{
        this.time.addEvent({
            delay:500*index,
            callback: () =>{
                value.y -= 1;
                if(value.y <630){
                    value.setVisible(true);
                }
            }, 
            callbackScope:this
        })
    })
}
}