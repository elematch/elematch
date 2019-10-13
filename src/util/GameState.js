import {getSetDifficulty, isValidSet} from "./CardStack";

const DIFFICULTY_SCORE_MULTIPLIER = 10;
const TIME_LOSS_PER_FAILURE = 5;
const LIVES = 5;
const POINT_LOSS_ON_MISSING_LIVES = 20;

export class GameState {
    constructor({scene, time}) {
        this.initialTime = time;
        this.time = time;
        this.lives = LIVES;
        this.clickedCards = new Map();
        this.newDeck = true;
        this.score = 0;
        this.lastSelectionSuccess = null;
        this.onTimeChangeCallbacks = []
    }

    onTimeChange (callBack) {
        this.onTimeChangeCallbacks.push(callBack)
    }

    emitTimeChange () {
        this.onTimeChangeCallbacks.forEach((callback) => {
            if (typeof callback !== 'function') {
                return
            }
            callback(this)
        })
    }

    removeAllListeners () {
        this.onTimeChangeCallbacks = []
    }

    startTimer() {
        this.timerHandle = setInterval(() => {
            this.time--;
            this.emitTimeChange()
        }, 1000);
    }

    stopTimer() {
        if (this.timerHandle) {
            clearInterval(this.timerHandle);
        }
    }

    getSelectedCards() {
        return Array.from(this.clickedCards).map(([id, card]) => {
            return {id: id, data: card};
        });
    }

    isGameOver() {
        return this.time <= 0;
    }

    toggleCard({id, data}) {
        if (this.clickedCards.has(id)) {
            this.clickedCards.delete(id);
        } else {
            this.clickedCards.set(id, data);

            if (this.clickedCards.size === 3) {

                let cards = Array.from(this.clickedCards).map(([_, data]) => {
                   return data;
                });

                if (isValidSet(...cards)) {
                    this.lastSelectionSuccess = true;
                    this.score += getSetDifficulty(...cards) * DIFFICULTY_SCORE_MULTIPLIER;
                    this.clickedCards.clear();
                    this.newDeck = true;
                } else {
                    this.lastSelectionSuccess = false;
                    this.time -= TIME_LOSS_PER_FAILURE;
                    this.time = Math.max(this.time, 0)
                    this.lives -= 1;
                    this.clickedCards.clear();

                    if (this.lives === 0) {
                        this.lives = LIVES;
                        this.score -= POINT_LOSS_ON_MISSING_LIVES;
                    }
                    this.emitTimeChange()
                }
            }
        }
    }
}
