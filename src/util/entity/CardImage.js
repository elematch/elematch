export class CardImage extends Phaser.GameObjects.Image {
  constructor ({ scene, x, y, image, id, element, count, color, level }) {
    super(scene, x, y, image, id, element, count, color, level)
    this.element = element
    this.count = count
    this.color = color
    this.level = level

    this.setSize(130,170)
    this.setDataEnabled()
    this.setData("state", {element, count, color, level})
    this.setTexture(image)
    this.setPosition(x, y);
    this.setScale(1);
    this.setInteractive({useHandCursor: true})

    this.addListener('pointerdown', () => {
      this.onClickDown(id, {element, count, color, level})
    });
    this.addListener('pointerup', () => {
      this.onClickUp(id)
    });
  }

  onClickDown(id, {element, count, color, level}) {
    console.log('pointerdown image')
    console.log(this.scene.children.getAt(id+1).getData("state"))
    this.setScale(1.1)
    //send data to state
  }

  onClickUp(id) {
    console.log('pointerup image')
  }
}
