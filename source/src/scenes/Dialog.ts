import { param } from "jquery";
import { playerData } from "../GameData";
import GamePlay from "./GamePlay";
import Player from "./GameObject/Player/Player";
import LockZaino from "./lockZaino";
import Flashback from "./FlashBack";
import bossRoom from "./bossRoom";
import Boss from "./GameObject/Boss/Boss";
export default class Dialogs extends Phaser.Scene {
  private text: Phaser.GameObjects.Text;
  private text_continue: Phaser.GameObjects.Text;
  private GamePlay:GamePlay;
  private FlashBack:Flashback;
  private BossRoom:bossRoom;

  private messages:dialogMessages = {
    gameplay:{
      intro:["*Urgh...* che botta alla testa.","D-dove mi trovo? \n Come ci sono finito qui?", "Devo trovare un modo per tornare in superficie!"],
      bag:["Che ci fa qui' uno zaino?","Meglio vedere cosa c'e' dentro, potrebbe contenere qualcosa di utile!"],
      boss:["Che porta strana...", "Ma e' l'unica zona che non ho ancora esplorato", "Chissa' cosa voleva dire quella scritta sul cartello..."],
      
    },
    bagScene:{
      bag:["Sembra esserci una password...", "Devo trovare la soluzione all'enigma", "Adesso ricordo tutto....."]
    },
    FlashBackScene:{
      afterFlashBack:["Mi stavano seguendo quegli esseri bizzarri apparsi dal nulla...", "Si! Dopo aver preso l'anello dal tempio!", "E mentre cercavo di fuggire, sono caduto in questa caverna..."],      
      escape:["Devo trovare un modo per seminarli!"]
    }, 
    BossScene:{
      collana:["Da dove sbuca questa collana?", "La gemma incastonata sembra abbia dei poteri, \nproprio come quella dell'anello."]
    }


  }
  private life_image:Phaser.GameObjects.Image;
  private shield_image1 :Phaser.GameObjects.Image;
  private shield_image2 :Phaser.GameObjects.Image;

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
    this.graphics();
    console.log("scena di dialog");
    this.GamePlay = <GamePlay>this.scene.get('GamePlay');
    this.FlashBack = <Flashback>this.scene.get('FlashBack');
    this.BossRoom = <bossRoom>this.scene.get('bossRoom');

    this.bg_image = this.add.image(0,this.game.canvas.height - 150,"layer").setVisible(false).setOrigin(0,0).setInteractive();;
    this.inventory_image = this.add.image(390, 240, 'inventory').setVisible(false).setOrigin(0,0);
    
    this.text = this.add.text(30, this.game.canvas.height - 125, " ", {fontFamily:'alagard'}).setTint(0x000000).setOrigin(0,0).setFontSize(40);
    this.text_continue = this.add.text(1050, 600, "clicca per continuare", {fontFamily:'alagard'}).setTint(0x000000).setFontSize(20).setVisible(false);
    this.text.setWordWrapWidth(1060);


    this.GamePlay.events.off('onText', this.onText, this);
    this.GamePlay.events.on('onText', this.onText, this);

    this.GamePlay.events.off('textZaino', this.textZaino, this); //dialogo per lo zaino nella scena di zaino
    this.GamePlay.events.on('textZaino', this.textZaino, this);

    this.GamePlay.events.off('inventoryBag', this.inventoryBag, this);
    this.GamePlay.events.on('inventoryBag', this.inventoryBag, this);

    this.FlashBack.events.off('flashbackEvent', this.FlashBackScene, this);
    this.FlashBack.events.on('flashbackEvent', this.FlashBackScene, this);

    this.BossRoom.events.off('collanaEvent', this.collanaDialog, this);
    this.BossRoom.events.on('collanaEvent', this.collanaDialog, this);
    
    this.life_image = this.add.image(1200, 30, 'life').setScale(2.5);
    for(let i:number=0; i<3; i++){
    this.shield_image1 = this.add.image(1225 ,30, 'shield').setScale(2.5).setVisible(false);
    this.shield_image2 = this.add.image(1250,30, 'shield').setScale(2.5).setVisible(false);
  }
    if(playerData.life == 3){
      this.shield_image1.setVisible(true);
      this.shield_image2.setVisible(true);
    }
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

  onText(parameters:Array<string>):void{
      if(parameters[0] == 'intro'){
        this.bg_image.off('pointerdown', null, this);
        this.GamePlay.playerBlock();
        this.bg_image.setVisible(true);
        this.text.setAlpha(1);
        this.text.setText(this.messages.gameplay.intro[0]);
        this.time.addEvent({
          delay:2000,
          callback: ()=>{
            this.text.setText(this.messages.gameplay.intro[1]);
          },
          callbackScope:this
        })
        this.time.addEvent({
          delay:2500, 
          callback: ()=>{
            this.text.setText(this.messages.gameplay.intro[1]);
            this.text_continue.setVisible(true);
            this.bg_image.on('pointerdown', () =>{
              this.GamePlay.playerUnBLock();
              this.text.setAlpha(0);
              this.bg_image.setVisible(false);
              this.text_continue.setVisible(false);
            })
          },
          callbackScope:this
        })
      }

      else if(parameters[0] == 'bag'){
        this.bg_image.off('pointerdown', null, this);
        this.GamePlay.playerBlock();
        this.bg_image.setVisible(true);
        this.text.setAlpha(1);
        this.text.setText(this.messages.gameplay.bag[0]);

        this.time.addEvent({
          delay:2500,
          callback: ()=>{
            this.text.setText(this.messages.gameplay.bag[1]);
            this.text_continue.setVisible(true);
            this.bg_image.on('pointerdown', () =>{
              this.GamePlay.playerUnBLock();
              this.text.setAlpha(0);
              this.bg_image.setVisible(false);
              this.text_continue.setVisible(false);
            })
          }
        })
      }
      
      else if(parameters[0] == 'boss'){
        this.bg_image.off('pointerdown', null, this);
        this.GamePlay.playerBlock();
        this.bg_image.setVisible(true);
        this.text.setAlpha(1);
        this.text.setText(this.messages.gameplay.boss[0]);
        this.time.addEvent({
          delay:2500,
          callback: ()=>{
            this.text.setText(this.messages.gameplay.boss[1]);
            this.time.addEvent({
              delay:2500,
              callback: ()=>{
                this.text.setText(this.messages.gameplay.boss[2]);
            this.text_continue.setVisible(true);
            this.bg_image.on('pointerdown', () =>{
              this.GamePlay.playerUnBLock();
              this.text.setAlpha(0);
              this.bg_image.setVisible(false);
              this.text_continue.setVisible(false);
            }) 
          }
        })
      }
    })
    }
  }

  textZaino():void{
    this.bg_image.setVisible(true);
    this.text.setText(this.messages.bagScene.bag[0]);
    this.text.setAlpha(1);
    this.time.addEvent({
      delay:2500,
      callback: ()=>{
        this.text.setText(this.messages.bagScene.bag[1]);
        this.text_continue.setVisible(true);
        this.bg_image.on('pointerdown', () =>{
          this.text.setAlpha(0);
          this.bg_image.setVisible(false);
          this.text_continue.setVisible(false);
        })
      }
    })
  }
  

  FlashBackScene(parameters:string[]):void{

    if(parameters[0] == "afterFlashBack"){
      console.log("evento flashback dialogo afterFlashBack")
      this.bg_image.off('pointerdown', null, this);
      this.GamePlay.playerBlock();
      this.bg_image.setVisible(true);
      this.text.setAlpha(1);
      this.text.setText(this.messages.FlashBackScene.afterFlashBack[0]);
      this.time.addEvent({
      delay:2500,
      callback: ()=>{
      this.text.setText(this.messages.FlashBackScene.afterFlashBack[1]);
      this.time.addEvent({
      delay:2500,
      callback: ()=>{
        this.text.setText(this.messages.FlashBackScene.afterFlashBack[2]);
          this.text_continue.setVisible(true);
          this.bg_image.on('pointerdown', () =>{
            this.GamePlay.playerUnBLock();
            this.text.setAlpha(0);
            this.bg_image.setVisible(false);
            this.text_continue.setVisible(false);
          })
      }
      })
      }
      })
    }
    
    else if(parameters[0] == 'escape'){
      console.log("evento flashback, dialogo di escape")
      this.bg_image.setVisible(true);
      this.text.setAlpha(1);
      console.log("metto l'alpha");
      console.log(this.messages.FlashBackScene.escape[0])
      this.text.setText(this.messages.FlashBackScene.escape[0]);
      console.log("cambio il testo");
      this.time.addEvent({
        delay:1500,
        callback: ()=>{
          this.text.setText("");
          this.text.setAlpha(0);
          this.bg_image.setVisible(false);
          this.text_continue.setVisible(false);
        },
        callbackScope:this
      })
    }
    
  }

  inventoryBag():void{
    console.log("sono nella funzione inventory bag");
    this.inventory_image.setVisible(true);
    this.diario = this.add.image(480, 260, 'diario').setOrigin(0,0).setInteractive();
    this.ring = this.add.image(700, 300, 'ring').setOrigin(0,0).setScale(2).setInteractive();

    this.diario.on('pointerdown', () =>{
      if(playerData.life == 3){
      this.diario.destroy();
      this.GamePlay.playerBlock();
      this.bg_image.setVisible(true);
      this.text.setAlpha(1);
      this.text.setText(this.messages.bagScene.bag[2]);

      this.time.addEvent({
        delay:2500, 
        callback: () =>{
          this.GamePlay.playerUnBLock();
          this.text.setAlpha(0);

          this.bg_image.setVisible(false);
          this.text_continue.setVisible(false);
          this.inventory_image.setVisible(false);
          this.diario.setVisible(false);
          this.ring.setVisible(false)

          this.scene.pause('GamePlay');
          this.scene.start('FlashBack');
          this.scene.restart();
      },
        callbackScope:this,
      })
      }
    })
    this.ring.on('pointerdown', () =>{ 
      playerData.life = 3;
      this.ring.destroy();
    })
  }

  collanaDialog():void{
    this.bg_image.off('pointerdown', null, this);
    this.bg_image.setVisible(true);
    this.text.setText(this.messages.BossScene.collana[0]);
    this.text.setAlpha(1);
    this.time.addEvent({
      delay:2500,
      callback: ()=>{
        this.text.setText(this.messages.BossScene.collana[1]);
        this.text_continue.setVisible(true);
        this.bg_image.on('pointerdown', () =>{
          this.text.setAlpha(0);
          this.bg_image.setVisible(false);
          this.text_continue.setVisible(false);
        })
      }
    })
  }
}

interface dialogMessages{
  gameplay?:{
    intro:string[];
    bag:string[];
    boss:string[];
  }
  boss?:{
    bossFight:number;
  }
  bagScene?:{
    bag:string[]
  },
  FlashBackScene?:{
    afterFlashBack:string[];
    escape:string[];
  }
  BossScene?:{
    collana:string[];
  }
  
}