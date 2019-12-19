/* globals __DEV__ */
import Phaser from 'phaser';
import { generateRandomSpikePositions } from '../utils';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // TODO
        this.hero = {};
        this.speed = 100;
        this.jumpSpeed = 800;
        this.spacebarKey = this.input.keyboard.addKey('SPACE');

        this.config = {
            tileSize: 16,
        };

        this.config = {
            ...this.config,
            heroXPosition: this.game.config.width - this.config.tileSize,
            chunkSize: this.config.tileSize * 20,
        };
    }

    preload() {
        // TODO
    }

    create() {
        console.log(this.config);
        // console.log(generateRandomSpikePositions(20));
        // add background image
        this.add.image(0, 0, 'background').setY(100);

        // add hero sprites and physics
        this.hero = this.physics.add.sprite(this.config.heroXPosition, 600, 'hero', 'drop_10')
            .setOrigin(0, 0)
            .setImmovable();
        this.hero.body.width = 20;
        console.log(this.hero.body);

        // add blocks physics and groups
        // TODO
        this.blocksGroup = this.physics.add.group();
        const height = this.config.chunkSize;
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

        // add spikes
        const spikeConfig = {
            height: 7,
            width: 11,
            x: 27,
            y: 30,
            angle: 90,
            key: 'items',
            frame: 'items_18',
            flipX: true,
            // immovable: true,
            origin: {
                x: 0,
                y: 0,
            },
        };

        // MEGA TODO
        const spikesArray = generateRandomSpikePositions(20);
        let spikePosition = 0;

        // loop spikes for the left size
        for (const spikeBlock of spikesArray.array1) {
            spikePosition += this.config.tileSize;
            if (spikeBlock === 0) {
                continue;
            }

            const spikeLeft = this.make.sprite({
                ...spikeConfig,
                y: spikePosition,
            }).setName('spike');

            this.blocksGroup.add(spikeLeft);
            spikeLeft.body.setOffset(-10, -10).setImmovable();
        }

        // loop spikes for the right size
        spikePosition = 0;
        for (const spikeBlock of spikesArray.array2) {
            spikePosition += this.config.tileSize;
            if (spikeBlock === 0) {
                continue;
            }

            const spikeRight = this.make.sprite({
                ...spikeConfig,
                y: spikePosition,
                x: 123,
                flipY: true,
            }).setName('spike');

            this.blocksGroup.add(spikeRight);
            spikeRight.body.setOffset(3, -10).setImmovable();

            spikePosition += this.config.tileSize;
        }

        // for (let i = 0; i < 10; i++) {
        //     y = spikeConfig.y * Math.random() * 100;
        //     const spikeLeft = this.make.sprite({
        //         ...spikeConfig,
        //         y,
        //     }).setName('spike');
        //     const spikeRight = this.make.sprite({
        //         ...spikeConfig,
        //         x: 123,
        //         y: y + 30 * Math.random(),
        //         flipY: true,
        //     }).setName('spike');
        //
        //     this.blocksGroup.add(spikeLeft);
        //     this.blocksGroup.add(spikeRight);
        //     spikeLeft.body.setOffset(-10, -10).setImmovable();
        //     spikeRight.body.setOffset(3, -10).setImmovable();
        // }

        // set group speed
        this.blocksGroup.setVelocity(0, this.speed);

        // creates hero animation
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

        // plays animation
        this.hero.anims.play('walking');

        // set collision
        this.physics.add.collider(this.hero, this.blocksGroup, (hero, foe) => {
            if (foe.name === 'spike') {
                console.log('game over!');
                this.scene.restart();
            }
        });
    }

    update() {
        // hero moving commands
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

        // calculates the restart of the blocks chink
        for (const blockChunk of this.blocksGroup.children.entries) {
            if (blockChunk.y - 320 >= 640) {
                blockChunk.y = -(this.config.chunkSize / 2);
            }
        }
    }
}
