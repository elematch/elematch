import {BaseScene} from './BaseScene'
import {CardImage} from '../util/entity/CardImage'
import cardImg from '../assets/images/card.png'
import {CardStack} from '../util/CardStack'
import {ScoreOverlay} from './ScoreOverlay'
import {GameState} from "../util/GameState";
import {getTextureNameForCard} from "../util/entity/Card";
import { GAME_TIME } from '../constants/game'

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
        this.load.image('particle', 'src/assets/images/particles/yellow.png');
        this.load.audio('select1Sound', 'src/assets/sounds/select-1.wav')
        this.load.audio('select2Sound', 'src/assets/sounds/select-2.wav')
        this.load.audio('select3Sound', 'src/assets/sounds/select-3.wav')
        this.load.audio('selectFailSound', 'src/assets/sounds/select-fail.wav')

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

        this.data.get("gameState").newDeck = false;
    }

    preload() {
        this.preloadCardImages();
    }

    create() {
        let gameState = new GameState({time: GAME_TIME});
        this.data.set("gameState", gameState);
        gameState.startTimer();

        if (this.scene.get('ScoreOverlay')) {
            this.scene.remove('ScoreOverlay')
        }
        this.scene.add('ScoreOverlay', ScoreOverlay, true, {time: GAME_TIME});

        this.subscribeToTimeChange()
        this.data.events.addListener('changedata', (gameData) => {
            this.children.getAll().forEach((child) => {
                if (child.active) {
                    child.setSelected(false);
                }
            });

            gameState.getSelectedCards().forEach((card) => {
                this.children.getAt(card.id).setSelected(true);
                if (gameState.getSelectedCards().length === 2) {
                    let music2 = this.sound.add('select2Sound');
                    music2.play()
                } else {
                    let music1 = this.sound.add('select1Sound');
                    music1.play()
                }

                if (gameState.lastSelectionSuccess === false) {
                    let musicFail = this.sound.add('selectFailSound');
                    musicFail.play()
                    this.children.getAt(card.id).noMatchAnimation()
                }
            });

            if (gameState.newDeck) {
                let music = this.sound.add('select3Sound');
                music.play()
                this.placeDeck();
            }
        });

        this.placeDeck();
    }

    subscribeToTimeChange () {
        this.data.get('gameState').onTimeChange((gameState) => {
            if (gameState.isGameOver()) {
                this.endGame()
            }
        })
    }

    removeAllListeners () {
        let gameState = this.data.get('gameState')
        gameState.stopTimer()
        gameState.removeAllListeners()
        this.data.events.removeAllListeners()
    }

    endGame () {
        this.removeAllListeners()
        this.scene.remove('ScoreOverlay')
        let gameState = this.data.get('gameState')
        this.scene.start('GameOver', { finalScore: gameState.score })
    }
}
