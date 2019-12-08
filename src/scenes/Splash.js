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
        this.load.image('blocks', 'assets/images/blocks.png');
        this.load.image('broken_blocks', 'assets/images/broken_blocks.png');
        this.load.image('items', 'assets/images/items.png');
        this.load.image('base', 'assets/images/base.png');
        this.load.image('ball', 'assets/images/ball.png');
        this.load.tilemapTiledJSON('blocksTilemap', 'src/tilesets/blocks.json');
    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
        // TODO
    }
}
