import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'content',
    width: 500,
    height: 300,
    localStorageName: 'phaseres6webpack',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            debug: false,
            gravity: {
                y: 500,
            },
        },
    },
};
