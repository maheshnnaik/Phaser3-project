import Phaser from 'phaser';
import GameScene from './src/scenes/gamescene';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 5},
            debug: false
        }
    },
    scene:[ GameScene ]
};

const game = new Phaser.Game(config);