export const generateRandomPositionsArray = (quantity, factor = 0.2) => {
    /*
     * 1 - means there will be a spike there
     * 0 - means no spike
     */
    const array = [getSpikeOrNot(factor), 0];
    for (let i = 0; i < quantity; i++) {
        array.push(0, getSpikeOrNot(factor), 0);
    }

    // -1 is the trigger for spawning new spikes
    array.push(0, -1);

    return array;
};

const getSpikeOrNot = (factor) => Math.round(Math.random() + factor) <= 0 ? 0 : 1;
