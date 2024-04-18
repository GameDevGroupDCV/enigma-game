import { playerData } from "../GameData";
import Enemy from "./GameObject/Enemy/Enemy";
import Player from "./GameObject/Player/Player";

export default class Flashback extends Phaser.Scene{
    constructor(){
        super({key:'FlashBack'});
    }

    private map:Phaser.Tilemaps.Tilemap;
    private tileset:Phaser.Tilemaps.Tileset;
    private collisionLayer:Phaser.Tilemaps.TilemapLayer;
    private overlapLayer:Phaser.Tilemaps.TilemapLayer;
    private layerWorld:Phaser.Tilemaps.TilemapLayer;
    private backgroundLayer:Phaser.Tilemaps.TilemapLayer;
    private image:Phaser.GameObjects.Image;
    private bg:Phaser.GameObjects.TileSprite;

    private enemy:Enemy;
    private player:Player;
    private enemyGroup:Phaser.GameObjects.Group;
    private generateEnemy:boolean = false;

    private completeScene:boolean = false;
    create(){
        this.enemyGroup = this.add.group();

        this.bg = this.add.tileSprite(0,640,3500, 640,"bg-flash").setOrigin(0,1).setDepth(0);
        console.log("scena di flashback");
        this.createMap();
    
        
        this.player = new Player({scene:this, x:2688, y:224, key:'player', life:playerData.life, jump:playerData.jump});
        
        
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 50)

        this.physics.add.collider(this.player, this.collisionLayer, this.onCollision, null, this);

        this.physics.add.overlap(this.player, this.overlapLayer, this.onOverlap, null, this);
        
    }   

    update(time: number, delta: number): void {
        if(this.generateEnemy){
            this.enemyGroup.getChildren().forEach((element:Phaser.GameObjects.GameObject) => {
                this.time.addEvent({
                    delay:500, 
                    callback: () =>{
                        this.physics.moveTo(element, this.player.x, 224, 150);
                    },
                    callbackScope: this
                })
                var enemy:Enemy = element as Enemy;
                enemy.updateEnemy(time, delta);
            }, this);
        }
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
        this.overlapLayer = this.map.createLayer("overlap", this.tileset, 0,0).setDepth(2).setAlpha(0);

        this.overlapLayer.setCollisionByProperty({collide:true});
        this.collisionLayer.setCollisionByProperty({collide:true});

    }

    onCollision(player:any, tile:any):void{
        if(tile.properties.interaction == true){
            console.log("interaction true");
            this.player.anims.play('ledge', true);
            this.player.setGrab(true);
            this.player.setPosition(tile.pixelX + 35, tile.pixelY + 30);
            this.player.setGravity(false);
            tile.properties.interaction = false;
            this.time.addEvent({
                delay:2000,
                callback: ()=>{
                    this.cameras.main.shake(100);
                    this.player.setGrab(false);
                    this.player.setGravity(true);
                    this.completeScene = true;
                }
            })
        }

        if(tile.properties.death == true){
            if(this.completeScene){
                this.events.emit("flashbackEvent", ['afterFlashBack'])
                this.scene.stop();
                this.scene.resume('GamePlay');
            }
            else{
                this.scene.restart();
            }
        }
    }
    onOverlap(player:any, tile:any):void{
        if(tile.properties.enemy==true){
            console.log("overlap");
            for(let i = 0; i<3; i++){
                var enemy:Enemy = new Enemy({scene:this, x:2600+(32*i), y:224, key:'enemy'});
                this.enemyGroup.add(enemy);
                enemy.anims.play('init');
            }
            this.physics.add.collider(this.enemyGroup, this.collisionLayer);
            this.physics.add.collider(this.enemyGroup, this.enemyGroup);
            this.physics.add.collider(this.player, this.enemyGroup);
            this.generateEnemy = true;
            tile.properties.enemy = false;
            this.events.emit('flashbackEvent', ['escape'])
        }
    }
}