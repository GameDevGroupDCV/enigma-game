import GamePlay from "../../GamePlay";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer{
    private config:playerConfig;
    private _animations:animationConfig[] = [
        {sprite:"player-idle", key:"idle", frames:[0,1,2,3,4,5,6,7,8,9,10,11], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-jump", key:"jump", frames:[0], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-landing", key:"landing", frames:[0], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"player-run", key:"run", frames:[0,1,2,3,4,5,6,7], frameRate:13, yoyo:false, repeat:-1}
    ]
    
    private _body: Phaser.Physics.Arcade.Body;
    private _scene:GamePlay;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private life:number = 1;
    private audio:Phaser.Sound.WebAudioSound;
    constructor(params:playerConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initPlayer();
        
    }

    initPlayer(){
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
        var traccia:Phaser.Sound.BaseSound[];
        this.anims.play('run',true);
        if(!this.audio.isPlaying){
            this.audio.play('Camminata_Del_Player_2');
        }
    }

    updatePlayer(time: number, delta: number): void {

        if(!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown){
            this._body.setVelocityX(0);
            if(this._body.onFloor()){this.anims.play('idle', true);}
        }
        if (this._cursors.left.isDown) {
            this.setFlipX(true);
            if(this._body.onFloor()){this.run();}
            this._body.setVelocityX(-200);
        }
        if (this._cursors.right.isDown) {
            this.setFlipX(false);
            if(this._body.onFloor()){this.run();}
            this._body.setVelocityX(200);
            this.run();
        }
        if (this._cursors.up.isDown && this._body.onFloor()) {
            this.anims.play('jump', true);
            this._scene.sound.playAudioSprite("sfx","Salto",{loop:false,volume: 5});
            this._body.setVelocityY(-520);
        }
        if(this._body.velocity.y > 0){
            this.anims.play('landing', true);
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
        this.life--;
        if(this.life == 0){
            return true;
        }
        else{
            return false;
        }

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