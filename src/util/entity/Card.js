const ELEMENT = {
  1: "fire",
  2: "water",
  3: "energy"
};

const COLOR = {
  1: "red",
  2: "blue",
  3: "yellow"
};

export let getTextureNameForCard = (card) => {
  return ELEMENT[card.element] + "-" + COLOR[card.color] + "-" + card.count;
};

export class Card {
  constructor({element, count, color, level}) {
    this.element = element;
    this.count = count;
    this.color = color;
    this.level = level;
}
}
