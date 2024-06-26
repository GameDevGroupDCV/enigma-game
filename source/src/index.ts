//importiamo la libreria phaser
import "phaser";
//importiamo le nostre scene
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";
import GameOver from "./scenes/GameOver";
import Intro from "./scenes/Intro";
import Enigma from "./scenes/Enigma";
import bossRoom from "./scenes/bossRoom";
import Sign from "./scenes/Sign";
import LockZaino from "./scenes/lockZaino";
import Dialogs from "./scenes/Dialog";
import Win from "./scenes/win";
//importiamo GameData che contiene i valori globali del gioco
import { GameData } from "./GameData";
import Flashback from "./scenes/FlashBack";

//il listener per l'evento load della pagina
//questo evento viene lanciato quando la pagina è stata caricata
//e tutti gli elementi della pagina sono disponibili
window.addEventListener("load", () => {


  //creiamo un oggetto di configurazione per il gioco
  //questo oggetto viene passato al costruttore di Phaser.Game
  // e contiene i parametri di configurazione del gioco
  // come il tipo di rendering, le dimensioni del canvas, le scene, ecc.
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      Intro,
      GamePlay,
      Enigma,
      GameOver,
      bossRoom,
      Sign, 
      LockZaino, 
      Dialogs, 
      Flashback,
      Win
    ],
    physics: {
      default: "arcade",
      arcade: { debug: true, 
                gravity:{x:0, y:800}
              }
    },

    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  //inizializziamo il gioco passando la configurazione
  const game = new Phaser.Game(config);

});
