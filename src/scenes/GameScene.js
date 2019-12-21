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
        this.spacebarKey = this.input.keyboard.addKey('SPACE');
        this.input.on('pointerdown', () => this.moveHero());
        this.lastUsedGroup = MAIN_SPIKES_GROUP;
        this.lastGroupSpikePosition = null;
        this.score = 0;
        this.scoring = null;
        this.isGameOver = false;
        this.doneIncreasingSpikeSpawningSpeed = false;

        this.config = {
            tileSize: 16,
            screenSizeDifference: 370,
            spikeQuantity: 4,
            spaceBetweenSpikes: 16,
            jumpSpeed: 800,
            speed: 70,
            spikeGenerationFactor: -0.3,
        };

        this.config = {
            ...this.config,
            heroXPosition: this.game.config.width - this.config.tileSize,
            heroYPosition: this.game.config.height - 60,
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
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        // add hero sprites and physics
        this.hero = this.physics.add.sprite(this.config.heroXPosition, this.config.heroYPosition, 'hero', 'drop_03')
            .setOrigin(0, 0)
            .setImmovable();
        this.hero.body.width = 30; // actually height
        this.hero.body.height = 26; // actually width
        this.hero.body.setOffset(0, 2);
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
                key: 'tile',
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
                key: 'tile',
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
            x: 16,
            y: 30,
            // angle: 90,
            key: 'spike',
            // immovable: true,
            origin: {
                x: 0,
                y: 0,
            },
        };

        // generate spikes
        this.generateSpikes(spikeConfig, this.mainSpikeGroup, this.config.spikeQuantity);

        // set group speed
        this.blocksGroup.setVelocity(0, this.config.speed);
        this.mainSpikeGroup.setVelocity(0, this.config.speed);
        // this.secondarySpikeGroup.setVelocity(0, this.config.speed);

        // creates hero animation
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_01', 'drop_02', 'drop_03'],
            }),
            frameRate: 8,
            yoyo: true,
            repeat: -1,
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_jump_01'],
            }),
            frameRate: 1,
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
                body.setVelocity(0, this.config.speed);
            } else if (bottom && body.gameObject.name === 'triggerSpikes') {
                body.gameObject.destroy();
                /*
                 * console.log('generate new spike!!');
                 * console.log('current group:', this.lastUsedGroup);
                 * alert(`group: ${this.lastUsedGroup}`);
                 */
                switch (this.lastUsedGroup) {
                    case QUATERNARY_SPIKES_GROUP: {
                        this.lastUsedGroup = MAIN_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.mainSpikeGroup, this.config.spikeQuantity);
                        this.mainSpikeGroup.setVelocity(0, this.config.speed);
                        this.secondarySpikeGroup.clear(true, true);
                        break;
                    }
                    case TERTIARY_SPIKES_GROUP: {
                        this.lastUsedGroup = QUATERNARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.quaternarySpikeGroup, this.config.spikeQuantity);
                        this.quaternarySpikeGroup.setVelocity(0, this.config.speed);
                        this.mainSpikeGroup.clear(true, true);
                        break;
                    }
                    case SECONDARY_SPIKES_GROUP: {
                        this.lastUsedGroup = TERTIARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.tertiarySpikeGroup, this.config.spikeQuantity);
                        this.tertiarySpikeGroup.setVelocity(0, this.config.speed);
                        this.quaternarySpikeGroup.clear(true, true);
                        break;
                    }
                    case MAIN_SPIKES_GROUP: {
                        this.lastUsedGroup = SECONDARY_SPIKES_GROUP;
                        this.generateSpikes(spikeConfig, this.secondarySpikeGroup, this.config.spikeQuantity);
                        this.secondarySpikeGroup.setVelocity(0, this.config.speed);
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

        this.increaseDifficulty();

        // hero moving commands
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.moveHero();
        }

        if (this.hero.x < this.config.tileSize) {
            // left side
            this.hero.setVelocityX(0);
            this.hero.x = this.config.tileSize;
            this.hero.y = this.hero.y + 15;
            this.hero.body.setOffset(30, 28);
            this.hero.setScale(-1);
            this.hero.anims.play('walking');
        }

        if (this.hero.x > this.config.heroXPosition) {
            // right side
            this.hero.setVelocityX(0);
            this.hero.x = this.config.heroXPosition;
            this.hero.y = this.config.heroYPosition;
            this.hero.body.setOffset(0, 2);
            this.hero.setScale(1);
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
        const spikesArray = generateRandomPositionsArray(quantity, this.config.spikeGenerationFactor);
        let spikePosition = -this.config.screenSizeDifference;
        let side = SPIKE_TO_LEFT_SIDE;

        if (this.lastGroupSpikePosition === side) {
            side = SPIKE_TO_RIGHT_SIDE;
        }

        // loop spikes for both sides
        for (const spikeIndex in spikesArray) {
            spikePosition += this.config.spaceBetweenSpikes;
            // group.add(this.add.text(20, spikePosition, `${spikesArray[spikeIndex]}I${spikeIndex}S${side}`).setDepth(999));
            if (spikesArray[spikeIndex] === 0) {
                continue;
            } else if (spikesArray[spikeIndex] === -1) {
                const text = this.add.text(-10, spikePosition, '---------------')
                    .setDepth(999);
                group.add(text);
                text.body.onWorldBounds = true;
                text.body.setCollideWorldBounds(true);
                text.body.setImmovable();
                text.setName('triggerSpikes');
                // spike.setScale(2);
                if (!this.game.config.physics.arcade.debug) {
                    text.setVisible(false);
                }
                continue;
            }

            /*
             * console.log('position', spikePosition);
             * console.log('side', side);
             */

            let spike;
            const originalSide = side;
            if (side === SPIKE_TO_LEFT_SIDE) {
                spike = this.make.sprite({
                    ...spikeConfig,
                    y: spikePosition,
                });
                group.add(spike);
                spike.body.setOffset(0, 2).setImmovable();
                side = SPIKE_TO_RIGHT_SIDE;
            } else {
                spike = this.make.sprite({
                    ...spikeConfig,
                    y: spikePosition,
                    x: 108,
                    flipX: true,
                });
                group.add(spike);
                spike.body.setOffset(0, 2).setImmovable();
                side = SPIKE_TO_LEFT_SIDE;
            }

            spike.body.height = 12; // this is actually the width
            this.lastGroupSpikePosition = originalSide;
        }

        /*
         * group.add(this.add.text(35, spikePosition, `A: ${this.lastUsedGroup}`).setDepth(999));
         * const text = this.add.text(-10, spikePosition, '-----------------------------------------------------------')
         *     .setDepth(999);
         * group.add(text);
         * text.body.setImmovable();
         */
    }

    gameOver = (hero, foe) => {
        if (foe.name === 'triggerSpikes' || this.isGameOver) {
            return;
        }

        // console.log('game over!');

        this.isGameOver = true;
        this.scoreText.destroy();
        this.input.on('pointerdown', () => null);
        clearInterval(this.scoring);
        this.setVelocityToAllGroups(0);
        const messageBox = new Phaser.Geom.Rectangle(25, 100, 100, 50);
        const graphics = this.add.graphics({ fillStyle: { color: 0x095165 } });
        graphics.fillRectShape(messageBox);
        this.add.text(35, 110, `Score:\n${this.getScore()}`).setDepth(999);
        // shake the camera
        this.cameras.main.shake(500);

        // restart game
        this.time.delayedCall(500, () => {
            this.input.on('pointerdown', () => this.scene.restart());
        });
    };

    moveHero = () => {
        this.hero.anims.play('jumping');
        console.log(this.hero.scale);

        if (this.hero.scale === 1) {
            this.hero.setVelocityX(-this.config.jumpSpeed);
        } else {
            this.hero.setVelocityX(this.config.jumpSpeed);
        }
    }

    updateScore = () => {
        // TODO
        this.score += 1;
        this.scoreText.setText(this.getScore());
    }

    getScore = () => `${this.score}`.padStart(8, '0')

    increaseDifficulty = () => {
        if (!this.doneIncreasingSpikeSpawningSpeed) {
            if (this.score > 2500) {
                this.config.speed = 200;
                this.doneIncreasingSpikeSpawningSpeed = true;
            } else if (this.score > 1500) {
                this.config.speed = 170;
            } else if (this.score > 1000) {
                this.config.speed = 150;
            } else if (this.score > 700) {
                this.config.spikeGenerationFactor = 0.4;
                this.config.speed = 140;
            } else if (this.score > 600) {
                this.config.spikeGenerationFactor = 0.3;
                this.config.speed = 130;
            } else if (this.score > 500) {
                this.config.spikeGenerationFactor = 0.2;
                this.config.speed = 120;
            } else if (this.score > 400) {
                this.config.spikeGenerationFactor = 0.1;
                this.config.speed = 110;
            } else if (this.score > 300) {
                this.config.spikeGenerationFactor = 0;
                this.config.speed = 100;
            } else if (this.score > 200) {
                this.config.spikeGenerationFactor = -0.1;
                this.config.speed = 90;
            } else if (this.score > 100) {
                this.config.spikeGenerationFactor = -0.2;
                this.config.speed = 80;
            }

            this.setVelocityToAllGroups(this.config.speed);
        }
    }

    setVelocityToAllGroups = (velocity) => {
        this.blocksGroup.setVelocity(0, velocity);
        this.mainSpikeGroup.setVelocity(0, velocity);
        this.secondarySpikeGroup.setVelocity(0, velocity);
        this.tertiarySpikeGroup.setVelocity(0, velocity);
        this.quaternarySpikeGroup.setVelocity(0, velocity);
    }
}
