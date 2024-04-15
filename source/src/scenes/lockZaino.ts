import { GameData } from "../GameData";

export default class LockZaino extends Phaser.Scene{
    constructor(){
        super({key:'LockZaino'})
    }
    private text:Phaser.GameObjects.Text;
    private soluzione:Phaser.GameObjects.Text;
    private lockImage:Phaser.GameObjects.Sprite;
    private alphabet: string[] = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    private soluzioneEnigma:string = "bussola";
    create():void{
        this.lockImage = this.add.sprite(GameData.globals.gameWidth/2, GameData.globals.gameHeight/2+100, "lock").setScale(3);
        this.anims.create({
            key:'lock-open',
            frames: this.anims.generateFrameNumbers('lock', {frames:[0,1,2,3,4,5,6,7]}), 
            frameRate: 13, 
            yoyo:false, 
            repeat:0
        })

        this.text = this.add.text(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2 -100,"So indicare la strada\novunque si vada,\nIl sentiero disegno,\ne con me l'esploratore \nnon e' mai indegno", 
            {fontFamily:"alagard"}).setFontSize(40).setOrigin(0.5,0.5);
        this.soluzione = this.add.text(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2 +200," ", {fontFamily:"alagard"}).setFontSize(50).setOrigin(0.5,0.5);
        this.input.keyboard.on('keydown', (event:KeyboardEvent) =>
            {   
                console.log(event);
                if(this.alphabet.includes(event.key)){
                    this.soluzione.text+=event.key;
                }
                else if(event.key == "Backspace"){
                    this.soluzione.text = this.soluzione.text.slice(0, this.soluzione.text.length-1);
                }
                else if(event.key == "Enter"){
                    console.log("hai cliccato enter");
                    console.log(this.soluzione.text)
                    if(this.soluzione.text.replace(" ", "") == this.soluzioneEnigma){
                        console.log("hai vinto");
                        this.lockImage.anims.play('lock-open', true);
                    }
                }
            });
    }

    update(time: number, delta: number): void {
        
    }

}