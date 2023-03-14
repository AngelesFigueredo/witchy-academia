class Character {
  constructor(ctx, canvasSize, enviroments) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.enviroments = enviroments;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.framesCounter = 0;
    this.ground = this.canvasSize.h * (2 / 3);
    this.health = 100;
  }
  animate(framesCounter, image, speed) {
    if (framesCounter % speed === 0) {
      image.framesIndex++;
    }
    if (image.framesIndex >= image.frames) {
      image.framesIndex = 0;
    }
  }
  createSprite(spriteName, src, frames) {
    this[spriteName] = new Image();
    this[spriteName].src = src;
    this[spriteName].frames = frames;
    this[spriteName].framesIndex = 0;
  }
  drawSprite(spriteName){
     this.ctx.drawImage(
      this[spriteName],
      (this[spriteName].width / this[spriteName].frames) * this[spriteName].framesIndex,
      0,
      this[spriteName].width / this[spriteName].frames,
      this[spriteName].height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
  resetFramesCounter(){
    this.framesCounter > 1000 ? (this.framesCounter = 0) : this.framesCounter++
  }
}