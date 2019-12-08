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
        this.velocitySteps = 20;
        this.points = 0;

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

        this.scoreText = this.add.text(0, 0, `Score: ${this.points}`).setDepth(999);
        this.base = this.physics.add.sprite(240, 280, 'base')
            .setImmovable();
        this.base.body.setAllowGravity(false);
        this.base.setCollideWorldBounds(true);

        this.ball = this.physics.add.sprite(240, 273, 'ball');
        this.ball.body.setAllowGravity(false);
        this.ball.body.onWorldBounds = true;
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

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
            this.physics.add.existing(mushroom);
            mushroom.body.allowGravity = false;
            mushroom.body.setImmovable();
            this.physics.add.collider(mushroom, this.ball, () => {
                /*
                 * this.ball.body.setVelocityX(-this.ball.body.velocity.x);
                 * this.ball.body.setVelocityY(-this.ball.body.velocity.y);
                 * this.ball.setBounce(1, 1);
                 */
                mushroom.destroy();
                this.points += 1;
                this.scoreText.setText(`Score: ${this.points}`);
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

        this.input.enabled = true;
        this.dKey = this.input.keyboard.addKey('D');
        this.aKey = this.input.keyboard.addKey('A');
        this.spacebarKey = this.input.keyboard.addKey('SPACE');
        this.physics.world.setBoundsCollision();
        this.physics.add.collider(this.base, this.ball, (a, b) => {
            console.log(a, b);
        });

        this.physics.world.on('worldbounds', (body, top, bottom, left, right) => {
            if (bottom && body.gameObject.texture.key === this.ball.texture.key) {
                console.log('game over!!!');
                this.scene.restart();
            }
        });
        // console.log(this.allBlocks);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            if (!this.gameStarted) {
                this.gameStarted = true;
                // this.ball.setY(this.ball.y - 5);
                this.ball.body.setVelocityY(-250);
                let velocityX = Math.floor(Math.random() * 99) + 50;
                velocityX *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
                this.ball.body.setVelocityX(velocityX);
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
