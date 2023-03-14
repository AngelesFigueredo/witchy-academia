class Spell extends Character {
  constructor(ctx, canvasSize, enviroments, characterPos, char) {
    super(ctx, canvasSize, enviroments);
    this.height = 100;
    this.width = 200;
    this.char = char;
    this.characterPos = characterPos;
    this.pos = {
      y: this.characterPos.pos.y + 20,
      x: this.characterPos.pos.x - 10,
    };
    this.spellSrc = "img/spells/spell.png";
    this.counter = 0;
    this.init();
    this.sprites = {
      pos: {
        x: this.pos.x + 50,
        y: this.pos.y + 35,
      },
      width: 75,
      height: 20,
    };
  }
  init() {
    this.createSpell();
  }
  moveLeft() {
    ++this.counter;
    if (this.counter === 20) {
      this.sprites.pos.x -= 30;
      this.pos.x -= 30;
      this.counter = 0;
    }
  }
  createSpell() {
    if(this.char){
      this.pos.y += 90
    }
    this.createSprite("spell", this.spellSrc, 4);
  }
  draw() {
    this.char ? this.moveLeft() : this.move();
    this.resetFramesCounter();
    this.animate(this.framesCounter, this.spell, 15);
    this.drawSprite("spell");
  }
  move() {
    ++this.counter;
    if (this.counter === 20) {
      this.sprites.pos.x += 20;
      this.pos.x += 20;
      this.counter = 0;
    }
  }
}
