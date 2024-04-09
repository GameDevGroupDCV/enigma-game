import { GameData } from "../GameData";
import GamePlay from "./GamePlay";

export default class Enigma extends Phaser.Scene {

    private _lever1:Phaser.GameObjects.Sprite;
    private _lever2:Phaser.GameObjects.Sprite;
    private _lever3:Phaser.GameObjects.Sprite;
    private _lever4:Phaser.GameObjects.Sprite;
    private _lever5:Phaser.GameObjects.Sprite;
    private _gem1:Phaser.GameObjects.Sprite;
    private _gem2:Phaser.GameObjects.Sprite;
    private _gem3:Phaser.GameObjects.Sprite;
    private _gem4:Phaser.GameObjects.Sprite;
    private _gem5:Phaser.GameObjects.Sprite;
  
    private mainCamera:Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super({
      key: "Enigma",
    });
  }


  create() {
    console.log("Enigma");
    this.mainCamera = this.cameras.main;
  
    this.anims.create({
      key:"lever-anims",
      frames: this.anims.generateFrameNumbers("lever",{frames: [0,1,2,3,4,5]}),
      frameRate:10,
      yoyo: false,
      repeat:-1
    })

    this.anims.create({
      key:"gems-active",
      frames: this.anims.generateFrameNumbers("gems",{frames: [6,5,4,3,2,1,0]}),
      frameRate:10,
      yoyo: false,
      repeat:-1
    })

    this.anims.create({
      key:"gems-inactive",
      frames: this.anims.generateFrameNumbers("gems",{frames: [13,12,11,10,9,8,7]}),
      frameRate:10,
      yoyo: false,
      repeat:-1
    })

    let _image:Phaser.GameObjects.Image = this.add.image(0, 0,"bgenigma").setOrigin(0,0);
    
    
      this._lever1 = this.add.sprite((213.33*1), 500, 'lever', 0).setScale(4.5).setInteractive();
      this._lever2 = this.add.sprite((213.33*2), 500, 'lever', 0).setScale(4.5).setInteractive();
      this._lever3 = this.add.sprite((213.33*3), 500, 'lever', 0).setScale(4.5).setInteractive();
      this._lever4 = this.add.sprite((213.33*4), 500, 'lever', 0).setScale(4.5).setInteractive();
      this._lever5 = this.add.sprite((213.33*5), 500, 'lever', 0).setScale(4.5).setInteractive();
      
      this._gem1 = this.add.sprite((213.33*1), 100, 'gems', 13).setScale(1.45).setInteractive();
      this._gem2 = this.add.sprite((213.33*2), 200, 'gems', 13).setScale(1.45).setInteractive();
      this._gem3 = this.add.sprite((213.33*3), 300, 'gems', 13).setScale(1.45).setInteractive();
      this._gem4 = this.add.sprite((213.33*4), 200, 'gems', 13).setScale(1.45).setInteractive();
      this._gem5 = this.add.sprite((213.33*5), 100, 'gems', 13).setScale(1.45).setInteractive();
    

    
    
  }



}
