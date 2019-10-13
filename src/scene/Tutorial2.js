import { BaseScene } from './BaseScene'
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
