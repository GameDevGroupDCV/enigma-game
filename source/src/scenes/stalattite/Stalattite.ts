import IStalattite from "./IStalattite";

export default class Stalattite extends Phaser.GameObjects.Sprite implements IStalattite{
    private config:genericConfig;
    private _body:Phaser.Physics.Arcade.Body;

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this.config = params;
        this.initStalattite();
    }

    initStalattite(): void {
        this.setScale(0.1);
        this.setDepth(11);
        this.config.scene.add.existing(this);
        this.config.scene.physics.world.enableBody(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setAllowGravity(false); 

    }
    updateStalattite(time: number, delta: number): void {
        
    }

    setGravity(){
        this._body.setAllowGravity(true);
    }
}