import { GameData } from "../GameData";
import { audio_check } from "../GameData"

export default class Intro extends Phaser.Scene{
    
    protected _button_play:Phaser.GameObjects.Sprite;
    protected _button_info:Phaser.GameObjects.Sprite;
    protected _button_music:Phaser.GameObjects.Sprite;
    protected _credict_container:Phaser.GameObjects.Container;
    protected _graphics: Phaser.GameObjects.Graphics; 
    protected _modal: Phaser.GameObjects.Image;
    protected _layer: Phaser.GameObjects.Image;
    protected _credict_close: Phaser.GameObjects.Image; 
    protected _logo:Phaser.GameObjects.Image;
    protected _bg: Phaser.GameObjects.TileSprite;
    private audio:Phaser.Sound.WebAudioSound;
    private _music: Phaser.Sound.BaseSound;

    constructor(){
        super({key:"Intro"});
    }

    create(){
        this._bg = this.add.tileSprite(0,0,1280,640,"bg1").setOrigin(0,0);
        this._logo = this.add.image((this.game.canvas.width / 2),220,"logo").setScale(0.3).setAlpha(0.8);
        this._button_play = this.add.sprite((this.game.canvas.width / 2)-100,(this.game.canvas.height / 2)+150,"play_button",0).setScale(.07);
        this._button_info = this.add.sprite((this.game.canvas.width / 2)+100,(this.game.canvas.height / 2)+150,"info_button",0).setScale(.07);
        this._button_music = this.add.sprite(this.game.canvas.width-100,100,"music_button",0).setScale(0.1);
        this.audio = this.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
        this._music = this.sound.add("music", { loop: true, volume: 1 });
        this._music.play();
        this.graphics();
        this.bottoni();
    }

    bottoni():void{
        this._button_play.on(
            "pointerover",()=>{
                this._button_play.setFrame(1);
            }
        ).on(
            "pointerout",()=>{
                this._button_play.setFrame(0);
                
            }
        ).on(
            "pointerdown",()=>{
                this.scene.stop("Intro")
                this.scene.start("GamePlay");
                this.audio.play('Click');
                this.scene.start("Dialog");
                this.scene.bringToTop("Dialog");
                this._music.stop();
            }
        ).setInteractive();

        this._button_info.on(
            "pointerover",()=>{
                this._button_info.setFrame(1);
            }
        ).on(
            "pointerout",()=>{
                this._button_info.setFrame(0); 
            }
        )
        .on(
            "pointerdown",()=>{
                this.credits();
                this.audio.play('Click');
            }
        ).setInteractive();

        this._button_music.on(
            "pointerdown",()=>{
                console.log(audio_check.value);
                if(this._music.isPlaying){
                    this._button_music.setFrame(1); 
                    this._music.stop();
                    audio_check.value = false;   
                    console.log("disattivato")
                }else{
                    this._button_music.setFrame(0);
                    this._music.play();
                    audio_check.value = true;
                    console.log("attivato");
                }
                this.audio.play('Click');
            }
        ).setInteractive();
    }

    credits():void{
        this._credict_container = this.add.container(0,0).setDepth(2);
        
        this._modal = this.add.image(30,80,"model").setOrigin(0).setInteractive();

        this._credict_close = this.add.image(390,120,"credit_close").setOrigin(0.5).on(
            "pointerdown",()=>{
                this.closeCredit();
                this.audio.play('Click');
            }
        ).setInteractive();

        this._credict_container.add([this._modal,this._credict_close]);
    }

    closeCredit():void{
        console.log("ciao");
        this._credict_container.setAlpha(0);
    }

    graphics():void{
        this._graphics = this.add.graphics();

        this._graphics.fillStyle(0x8B8E88,.7);
        this._graphics.fillRoundedRect(0,0,400,500,20);
        this._graphics.generateTexture("model",400,500);
        
        this._graphics.destroy();
        
    }

    update(time:number, delta:number){
        this._bg.tilePositionX += 0.2;
    }

}
