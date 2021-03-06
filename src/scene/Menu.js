import { BaseScene } from './BaseScene'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'
import { TwoStateButton } from '../Buttons/TwoStateButton'
import buttonNewgame from '../assets/images/buttons/button-newgame.png'
import buttonNewgameActive from '../assets/images/buttons/button-newgame-active.png'
import buttonTutorial from '../assets/images/buttons/button-tutorial.png'
import buttonTutorialActive from '../assets/images/buttons/button-tutorial-active.png'
import startBackground from '../assets/images/start.png'

export class Menu extends BaseScene {
  constructor (config) {
    super({
      key: 'Menu',
      ...config
    })
  }

  init () {

  }

  create () {
    this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'startBackground')
    this.createInvisibleFontLoaderText()
    this.addStartButton()
    this.addTutorialButton()
  }

  addStartButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      360 + 43,
      'buttonNewgame',
      {
        texturePressed: 'buttonNewgameActive',
        onClick: this.switchToGameScene.bind(this)
      }
    )
    this.children.add(button)
  }

  switchToGameScene () {
    this.scene.start('Game')
  }

  addTutorialButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      460 + 43,
      'buttonTutorial',
      {
        texturePressed: 'buttonTutorialActive',
        onClick: this.switchToTutorialScene.bind(this)
      }
    )
    this.children.add(button)
  }

  switchToTutorialScene () {
    this.scene.start('Tutorial')
  }

  createInvisibleFontLoaderText () {
    const text = this.add.text(0,0, ':O', { font: `${40}px DisposableDroid` })
    text.setVisible(false)
  }
}
