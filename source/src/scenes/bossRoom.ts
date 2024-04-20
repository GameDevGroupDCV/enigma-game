import { GameData } from "../GameData";
import { playerData } from "../GameData";
import Boss from "./GameObject/Boss/Boss";
import Player from "./GameObject/Player/Player";
import Stalattite from "./stalattite/Stalattite";

export default class bossRoom extends Phaser.Scene{

    constructor(){
        super({key:'bossRoom'});
    }

    private map:Phaser.Tilemaps.Tilemap;
    private collisionLayer:Phaser.Tilemaps.TilemapLayer;
    private worldLayer:Phaser.Tilemaps.TilemapLayer;
    private backgroundLayer:Phaser.Tilemaps.TilemapLayer;
    private layerObject:Phaser.Tilemaps.ObjectLayer;
    private tileset:Phaser.Tilemaps.Tileset;
    private golem:Boss;
    private player:Player;
    private stalattiti:Phaser.GameObjects.Group;
    private attackBoolean:boolean = true;
    private bossDefeated:boolean = false;
    private bg:Phaser.GameObjects.TileSprite;
    private collana :Phaser.GameObjects.Sprite;
    private bodyCollana:Phaser.Physics.Arcade.Body;
    private collisionGolem:boolean;
    create(){
        this.collisionGolem = false;
        this.bg = this.add.tileSprite(0,180,2272, GameData.globals.gameHeight, 'bg1').setDepth(1).setOrigin(0,0);
        
        this.stalattiti = this.add.group();

        this.createMap();
        this.setupObject();
        this.golem = new Boss({scene: this, x: 1120, y:730, key:'golem'}).setDepth(11);
        this.player = new Player({scene:this, x:100, y:730, key:'player-idle', life:playerData.life, jump:playerData.jump}).setScale(1.8).setDepth(11);
        this.collana = this.add.sprite(0,0,"collana").setDepth(11).setAlpha(0).setInteractive();

        this.physics.world.enableBody(this.collana);
        this.bodyCollana = this.collana.body as Phaser.Physics.Arcade.Body;
        this.bodyCollana.setAllowGravity(false);
        this.bodyCollana.setImmovable(true);

        this.cameras.main.startFollow(this.player, false, 1, 1,0,88);

        this.physics.add.collider(this.golem, this.collisionLayer);
        this.physics.add.collider(this.player, this.collisionLayer, this.onCollisionLayer, null, this);
        this.physics.add.collider(this.player, this.golem, this.onCollisionGolem, null, this);
        this.physics.add.collider(this.golem, this.stalattiti, this.onCollisionStalattiti, null, this);
        this.physics.add.collider(this.player, this.collana, this.onCollisionCollana, null, this);
        
    }

    createMap():void{
        if(this.map != null){this.map.destroy};
        this.map = this.make.tilemap({key:"level-3"});
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage('boss');

        this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
        .setDepth(2).setAlpha(0);

        this.worldLayer = this.map.createLayer("world", this.tileset, 0,0)
        .setDepth(3).setAlpha(1);
    
        this.backgroundLayer = this.map.createLayer("background", this.tileset, 0,0).setDepth(0).setAlpha(1);

        this.collisionLayer.setCollisionByProperty({collide:true});
    }

    setupObject():void{
        this.layerObject = this.map.getObjectLayer("gameObject");
        if (this.layerObject != null) {
            let _objects: any = this.layerObject.objects as any[];
            _objects.forEach((tile:Phaser.Tilemaps.Tile) => {
                console.log(_objects);
                console.log(tile);
              var _objectValue = JSON.parse(tile.properties[0].value).type;
              switch (_objectValue) {
                case "stalattite":
                    this.stalattiti.add(new Stalattite({scene:this, x:tile.x, y:tile.y-20, key:"stalattite"}));
                    break;
              }
              
            })
        }
    }
    update(time: number, delta: number): void {
        this.bg.tilePositionX = this.cameras.main.scrollX*0.5;
        this.player.updatePlayer(time,delta);

        if(!this.bossDefeated){
            this.physics.moveTo(this.golem, this.player.x, 730, 60);

            this.golem.updateBoss(time, delta);

            var distance:number = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.golem.x, this.golem.y);
            if(distance <= 150 && this.attackBoolean){
                this.golem.walking = false;
                console.log("distanza inferiore a 100");
                this.golem.anims.play('golem-attack', true);
                this.cameras.main.shake(200, 0.01);
                var stalattite:Stalattite = <Stalattite>this.physics.closest(this.player, this.stalattiti.getChildren());
                stalattite.setGravity();
                this.golem.add_audio_hit();
                this.attackBoolean = false;

            }
            else if(distance >=150){
                this.golem.walking = true;
                this.attackBoolean = true;
            }

            this.player.updatePlayer(time, delta);
        }

        if(this.collisionGolem){
            this.collisionGolem = false;
        }
    }

    onCollisionGolem():void{
        if(this.player.decreaseLife()){
            console.log("hai perso tutte le vite")
            this.golem.stop_run_audio();
            this.scene.stop('GamePlay');
            this.scene.stop();
            this.scene.start('GameOver');
        }
        else{
            this.events.emit('decreaseLifeEvent');
            if(this.player.x >= this.golem.x){
                this.player.setPosition(this.player.x+70, this.player.y);
            }
            else if(this.player.x < this.golem.x){
                this.player.setPosition(this.player.x-70, this.player.y);
            }
            this.add.tween({
                targets:this.player, 
                alpha:0,
                repeat:3, 
                yoyo:true, 
                duration:100, 
                onComplete: ()=>{
                    this.golem.setAlpha(1);
                }
            });
        }
        
    }

    onCollisionStalattiti(golem:any, stalattite:any):void{
        this.stalattiti.remove(stalattite, true, true);
        this.add.tween({
            targets:this.golem, 
            alpha:0,
            repeat:4, 
            yoyo:true, 
            duration:100, 
            onComplete: ()=>{
                this.golem.setAlpha(1);
            }
        });

        if(this.golem.decreaseLife()){
            this.bossDefeated = true;
            this.golem.anims.play('golem-die', true);
            this.collana.x = this.golem.x;
            this.collana.y = this.golem.y+90;
            
            this.golem.on('animationcomplete', () =>{this.golem.destroy(true)})
            this.collana.setAlpha(1);
            //this.golem.destroy(true);
            console.log("golem distrutto")
        }
    }

    onCollisionLayer(player:any, tile:any){

        if(tile.properties.boss == true && this.bossDefeated){
            this.scene.stop();
            this.scene.resume('GamePlay');
        }
    }

    onCollisionCollana(player:any, collana:any){
        playerData.jump = -720;
        this.collana.destroy(true);
        this.events.emit("collanaEvent")
    }

      
}