import { playerData } from "../../../GameData";
import GamePlay from "../../GamePlay";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer{
    private config:playerConfig;
    private _animations:animationConfig[] = [
        {sprite:"player-idle", key:"idle", frames:[0,1,2,3,4,5,6,7,8,9,10,11], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-jump", key:"jump", frames:[0], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-landing", key:"landing", frames:[0], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-run", key:"run", frames:[0,1,2,3,4,5,6,7], frameRate:13, yoyo:false, repeat:-1}, 
        {sprite:"player-ledge", key:"ledge", frames:[0,1,2,3,4,5], frameRate:13, yoyo:false, repeat:-1}
    ]
    private dialog:boolean = false;
    private _body: Phaser.Physics.Arcade.Body;
    private _scene:GamePlay;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private audio:Phaser.Sound.WebAudioSound;
    private grab:boolean = false;
    private jump:number;
    private life:number;
    
    constructor(params:playerConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initPlayer();
        
    }

    getlife():number{
        return this.life;
    }

    getfloor():boolean{
        return this._body.onFloor();
    }

    initPlayer(){
        this.life = this.config.life;
        this.jump = this.config.jump;
        console.log("player" + this.life);

        this._scene = <GamePlay>this.config.scene;
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._scene.physics.world.enableBody(this);
        this.setDepth(9);
        this.createAnimation();
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        
        this.audio = this._scene.sound.addAudioSprite('sfx', {rate:1.5}) as Phaser.Sound.WebAudioSound;
    }

    run():void{
        this.anims.play('run',true);
        if(!this.audio.isPlaying){
            this.audio.play('Camminata_Del_Player',{loop:false,volume:2});
        }
    }

    getVelocity():number{
        return this._body.velocity.y;
    }

    updatePlayer(time: number, delta: number): void {
        if(!this.dialog){
            if(!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown && !this.grab){
                this._body.setVelocityX(0);
                if(this._body.onFloor()){this.anims.play('idle', true);}
            }
            if (this._cursors.left.isDown && !this.grab) {
                this.setFlipX(true);
                if(this._body.onFloor()){this.run();}
                this._body.setVelocityX(-200);
            }
            if (this._cursors.right.isDown && !this.grab) {
                this.setFlipX(false);
                if(this._body.onFloor()){this.run();}
                this._body.setVelocityX(200);
            }
            if (this._cursors.up.isDown && this._body.onFloor() && !this.grab) {
                this.anims.play('jump', true);
                this._scene.sound.playAudioSprite("sfx","Salto",{loop:false,volume: 1});
                console.log(this.jump);
                this._body.setVelocityY(this.jump);
            }
            if(this._body.velocity.y > 0 && !this.grab){
                this.anims.play('landing', true);
            }
        }
        else{
            this._body.setVelocityX(0);
            this._body.setVelocityY(0);
            this.anims.play('idle', true);
        }

        if(playerData.jump != this.jump){
            this.jump = playerData.jump;
        }

        

    }


    createAnimation(){
        this._animations.forEach(animation => {
            if(!this.config.scene.anims.exists(animation.key)){
                let _animation:Phaser.Types.Animations.Animation = {
                    key:animation.key,
                    frames:this.anims.generateFrameNumbers(animation.sprite, {frames:animation.frames}),
                    frameRate:animation.frameRate,
                    yoyo:animation.yoyo,
                    repeat:animation.repeat
                };
                this.config.scene.anims.create(_animation);
            }
        })
    }

    decreaseLife():boolean{
        playerData.life--;
        this.setLife();
        console.log(this.life);
        if(this.life == 0){
            return true;
        }
        else{
            return false;
        }

    }

    setDialog(value:boolean):void{
        this.dialog = value;
    }

    setGravity(value:boolean){
        this._body.setAllowGravity(value);
        this._body.setVelocity(0,0);
        console.log(this._body.allowGravity + "" + this._body.velocity.x + " " + this._body.velocity.y);
    }

    setGrab(value:boolean){
        this.grab = value;
    }

    /*
    setJump(value:number):void{
        playerData.jump = value;
        this.jump = playerData.jump;

    */

    setLife():void{
        this.life = playerData.life;
    }
    
} 

interface animationConfig{
    sprite:string, 
    key:string, 
    frames:number[],
    frameRate?:number, 
    yoyo?:boolean,
    repeat?:number
}