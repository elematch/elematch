import { BaseScene } from './BaseScene'
import { getTextureNameForCardObjectLiteral } from '../util/entity/Card'
import { SCREEN_WIDTH } from '../constants/game'

const yValues = [130, 310, 490]

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
      this.createCards(sets.pop())
    }
  }

  createCards (set) {
    if (set.length !== 3) {
      return
    }
    this.children.removeAll()
    const data = set.map(set => set.data)
    const cardImageNames = data.map((data) => getTextureNameForCardObjectLiteral(data))

    cardImageNames.forEach((imageName, index) => {
      const image = new Phaser.GameObjects.Image(
        this,
        1125,
        yValues[index],
        imageName
      )
      this.children.add(image)
    })
  }
}
