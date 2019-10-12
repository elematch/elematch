import { BaseScene } from './BaseScene'
import { CardImage } from '../util/entity/CardImage'
import cardImg from '../assets/images/card.png'
import { CardStack } from '../util/CardStack'
import { ScoreOverlay } from './ScoreOverlay'


export class Game extends BaseScene {
  constructor () {
    super({
      key: 'Game',
    })
  }

  preload () {
    this.preloadCardImages()
  }

  preloadCardImages () {
    const importAll = (require) => {
      const imagePaths = require.keys()
      const images = require.keys().map(require)

      const phaserImageKeys = imagePaths.map((imagePath) => {
        const fileName = imagePath.substr(2)
        return fileName.substring(0, fileName.length - 4)
      })
      for (let i = 0; i < images.length; i++) {
        this.load.image(phaserImageKeys[i], images[i])
      }
    }
    importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/))
    this.load.image('card', cardImg)
  }

  create () {
    if (this.scene.get('ScoreOverlay')) {
      this.scene.remove('ScoreOverlay')
    }
    let scene = this.scene.add('ScoreOverlay', ScoreOverlay, true, { time: 99 })

    this.scene.get('ScoreOverlay').events.on('test', (data) => {
      console.log('got data from test event', data)
    })

    this.data.events.addListener('changedata', () => {
      console.log('changedata')
      console.log(this.data.getAll())
      this.children.getAt()
    })

    //card 130 x 170
    let pos = [
      [400, 130],
      [540, 130],
      [680, 130],
      [820, 130],
      [400, 310],
      [540, 310],
      [680, 310],
      [820, 310],
      [400, 490],
      [540, 490],
      [680, 490],
      [820, 490],
    ]

    let deck = new CardStack
    deck = deck.getDeck()

    deck.forEach((e, i) => {
      console.log(e)
      let card = new CardImage({scene: this,x: pos[i][0], y: pos[i][1], image: "card", id: i, ...e})
      this.children.add(card)
      /*this.tweens.add({
        targets: card,
        x: card.x-2,
        y: card.y-2,
        duration: 300,
        ease: 'Power2',
        yoyo: true,
        loop: -1,
      });*/
    })
  }
}
