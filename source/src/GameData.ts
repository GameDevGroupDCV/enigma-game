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
    loadingTextFont: "roboto",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 600,
    loadingBarColor: 0xff0000,
    loadingBarY: 490,
  },

  spritesheets: [

    {name: "cave2", path: "assets/map/cave2.png", width: 32, height: 32, spacing:13, margin:0},
    {name: "player-idle", path: "assets/images/player/player-idle.png", width: 19, height: 34, frames: 12},
    {name: "player-jump", path: "assets/images/player/player-jump.png", width: 17, height: 34, frames: 1},
    {name: "player-landing", path: "assets/images/player/player-landing.png", width: 20, height: 35, frames: 1},
    {name: "player-run", path: "assets/images/player/player-run.png", width: 21, height: 33, frames: 8},
    {name: "lever", path: "assets/images/image.png", width: 12, height:15, frames: 6},
    {name: "gems", path: "assets/images/gems.png", width: 28, height:28, frames: 14 },

  ],
  images: [
    {name: "bgenigma", path: "assets/images/bgenigma.png"},
    {name:"bg-wood", path:"assets/images/bg/wood.png"}

  ],
  atlas: [],
  sounds: [

  ],

  videos: [

  ],
  audios: [

  ],

  scripts: [],
  fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],
  tilemaps:[{
    key:'level-1',
    path:"assets/map/cave.json"
  }]
};
