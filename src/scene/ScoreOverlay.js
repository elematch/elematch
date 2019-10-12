import { BaseScene } from './BaseScene'
import refreshButton from '../assets/images/buttons/button-refresh.png'
import refreshButtonActive from '../assets/images/buttons/button-refresh-active.png'
import scoreField from '../assets/images/fields/score-field.png'
import timerField from '../assets/images/fields/timer-field.png'
import indicatorBar1 from '../assets/images/indicator-bar/indicatorbar-1.png'
import indicatorBar2 from '../assets/images/indicator-bar/indicatorbar-2.png'
import indicatorBar3 from '../assets/images/indicator-bar/indicatorbar-3.png'
import indicatorBar4 from '../assets/images/indicator-bar/indicatorbar-4.png'
import indicatorBar5 from '../assets/images/indicator-bar/indicatorbar-5.png'
import { TwoStateButton } from '../Buttons/TwoStateButton'
import card from '../assets/images/card.png'
import { LifeBar } from '../util/entity/LifeBar'
import { SCREEN_HEIGHT } from '../constants/game'

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
    this.lifeBar = null
  }

  preload () {
    this.load.image('card', card)
    this.load.image('refreshButton', refreshButton)
    this.load.image('refreshButtonActive', refreshButtonActive)
    this.load.image('scoreField', scoreField)
    this.load.image('timerField', timerField)
    this.load.multiatlas('coin', "src/assets/images/coin/coin.json", "src/assets/images/coin")
    this.load.image('indicatorBar1', indicatorBar1)
    this.load.image('indicatorBar2', indicatorBar2)
    this.load.image('indicatorBar3', indicatorBar3)
    this.load.image('indicatorBar4', indicatorBar4)
    this.load.image('indicatorBar5', indicatorBar5)
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
    this.createLifeBar()
    this.createScoreCoin()
  }

  createScoreCoin () {
    let coin = this.add.sprite(SCORE.X+10, SCORE.Y+35, 'coin', "src/assets/images/coin/coin.png");
    coin.setScale(1, 1);

    let frameNames = this.anims.generateFrameNames('coin', {
      start: 1, end: 8, zeroPad: 2,
      prefix: 'coin', suffix: '.png'
    });

    this.anims.create({ key: 'spin', frames: frameNames, frameRate: 10, repeat: -1 });
    coin.anims.play('spin');
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
          const gameState = scene.data.get('gameState');

          if (gameState.lives > 1) {
            gameState.lives--;
            gameState.newDeck = true;
          }

          scene.events.emit("changedata", gameState);
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
    if (gameState.lives !== this.lifes) {
      console.log(gameState)
      this.updateLifeBar(gameState.lives)
      this.lifes = gameState.lives
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

  createLifeBar () {
    const lifeBar = new LifeBar(this, 912, SCREEN_HEIGHT / 2)
    this.children.add(lifeBar)
    this.lifeBar = lifeBar
  }

  updateLifeBar (lifes) {
    if (this.lifeBar !== null) {
      console.log('updateLifeBar', lifes)
      this.lifeBar.setLifes(lifes)
    }
  }
}
