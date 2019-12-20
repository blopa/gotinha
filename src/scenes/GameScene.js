/* globals __DEV__ */
import Phaser from 'phaser';
import { generateRandomPositionsArray } from '../utils';
import {
    MAIN_SPIKES_GROUP,
    SECONDARY_SPIKES_GROUP,
    SPIKE_TO_LEFT_SIDE,
    SPIKE_TO_RIGHT_SIDE,
    TERTIARY_SPIKES_GROUP,
    QUATERNARY_SPIKES_GROUP,
} from '../constants';

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
        this.input.on('pointerdown', () => this.moveHero());
        this.lastUsedGroup = MAIN_SPIKES_GROUP;
        this.lastGroupSpikePosition = null;
        this.score = 0;
        this.scoring = null;
        this.isGameOver = false;

        this.config = {
            tileSize: 16,
            screenSizeDifference: 370,
            spikeQuantity: 4,
            spaceBetweenSpikes: 12,
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
        this.scoreText = this.add.text(35, this.game.config.height - 20, '00000000').setDepth(999);
        this.scoring = setInterval(() => this.updateScore(), 100);
        // console.log(this.config);

        // add background image
        this.add.image(0, 0, 'background').setY(100);

        // add hero sprites and physics
        this.hero = this.physics.add.sprite(this.config.heroXPosition, this.game.config.height - 40, 'hero', 'drop_10')
            .setOrigin(0, 0)
            .setImmovable();
        this.hero.body.width = 20; // actually height
        this.hero.body.height = 13; // actually width
        this.hero.body.setOffset(0, 1);
        this.physics.world.setBoundsCollision();
        // console.log(this.hero.body);

        // add blocks physics and groups
        this.blocksGroup = this.physics.add.group();
        this.mainSpikeGroup = this.physics.add.group();
        this.secondarySpikeGroup = this.physics.add.group();
        this.tertiarySpikeGroup = this.physics.add.group();
        this.quaternarySpikeGroup = this.physics.add.group();
        const height = this.config.chunkSize;
        let y = -(height + this.config.screenSizeDifference);
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
        // console.log(this.blocksGroup);

        // console.log(this.hero);

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

        // generate spikes
        this.generateSpikes(spikeConfig, this.mainSpikeGroup, this.config.spikeQuantity);

        // set group speed
        this.blocksGroup.setVelocity(0, this.speed);
        this.mainSpikeGroup.setVelocity(0, this.speed);
        // this.secondarySpikeGroup.setVelocity(0, this.speed);

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
        this.physics.add.collider(this.hero, this.blocksGroup);
        this.physics.add.collider(this.hero, this.mainSpikeGroup, this.gameOver);
        this.physics.add.collider(this.hero, this.secondarySpikeGroup, this.gameOver);
        this.physics.add.collider(this.hero, this.tertiarySpikeGroup, this.gameOver);
        this.physics.world.on('worldbounds', (body, top, bottom, left, right) => {
            if (top) {
                body.setVelocity(0, this.speed);
            } else if (bottom && body.gameObject.name === 'triggerSpikes') {
                body.gameObject.destroy();
                // console.log('generate new spike!!');
                // console.log('current group:', this.lastUsedGroup);
                // alert(`group: ${this.lastUsedGroup}`);
                switch (this.lastUsedGroup) {
                    case QUATERNARY_SPIKES_GROUP: {
                        this.lastUsedGroup = MAIN_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.mainSpikeGroup, this.config.spikeQuantity);
                        this.mainSpikeGroup.setVelocity(0, this.speed);
                        this.secondarySpikeGroup.clear(true, true);
                        break;
                    }
                    case TERTIARY_SPIKES_GROUP: {
                        this.lastUsedGroup = QUATERNARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.quaternarySpikeGroup, this.config.spikeQuantity);
                        this.quaternarySpikeGroup.setVelocity(0, this.speed);
                        this.mainSpikeGroup.clear(true, true);
                        break;
                    }
                    case SECONDARY_SPIKES_GROUP: {
                        this.lastUsedGroup = TERTIARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.tertiarySpikeGroup, this.config.spikeQuantity);
                        this.tertiarySpikeGroup.setVelocity(0, this.speed);
                        this.quaternarySpikeGroup.clear(true, true);
                        break;
                    }
                    case MAIN_SPIKES_GROUP: {
                        this.lastUsedGroup = SECONDARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.secondarySpikeGroup, this.config.spikeQuantity);
                        this.secondarySpikeGroup.setVelocity(0, this.speed);
                        this.tertiarySpikeGroup.clear(true, true);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });

        // console.log(this.cameras.main);
    }

    update() {
        if (this.isGameOver) {
            return;
        }

        // hero moving commands
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.moveHero();
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
            if (blockChunk.y - 320 >= this.game.config.height) {
                blockChunk.y = -(this.config.chunkSize / 2 + this.config.screenSizeDifference);
            }
        }
    }

    generateSpikes = (spikeConfig, group, quantity) => {
        const spikesArray = generateRandomPositionsArray(quantity);
        let spikePosition = -this.config.screenSizeDifference;
        let side = SPIKE_TO_LEFT_SIDE;

        if (this.lastGroupSpikePosition === side) {
            side = SPIKE_TO_RIGHT_SIDE;
        }

        // loop spikes for both sides
        for (const spikeIndex in spikesArray) {
            spikePosition += this.config.spaceBetweenSpikes;
            // group.add(this.add.text(20, spikePosition - 10, `${spikesArray[spikeIndex]}I${spikeIndex} S${side}`).setDepth(999));
            if (spikesArray[spikeIndex] === 0) {
                continue;
            }

            // console.log('position', spikePosition);
            // console.log('side', side);

            let spike;
            const originalSide = side;
            if (side === SPIKE_TO_LEFT_SIDE) {
                spike = this.make.sprite({
                    ...spikeConfig,
                    y: spikePosition,
                });
                group.add(spike);
                spike.body.setOffset(-10, -6).setImmovable();
                side = SPIKE_TO_RIGHT_SIDE;
            } else {
                spike = this.make.sprite({
                    ...spikeConfig,
                    y: spikePosition,
                    x: 123,
                    flipY: true,
                });
                group.add(spike);
                spike.body.setOffset(3, -6).setImmovable();
                side = SPIKE_TO_LEFT_SIDE;
            }

            spike.body.height = 6; // this is actually the width
            if (Number(spikeIndex) + 1 === spikesArray.length) {
                // the last spike is always 1
                spike.body.onWorldBounds = true;
                spike.body.setCollideWorldBounds(true);
                spike.setName('triggerSpikes');
                // spike.setScale(2);
                spike.setVisible(false);
                this.lastGroupSpikePosition = originalSide;
            }
        }

        // group.add(this.add.text(35, spikePosition, `A: ${this.lastUsedGroup}`).setDepth(999));
        // const text = this.add.text(-10, spikePosition, '-----------------------------------------------------------')
        //     .setDepth(999);
        // group.add(text);
        // text.body.setImmovable();
    }

    gameOver = (hero, foe) => {
        if (foe.name === 'triggerSpikes') {
            return;
        }

        // console.log('game over!');
        this.isGameOver = true;
        clearInterval(this.scoring);
        // shake the camera
        this.cameras.main.shake(500);

        // restart game
        this.time.delayedCall(500, () => {
            this.scene.restart();
        });
    };

    moveHero = () => {
        this.hero.anims.play('jumping');

        if (!this.hero.flipX) {
            this.hero.setVelocityX(-this.jumpSpeed);
        } else {
            this.hero.setVelocityX(this.jumpSpeed);
        }
    }

    updateScore = () => {
        // TODO
        this.score += 1;
        this.scoreText.setText(`${this.score}`.padStart(8, '0'));
    }
}
