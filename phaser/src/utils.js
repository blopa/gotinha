export const generateRandomSpikePositionsArray = (quantity = 4, factor = 0.2) => {
    /*
     * 1 - means there will be a spike there
     * 0 - means no spike
     */
    const array = [getSpikeOrNot(factor + 0.2), 0];
    for (let i = 0; i < quantity; i++) {
        array.push(0, getSpikeOrNot(factor), 0);
    }

    // -1 is the trigger for spawning new spikes
    array.push(0, -1);

    return array;
};

export const generateRandomCrystalPositionsArray = (factor = 0.95, quantity = 16) => {
    /*
     * 0 > means there will be a crystal there
     * 0 <= means no crystal
     */
    const array = [];
    for (let i = 0; i < quantity; i++) {
        array.push(getCrystalOrNot(factor));
    }

    return array;
};

const getCrystalOrNot = (factor) => {
    /* eslint-disable array-element-newline */
    const crystalTypesArray = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2,
        3, 3, 3,
        4,
    ];

    if (Math.random() >= factor) {
        return crystalTypesArray[Math.floor(Math.random() * crystalTypesArray.length)];
    }

    return 0;
};

const getSpikeOrNot = (factor) => Math.round(Math.random() + factor) <= 0 ? 0 : 1;
