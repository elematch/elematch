import { BaseScene } from './BaseScene'
import { getTextureNameForCardObjectLiteral } from '../util/entity/Card'
import { getSetDifficulty } from '../util/CardStack'
import { DIFFICULTY_SCORE_MULTIPLIER } from '../util/GameState'
import { TEXT_Y } from './ScoreOverlay'

const X_VALUES = [130, 310, 490]
const X_COORD = 1135
const FONT_SIZE = 64
const TEXT_COLOR = '#FFFFFF'

export class LastMatch extends BaseScene {
  constructor (props) {
    super({
      key: 'LastMatch',
      ...props
    })
    this.lastSetLength = 0
  }

  create () {
    this.subscribeToGameStateChange()
  }

  subscribeToGameStateChange () {
    this.scene.get('Game').events.on('changedata', this.onGameStateChange.bind(this))
  }

  onGameStateChange (gameState) {
    const sets = Array.from(gameState.selectedSets)
    if (sets.length !== this.lastSetLength) {
      this.lastSetLength = sets.length
      this.recreateGameObjects(sets.pop())
    }
  }

  recreateGameObjects (set) {
    if (set.length !== 3) {
      return
    }
    const cardsData = set.map(set => set.data)
    this.children.removeAll()
    this.createCards(cardsData)
    this.createScoreText(cardsData)
  }

  createCards (cardsData) {
    cardsData = [...cardsData].sort(((data1, data2) => data1.count - data2.count))
    const cardImageNames = cardsData.map((data) => getTextureNameForCardObjectLiteral(data))

    cardImageNames.forEach((imageName, index) => {
      const image = new Phaser.GameObjects.Image(
        this,
        X_COORD,
        X_VALUES[index],
        imageName
      )
      this.children.add(image)
    })
  }

  createScoreText (cardsData) {
    const score = getSetDifficulty(...cardsData) * DIFFICULTY_SCORE_MULTIPLIER
    const textWidth = 250
    console.log(`score is ${score}`)
    const text = new Phaser.GameObjects.Text(
      this,
      X_COORD - textWidth / 2,
      TEXT_Y,
      `+${score}`,
      {
        font: `${FONT_SIZE}px DisposableDroid`,
        color: TEXT_COLOR,
        align: 'center',
        fixedWidth: textWidth
      }
    )
    this.children.add(text)
  }
}
