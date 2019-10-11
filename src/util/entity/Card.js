export class Card {
  constructor ({ element, count, color, level }) {
    this.element = element
    this.count = count
    this.color = color
    this.level = level
  }

  /**
   *
   * @param cards Card[]
   * @return {boolean | string}
   */
  static doCardsMatch (cards) {
    const elementsMatch = Card.doesPropertyMatch(cards, 'element')
    const countsMatch = Card.doesPropertyMatch(cards, 'count')
    const colorsMatch = Card.doesPropertyMatch(cards, 'color')
    const levelsMatch = Card.doesPropertyMatch(cards, 'level')

    return (elementsMatch && countsMatch && colorsMatch && levelsMatch)
  }

  /**
   *
   * @param cards Card[]
   * @param propertyName string
   */
  static doesPropertyMatch (cards, propertyName) {
    const [card1, card2, card3] = cards
    if (card1[propertyName] === card2[propertyName] && card2[propertyName] === card3[propertyName]) {
      return true
    }
    if (
      card1[propertyName] !== card2[propertyName]
      && card2[propertyName] !== card3[propertyName]
      && card3[propertyName] !== card1[propertyName]
    ) {
      return true
    }
    return false
  }
}
