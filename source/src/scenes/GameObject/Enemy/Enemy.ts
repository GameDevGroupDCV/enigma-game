import GamePlay from "../../GamePlay";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy{
    private config:genericConfig;
    private _animations:animationConfig[] = [
        {sprite:"enemy", key:"idle", frames:[0], frameRate:13, yoyo:false, repeat:-1},
    ]
    private _body:Phaser.Physics.Arcade.Body;
    private _scene:GamePlay;

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initEnemy();
    }
    initEnemy(): void {
        this._scene = this.config.scene as GamePlay;
        this._scene.physics.world.enableBody(this);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this.setDepth(20);
        this.setTintFill(0xff0000, 0xff0000, 0xff0000, 0xff0000);
        this.createAnimation();
        this.setFrame(2)
    }

    updateEnemy(time:number, delta:number): void {
        
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
}

interface animationConfig{
    sprite:string, 
    key:string, 
    frames:number[],
    frameRate?:number, 
    yoyo?:boolean,
    repeat?:number
}