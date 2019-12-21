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
        // this.load.image('blocks', 'assets/images/blocks.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('tap', 'assets/images/tap.png');
        // this.load.image('tiles', 'assets/images/tiles.png');
        this.load.image('tile', 'assets/images/tile.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.atlas('hero', 'assets/images/drop.png', 'assets/atlas/drop_atlas.json');
        this.load.atlas('crystals', 'assets/images/crystals.png', 'assets/atlas/crystals_atlas.json');
    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
        // TODO
    }
}
