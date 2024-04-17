import { GameData } from "../GameData";

export default class Intro extends Phaser.Scene{
    
    protected _button_play:Phaser.GameObjects.Image;
    protected _button_info:Phaser.GameObjects.Image;
    protected _credict_container:Phaser.GameObjects.Container;
    protected _graphics: Phaser.GameObjects.Graphics; 
    protected _modal: Phaser.GameObjects.Image;
    protected _layer: Phaser.GameObjects.Image;
    protected _credict_close: Phaser.GameObjects.Image; 
    protected _logo:Phaser.GameObjects.Image;
    protected _bg: Phaser.GameObjects.TileSprite;
    private audio:Phaser.Sound.WebAudioSound;

    constructor(){
        super({key:"Intro"});
    }

    create(){
        this._bg = this.add.tileSprite(0,0,1280,640,"bg1").setOrigin(0,0);
        this._logo = this.add.image((this.game.canvas.width / 2),220,"logo").setScale(0.3).setAlpha(0.8);
        this._button_play = this.add.image((this.game.canvas.width / 2)-100,(this.game.canvas.height / 2)+150,"play_unpressed").setScale(.07);
        this._button_info = this.add.image((this.game.canvas.width / 2)+100,(this.game.canvas.height / 2)+150,"info_unpressed").setScale(.07);
        this.audio = this.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
        this.graphics();
        this.bottoni();
    }

    bottoni():void{
        this._button_play.on(
            "pointerover",()=>{
                this._button_play = this.add.image((this.game.canvas.width / 2)-100,(this.game.canvas.height / 2)+150,"play_pressed").setScale(.07);
            }
        ).on(
            "pointerout",()=>{
                this._button_play = this.add.image((this.game.canvas.width / 2)-100,(this.game.canvas.height / 2)+150,"play_unpressed").setScale(.07);
            }
        ).on(
            "pointerdown",()=>{
                this.scene.stop("Intro")
                this.scene.start("GamePlay");
                this.audio.play('Click');
            }
        ).setInteractive();

        this._button_info.on(
            "pointerover",()=>{
                this._button_info = this.add.image((this.game.canvas.width / 2)+100,(this.game.canvas.height / 2)+150,"info_pressed").setScale(.07);
            }
        ).on(
            "pointerout",()=>{
                this._button_info = this.add.image((this.game.canvas.width / 2)+100,(this.game.canvas.height / 2)+150,"info_unpressed").setScale(.07);
            }
        )
        .on(
            "pointerdown",()=>{
                this.credits();
                this.audio.play('Click');
            }
        ).setInteractive();
    }

    credits():void{
        this._credict_container = this.add.container(0,0).setDepth(2);
        
        this._modal = this.add.image(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2,"model").setOrigin(0.5).setInteractive();
        this._credict_close = this.add.image((GameData.globals.gameWidth/2)+250,(GameData.globals.gameHeight/2)-160,"credit_close").on(
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
        this._graphics.fillRoundedRect(0,0,600,400,20);
        this._graphics.generateTexture("model",600,400);
        
        this._graphics.destroy();
        
    }

    update(time:number, delta:number){
        this._bg.tilePositionX += 0.2;
    }

}
