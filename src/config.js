import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'content',
    width: 150,
    height: 270,
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    localStorageName: 'phasergamegotinha',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            /*
             * debug: true,
             * gravity: {
             *     y: 500,
             * },
             */
        },
    },
};
