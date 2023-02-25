class Background {
  constructor(ctx, canvasSize, backgroundPicture) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.backgroundPicture = backgroundPicture;
    this.init()
  }
  init(){
    this.createBackground()
    
  }
  createBackground(){
    this.backgroundInstance = new Image();
    this.backgroundInstance.src = this.backgroundPicture;
  }
  drawBackground(){
    this.ctx.drawImage(
      this.backgroundInstance,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  }
}