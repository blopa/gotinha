/* globals __DEV__ */
import Phaser from 'phaser';

import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        this.gameStarted = false;
        this.currentBaseVelocity = 50;
        this.maxBaseVelocity = 300;
        this.velocitySteps = 10;

        // TODO
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
         *     asset: 'blocks',
         *     frame: 4,
         * });
         */

        // array 60
        const blocks = [1, 2, 3, 4, 5, 6, 57, 55, 33, 35, 7, 48, 49, 52, 21, 23, 24, 29, 17, 54, 40, 10, 43, 39, 50, 53, 58, 47, 8, 14, 26, 20, 36, 18, 42, 2, 9, 1, 11, 28, 27, 19, 22, 4, 51, 44, 3, 41, 31, 32, 56, 13, 25, 6, 0, 46, 59, 30, 34, 12, 15, 5, 38, 45, 16, 37];
        let x = 0;
        let y = 0;
        const blocksTypesQuantity = 3;
        this.allBlocks = this.add.container(74, 0);

        for (const block of blocks) {
            const frame = Math.floor(Math.random() * blocksTypesQuantity);
            const mushroom =
              new Mushroom({
                  scene: this,
                  x,
                  y,
                  asset: 'blocks',
                  frame,
              });

            mushroom.setOrigin(0, 0);
            mushroom.setData({
                health: frame,
            });
            this.add.existing(mushroom);
            this.allBlocks.add(mushroom);

            if (x < 320) {
                x += 32;
            } else if (x >= 320 && y < 96) {
                y += 16;
                x = 0;
            } else if (y < 96) {
                y += 16;
            } else {
                x = 0;
            }

            // console.log(mushroom.getData(['health']));
        }

        /*
         * this.base = new Mushroom({
         *     scene: this,
         *     x: 240,
         *     y: 280,
         *     asset: 'base',
         * });
         */

        /*
         * this.ball = new Mushroom({
         *     scene: this,
         *     x: 240,
         *     y: 272,
         *     asset: 'ball',
         * });
         */

        this.base = this.physics.add.sprite(240, 280, 'base')
            .setImmovable(false);
        this.base.body.setAllowGravity(false);
        this.base.setCollideWorldBounds(true);

        this.ball = this.physics.add.sprite(240, 273, 'ball');
        this.ball.body.setAllowGravity(false);
        this.ball.setCollideWorldBounds(true);

        this.input.enabled = true;
        this.dKey = this.input.keyboard.addKey('D');
        this.aKey = this.input.keyboard.addKey('A');
        this.spacebarKey = this.input.keyboard.addKey('SPACE');
        this.physics.world.setBoundsCollision();
        this.physics.add.collider(this.base, this.ball);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            if (!this.gameStarted) {
                this.gameStarted = true;
                // this.ball.setY(this.ball.y - 5);
                this.ball.body.setVelocityY(-200);
            }
        }

        if (this.dKey.isDown) {
            // this.base.setX(this.base.x + 5);
            this.base.body.setVelocityX(
              Math.min(this.currentBaseVelocity, this.maxBaseVelocity)
            );
            if (!this.gameStarted) {
                // this.ball.setX(this.ball.x + 5);
                this.ball.body.setVelocityX(
                  Math.min(this.currentBaseVelocity, this.maxBaseVelocity)
                );
            }
            this.currentBaseVelocity += this.velocitySteps;
            /*
             * this.base.body.setVelocityX(-200);
             * this.tweens.add({
             *     targets: this.base,
             *     x: this.base.x + 5,
             *     y: this.base.y,
             *     ease: 'Linear',
             * });
             */
        } else if (this.aKey.isDown) {
            // this.base.setX(this.base.x - 5);dd
            this.base.body.setVelocityX(
              -Math.min(this.currentBaseVelocity, this.maxBaseVelocity)
            );
            if (!this.gameStarted) {
                // this.ball.setX(this.ball.x - 5);
                this.ball.body.setVelocityX(
                  -Math.min(this.currentBaseVelocity, this.maxBaseVelocity)
                );
            }
            this.currentBaseVelocity += this.velocitySteps;
        } else {
            this.base.body.setVelocityX(0);
            this.currentBaseVelocity = 50;
            if (!this.gameStarted) {
                this.ball.body.setVelocityX(0);
            }
        }
    }
}
