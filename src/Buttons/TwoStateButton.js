export class TwoStateButton extends Phaser.GameObjects.Image {
  constructor (scene, x, y, texture, { texturePressed, onClick } = {}, frame) {
    super(scene, x, y, texture, frame)
    this.textureNotPressed = texture
    this.texturePressed = texturePressed
    this.onClick = onClick

    this.setInteractive({ useHandCursor: true })
    this.on('pointerdown', () => {
      this.setPressed(true)
    })
    this.on('pointerup', this.onFocusEnd)
    this.on('pointerout', this.onFocusEnd)
  }

  setPressed (isPressed) {
    this.setTexture(isPressed ? this.texturePressed : this.textureNotPressed)
  }

  onFocusEnd () {
    this.setPressed(false)
    if (typeof this.onClick === 'function') {
      this.onClick()
    }
  }
}
