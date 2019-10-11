import {Card} from "./entity/Card";

let getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomCard = () => {
    return new Card({
        element: getRandomInt(1, 3),
        color: getRandomInt(1, 3),
        count: getRandomInt(1, 3),
        level: getRandomInt(1, 3),
    });
};

export class Deck {
    static create() {
        const [elements, colors, counts, levels] = Array(4).fill().map(() => {
            let matchType = getRandomInt(1, 2);

            if (matchType === 1) {
                let value = getRandomInt(1, 3);

                return [value, value, value]
            } else {
                return [1, 2, 3]
            }
        });

        // create three cards in a set
        let set = Array(3).fill().map((_, index) => {
            return new Card({
                element: elements[index],
                color: colors[index],
                count: counts[index],
                level: levels[index],
            });
        });

        return set.concat(Array(9).fill().map(getRandomCard));
    }
}


