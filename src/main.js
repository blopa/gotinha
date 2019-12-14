import Phaser from 'phaser';

import BootScene from './scenes/BootScene';
import SplashScene from './scenes/SplashScene';
import GameScene from './scenes/GameScene';

import config from './config';

const gameConfig = Object.assign(config, {
    scene: [BootScene, SplashScene, GameScene],
});

class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);
    }
}

window.game = new Game();
