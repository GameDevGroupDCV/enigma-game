import { param } from "jquery";
import IBoss from "./IBoss";

export default class Boss extends Phaser.GameObjects.Sprite implements IBoss{
    private config:genericConfig;
    private _body:Phaser.Physics.Arcade.Body;
    public walking:boolean = true;
    private life = 3;

    private _animations:animationConfig[] = [
        {sprite:"golem-attack", key:"golem-attack", frames:[0,1,2,3,4,5,6,7,8,9,10], frameRate:13, yoyo:false, repeat:0},
        {sprite:"golem-die", key:"golem-die", frames:[0,1,2,3,4,5,6,7,8,9,10,11,12], frameRate:13, yoyo:false, repeat:0},
        {sprite:"golem-hurt", key:"golem-hurt", frames:[0,1,2,3], frameRate:13, yoyo:false, repeat:0},
        {sprite:"golem-idle", key:"golem-idle", frames:[0,1,2,3,4,5,6,7], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"golem-walk", key:"golem-walk", frames:[0,1,2,3,4,5,6,7,8,9], frameRate:13, yoyo:false, repeat:-1},
    ]

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initBoss();
        
    }
    initBoss(): void {
        this.config.scene.add.existing(this);
        this.config.scene.physics.world.enableBody(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(true);
        this.setScale(2.8);
        this._body.setSize(45,40);
        this._body.setOffset(25,25);
        this.createAnimation();

        this.anims.play('golem-idle');
        
        
    }
    updateBoss(time: number, delta: number): void {
        if(this.walking){
            if(this._body.velocity.x < 0){
                this.setFlipX(true);
                 this.anims.play('golem-walk', true);
            }
            else if(this.body.velocity.x > 0){
                this.setFlipX(false);
                this.anims.play('golem-walk', true);   
            }
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
    