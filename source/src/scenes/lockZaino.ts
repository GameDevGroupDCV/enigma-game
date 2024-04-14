import { Cameras } from "phaser";
import { GameData } from "../GameData";

export default class LockZaino extends Phaser.Scene{
    constructor(){
        super({key:'LockZaino'});
    }
    private map:Phaser.Tilemaps.Tilemap;
    private tileset:Phaser.Tilemaps.Tileset;
    private worldLayer:Phaser.Tilemaps.TilemapLayer;
    private collisionLayer:Phaser.Tilemaps.TilemapLayer;
    private bg:Phaser.GameObjects.Image;
    private camera:Cameras.Scene2D.Camera;
    private key:Phaser.GameObjects.Sprite;

    private mapOffsetCamera:IMapOffsetCamera = {
        map1:{
            zoom:0.35,
            scrollX:800,
            scrollY:500
        },
        map2:{
            zoom:0.35,
            scrollX:800,
            scrollY:500
        },
        map3:{
            zoom:0.27,
            scrollX:400    ,
            scrollY:760
        }
    }
    create(){
        this.key = this.add.sprite(190, 112, 'key').setDepth(10).setScale(4);
        this.anims.create({
            key:'key-animation', 
            frames:this.anims.generateFrameNumbers('key', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]}),
            frameRate:13, 
            yoyo:false,
            repeat:-1
        })
        this.camera = this.cameras.main;
        this.key.anims.play('key-animation');
        this.bg = this.add.image(0,0,"lock-bg").setDepth(1).setScale(20).setScrollFactor(0).setInteractive();
        this.createMap1();

        this.camera.zoom = this.mapOffsetCamera.map1.zoom;
        this.camera.scrollX +=this.mapOffsetCamera.map1.scrollX;  
        this.camera.scrollY +=this.mapOffsetCamera.map1.scrollY;

        this.bg.on('pointerdown', (pointer:any) =>{
            console.log(pointer.x + " " + pointer.y);
        })
        
    }

    update(time: number, delta: number): void {
        
    }

    createMap1():void{
        if(this.map != null){this.map.destroy};
        this.map = this.make.tilemap({key:"level-2-lock1", tileWidth:32, tileHeight:32});
    
        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage('eg2');
    
        this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
            .setDepth(2).setAlpha(0);
    
        this.worldLayer = this.map.createLayer("world", this.tileset, 0,0)
            .setDepth(2).setAlpha(1);
        
        this.collisionLayer.setCollisionByProperty({collide:true});
      }

    createMap2():void{
        if(this.map != null){this.map.destroy};
        this.map = this.make.tilemap({key:"level-2-lock2", tileWidth:32, tileHeight:32});

        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage('eg2');

        this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
            .setDepth(2).setAlpha(0);

        this.worldLayer = this.map.createLayer("world", this.tileset, 0,0)
            .setDepth(2).setAlpha(1);
        
        this.collisionLayer.setCollisionByProperty({collide:true});
    }

    createMap3():void{
        if(this.map != null){this.map.destroy};
        this.map = this.make.tilemap({key:"level-2-lock3", tileWidth:32, tileHeight:32});

        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage('eg2');

        this.collisionLayer = this.map.createLayer("collision", this.tileset, 0,0)
            .setDepth(2).setAlpha(0);

        this.worldLayer = this.map.createLayer("world", this.tileset, 0,0)
            .setDepth(2).setAlpha(1);
        
        this.collisionLayer.setCollisionByProperty({collide:true});
    }
    
}
interface IMapOffsetCamera{
    map1:{
        zoom:number,
        scrollX:number,
        scrollY:number
    },
    map2:{
        zoom:number,
        scrollX:number,
        scrollY:number
    },
    map3:{
        zoom:number,
        scrollX:number,
        scrollY:number
    }
}
