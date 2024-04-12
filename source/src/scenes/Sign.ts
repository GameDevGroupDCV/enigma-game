import GamePlay from "./GamePlay";

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
    this.text = this.add.text(325,250,"ciao", {fontFamily:"enigmaFont"}).setFontSize(70).setColor('black');

    if(this.registry.get('sign') == 1){
      this.text.setText("Scopri il meccanismo \nper attivare la luce nascosta");
    }
    if(this.registry.get('sign') == 2){
      this.text.setText("Che ci fa qui uno zaino?");
    }
    if(this.registry.get('sign') == 3){
      this.text.setText("Lasciate ogni speranza \no voi che entrate");
    }

  }

}
