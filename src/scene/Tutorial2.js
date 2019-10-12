import { BaseScene } from './BaseScene'
import backgroundImage from '../assets/images/tutorial-2.png'
import playButton from '../assets/images/buttons/button-playnow.png'
import playButtonActive from '../assets/images/buttons/button-playnow-active.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'
import { TwoStateButton } from '../Buttons/TwoStateButton'

export class Tutorial2 extends BaseScene {
  constructor (props) {
    super({
      key: 'Tutorial2',
      ...props
    })
  }

  preload () {
    this.load.image('tutorial2Image', backgroundImage)
    this.load.image('playButton', playButton)
    this.load.image('playButtonActive', playButtonActive)
  }

  create () {
    this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'tutorial2Image')
    this.addPlayButton()
  }

  addPlayButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      740 - 43 - 10,
      'playButton',
      {
        texturePressed: 'playButtonActive',
        onClick: this.switchToGameScene.bind(this)
      }
    )
    this.children.add(button)
  }

  switchToGameScene () {
    this.scene.start('Game')
  }
}
