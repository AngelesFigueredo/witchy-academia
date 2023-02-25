class Dialogue {
  constructor(ctx, text) {
    this.text = text;
    this.ctx = ctx;
    this.dialogueBoxInstance = undefined;
    this.count = 0;
    this.init();
    this.stopDialogue = true
  }

  init() {
    this.listen();
    this.createDialogueBox();
  }
  listen() {
    document.addEventListener(
      "click",
      () => {
        ++this.count;
        console.log(this.count);
      },
      { once: false} ////Aquí hay que ver cómo hacer para que se detenga el el event listener
    );
  }
  createDialogueBox() {
    this.dialogueBoxInstance = new Image();
    this.dialogueBoxInstance.src = "img/dialogue/dialogue-box.png";
  }
  draw() {
    this.drawDialogueBox()
    this.drawText();
  }
  drawText() {
    this.ctx.font = "20px arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.text[this.count], 150, 60);
  }
  drawDialogueBox() {
    this.ctx.drawImage(
      this.dialogueBoxInstance,
      10,
      10,
      550,
      100
    );
  }
}
