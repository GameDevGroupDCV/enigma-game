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
    private tentativi:number = 3;
    private indizioButton:Phaser.GameObjects.Text;
    private indizio:Phaser.GameObjects.Text;
    private bg:Phaser.GameObjects.Image;

    create():void{
        this.bg = this.add.image(0,0,'bg-lock').setScale(3);
        this.indizioButton = this.add.text(1000,600,"",{fontFamily:'alagard'});

        this.indizio = this.add.text(GameData.globals.gameWidth/2, 550, "",{fontFamily:'alagard'}).setFontSize(20).setOrigin(0.5,0.5);

        this.lockImage = this.add.sprite(GameData.globals.gameWidth/2, 450, "lock").setScale(3);

        this.anims.create({
            key:'lock-open',
            frames: this.anims.generateFrameNumbers('lock', {frames:[0,1,2,3,4,5,6,7]}), 
            frameRate: 13, 
            yoyo:false, 
            repeat:0
        })

        this.text = this.add.text(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2 -180,"So indicare la strada ovunque si vada,\nIl sentiero disegno, e con me l'esploratore \nnon e' mai indegno", 
            {fontFamily:"alagard"}).setFontSize(40).setOrigin(0.5,0.5);
            
        this.soluzione = this.add.text(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2," ", {fontFamily:"alagard"}).setFontSize(50).setOrigin(0.5,0.5);
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
                        this.lockImage.on('animationcomplete', () =>{
                            this.registry.set('zainoUnblocked', true);
                            this.scene.resume('GamePlay');
                            this.scene.stop();
                        })
                    }
                    else{
                        this.cameras.main.shake(200, 0.05);
                        this.tentativi--;
                        if(this.tentativi == 0){
                            this.indizioButton.setText("indizio").setInteractive().setFontSize(30)
                            this.indizioButton.on('pointerover', () =>{
                                this.indizioButton.setColor("#ff0000");
                            },this)

                            this.indizioButton.on("pointerout", () =>{
                                this.indizioButton.setColor("#ffffff");
                            }, this)

                            this.indizioButton.on('pointerdown', () =>{
                                this.indizio.setText('Orientati verso il nord, dove le stelle brillano, e troverai il tuo punto di partenza per scoprire la risposta');
                                this.time.addEvent({
                                    delay:1000, 
                                    callback: ()=>{
                                        this.add.tween({
                                            targets: this.indizio,
                                            alpha:0, 
                                            duration:1000,
                                            repeat:0,
                                            ease:Phaser.Math.Easing.Circular.Out
                                        })
                                    }, 
                                    callbackScope:this
                                })
                            }, this)
                        }
                    }
                }
            });
    }

    update(time: number, delta: number): void {
        
    }

}