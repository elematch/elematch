import { BaseScene } from './BaseScene'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'

export class Menu extends BaseScene {
  constructor (config) {
    super({
      key: 'Menu',
      active: true,
      ...config
    })
  }

  preload () {

  }

  init () {

  }

  create () {
    this.addStartButton()
    this.addTutorialButton()
  }

  addStartButton () {
    const startButton = this.add.text(
      SCREEN_WIDTH / 2 - 90,
      SCREEN_HEIGHT / 2 - 200,
      'Start',
      {
        font: '95px DisposableDroid',
        boundsAlignH: 'center',
        backgroundColor: '#012d54',
        padding: 10
      })

    startButton.setInteractive({ useHandCursor: true })
    startButton.on('pointerdown', this.switchToGameScene.bind(this))
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
