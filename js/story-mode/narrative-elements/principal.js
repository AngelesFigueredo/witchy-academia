class Principal {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.frameCounter = 0;
    this.principalImages = [
      "img/welcome/principal/principal-1.png",
      "img/welcome/principal/principal-2.png",
      "img/welcome/principal/principal-3.png",
    ];
    this.principalSprites = [];
    this.principalSize = [
      this.canvasSize.w/60,
      this.canvasSize.h - 425,
      200,
      400,
    ];
    this.init();
  }
  init() {
    this.createPrincipal();
  }
  createPrincipal() {
    this.principalImages.forEach((imageSrc) => {
      const image = new Image();
      image.src = imageSrc;
      this.principalSprites.push(image);
    });
  }
  drawPrincipal() {
    ++this.frameCounter;
    if (this.frameCounter < 60) {
      this.ctx.drawImage(
        this.principalSprites[0],
        ...this.principalSize
      );
    } else if (this.frameCounter < 120) {
      this.ctx.drawImage(this.principalSprites[1], ...this.principalSize);
    } else if (this.frameCounter < 240) {
      this.ctx.drawImage(this.principalSprites[2], ...this.principalSize);
      this.frameCounter = 0
    }
  }
}
