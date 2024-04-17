import Enemy from "./GameObject/Enemy/Enemy";
import Player from "./GameObject/Player/Player";

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
    private bg:Phaser.GameObjects.TileSprite;
    private enemy:Enemy;
    private player:Player;

    create(){
        this.bg = this.add.tileSprite(0,640,3500, 640,"bg-flash").setOrigin(0,1).setDepth(0);
        console.log("scena di flashback");
        this.createMap();
        //this.enemy = new Enemy({scene:this, x:2688, y:600, key:'enemy'})
        this.player = new Player({scene:this, x:2688, y:224, key:'player', life:3});
        this.physics.add.collider(this.player, this.collisionLayer);
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 50)
        
    }   

    update(time: number, delta: number): void {
        //this.enemy.updateEnemy(time, delta);
        this.player.updatePlayer(time, delta);
    }

    createMap() :void {
        if(this.map != null){this.map.destroy};
        this.map = this.make.tilemap({key:"flashback"});
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage('jungle');

        this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
            .setDepth(2).setAlpha(0);

        this.layerWorld = this.map.createLayer("world", this.tileset, 0,0).setDepth(9).setAlpha(1);
        
        this.backgroundLayer = this.map.createLayer("background", this.tileset, 0,0).setDepth(0);


        this.collisionLayer.setCollisionByProperty({collide:true});

    }
}