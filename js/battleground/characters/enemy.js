class Enemy extends Character {
  constructor(ctx, canvasSize, enviroments) {
    super(ctx, canvasSize, enviroments);
    this.height = 300;
    this.width = 150;
    this.spells = [];
    this.create = false;
    this.pos = {
      y: this.ground - this.height,
      x: this.canvasSize.w * (8 / 10) - this.width,
    };
    this.enemySpriteSrc = "img/enemy/enemy.png";
    this.idleEnemySrc = "img/enemy/idle.png";
    this.spriteShow = "idle";
    this.spriteChange = 0;
    this.spriteFrames = 4;
    this.livesCounter = 15;
    this.sprites = {
      pos: {
        x: this.pos.x + 10,
        y: this.ground - 310,
      },
      width: 150 - 20,
      height: 300 + 20,
    };
    this.init();
  }
  init() {
    this.createEnemy();
  }
  createEnemy() {
    this.createSprite("enemy", this.enemySpriteSrc, this.spriteFrames);
    this.createSprite("idle", this.idleEnemySrc, this.spriteFrames);
    this.createLives();
  }
  enemyAttack() {
    this.spells.push(
      new Spell(
        this.ctx,
        this.canvasSize,
        this.enviroments,
        this.sprites,
        "enemy"
      )
    );
  }
  play() {
    this.resetFramesCounter();
    this.spriteChange++;
    this.changeSprites();
    this.drawEnemy();
  }
  loseLives() {
    this.livesCounter -= 1;
  }
  createLives() {
    this.lives = new Image();
    this.lives.src = "img/lives/heart.png";
  }
  isDead() {
    return this.livesCounter === 0;
  }
  drawLives() {
    this.ctx.drawImage(this.lives, this.canvasSize.w - 80, 10, 60, 60);
    this.ctx.font = "45px arial";
    this.ctx.fillStyle = "black";
    if(this.livesCounter > 0){
      this.ctx.fillText(this.livesCounter, this.canvasSize.w - 135, 50, 60, 60);
    }
  }
  drawEnemy() {
    
    if (this.spriteShow === "enemy") {
      this.animate(this.framesCounter, this.enemy, 35);
      if (this.create) {
        this.enemyAttack();
        this.create = false;
      }
      this.drawSprite("enemy");
    } else {
      this.animate(this.framesCounter, this.idle, 35);
      this.drawSprite("idle");
      this.create = true;
    }
    this.spells.forEach((spell) => spell.draw());
    this.drawLives();
  }
  changeSprites() {
    if(this.livesCounter > 0){if (this.spriteChange === 300) {
      this.spriteShow = "enemy";
    } else if (this.spriteChange === 600) {
      this.spriteShow = "idle";
      this.spriteChange = 0;
    }}
  }
}
