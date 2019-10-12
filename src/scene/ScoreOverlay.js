import { BaseScene } from './BaseScene'
import refreshButton from '../assets/images/buttons/button-refresh.png'
import refreshButtonActive from '../assets/images/buttons/button-refresh-active.png'
import { TwoStateButton } from '../Buttons/TwoStateButton'
import card from '../assets/images/card.png'

const FONT_SIZE = 60
const TEXT_COLOR = '#000'

const TEXT_Y = 618
const TIMER = {
  X: 580,
  Y: TEXT_Y
}

const SCORE = {
  X: 371,
  Y: TEXT_Y
}

// add half of width and length, since position is relative to the center of the image
const BUTTON = {
  X: 762 + 65,
  Y: 615 + 40,
}

const BUTTON_STYLE = {
  font: `${FONT_SIZE}px DisposableDroid`,
  color: TEXT_COLOR,
  align: 'right',
  fixedWidth: 200
}

export class ScoreOverlay extends BaseScene {
  constructor (props) {
    super({
      key: 'ScoreOverlay',
      ...props
    })
    this.timeRemaining = -1
    this.timerText = null
    this.score = 1250
    this.scoreText = null
  }

  preload () {
    this.load.image('card', card)
    this.load.image('refreshButton', refreshButton)
    this.load.image('refreshButtonActive', refreshButtonActive)
  }

  init ({ time }) {
    console.log(`initialized ScoreOverlay with ${time}s`)
    if (typeof time === 'undefined') {
      time = 999
    }
    this.timeRemaining = time
    this.setTimerText(time)
  }

  create () {
    this.createTimerText()
    this.createScoreText()
    this.createRefreshButton()
  }

  createTimerText () {
    this.timerText = this.add.text(TIMER.X, TIMER.Y, '', {
      font: `${FONT_SIZE}px DisposableDroid`,
      color: TEXT_COLOR,
      align: 'right',
      fixedWidth: 150
    })
    this.setTimerText(this.timeRemaining)
  }

  createScoreText () {
    this.scoreText = this.add.text(SCORE.X, SCORE.Y, '', {
      font: `${FONT_SIZE}px DisposableDroid`,
      color: TEXT_COLOR,
      align: 'right',
      fixedWidth: 200
    })
    this.setScoreText(this.score)
  }

  createRefreshButton () {
    const button = new TwoStateButton(
      this,
      BUTTON.X,
      BUTTON.Y,
      'refreshButton',
      {
        texturePressed: 'refreshButtonActive',
        onClick: () => { console.log('TODO: reset scene') }
      }
    )
    button.setInteractive({ useHandCursor: true })
    this.children.add(button)
  }

  subscribeToStateChange () {
    this.scene.get('Game').events.on('changedata', (data) => {
      console.log('got data from changedata event', data)
      if (data.time !== this.timeRemaining) {
        this.timeRemaining = data.time
        this.setTimerText(this.timeRemaining)
      }
      if (data.score !== this.score) {
        this.score = data.score
        this.setTimerText(this.score)
      }
    })
  }

  setTimerText (time) {
    if (this.timerText !== null) {
      const paddedString = time.toString().padStart(3, '0')
      this.timerText.setText(paddedString)
    }
  }

  setScoreText (score) {
    const paddedString = score.toString().padStart(5, '0')
    this.scoreText.setText(paddedString)
  }
}
