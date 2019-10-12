import { BaseScene } from './BaseScene'
import refreshButton from '../assets/images/buttons/button-refresh.png'
import refreshButtonActive from '../assets/images/buttons/button-refresh-active.png'
import scoreField from '../assets/images/fields/score-field.png'
import timerField from '../assets/images/fields/timer-field.png'
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
  X: 755 + 65,
  Y: 615 + 40,
}

export class ScoreOverlay extends BaseScene {
  constructor (props) {
    super({
      key: 'ScoreOverlay',
      ...props
    })
    this.timeRemaining = -1
    this.timerText = null
    this.score = 0
    this.scoreText = null
  }

  preload () {
    this.load.image('card', card)
    this.load.image('refreshButton', refreshButton)
    this.load.image('refreshButtonActive', refreshButtonActive)
    this.load.image('scoreField', scoreField)
    this.load.image('timerField', timerField)
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
    this.add.image(470, BUTTON.Y, 'scoreField')
    this.add.image(680, BUTTON.Y, 'timerField')
    this.createTimerText()
    this.createScoreText()
    this.createRefreshButton()
    this.subscribeToStateChange()
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
        onClick: () => {
          let scene = this.scene.get('Game');
          scene.data.get("gameState").reset();
          scene.events.emit("changedata");
        }
      }
    )
    button.setInteractive({ useHandCursor: true })
    this.children.add(button)
  }

  subscribeToStateChange () {
    this.scene.get('Game').events.on('changedata', this.updateWithGameState.bind(this))
    this.scene.get('Game').data.get('gameState').onTimeChange(this.updateWithGameState.bind(this))
  }

  updateWithGameState (gameState) {
    if (gameState.time !== this.timeRemaining) {
      this.timeRemaining = gameState.time
      this.setTimerText(this.timeRemaining)
    }
    if (gameState.score !== this.score) {
      this.score = gameState.score
      this.setScoreText(this.score)
    }
  }

  setTimerText (time) {
    if (this.timerText !== null) {
      const paddedString = time.toString().padStart(3, '0')
      this.timerText.setText(paddedString)
    }
  }

  /**
   * @param score {number}
   */
  setScoreText (score) {
    if (this.scoreText !== null) {
      let scoreString = score.toString()
      if (score >= 0) {
        scoreString = score.toString().padStart(5, '0')
      }
      this.scoreText.setText(scoreString)
    }
  }
}
