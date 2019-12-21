/* globals __DEV__ */
import Phaser from 'phaser';
import { generateRandomCrystalPositionsArray, generateRandomSpikePositionsArray } from '../utils';
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
        this.spacebarKey = this.input.keyboard.addKey('SPACE');
        this.input.once('pointerdown', this.handleStartGame);

        this.hero = null;
        this.tapIcon = null;
        this.createdByText = null;
        this.lastUsedGroup = MAIN_SPIKES_GROUP;
        this.lastGroupSpikePosition = null;
        this.score = 0;
        this.tapCount = 0;
        this.scoring = null;
        this.hasGameStarted = false;
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
            heroYPosition: this.game.config.height - 110,
            chunkSize: this.config.tileSize * 20,
        };
    }

    preload() {
        // TODO
    }

    create() {
        // add background image
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.tapIcon = this.add.image(this.game.config.width / 2, this.game.config.height - 60, 'tap');
        this.gotinhaLogo = this.add.image(this.game.config.width / 2, 100, 'gotinha')
            .setScale(0.50)
            .setDepth(999);
        // console.log(this.config);
        this.createdByText = this.add.text(30, this.game.config.height - 150, ' Created by\nPablo Pirata', {
            fontSize: '13px',
        }).setDepth(999);

        // this.add.existing(this.createCrystal(50, 50, 1));

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

        // crystal groups
        this.mainCrystalGroup = this.physics.add.group();
        this.secondaryCrystalGroup = this.physics.add.group();
        this.tertiaryCrystalGroup = this.physics.add.group();
        this.quaternaryCrystalGroup = this.physics.add.group();
        // console.log(this.blocksGroup);

        this.generateBlockChunks(this.blocksGroup);

        // console.log(this.hero);

        // creates hero animation
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('hero', {
                frames: ['drop_01', 'drop_02', 'drop_03'],
            }),
            frameRate: 6,
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
            // this.hero.y = this.hero.y + 15;
            this.hero.body.setOffset(30, -2);
            this.hero.setScale(-1);
            this.hero.setFlipY(true);
            this.hero.anims.play('walking');
        }

        if (this.hero.x > this.config.heroXPosition) {
            // right side
            this.hero.setVelocityX(0);
            this.hero.x = this.config.heroXPosition;
            // this.hero.y = this.config.heroYPosition;
            this.hero.body.setOffset(0, 2);
            this.hero.setScale(1);
            this.hero.setFlipY(false);
            this.hero.anims.play('walking');
        }

        // calculates the restart of the blocks chink
        for (const blockChunk of this.blocksGroup.children.entries) {
            if (blockChunk.y - 320 >= this.game.config.height) {
                blockChunk.y = -(this.config.chunkSize / 2 + this.config.screenSizeDifference);
            }
        }
    }

    handleStartGame = () => {
        this.startGame();
        this.tapIcon.destroy();
        this.createdByText.destroy();
        this.gotinhaLogo.destroy();

        this.moveHero();
        this.input.on('pointerdown', this.moveHero);
    };

    startGame = () => {
        // add score text and score count
        this.scoreText = this.add.text(35, this.game.config.height - 20, '00000000').setDepth(999);
        this.scoring = setInterval(this.updateScore, 300);

        // generate spikes
        this.generateSpikes(this.mainSpikeGroup, this.config.spikeQuantity);

        // set spikes collision
        this.mainSpikeGroup.setVelocity(0, this.config.speed);
        this.physics.add.collider(this.hero, this.mainSpikeGroup, this.gameOver);
        this.physics.add.collider(this.hero, this.secondarySpikeGroup, this.gameOver);
        this.physics.add.collider(this.hero, this.tertiarySpikeGroup, this.gameOver);
        this.physics.add.collider(this.hero, this.quaternarySpikeGroup, this.gameOver);

        // set crystal collision
        this.physics.add.collider(this.hero, this.mainCrystalGroup, this.crystalAcquired);
        this.physics.add.collider(this.hero, this.secondaryCrystalGroup, this.crystalAcquired);
        this.physics.add.collider(this.hero, this.tertiaryCrystalGroup, this.crystalAcquired);
        this.physics.add.collider(this.hero, this.quaternaryCrystalGroup, this.crystalAcquired);
        this.physics.world.on('worldbounds', this.handleSpikesAndCrystalsCreation);

        // set game as started
        this.hasGameStarted = true;
    }

    generateBlockChunks = (group) => {
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

            group.add(leftBlock);
            group.add(rightBlock);
            leftBlock.body.setImmovable();
            rightBlock.body.setImmovable();
            y += height - this.config.tileSize;
        }

        // set group speed
        group.setVelocity(0, this.config.speed);
    }

    handleSpikesAndCrystalsCreation = (body, top, bottom, left, right) => {
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
                    this.generateSpikes(this.mainSpikeGroup, this.config.spikeQuantity);
                    this.generateCrystals(this.mainCrystalGroup);
                    this.mainSpikeGroup.setVelocity(0, this.config.speed);
                    this.secondarySpikeGroup.clear(true, true);
                    break;
                }
                case TERTIARY_SPIKES_GROUP: {
                    this.lastUsedGroup = QUATERNARY_SPIKES_GROUP;
                    this.generateSpikes(this.quaternarySpikeGroup, this.config.spikeQuantity);
                    this.generateCrystals(this.quaternaryCrystalGroup);
                    this.quaternarySpikeGroup.setVelocity(0, this.config.speed);
                    this.mainSpikeGroup.clear(true, true);
                    break;
                }
                case SECONDARY_SPIKES_GROUP: {
                    this.lastUsedGroup = TERTIARY_SPIKES_GROUP;
                    this.generateSpikes(this.tertiarySpikeGroup, this.config.spikeQuantity);
                    this.generateCrystals(this.tertiaryCrystalGroup);
                    this.tertiarySpikeGroup.setVelocity(0, this.config.speed);
                    this.quaternarySpikeGroup.clear(true, true);
                    break;
                }
                case MAIN_SPIKES_GROUP: {
                    this.lastUsedGroup = SECONDARY_SPIKES_GROUP;
                    this.generateSpikes(this.secondarySpikeGroup, this.config.spikeQuantity);
                    this.generateCrystals(this.secondaryCrystalGroup);
                    this.secondarySpikeGroup.setVelocity(0, this.config.speed);
                    this.tertiarySpikeGroup.clear(true, true);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    };

    generateSpikes = (group, quantity) => {
        const spikeConfig = {
            height: 7,
            width: 11,
            x: 16,
            y: 30,
            key: 'spike',
            origin: {
                x: 0,
                y: 0,
            },
        };

        const spikesArray = generateRandomSpikePositionsArray(quantity, this.config.spikeGenerationFactor);
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

        // shake the camera
        this.cameras.main.shake(500);

        this.hero.anims.stop();
        this.hero.setFrame('drop_01');
        this.isGameOver = true;
        this.scoreText.destroy();

        this.input.removeAllListeners();
        clearInterval(this.scoring);
        this.setVelocityToAllGroups(0);

        const messageBox = new Phaser.Geom.Rectangle(25, 100, 100, 80);
        const graphics = this.add.graphics({ fillStyle: { color: 0x095165 } });
        graphics.fillRectShape(messageBox);
        this.add.text(35, 110, `Score:\n${this.getScore()}`).setDepth(999);
        this.add.text(35, 145, `Tapped:\n${this.tapCount} times`).setDepth(999);

        // restart game
        this.time.delayedCall(500, () => {
            this.input.on('pointerdown', () => this.scene.restart());
        });
    };

    moveHero = () => {
        this.tapCount += 1;
        this.hero.anims.play('jumping');
        // console.log(this.hero.scale);

        if (this.hero.scale === 1) {
            this.hero.setVelocityX(-this.config.jumpSpeed);
        } else {
            this.hero.setVelocityX(this.config.jumpSpeed);
        }
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
        this.mainCrystalGroup.setVelocity(0, velocity);
        this.secondaryCrystalGroup.setVelocity(0, velocity);
        this.tertiaryCrystalGroup.setVelocity(0, velocity);
        this.quaternaryCrystalGroup.setVelocity(0, velocity);
    }

    generateCrystals = (group) => {
        const crystalsArray = generateRandomCrystalPositionsArray();
        let crystalPosition = -this.config.screenSizeDifference;

        for (const crystalIndex in crystalsArray) {
            crystalPosition += this.config.spaceBetweenSpikes;
            if (crystalsArray[crystalIndex] === 0) {
                continue;
            }

            const crystal = this.createCrystal(
                this.game.config.width / 2,
                crystalPosition,
                crystalsArray[crystalIndex]
            );
            group.add(crystal);
            crystal.body.setImmovable();
            /*
             * crystal.anims.play(
             *     `crystal_0${crystalsArray[crystalIndex]}_flipping`
             * );
             */
        }
    };

    createCrystal = (x, y, cristalNumber) => {
        const frameName = `crystal_0${cristalNumber}`;
        const frameRate = 4;
        const crystal = this.make.sprite({
            height: 16,
            width: 16,
            x,
            y,
            key: 'crystals',
            frame: frameName,
        });
        crystal.setName(cristalNumber);

        if (!this.anims.exists(`${frameName}_flipping_normal`)) {
            this.anims.create({
                key: `${frameName}_flipping_normal`,
                frames: this.anims.generateFrameNames('crystals', {
                    frames: [`${frameName}_flip_01`, frameName, `${frameName}_flip_01`, `${frameName}_flip_02`],
                }),
                frameRate,
            });
        }

        if (!this.anims.exists(`${frameName}_flipping_reverse`)) {
            this.anims.create({
                key: `${frameName}_flipping_reverse`,
                frames: this.anims.generateFrameNames('crystals', {
                    frames: [`${frameName}_flip_01`, frameName, `${frameName}_flip_01`, `${frameName}_flip_02`],
                }),
                frameRate,
            });
        }

        crystal.on('animationcomplete', () => {
            const scale = crystal.scale;
            crystal.setScale(scale * -1);
            if (scale === 1) {
                crystal.anims.play(`${frameName}_flipping_reverse`);
                crystal.setFlipY(true);
            } else {
                crystal.anims.play(`${frameName}_flipping_normal`);
                crystal.setFlipY(false);
            }
        });

        crystal.anims.play(`${frameName}_flipping_normal`);
        return crystal;
    }

    crystalAcquired = (hero, crystal) => {
        if (crystal.texture.key === 'crystals') {
            this.score += crystal.name * 25;
            crystal.destroy();
        }
    }

    updateScore = () => {
        // TODO
        this.score += 1;
        this.scoreText.setText(this.getScore());
    }
}
