import Phaser from 'phaser';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' });
    }

    preload() {
        // images
        this.load.image('background', 'assets/images/background.png');
        this.load.image('tap', 'assets/images/tap.png');
        this.load.image('gotinha', 'assets/images/gotinha.png');
        this.load.image('tile', 'assets/images/christmas_theme/tile.png');
        this.load.image('spike', 'assets/images/christmas_theme/spike.png');
        this.load.image('snow', 'assets/images/christmas_theme/snow.png');

        // atlas
        this.load.atlas('hero', 'assets/images/christmas_theme/drop.png', 'assets/atlas/drop_christmas_atlas.json');
        this.load.atlas('crystals', 'assets/images/christmas_theme/crystals.png', 'assets/atlas/crystals_atlas.json');
        this.load.atlas('audio', 'assets/images/audio.png', 'assets/atlas/audio_atlas.json');

        // sounds
        this.load.audio('soundtrack', 'assets/audio/soundtrack/soundtrack.ogg');
        this.load.audio('crystal', 'assets/audio/sfx/crystal.ogg');
        this.load.audio('gameover', 'assets/audio/sfx/gameover.ogg');
        this.load.audio('jump', 'assets/audio/sfx/jump.ogg');
    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
        // TODO
    }
}
