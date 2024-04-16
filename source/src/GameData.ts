export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 640,
    bgColor: "#000000",
    debug: true
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "enigmaFont",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 600,
    loadingBarColor: 0xff0000,
    loadingBarY: 490,
  },

  spritesheets: [

    {name: "cave2", path: "assets/map/cave2.png", width: 32, height: 32, spacing:13, margin:0},
    {name: "boss", path:"assets/map/boss.png", width:32, height:32, spacing:0, margin:0},
    {name: "jungle", path:"assets/map/jungle.png", width:32, height:32, spacing:0, margin:0},

    {name: "player-idle", path: "assets/images/player/player-idle.png", width: 19, height: 34, frames: 12},
    {name: "player-jump", path: "assets/images/player/player-jump.png", width: 17, height: 34, frames: 1},
    {name: "player-landing", path: "assets/images/player/player-landing.png", width: 20, height: 35, frames: 1},
    {name: "player-run", path: "assets/images/player/player-run.png", width: 21, height: 33, frames: 8},
    {name: "lever", path: "assets/images/image.png", width: 48, height:60, frames: 6},
    {name: "gems", path: "assets/images/gems.png", width: 28, height:28, frames: 14 },

    {name:"golem-attack", path:"assets/images/boss/Golem_1_attack.png", width:90, height:64, frames:11},
    {name:"golem-die", path:"assets/images/boss/Golem_1_die.png", width:90, height:64, frames:13},
    {name:"golem-hurt", path:"assets/images/boss/Golem_1_hurt.png", width:90, height:64, frames:4},
    {name:"golem-idle", path:"assets/images/boss/Golem_1_idle.png", width:90, height:64, frames:8},
    {name:"golem-walk", path:"assets/images/boss/Golem_1_walk.png", width:90, height:64, frames:10},

    {name:"stalattite", path:"assets/images/stalattite.png", width:304, height:436, frames:1}, 

    {name:"eg2", path:"assets/map/eg2.png", width:32, height:32, spacing:0, margin:0},

    {name:"lock", path:"assets/images/lock.png", width:24, height:32, frames:17},

    {name:"enemy", path:"assets/images/enemy/monster.png", width:48, height:48, frames:59},
  ],
  images: [
    {name: "bgenigma", path: "assets/images/bgenigma.png"},
    {name:"bg-wood", path:"assets/images/bg/wood.png"},
    {name:"bg1", path:"assets/images/bg/bg1.png"},
    {name:"credit_close", path:"assets/images/credit_close.png"},
    {name:"info_pressed", path:"assets/images/Info_Pressed.png"},
    {name:"info_unpressed", path:"assets/images/Info_Unpressed.png"},
    {name:"play_pressed", path:"assets/images/Play_Pressed.png"},
    {name:"play_unpressed", path:"assets/images/Play_Unpressed.png"},
    {name:"logo", path:"assets/images/logo.jpeg"},
    {name:"b_unpressed", path:"assets/images/Restart_Pressed.png"},
    {name:"b_pressed", path:"assets/images/Restart_Unpressed.png"},
    {name:"lock-bg", path:"assets/images/bg/lock.png"},
    {name:"bg-lock", path:"assets/images/bg/bg-lock.png"},
    {name: "diario", path:"assets/images/diario.png"},
    {name: "ring", path:"assets/images/gold_ring.png"}

  ],
  atlas: [],
  sounds: [

  ],

  videos: [

  ],
  audios: [
    {name: "sfx",jsonpath: "assets/sounds/sfx.json",paths: ["assets/sounds/AudioGioco.ogg", "assets/sounds/AudioGioco.m4a"]},
    ],
  scripts: [],
  fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],

  tilemaps:[
    {
    key:'level-1',
    path:"assets/map/cave.json"
    },

    {
      key:'level-3',
      path:"assets/map/boss.json"
    },
    {
      key:'level-2-lock1',
      path:"assets/map/level1.json"
    },
    {
      key:'level-2-lock2',
      path:"assets/map/level2.json"
    },
    {
      key:'level-2-lock3',
      path:"assets/map/level3.json"
    },
    {
      key:'flashback',
      path:"assets/map/flashback.json"
    }
    
  
  ]
};
