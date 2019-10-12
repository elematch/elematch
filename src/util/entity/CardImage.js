export class CardImage extends Phaser.GameObjects.Image {
  constructor ({ scene, x, y, image, id, element, count, color, level }) {
    super(scene, x, y, image, id, element, count, color, level);
    this.element = element;
    this.count = count;
    this.color = color;
    this.level = level;

    this.setSize(130,170)
    this.setDataEnabled();
    this.setData("state", {element, count, color, level});
    this.setTexture(image);
    this.setPosition(x, y);
    this.setScale(1);
    this.setInteractive({useHandCursor: true});

    this.addListener('pointerdown', () => {
      this.onClickDown({id: id, data: {element, count, color, level}})
    });
  }

  onClickDown(card) {
    this.scene.data.get("gameState").toggleCard(card);
    this.scene.events.emit("changedata");
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
