import { MAX_LIVES, MIN_LIVES } from '../../constants/game'

export class LifeBar extends Phaser.GameObjects.Image {
  constructor (scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    this.lifes = 5
    this.setLifes(this.lifes)
  }

  setLifes (lifes) {
    lifes = Math.max(lifes, MIN_LIVES)
    lifes = Math.min(lifes, MAX_LIVES)
    this.setTexture(`indicatorBar${lifes}`)
  }
}
