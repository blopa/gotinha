/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // TODO
        this.hero = {};
        this.speed = 100;
        this.jumpSpeed = 400;
        this.spacebarKey = this.input.keyboard.addKey('SPACE');

        this.config = {
            tileSize: 16,
        };

        this.config = {
            ...this.config,
            heroXPosition: this.game.config.width - this.config.tileSize,
        };
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

        console.log(this.config);
        this.add.image(0, 0, 'background').setY(100);

        this.hero = this.physics.add.sprite(this.config.heroXPosition, 600, 'hero', 'drop_10')
            .setOrigin(0, 0)
            .setImmovable();

        // this.hero.body.height = 15;
        this.hero.body.width = 20;
        console.log(this.hero.body);

        this.blocksGroup = this.physics.add.group();
        const height = this.config.tileSize * 20;
        let y = -height;
        for (let i = 0; i < 4; i++) {
            const leftBlock = this.make.tileSprite({
                x: 0,
                y,
                height,
                width: this.config.tileSize,
                // angle: 90,
                key: 'tiles',
                frame: 29,
                origin: {
                    x: 0,
                    y: 0,
                },
            });
            const rightBlock = this.make.tileSprite({
                x: this.config.heroXPosition,
                y,
                height,
                width: this.config.tileSize,
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
            leftBlock.body.setImmovable();
            rightBlock.body.setImmovable();
            y += height - this.config.tileSize;
        }
        console.log(this.blocksGroup);
        console.log(this.hero);
        this.blocksGroup.setVelocity(0, this.speed);

        // creates animation
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_12', 'drop_09', 'drop_10'],
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1,
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_06', 'drop_07', 'drop_08'],
            }),
            frameRate: 6,
        });

        this.hero.anims.play('walking');
        this.physics.add.collider(this.hero, this.blocksGroup);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.hero.anims.play('jumping');

            if (!this.hero.flipX) {
                this.hero.setVelocityX(-this.jumpSpeed);
            } else {
                this.hero.setVelocityX(this.jumpSpeed);
            }

            // this.hero.flipX = !this.hero.flipX;
        }

        if (this.hero.x < this.config.tileSize) {
            this.hero.setVelocityX(0);
            this.hero.x = this.config.tileSize;
            this.hero.flipX = true;
            this.hero.anims.play('walking');
        }

        if (this.hero.x > this.config.heroXPosition) {
            this.hero.setVelocityX(0);
            this.hero.x = this.config.heroXPosition;
            this.hero.flipX = false;
            this.hero.anims.play('walking');
        }

        for (const sprite of this.blocksGroup.children.entries) {
            if (sprite.y - 320 >= 640) {
                sprite.y = -(this.config.tileSize * 10);
            }
        }
    }
}
