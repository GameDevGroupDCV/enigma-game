import GamePlay from "../../GamePlay";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy{
    private config:genericConfig;
    private _animations:animationConfig[] = [
        {sprite:"enemy", key:"idle-enemy", frames:[0,1,2,3,4,5,6,7], frameRate:13, yoyo:false, repeat:-1},
        {sprite:"enemy", key:"walk-enemy", frames:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41, 42], frameRate:10, yoyo:false, repeat:-1}
    ]
    private _body:Phaser.Physics.Arcade.Body;
    private _scene:GamePlay;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private dialog:boolean = false;
    
    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initEnemy();
    }
    initEnemy(): void {
        this._scene = <GamePlay>this.config.scene;
        this._scene.add.existing(this);
        this._scene.physics.world.enableBody(this);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this.setDepth(10);
        this.createAnimation();
        this.setFrame(2)
        this.setScale(2);
        this._body.setSize(15,15, true);
        this.anims.play('idle-enemy');
        this._cursors = this._scene.input.keyboard.createCursorKeys();
    }

    updateEnemy(time:number, delta:number): void {
        if(!this.dialog){
            if(this._body.velocity.x < 0){
                this.setFlipX(false);
                this.anims.play('walk-enemy', true);
            }
            else if(this._body.velocity.x > 0){
                this.setFlipX(true);
                this.anims.play('walk', true)
            }
            else if(this._body.velocity.x == 0){
                this.anims.play('idle-enemy', true);
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

    setDialog(value:boolean):void{
        this.dialog = value;
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