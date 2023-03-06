class Start {
  constructor(ctx, canvasSize, environments) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.backgroundInfo = [this.ctx, this.canvasSize];
    this.environments = environments;
    this.buttonInstance = undefined;
    this.castleInstance = undefined;
    this.createStart();
    this.listen();
  }
  createStart() {
    this.createButton();
    this.createCastle();
  }
  createButton() {
    this.buttonInstance = new Image();
    this.buttonInstance.src = "img/start/start-button.png";
  }
  createCastle() {
    this.castleInstance = new Image();
    this.castleInstance.src = "img/start/start-castle.png";
  }

  draw() {
    this.drawCastle();
    this.drawButton();
  }

  drawButton() {
    this.ctx.drawImage(
      this.buttonInstance,
      this.canvasSize.w / 3,
      this.canvasSize.h * (3 / 5),
      this.canvasSize.w / 3,
      this.canvasSize.h / 4
    );
  }
  drawCastle() {
    this.ctx.drawImage(
      this.castleInstance,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  }
  listen() {
    document.addEventListener(
      "click",
      () => {
        this.environments.dreamSequence = new DreamSequence(
          this.ctx,
          this.canvasSize, 
          this.environments
        );
        delete this.environments.start;
      },
      { once: true }
    );
  }
}
