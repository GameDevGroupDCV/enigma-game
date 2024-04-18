import GamePlay from "./GamePlay";
import { GameData } from "../GameData";
export default class Sign extends Phaser.Scene {

  constructor() {
    super({
      key: "Sign",
    });
  }

  private bg:Phaser.GameObjects.Image;
  private text:Phaser.GameObjects.Text;
  private gameplay:GamePlay;

  create() {
    this.gameplay = <GamePlay> this.scene.get("GamePlay");
    this.bg = this.add.image(0,0, 'bg-wood').setScale(3).setInteractive();
    this.bg.on('pointerdown', ()=>{
      this.scene.stop();
      this.scene.resume('GamePlay');
    })
    this.text = this.add.text(GameData.globals.gameWidth/2,GameData.globals.gameHeight/2,"", {fontFamily:"alagard"}).setFontSize(56).setColor('black').setOrigin(0.5,0.5);

    if(this.registry.get('sign') == 1){
      this.text.setText("Nel silenzio oscuro, un segreto attende, \na sinistra del sentiero, dove l'ombra si estende. \nRisolvi il mistero, e la luce sorgera', \nla caverna risplendera' e la via si aprira'.");
    }

    if(this.registry.get('sign') == 3){
      this.text.setText("Nella grotta oscura, il golem s'aggira,\ncon l'astuzia come spada, la vittoria \nsi mira tra rocce appuntite e buio profondo, \nl'ingegno e' l'arma che tiene il mondo");
    }

  }

}
