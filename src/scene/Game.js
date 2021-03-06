import {BaseScene} from './BaseScene'
import {CardImage} from '../util/entity/CardImage'
import cardImg from '../assets/images/card.png'
import {CardStack} from '../util/CardStack'
import {ScoreOverlay} from './ScoreOverlay'
import {GameState} from "../util/GameState";
import {getTextureNameForCard} from "../util/entity/Card";
import { GAME_TIME } from '../constants/game'
import { CardGrid } from './CardGrid'
import { LastMatch } from './LastMatch'
import { Background } from './Background'

export class Game extends BaseScene {
    constructor() {
        super({
            key: 'Game',
        });

        this.cardstack = new CardStack();
    }

    preload() {
    }

    create() {
        let gameState = new GameState({time: GAME_TIME});
        this.data.set("gameState", gameState);
        gameState.startTimer();

        if (this.scene.get('Background')) {
            this.scene.remove('Background')
        }
        this.scene.add('Background', Background, true)

        if (this.scene.get('ScoreOverlay')) {
            this.scene.remove('ScoreOverlay')
        }
        this.scene.add('ScoreOverlay', ScoreOverlay, true, {time: GAME_TIME});

        if (this.scene.get('CardGrid')) {
            this.scene.remove('CardGrid')
        }
        this.scene.add('CardGrid', CardGrid, true)

        if (this.scene.get('LastMatch')) {
            this.scene.remove('LastMatch')
        }
        this.scene.add('LastMatch', LastMatch, true)

        this.subscribeToTimeChange()
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
        this.scene.remove('CardGrid')
        this.scene.remove('LastMatch')
        this.scene.remove('Background')
        let gameState = this.data.get('gameState')
        this.scene.start('GameOver', { finalScore: gameState.score })
    }
}
