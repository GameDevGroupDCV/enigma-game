import Enemy from "./GameObject/Enemy/Enemy";

export default class Flashback extends Phaser.Scene{
    constructor(){
        super({key:'FlashBack'});
    }

    private map:Phaser.Tilemaps.Tilemap;
    private tileset:Phaser.Tilemaps.Tileset;
    private collisionLayer:Phaser.Tilemaps.TilemapLayer;
    private layerWorld:Phaser.Tilemaps.TilemapLayer;
    private backgroundLayer:Phaser.Tilemaps.TilemapLayer;
    private image:Phaser.GameObjects.Image;

    private enemy:Enemy;

    create(){
        console.log("scena di flashback");
        this.createMap();
        this.enemy = new Enemy({scene:this, x:300, y:300, key:'enemy'})
        this.physics.add.collider(this.enemy, this.collisionLayer);
        this.cameras.main.startFollow(this.enemy)
    }   

    update(time: number, delta: number): void {
        
    }

    createMap() :void {
        if(this.map != null){this.map.destroy};
    this.map = this.make.tilemap({key:"flashback"});
    this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

    this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.tileset = this.map.addTilesetImage('jungle');

    this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
        .setDepth(2).setAlpha(0);

    this.layerWorld = this.map.createLayer("world", this.tileset, 0,0).setDepth(2).setAlpha(9);
    
    this.backgroundLayer = this.map.createLayer("background", this.tileset, 0,0).setDepth(0);


    this.collisionLayer.setCollisionByProperty({collide:true});

    }
}