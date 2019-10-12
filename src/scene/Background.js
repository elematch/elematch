import { BaseScene } from './BaseScene'
import background from '../assets/images/background.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'

export class Background extends BaseScene {
  constructor (props) {
    super({
      key: 'Background',
      active: true,
      ...props
    })
  }

  preload () {
    this.preloadBackground()
  }

  preloadBackground () {
    this.load.image('background', background)
  }

  create () {
    this.createBackground()
  }

  createBackground () {
    this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'background')
  }
}
