import Phaser from "phaser"
import { StartScene } from './scene/StartScene'

export class Game extends Phaser.Game {
  constructor () {
    super({
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 1280,
      height: 740,
      scene: [
        StartScene
      ]
    })
  }
}
