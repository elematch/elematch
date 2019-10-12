import { BaseScene } from './BaseScene'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'

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
    if (time) {
      this.timeRemaining = time
    } else {
      this.timeRemaining = 999
    }
    this.startTimer()
  }

  create () {
    this.createTimerText()
    this.createScoreText()
    this.createBackButton()
  }

  createTimerText () {
    this.timerText = this.add.text(TIMER.X, TIMER.Y, this.timeRemaining, {
      font: `${FONT_SIZE}px DisposableDroid`,
      color: TEXT_COLOR,
      align: 'right',
      fixedWidth: 150
    })
  }

  createScoreText () {
    this.scoreText = this.add.text(SCORE.X, SCORE.Y, this.score, {
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

  startTimer () {
    let timer = this.time.addEvent({
      delay: 1000,
      callback: this.decreaseTimer.bind(this),
      loop: true
    })
  }

  decreaseTimer (amount = 1) {
    this.timeRemaining = this.timeRemaining - amount
    this.updateTimerText()
    this.events.emit('test', { time: this.timeRemaining })
  }

  updateTimerText () {
    if (this.timerText !== null) {
      this.timerText.setText(this.timeRemaining)
    }
  }

  setScoreText (score) {
    const zeros = 5 - (score.toString(10).length)
    console.log(`we need to fill ${zeros} zeros`)
    const zerosString = Array.from({ length: zeros}).map(() => '0').join('')
    console.log('add string', zerosString)
    this.scoreText.setText(`${zerosString}${score}`)
  }
}
