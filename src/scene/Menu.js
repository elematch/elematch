import { BaseScene } from './BaseScene'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'
import { TwoStateButton } from '../Buttons/TwoStateButton'
import buttonNewgame from '../assets/images/buttons/button-newgame.png'
import buttonNewgameActive from '../assets/images/buttons/button-newgame-active.png'

export class Menu extends BaseScene {
  constructor (config) {
    super({
      key: 'Menu',
      active: true,
      ...config
    })
  }

  preload () {
    this.load.image('buttonNewgame', buttonNewgame)
    this.load.image('buttonNewgameActive', buttonNewgameActive)
  }

  init () {

  }

  create () {
    this.addStartButton()
    // this.addTutorialButton()
  }

  addStartButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 2,
      'buttonNewgame',
      {
        texturePressed: 'buttonNewgameActive',
        onClick: this.switchToGameScene.bind(this)
      }
    )
    this.children.add(button)
    // startButton.on('pointerdown', this.switchToGameScene.bind(this))
  }

  switchToGameScene () {
    this.scene.start('Game')
  }

  addTutorialButton () {
    const tutorialButton = this.add.text(
      SCREEN_WIDTH / 2 - 140,
      SCREEN_HEIGHT / 2,
      'Tutorial',
      {
        font: '95px DisposableDroid',
        boundsAlignH: 'center',
        backgroundColor: '#012d54',
        padding: 10
      })

    tutorialButton.setInteractive({ useHandCursor: true })
    tutorialButton.on('pointerdown', this.switchToTutorialScene.bind(this))
  }

  switchToTutorialScene () {
    this.scene.start('Tutorial')
  }
}
