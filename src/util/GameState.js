import {isValidSet} from "./CardStack";

const POINTS_PER_SET = 10;
const TIME_LOSS_PER_FAILURE = 5;
const LIVES = 5;
const POINT_LOSS_ON_MISSING_LIVES = 20;

export class GameState {
    constructor({time}) {
        this.time = time;
        this.lives = LIVES;
        this.clickedCards = new Set();
        this.newDeck = false;
        this.score = 0;
    }

    startTimer() {
        this.timerHandle = setInterval(() => {
            this.time--;
        }, 1000);
    }

    stopTimer() {
        if (this.timerHandle) {
            clearInterval(this.timerHandle);
        }
    }

    getSelectedCards() {
        return Array.from(this.clickedCards);
    }

    isGameOver() {
        return this.time > 0;
    }

    selectCard(card) {
        this.clickedCards.add(card);

        if (set.length === 3) {
            if (isValidSet(...this.clickedCards.map(card => { return card.data}))) {
                this.score += POINTS_PER_SET;
                this.clickedCards.clear();
                this.newDeck = true;
            } else {
                this.time -= TIME_LOSS_PER_FAILURE;
                this.lives -= 1;

                if (this.lives === 0) {
                    this.lives = LIVES;
                    this.score -= POINT_LOSS_ON_MISSING_LIVES;
                }
            }
        }
    }

    unselectCard(card) {
        if (this.clickedCards.has(card)) {
            this.clickedCards.delete(card)
        }
    }
}