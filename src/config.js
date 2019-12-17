import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'content',
    width: 150,
    height: 640,
    localStorageName: 'phaseres6webpack',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            // debug: true,
            // gravity: {
            //     y: 500,
            // },
        },
    },
};
