import { BaseScene } from './BaseScene'
import gameOverBackground from '../assets/images/background-gameover.png'
import playAgain from '../assets/images/buttons/button-playagain.png'
import playAgainActive from '../assets/images/buttons/button-playagain-active.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'
import { TwoStateButton } from '../Buttons/TwoStateButton'

const FONT_SIZE = 80
const TEXT_COLOR = '#FFFFFF'

export class GameOver extends BaseScene {
  constructor (config) {
    super({
      key: 'GameOver',
      ...config
    })
    this.score = 0
  }

  preload () {
    this.load.image('gameOverBackground', gameOverBackground)
    this.load.image('playAgain', playAgain)
    this.load.image('playAgainActive', playAgainActive)
  }

  init ({ finalScore }) {
    this.score = finalScore
  }

  create () {
    this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'gameOverBackground')
    this.createPlayAgainButton()
    this.createHighscoreText()
  }

  createHighscoreText () {
    this.add.text(
      0,
      SCREEN_HEIGHT / 2 - 70,
      this.score.toString(10),
      {
        font: `${FONT_SIZE}px DisposableDroid`,
        color: TEXT_COLOR,
        align: 'center',
        fixedWidth: SCREEN_WIDTH
      }
    )
  }

  createPlayAgainButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 2 + 110,
      'playAgain',
      {
        texturePressed: 'playAgainActive',
        onClick: this.switchToGameScene.bind(this)
      }
    )
    this.children.add(button)
  }

  switchToGameScene () {
    this.scene.start('Game')
  }
}
