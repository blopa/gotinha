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
        // this.load.image('tiles', 'assets/images/tiles.png');
        this.load.spritesheet('tiles', 'assets/images/tiles.png', { frameWidth: 16, frameHeight: 16 })
        this.load.atlas('hero', 'assets/atlas/drops.png', 'assets/atlas/drops_atlas.json');
    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
        // TODO
    }
}
