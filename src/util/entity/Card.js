export class Card {
  constructor ({ element, count, color, level }) {
    this.element = element
    this.count = count
    this.color = color
    this.level = level
  }

  /**
   * public
   * @param card1 Card
   * @param card2 Card
   * @param card3 Card
   * @return {boolean | string}
   */
  static doCardsMatch (card1, card2, card3) {
    const elementsMatch = Card.doesPropertyMatch(card1, card2, card3, 'element')
    const countsMatch = Card.doesPropertyMatch(card1, card2, card3, 'count')
    const colorsMatch = Card.doesPropertyMatch(card1, card2, card3, 'color')
    const levelsMatch = Card.doesPropertyMatch(card1, card2, card3, 'level')

    return (elementsMatch && countsMatch && colorsMatch && levelsMatch)
  }

  /**
   * private
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
