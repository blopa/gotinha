/* globals __DEV__ */
import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // TODO
        this.hero = {};
    }

    preload() {
        // TODO
    }

    create() {
        /*
         * this.mushroom = new Mushroom({
         *     scene: this,
         *     x: 400,
         *     y: 300,
         *     asset: 'base',
         * });
         * this.add.existing(this.mushroom);
         */

        this.add.image(0, 0, 'background').setY(100);

        this.blocksGroup = this.physics.add.group();
        const height = 320;
        let y = -height;
        for (let i = 0; i < 4; i++) {
            const leftBlock = this.make.tileSprite({
                x: 0,
                y,
                height,
                width: 16,
                // angle: 90,
                key: 'tiles',
                frame: 29,
                origin: {
                    x: 0,
                    y: 0,
                },
            });
            const rightBlock = this.make.tileSprite({
                x: 134,
                y,
                height,
                width: 16,
                // angle: 90,
                key: 'tiles',
                frame: 29,
                flipX: true,
                origin: {
                    x: 0,
                    y: 0,
                },
            });
            this.blocksGroup.add(leftBlock);
            this.blocksGroup.add(rightBlock);
            y += height;
        }
        console.log(this.blocksGroup);
        this.blocksGroup.setVelocity(0, 100);

        this.hero = this.add.sprite(134, 600, 'hero', 'drop_01')
            .setOrigin(0, 0)
            .setAngle(90);

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_12', 'drop_09', 'drop_10'],
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1,
        });

        this.hero.anims.play('walking');
    }

    update() {
        // console.log(this.blocksGroup.children.entries);

        for (const sprite of this.blocksGroup.children.entries) {
            if (sprite.y - 320 > 640) {
                sprite.y = -320;
            }
        }
    }
}
