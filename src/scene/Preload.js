import select1Sound from '../assets/sounds/select-1.wav'
import select2Sound from '../assets/sounds/select-2.wav'
import select3Sound from '../assets/sounds/select-3.wav'
import selectFailSound from '../assets/sounds/select-fail.wav'
import buttonNewgame from '../assets/images/buttons/button-newgame.png'
import buttonNewgameActive from '../assets/images/buttons/button-newgame-active.png'
import buttonTutorial from '../assets/images/buttons/button-tutorial.png'
import buttonTutorialActive from '../assets/images/buttons/button-tutorial-active.png'
import startBackground from '../assets/images/start.png'
import tutorial1Image from '../assets/images/tutorial-1.png'
import tutorial2Image from '../assets/images/tutorial-2.png'
import playButton from '../assets/images/buttons/button-playnow.png'
import playButtonActive from '../assets/images/buttons/button-playnow-active.png'
import nextButton from '../assets/images/buttons/button-next.png'
import nextButtonActive from '../assets/images/buttons/button-next-active.png'
import refreshButton from '../assets/images/buttons/button-refresh.png'
import refreshButtonActive from '../assets/images/buttons/button-refresh-active.png'
import scoreField from '../assets/images/fields/score-field.png'
import timerField from '../assets/images/fields/timer-field.png'
import coin from '../assets/images/coin/coin01.png'
import indicatorBar1 from '../assets/images/indicator-bar/indicatorbar-1.png'
import indicatorBar2 from '../assets/images/indicator-bar/indicatorbar-2.png'
import indicatorBar3 from '../assets/images/indicator-bar/indicatorbar-3.png'
import indicatorBar4 from '../assets/images/indicator-bar/indicatorbar-4.png'
import indicatorBar5 from '../assets/images/indicator-bar/indicatorbar-5.png'
import background from '../assets/images/background-with-area.png'
import gameOverBackground from '../assets/images/background-gameover.png'
import playAgain from '../assets/images/buttons/button-playagain.png'
import playAgainActive from '../assets/images/buttons/button-playagain-active.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game'

export class Preload extends Phaser.Scene {
  constructor (props) {
    super(props)
    this.percentageText = null
  }

  switchToMenu () {
    this.scene.start('Menu')
  }

  preload () {
    this.load.on('progress', this.updatePercentageText.bind(this))
    // this.load.on('fileprogress', (fileprogress) => {
    //   console.log('fileprogress is', fileprogress)
    // })
    this.load.on('complete', () => {
      this.switchToMenu()
    })

    this.createText()
    this.preloadBackground()
    this.preloadMenuImages()
    this.preloadTutorialImages()
    this.preloadTutorial2Images()
    this.preloadCardImages()
    this.preloadScoreOverlayImages()
    this.preloadAudio()
    this.preloadPlayAgain()
  }

  createText () {
    const text = this.add.text(
      0,
      SCREEN_HEIGHT / 2 - 100,
      '0%', {
        font: `100px DisposableDroid`,
        color: '#ffffff',
        align: 'center',
        boundsAlignV: 'center',
        fixedWidth: SCREEN_WIDTH,
      }
    )
    text.setDepth(100)
    this.percentageText = text
  }

  preloadBackground () {
    this.load.image('background', background)
  }

  preloadCardImages () {
    const importAll = (require) => {
      const imagePaths = require.keys()
      const images = require.keys().map(require)

      const phaserImageKeys = imagePaths.map((imagePath) => {
        const fileName = imagePath.substr(2)
        return fileName.substring(0, fileName.length - 4)
      });
      for (let i = 0; i < images.length; i++) {
        this.load.image(phaserImageKeys[i], images[i])
      }
    };
    importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/))

  }

  preloadAudio () {
    this.load.audio('select1Sound', select1Sound)
    this.load.audio('select2Sound', select2Sound)
    this.load.audio('select3Sound', select3Sound)
    this.load.audio('selectFailSound', selectFailSound)
  }

  preloadMenuImages () {
    this.load.image('buttonNewgame', buttonNewgame)
    this.load.image('buttonNewgameActive', buttonNewgameActive)
    this.load.image('buttonTutorial', buttonTutorial)
    this.load.image('buttonTutorialActive', buttonTutorialActive)
    this.load.image('startBackground', startBackground)
  }

  preloadTutorialImages () {
    this.load.image('tutorial1Image', tutorial1Image)
    this.load.image('nextButton', nextButton)
    this.load.image('nextButtonActive', nextButtonActive)
  }

  preloadTutorial2Images () {
    this.load.image('tutorial2Image', tutorial2Image)
    this.load.image('playButton', playButton)
    this.load.image('playButtonActive', playButtonActive)
  }

  preloadScoreOverlayImages () {
    this.load.image('refreshButton', refreshButton)
    this.load.image('refreshButtonActive', refreshButtonActive)
    this.load.image('scoreField', scoreField)
    this.load.image('timerField', timerField)
    this.load.image('coin', coin)

    // const coinImages = process.env["NODE_ENV"] === "prod" ? "./sprites/coin" : "src/assets/images/coin";
    // this.load.multiatlas('coin', coinAtlas, coinImages)

    this.load.image('indicatorBar1', indicatorBar1)
    this.load.image('indicatorBar2', indicatorBar2)
    this.load.image('indicatorBar3', indicatorBar3)
    this.load.image('indicatorBar4', indicatorBar4)
    this.load.image('indicatorBar5', indicatorBar5)
  }

  preloadPlayAgain () {
    this.load.image('gameOverBackground', gameOverBackground)
    this.load.image('playAgain', playAgain)
    this.load.image('playAgainActive', playAgainActive)
  }

  updatePercentageText (progress) {
    if (this.percentageText === null) {
      return
    }
    const percent = progress * 100
    const percentString = percent.toString(10)
    const percentInteger = parseInt(percentString)
    this.percentageText.setText(`${percentInteger}%`)
  }
}
