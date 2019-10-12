import { BaseScene } from './BaseScene'
import { CardImage } from '../util/entity/CardImage'
import aceImg from '../assets/ace.png'
import bgImg from '../assets/images/background.png'
import { CardStack } from '../util/CardStack'

export class GameScene extends BaseScene {
  constructor () {
    super({
      key: 'GameScene',
    });
    console.log('GameScene')
  }

  preload () {
    console.log('GameScene preload')
    this.load.image("bg", bgImg)
    this.load.image("ace", aceImg)
  }

  create () {
    console.log('GameScene create')

    this.data.events.addListener('changedata', () => {
      console.log('changedata')
      console.log(this.data.getAll())
    })

    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'bg');

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
      let card = new CardImage({scene: this,x: pos[i][0], y: pos[i][1], image: "ace", id: i, ...e})
      this.children.add(card)
    })
  }
}
