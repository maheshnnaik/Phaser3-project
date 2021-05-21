import Phaser from 'phaser';

let player;
let bullets, bullet1;
let cursors;
let enemy;
let enemyHealth = 10;
var explosions;

class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'});
        this.pVelocity = 200;
    }

    preload(){
        this.load.image('bg','./assets/background.png');
        this.load.image('player', './assets/player.png');
        this.load.image('bullet', './assets/laser2.png');
        this.load.image('enemy', './assets/alien1.png');
        this.load.spritesheet('explosion', './assets/explosion1.png', { frameWidth: 400, frameHeight: 48 });
    }

    create(){
        this.add.image(240, 320, 'bg').setScale(2, 2.5);
        player = this.physics.add.sprite(240, 640, 'player');
        player.setScale(0.25);
        player.setCollideWorldBounds(true);
        player.setPosition(240, 640);

        // this.add.image(240, 0, 'enemy');
        enemy = this.physics.add.sprite(350,0, 'enemy');
        enemy.setScale(0.4);

        
        // bullets = this.physics.add.group();
        // bullets.create(240, 640, 'bullet');
        bullets = this.physics.add.sprite(240, 640, 'bullet');
        bullets.setRotation((Math.PI / 180) * -90);
        bullets.setScale(0.5);

        // bullet1 = this.physics.add.sprite(240, 640, 'bullet');
        // bullet1.setRotation((Math.PI / 180) * -90);
        // bullet1.setScale(0.5);

        bullets.setVelocityY(-1600);
        // setInterval(()=>{
        //     bullet1.setVelocityY(-1600);
        // }, 250);

        this.physics.add.overlap(bullets, enemy, this.hitEnemy, null, this);
        
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
            hideOnComplete: true
        });


        // this.physics.add.collider(bullet1, enemy);
        cursors = this.input.keyboard.createCursorKeys();
        
        this.input.keyboard.on('keydown-LEFT', this.onLeftKeyDown, this);
        this.input.keyboard.on('keydown-RIGHT', this.onRightKeyDown, this);
        this.input.keyboard.on('keydown-LEFT', this.onLeftKeyUp, this);
        this.input.keyboard.on('keydown-RIGHT', this.onRightKeyUp, this);
    }
    update(time, delta){
        
        if (bullets.y < 10) {
            bullets.setPosition(player.x, player.y);
            bullets.setVelocityY(-1600);
        }
        // if (bullet1.y < 10) {
        //     bullet1.setPosition(player.x, player.y);
        //     bullet1.setVelocityY(-1600);
        // }
    }
    onLeftKeyDown(event){
        // this.moveLeft = true;
        player.setVelocityX(-this.pVelocity);
        
    }
    onLeftKeyUp(event){
        // this.moveLeft = false;
    }
    onRightKeyDown(event){
        player.setVelocityX(this.pVelocity);
        // this.moveRight = true;
    }
    onRightKeyUp(event){
        // this.moveRight = false;
    }
    hitEnemy(bullet, enemy){
        // var explosion = explosions.get().setActive( true );
        // explosion.on('animationcomplete', function() {
        //     explosion.setActive(false);
        // }, this);
        // explosions.setOrigin( 0.5, 0.5 );
        // explosions.x = enemy.x;
        // explosions.y = enemy.y;
        // explosions.anims.play()
        // explosions.anims.play( 'explode' );
        this.explosion = new Explosion(this, enemy.x, enemy.y);
        bullet.disableBody(false, true);
        // this.spawnBullet();
        enemyHealth -= 1;
        // if(enemyHealth == 0){
        //     enemy.disableBody(true, true);
        // }
        // console.log(explosions);

    }

    spawnBullet(){
        bullets = this.physics.add.sprite(240, 640, 'bullet').setOrigin(player.x, player.y);
        bullets.setRotation((Math.PI / 180) * -90);
        bullets.setScale(0.5);
        bullets.setVelocityY(-1600);
    }
}

class Explosion extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y, texture){
    super(scene,x,y,texture = 'explosive');
    scene.add.existing(this);
    this.play('explode');
    }
}

export default GameScene;
