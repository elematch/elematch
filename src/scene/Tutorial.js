import { BaseScene } from './BaseScene'
import backgroundImage from '../assets/images/tutorial-1.png'
import nextButton from '../assets/images/buttons/button-next.png'
import nextButtonActive from '../assets/images/buttons/button-next-active.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'
import { TwoStateButton } from '../Buttons/TwoStateButton'

export class Tutorial extends BaseScene {
  constructor (props) {
    super({
      key: 'Tutorial',
      ...props
    })
  }

  create () {
    this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'tutorial1Image')
    this.addNextButton()
  }

  addNextButton () {
    const button = new TwoStateButton(
      this,
      SCREEN_WIDTH / 2,
      460 + 43,
      'nextButton',
      {
        texturePressed: 'nextButtonActive',
        onClick: this.switchToTutorial2Scene.bind(this)
      }
    )
    this.children.add(button)
  }

  switchToTutorial2Scene () {
    this.scene.start('Tutorial2')
  }
}
