import { BaseScene } from './BaseScene'

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

const BUTTON = {
  X: 762,
  Y: 615,
  WIDTH: 130,
  HEIGHT: 80
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
    this.createBackButton()
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

  createBackButton () {
    const backButton = this.add.text(BUTTON.X, BUTTON.Y, 'BACK', {
      ...BUTTON_STYLE,
      fixedWidth: BUTTON.WIDTH,
      fixedHeight: BUTTON.HEIGHT,
      color: '#fff',
      backgroundColor: '#000'
    })
    backButton.setInteractive({ useHandCursor: true })
    backButton.on('pointerdown', () => {
      // TODO: clear time in state, etc, etc
      this.scene.start('Menu')
      console.log('start new scene')
    })
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
