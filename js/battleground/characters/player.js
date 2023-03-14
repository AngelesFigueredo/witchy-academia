class Player extends Character {
  constructor(ctx, canvasSize, enviroments) {
    super(ctx, canvasSize, enviroments);
    this.spriteShow = "idlePlayer";
    this.posX0 = -60;
    this.posMax = 47;
    this.jumpPower = 110;
    this.height = 300;
    this.width = 200;
    this.spells = [];
    this.livesCounter = 3;
    this.cooldownTime = 120
    this.cooldownTimer = 0
    this.physics = {
      acc: 1.01,
    };
    this.pos = {
      x: 0,
      y: this.ground - this.height,
    };
    this.sprites = {
      pos: {
        x: 80,
        y: this.ground - 160,
      },
      width: 40,
      height: 160,
    };
    this.vel = {
      x: 4,
      y: 1,
    };
    this.moving = {
      left: false,
      right: false,
      jump: false,
      attack: false,
    };
    this.init();
  }
  init() {
    this.createPlayer();
    this.listen();
  }
  play() {
    this.moveFluidly();
    this.applyGravity();
    this.draw();
  }
  moveFluidly() {
    if (this.moving.left) {
      this.pos.x > this.posX0 && this.walkLeft();
    }
    if (this.moving.right) {
      this.pos.x < this.canvasSize.w - this.width + this.posMax &&
        this.walkRight();
    }
    if (this.moving.jump) {
      this.jump();
    }
  }
  isDead(){
    return this.livesCounter === 0
  }
  createLives() {
    this.lives = new Image();
    this.lives.src = "img/lives/heart.png";
  }
  drawLives() {
    this.ctx.drawImage(this.lives, 10, 10, 60, 60);
    this.ctx.font = "45px arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.livesCounter, 75, 55);
  }
  draw() {
    this.cooldownTimer ++
    this.drawLives();
    this.resetFramesCounter();
    if (this.spriteShow === "idlePlayer") {
      this.drawSprite("idlePlayer");
    } else if (this.spriteShow === "walkingPlayer") {
      this.drawWalking();
    } else if (this.spriteShow === "attack") {
      this.animate(this.framesCounter, this.attack, 15);
      this.drawSprite("attack");
    }
    this.spells.forEach((spell) => spell.draw());
  }
  loseLives(){
    this.livesCounter -= 1
  }
  drawWalking() {
    if (this.moving.left) {
      this.animate(this.framesCounter, this.walkingLeft, 20);
      this.drawSprite("walkingLeft");
    }
    if (this.moving.right) {
      this.animate(this.framesCounter, this.walkingRight, 20);
      this.drawSprite("walkingRight");
    }
  }

  createPlayer() {
    this.createLives();
    this.createSprite("idlePlayer", "img/player/idle.png", 5);
    this.createSprite("walkingRight", "img/player/walk-right.png", 6);
    this.createSprite("walkingLeft", "img/player/walk-left.png", 6);
    this.createSprite("attack", "img/player/attack.png", 6);
  }
  resetVelY() {
    this.vel.y = 1;
  }
  applyGravity() {
    if (this.pos.y < this.ground - this.height) {
      this.vel.y *= this.physics.acc;
      this.pos.y += this.vel.y;
      this.sprites.pos.y += this.vel.y;
    } else {
      this.resetVelY();
    }
  }
  walkRight() {
    this.pos.x += this.vel.x;
    this.sprites.pos.x += this.vel.x;
  }
  walkLeft() {
    this.pos.x -= this.vel.x;
    this.sprites.pos.x -= this.vel.x;
  }
  startWalking() {
    this.spriteShow = "walkingPlayer";
  }
  stopMoving() {
    this.spriteShow = "idlePlayer";
  }
  attack() {
    this.spriteShow = "attack";
  }
  jump() {
    if (this.pos.y >= this.ground - this.height) {
      this.pos.y -= this.jumpPower;
      this.sprites.pos.y -= this.jumpPower;
    }
  }
  listen() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case keys.LEFT:
          this.moving.left = true;
          this.startWalking();
          break;
        case keys.RIGHT:
          this.moving.right = true;
          this.startWalking();
          break;
        case keys.UP:
          this.moving.jump = true;
          break;
        case keys.A:
          this.spriteShow = "attack";
          this.moving.attack = true;
          break;
        default:
          console.log("the keycode is", e.keyCode);
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case keys.LEFT:
          this.stopMoving();
          this.moving.left = false;
          break;
        case keys.RIGHT:
          this.stopMoving();
          this.moving.right = false;
          break;
        case keys.UP:
          this.moving.jump = false;
          break;
        case keys.A:
          if(this.cooldownTimer  > this.cooldownTime){
            this.spells.push(
              new Spell(...this.basicInformation, this.enviroments, this.sprites)
            );
            this.cooldownTimer = 0
          }
          this.moving.attack = false;
          this.stopMoving();
          break;
        default:
          this.stopMoving();
          console.log("the keycode is", e.keyCode);
          break;
      }
    });
  }
}
