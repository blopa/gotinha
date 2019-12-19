export const centerGameObjects = (objects) => {
    objects.forEach((object) => {
        object.anchor.setTo(0.5);
    });
};

export const generateRandomPositionsArray = (quantity) => {
    const array = [];
    for (let i = 0; i < quantity; i++) {
        array.push(0, 0, Math.round(Math.random()), 0);
    }

    return array;
};

export const generateRandomSpikePositions = (quantity) => {
    const array1 = generateRandomPositionsArray(quantity);
    const array2 = generateRandomPositionsArray(quantity);

    for (const index in array1) {
        if (array1[index] === 1 && array1[index] === array2[index]) {
            array1[index] = 0;
        }
    }

    return {
        array1,
        array2,
    };
};
