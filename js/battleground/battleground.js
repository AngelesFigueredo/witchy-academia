class Battleground {
  constructor(ctx, canvasSize, enviroments) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.enviroments = enviroments;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.groundLevel = this.canvasSize.h * (2 / 3);
    this.lostGame = false;
    this.wonGame = false;
    this.init();
  }
  init() {
    this.createAll();
  }
  createAll() {
    this.createFightingArena();
    this.createPlayer();
    this.createEnemy();
    this.createFinalScreens();
  }
  createFightingArena() {
    this.background = new Background(
      ...this.basicInformation,
      "img/battleground/battleground.png"
    );
  }
  createPlayer() {
    this.player = new Player(...this.basicInformation, this.enviroments);
  }
  createEnemy() {
    this.enemy = new Enemy(...this.basicInformation, this.enviroments);
  }
  createFinalScreens() {
    this.gameOverScreen = new Background(
      ...this.basicInformation,
      "img/final/game-over.jpg"
    );
    this.wonScreen = new Background(
      ...this.basicInformation,
      "img/final/you-have-won.png"
    );
  }
  draw() {
    if (!this.lostGame && !this.wonGame) {
      this.background.drawBackground();
      this.player.play();
      this.enemy.play();
      this.isGameOver();
    }
    this.play();
  }
  play() {
    if (this.wonGame) {
      console.log('this is happening')
      this.deleteEverything() 
      this.wonScreen.drawBackground();
    } else if (!this.lostGame) {
      this.deleteEnemySpell()
      this.player.spells.forEach((spell) => {
        if (this.isColliding(spell, this.enemy)) {
          this.enemy.loseLives();
          this.player.spells.splice(this.player.spells.indexOf(spell), 1);
          if (this.enemy.isDead()) {
            this.wonGame = true;
          }
        }
      });
      this.enemy.spells.forEach((spell) => {
        if (this.isColliding(spell, this.player)) {
          this.player.loseLives();
          this.enemy.spells.splice(this.enemy.spells.indexOf(spell), 1);
          if (this.player.isDead()) {
            this.lostGame = true;
          }
          if (spell.pos.x <= 0) {
            this.enemy.spells.splice(this.enemy.spells.indexOf(spell), 1);
          }
        }
      });
    } else {
      this.deleteEverything();
      this.gameOverScreen.drawBackground();
      
    }
    
    this.isGameOver();
  }
  
  isColliding(object1, object2) {
    if (this.player) {
      if (
        object1.sprites.pos.x < object2.sprites.pos.x + object2.sprites.width &&
        object1.sprites.pos.x + object1.sprites.width > object2.sprites.pos.x &&
        object1.sprites.pos.y <
        object2.sprites.pos.y + object2.sprites.height &&
        object1.sprites.height + object1.sprites.pos.y > object2.sprites.pos.y
        ) {
          return true;
        }
        return false;
      }
    }
    deleteEverything() {
      delete this.background;
      delete this.player;
      delete this.enemy;
    }
    deleteEnemySpell(){
    this.player.spells.forEach((spell) => {
      // the player can delete the enemy's spell by throwing a spell at them
      this.enemy.spells.forEach((enemySpell) => {
        if (this.isColliding(spell, enemySpell)) {
          console.log("This is colli");
          this.player.spells.splice(this.player.spells.indexOf(spell), 1);
          this.enemy.spells.splice(this.enemy.spells.indexOf(enemySpell), 1);
        }
      });
    });

  }
  isGameOver() {
    if (this.isColliding(this.player, this.enemy)) {
      this.lostGame = true;
    }
  }
}
