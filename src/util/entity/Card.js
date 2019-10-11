export class Card {
  constructor ({ element, count, color, level }) {
    this.element = element
    this.count = count
    this.color = color
    this.level = level
  }

  static doMatch ([card1, card2, card3]) {
    return false
  }
}
