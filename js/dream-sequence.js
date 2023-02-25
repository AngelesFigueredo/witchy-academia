class DreamSequence {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize
    this.backgroundInfo = [this.ctx, this.canvasSize];
    this.dreamEnvironment = {};
    this.forest = undefined;
    this.init()
}
init() {
    this.forest = new Background(
      ...this.backgroundInfo,
      "img/forest/forest.png"
    );
    this.dialog1()
  }
  dialog1(){
    this.textTest = new Dialogue(this.ctx, forestText)
  }

  draw() {
    this.forest.drawBackground()
    this.textTest.draw()
  }
}
