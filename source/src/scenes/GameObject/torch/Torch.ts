import ITorch from "./ITorch";

export default class Torch extends Phaser.GameObjects.Sprite implements ITorch{
    private config:genericConfig;
    private _animations:animationConfig[] = [
        {sprite:"player-idle", key:"idle", frames:[0,1,2,3,4,5,6,7,8,9,10,11], frameRate:13, yoyo:false, repeat:-1},
        
    ]

    constructor(params:genericConfig){
        super(params.scene,params.x, params.y, params.key);
        this.config = params;
        this.initTorch();
    }

    initTorch(): void {
        
    }

    updateTorch(time:number, delta:number): void {
        
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