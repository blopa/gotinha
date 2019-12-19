export const centerGameObjects = (objects) => {
    objects.forEach((object) => {
        object.anchor.setTo(0.5);
    });
};

export const generateRandomPositionsArray = (quantity) => {
    const array = [1, 0];
    for (let i = 0; i < quantity; i++) {
        array.push(0, Math.round(Math.random() + 0.1), 0);
    }

    array.push(0, 1);

    return array;
};
