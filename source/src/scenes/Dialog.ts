import { param } from "jquery";
import GamePlay from "./GamePlay";
import Player from "./GameObject/Player/Player";
import LockZaino from "./lockZaino";
export default class Dialogs extends Phaser.Scene {
  private text: Phaser.GameObjects.Text;
  private text_continue: Phaser.GameObjects.Text;
  private GamePlay:GamePlay;
  private messageGamePlayIndex: number
  
  private messagesGamePlay: string[] = ["*urgh... dove mi trovo?",
    'Devo trovare un modo per uscire da qui', 
    'Che ci fa quì uno zaino?',
    "meglio vedere che c'è dentro potrebbe contenere qualcosa di utile",
    "Che porta strana!", 
    "e' l'unico posto dove posso andare"
  ];

  private messageflashback:string[] = [];
  private messageflashbackIndex: number = 0;

  private messageLockZaino:string[] = ["Sembra esserci una password, devo trovare la soluzione all'enigma"];
  
  private bg_image:Phaser.GameObjects.Image;
  private inventory_image:Phaser.GameObjects.Image;
  
  private diario:Phaser.GameObjects.Image;
  private ring:Phaser.GameObjects.Image;

  constructor(config: any) {
      super({
          key: "Dialog",
      });
  }

  preloader(){
  }

  create() {
    this.messageGamePlayIndex = 0;
    
    this.graphics();
    console.log("scena di dialog");
    this.GamePlay = <GamePlay>this.scene.get('GamePlay');

    this.bg_image = this.add.image(0,this.game.canvas.height - 150,"layer").setVisible(false).setOrigin(0,0);
    this.inventory_image = this.add.image(390, 240, 'inventory').setVisible(false).setOrigin(0,0);
    
    this.text = this.add.text(30, this.game.canvas.height - 100, '', {fontFamily:'alagard'}).setTint(0x000000).setInteractive().setOrigin(0,0).setFontSize(40);
    this.text_continue = this.add.text(1050, 600, "clicca per continuare", {fontFamily:'alagard'}).setTint(0x000000).setFontSize(20).setVisible(false);
    this.text.setWordWrapWidth(1060);


    this.GamePlay.events.off('onText', this.onText, this);
    this.GamePlay.events.on('onText', this.onText, this);

    this.GamePlay.events.off('textZaino', this.textZaino, this); //dialogo per lo zaino nella scena di zaino
    this.GamePlay.events.on('textZaino', this.textZaino, this);

    this.GamePlay.events.off('inventoryBag', this.inventoryBag, this);

    this.GamePlay.events.on('inventoryBag', this.inventoryBag, this);

  }

  update(time:number,delta:number) {

  }

  graphics():void{
    let _graphics:Phaser.GameObjects.Graphics = this.add.graphics();
    _graphics.fillStyle(0xffffff, .7)//imposto colore e opacità
    _graphics.fillRoundedRect(0,0,1280,150);
    _graphics.generateTexture("layer", 1280,150);
    _graphics.destroy();

    let _graphics2:Phaser.GameObjects.Graphics = this.add.graphics();
    _graphics2.fillStyle(0xffffff, .5)//imposto colore e opacità
    _graphics2.fillRoundedRect(0,0,500,150,20);
    _graphics2.generateTexture("inventory", 500,150);
    _graphics2.destroy();
  }

  onText():void{
      console.log("emit");
      this.GamePlay.playerBlock();
      this.bg_image.setVisible(true);
      this.text.setAlpha(1);
      this.text.setText(this.messagesGamePlay[this.messageGamePlayIndex]);
      this.time.addEvent({
        delay:1500,
        callback: () =>{
          this.messageGamePlayIndex++;
          this.text.setText(this.messagesGamePlay[this.messageGamePlayIndex]);
          this.bg_image.setInteractive();
          this.text_continue.setVisible(true);
        }
      })
      this.bg_image.on('pointerdown', ()=>{
          this.GamePlay.playerUnBLock();
          console.log("ok");
          this.text.setText('');
          this.text.setAlpha(0);
          this.bg_image.setVisible(false);
          this.text_continue.setVisible(false);
          this.messageGamePlayIndex++;
      });
  }

  textZaino():void{
    this.bg_image.setVisible(true);
    this.text.setText(this.messageLockZaino[0]);
    this.text.setAlpha(1);
    this.bg_image.on('pointerdown', () =>{
      this.text.setText('');
      this.text.setAlpha(0);
      this.bg_image.setVisible(false);
      this.text_continue.setVisible(false);
    });
  }

  inventoryBag():void{
    console.log("sono nella funzione inventory bag");
    this.inventory_image.setVisible(true);
    this.diario = this.add.image(480, 260, 'diario').setOrigin(0,0).setInteractive();
    this.ring = this.add.image(700, 300, 'ring').setOrigin(0,0).setScale(2);

    this.diario.on('pointerdown', () =>{
      this.inventory_image.setVisible(false);
      this.diario.setVisible(false);
      this.ring.setVisible(false)
      this.scene.pause('GamePlay');
      this.scene.start('FlashBack');
      this.scene.bringToTop('FlashBack');
    }, this)
  }
}