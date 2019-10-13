import Phaser from "phaser"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game'
import { Menu } from './scene/Menu'
import { Game as GameScene } from './scene/Game'
import { Background } from './scene/Background'
import { Tutorial } from './scene/Tutorial'
import { ScoreOverlay } from './scene/ScoreOverlay'
import { Tutorial2 } from './scene/Tutorial2'
import { GameOver } from './scene/GameOver'
import { Preload } from './scene/Preload'

export class Game extends Phaser.Game {
  constructor () {
    super({
      type: Phaser.AUTO,
      parent: "elematch-game-cointainer",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      title: 'ELEMATCH',
      scene: [
        Preload,
        Background, // This background scene is a total hack and is only used on the game screen
        Menu,
        Tutorial,
        Tutorial2,
        GameScene,
        ScoreOverlay,
        GameOver
      ]
    })
  }
}
