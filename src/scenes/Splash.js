import Phaser from 'phaser';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' });
    }

    preload() {
    /*
     *
     * load your assets
     *
     */
        this.load.spritesheet('blocks', 'assets/images/blocks.png', {
            frameWidth: 32,
            frameHeight: 16,
        });
        this.load.image('broken_blocks', 'assets/images/broken_blocks.png');
        this.load.image('items', 'assets/images/items.png');
        this.load.image('base', 'assets/images/base.png');
        this.load.image('ball', 'assets/images/ball.png');
    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
        // TODO
    }
}
