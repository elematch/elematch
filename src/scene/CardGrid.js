import { BaseScene } from './BaseScene'
import { CardStack } from '../util/CardStack'
import { CardImage } from '../util/entity/CardImage'
import { getTextureNameForCard } from '../util/entity/Card'

import select1Sound from '../assets/sounds/select-1.wav'
import select2Sound from '../assets/sounds/select-2.wav'
import select3Sound from '../assets/sounds/select-3.wav'
import selectFailSound from  '../assets/sounds/select-fail.wav'

export class CardGrid extends BaseScene {
  constructor () {
    super({
      key: 'CardGrid',
    });

    this.cardstack = new CardStack();
  }

  placeDeck () {
    this.children.removeAll();
    let deck = this.cardstack.getDeck();

    //card 130 x 170
    let pos = [
      [400, 130],
      [540, 130],
      [680, 130],
      [820, 130],
      [400, 310],
      [540, 310],
      [680, 310],
      [820, 310],
      [400, 490],
      [540, 490],
      [680, 490],
      [820, 490],
    ];

    deck.forEach((e, i) => {
      let card = new CardImage({
        scene: this,
        x: pos[i][0],
        y: pos[i][1],
        image: getTextureNameForCard(e, "half"),
        id: i, ...e
      });
      card.active = false;
      card.setAlpha(0)
      this.children.add(card)
    });

    let i = 0;

    this.children.each((child) => {
      let timeline = this.tweens.createTimeline()

      timeline.add({
        targets: child,
        alpha: 0,
        duration: 100,
        ease: 'Power2',
      })
      timeline.add({
        targets: child,
        ease: 'Sine.easeIn',
        alpha: 100,
        delay: i * 20,
      });

      i++;
      if (i % 12 === 0) {
        i = 0;
      }

      timeline.play()
    })

    const gameState = this.scene.get('Game').data.get('gameState')
    gameState.newDeck = false;
  }

  create () {
    this.placeDeck()
    this.subscribeToStateChange()
  }

  subscribeToStateChange () {
    this.scene.get('Game').events.on('changedata', (gameState) => {
      this.children.getAll().forEach((child) => {
        if (child.active) {
          child.setSelected(false)
        }
      })

      gameState.getSelectedCards().forEach((card) => {
        this.children.getAt(card.id).setSelected(true);
        if (gameState.getSelectedCards().length === 2) {
          let music2 = this.sound.add('select2Sound');
          music2.play()
        } else {
          let music1 = this.sound.add('select1Sound');
          music1.play()
        }

        if (gameState.lastSelectionSuccess === false && gameState.getSelectedCards().length === 3) {
          let musicFail = this.sound.add('selectFailSound');
          musicFail.play()
          this.children.getAt(card.id).noMatchAnimation()
        }
      });

      if (gameState.getSelectedCards().length === 3) {
        gameState.resetSelectedCards()
        this.children.getAll().forEach((child) => {
          if (child.active) {
            child.setSelected(false)
          }
        })
      }

      if (gameState.newDeck) {
        let music = this.sound.add('select3Sound')
        music.play()
        this.placeDeck()
      }
    });
  }
}
