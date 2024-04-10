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

    private active1:boolean = false;
    private active2:boolean = false;
    private active3:boolean = false;
    private active4:boolean = false;
    private active5:boolean = false;

    private activeGem1:boolean = false;
    private activeGem2:boolean = false;
    private activeGem3:boolean = false;
    private activeGem4:boolean = false;
    private activeGem5:boolean = false;

    private gems:Array<gems>

    private mainCamera:Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super({
      key: "Enigma",
    });
  }


  create() {
    this.gems = [];
    console.log("Enigma");
    this.mainCamera = this.cameras.main;
  
    this.anims.create({
      key:"lever-anims",
      frames: this.anims.generateFrameNumbers("lever",{frames: [0,1,2,3,4,5]}),
      frameRate:10,
      yoyo: false,
      repeat:0
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
    
    this._gem1 = this.add.sprite((213.33*1), 100, 'gems', 13).setScale(1.45).setInteractive()
    this._gem2 = this.add.sprite((213.33*2), 200, 'gems', 13).setScale(1.45).setInteractive()
    this._gem3 = this.add.sprite((213.33*3), 300, 'gems', 13).setScale(1.45).setInteractive()
    this._gem4 = this.add.sprite((213.33*4), 200, 'gems', 13).setScale(1.45).setInteractive()
    this._gem5 = this.add.sprite((213.33*5), 100, 'gems', 13).setScale(1.45).setInteractive()

    this.gems[0] = {lever:this._lever1, gem:this._gem1, stateLever:false, stateGem:false}
    this.gems[1] = {lever:this._lever2, gem:this._gem2, stateLever:false, stateGem:false}
    this.gems[2] = {lever:this._lever3, gem:this._gem3, stateLever:false, stateGem:false}
    this.gems[3] = {lever:this._lever4, gem:this._gem4, stateLever:false, stateGem:false} 
    this.gems[4] = {lever:this._lever5, gem:this._gem5, stateLever:false, stateGem:false} 

    this.gems.forEach((gem:gems, index:number) =>{
      gem.gem.anims.play('gems-inactive');

      gem.lever.on("pointerdown", () =>{
        if(!gem.stateLever){
          gem.lever.anims.play('lever-anims');
          gem.stateLever = true;
        }
        else{
          gem.lever.anims.playReverse('lever-anims');
          gem.stateLever = false;
        }

        //leva 1
        if(gem.lever == this.gems[0].lever && gem.stateLever){
          if(this.gems[0].stateGem){
            this.gems[0].stateGem = false;
          }
          else{
            this.gems[0].stateGem = true;
          }
          if(this.gems[1].stateGem){
            this.gems[1].stateGem = false;
          }
          else{
            this.gems[1].stateGem = true;
          }
        }
        else if(gem.lever == this.gems[0].lever && !gem.stateLever){
          this.gems[0].stateGem = false;
          this.gems[1].stateGem = false;
        }
        //leva 2
        else if(gem.lever == this.gems[1].lever && gem.stateLever){
          if(this.gems[0].stateGem){
            this.gems[0].stateGem = false;
          }
          else{
            this.gems[0].stateGem = true;
          }

          if(this.gems[4].stateGem){
            this.gems[4].stateGem = false;
          }
          else{
            this.gems[4].stateGem = true;
          }

        }
        else if(gem.lever == this.gems[1].lever && !gem.stateLever){
          this.gems[0].stateGem = false;
          this.gems[4].stateGem = false;
        }

        //leva 3
        else if(gem.lever == this.gems[2].lever && gem.stateLever){
          if(this.gems[1].stateGem){
            this.gems[1].stateGem = false;
          }
          else{
            this.gems[1].stateGem = true;
          }

          if(this.gems[2].stateGem){
            this.gems[2].stateGem = false;
          }
          else{
            this.gems[2].stateGem = true;
          }
          
          if(this.gems[3].stateGem){
            this.gems[3].stateGem = false;
          }
          else{
            this.gems[3].stateGem = true;
          }
        }
        else if(gem.lever == this.gems[2].lever && !gem.stateLever){
          this.gems[1].stateGem = false;
          this.gems[2].stateGem = false;
          this.gems[3].stateGem = false;
        }
        //leva 4
        else if(gem.lever == this.gems[3].lever && gem.stateLever){
          if(this.gems[1].stateGem){
            this.gems[1].stateGem = false;
          }
          else{
            this.gems[1].stateGem = true;
          }

          if(this.gems[2].stateGem){
            this.gems[2].stateGem = true;
          }
          else{
            this.gems[2].stateGem = false;
          }
        }
        else if(gem.lever == this.gems[3].lever && !gem.stateLever){
          this.gems[1].stateGem = false;
          this.gems[2].stateGem = false;
        }

        //leva 5
        else if(gem.lever == this.gems[4].lever && gem.stateLever){
          if(this.gems[3].stateGem){
            this.gems[3].stateGem = false;
          }
          else{
            this.gems[3].stateGem = true;
          }

          if(this.gems[4].stateGem){
            this.gems[4].stateGem = false;
          }
          else{
            this.gems[4].stateGem = true;
          }
        }
        else if(gem.lever == this.gems[4].lever && !gem.stateLever){
          this.gems[3].stateGem = false;
          this.gems[4].stateGem = false;
        }
      },this)
    })

    
    
  }

  update(time: number, delta: number): void {
    this.gems.forEach((gem:gems)=>{
      if(gem.stateGem){
        gem.gem.anims.play('gems-active', true);
      }
      else{
        gem.gem.anims.play('gems-inactive', true);
      }
    })
  }

  


}
interface gems{
  lever:Phaser.GameObjects.Sprite,
  gem:Phaser.GameObjects.Sprite, 
  stateLever:boolean, 
  stateGem:boolean
}