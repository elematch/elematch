export class Card extends Phaser.GameObjects.Image {
  constructor ({ scene, x, y, image, id }) {
    super(scene, x, y, image, id);
    this.setTexture(image);
    this.setSize(130,170)
    this.setPosition(x, y);
    this.setScale(1);
  }

  setSelected(state) {
    if (state) {
      this.setY(this.y-7)
    } else {
      this.setY(this.y+7)
    }
    this.setActive(state)
  }
}
