import {BaseScene} from './BaseScene'
import {CardImage} from '../util/entity/CardImage'
import cardImg from '../assets/images/card.png'
import {CardStack} from '../util/CardStack'
import {ScoreOverlay} from './ScoreOverlay'
import {GameState} from "../util/GameState";
import {getTextureNameForCard} from "../util/entity/Card";

export class Game extends BaseScene {
    constructor() {
        super({
            key: 'Game',
        });

        this.cardstack = new CardStack();
    }

    preloadCardImages () {
        const importAll = (require) => {
            const imagePaths = require.keys()
            const images = require.keys().map(require)

            const phaserImageKeys = imagePaths.map((imagePath) => {
                const fileName = imagePath.substr(2)
                return fileName.substring(0, fileName.length - 4)
            });
            for (let i = 0; i < images.length; i++) {
                this.load.image(phaserImageKeys[i], images[i])
            }
        };
        importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/))
        this.load.image('card', cardImg)
    }

    placeDeck() {
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
            let card = new CardImage({scene: this, x: pos[i][0], y: pos[i][1], image: getTextureNameForCard(e), id: i, ...e});
            card.active = false;
            this.children.add(card)
        });

        this.data.get("gameState").newDeck = false;
    }

    preload() {
        this.preloadCardImages();
    }

    create() {
        let gameState = new GameState({time: 100});
        this.data.set("gameState", gameState);
        gameState.startTimer();

        if (this.scene.get('ScoreOverlay')) {
            this.scene.remove('ScoreOverlay')
        }
        this.scene.add('ScoreOverlay', ScoreOverlay, true, {time: 100});

        this.data.events.addListener('changedata', () => {
            this.children.getAll().forEach((child) => {
                if (child.active) {
                    child.setSelected(false);
                }
            });

            gameState.getSelectedCards().forEach((card) => {
                this.children.getAt(card.id).setSelected(true);
            });

            if (gameState.newDeck) {
                this.placeDeck();
            }
        });

        this.placeDeck();
    }
}
