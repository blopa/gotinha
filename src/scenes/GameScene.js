/* globals __DEV__ */
import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // TODO
    }

    preload() {
        // TODO
    }

    create() {
        this.mushroom = new Mushroom({
            scene: this,
            x: 400,
            y: 300,
            asset: 'base',
        });

        this.add.existing(this.mushroom);
    }
}
