import GamePlay from "./GamePlay";
export default class Dialogs extends Phaser.Scene {
  private textbox: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private messageIndex: number = 0;
  private messages: string[] = ['come ci sono finito qui?', 'This is the second message.', 'This is the third message.'];;
  private GamePlay:GamePlay
  
  constructor(config: any) {
      super({
          key: "Dialog",
      });
  }


  create() {
    console.log("scena di dialog");
    this.GamePlay = <GamePlay>this.scene.get('GamePlay');

    this.textbox = this.add.graphics();
    this.textbox.setInteractive();
  
    this.textbox.fillStyle(0xffffff, 0.6);
    this.textbox.fillRect(this.game.canvas.width / 2 - 540, this.game.canvas.height - 250, 1080, 300);
    this.textbox.setVisible(false);
    this.text = this.add.text(this.game.canvas.width / 2 - 530, this.game.canvas.height - 240, '', {fontFamily:'arald'}).setTint(0x000000).setInteractive();
    this.text.setWordWrapWidth(1060);

    this.GamePlay.events.off('onText', this.onText, this);
    this.GamePlay.events.on('onText', this.onText, this);
  }

    update() {
    }

    onText():void{
        console.log("emit");
        this.textbox.setVisible(true);
        this.text.setAlpha(1);
        this.text.setText(this.messages[this.messageIndex]);
        
        this.text.on('pointerdown', ()=>{
            console.log("ok");
            this.text.setText('');
            this.text.setAlpha(0);
            this.textbox.setVisible(false);
            this.messageIndex++;
        }).setInteractive;
    }
  }