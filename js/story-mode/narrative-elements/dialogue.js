class Dialogue {
  // The eventType refers to what event will make the game diplay
  // the next sentence of the dialogue
  constructor(ctx, text, eventType) {
    this.text = text;
    this.ctx = ctx;
    this.eventType = eventType;
    this.dialogueBoxInstance = undefined;
    this.count = 0;
    this.init();
    this.end = false;
  }
  
  init() {
    this.listen();
    this.createDialogueBox();
  }
  listen() {
    document.addEventListener(
      this.eventType,
      e => {
        if(this.eventType === "keydown"){
          if(e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT){
            this.count < this.text.length? ++this.count : (this.end=this.stopDialogue());
          }
        }else{
          this.count < this.text.length ? ++this.count:(this.end = this.stopDialogue());
        }
      },
      { once: this.end}
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
    this.ctx.fillStyle = "black";
    if(this.count < this.text.length){
      this.ctx.fillText(this.text[this.count], 75, 60);
    }
  }
  drawDialogueBox() {
    this.ctx.drawImage(
      this.dialogueBoxInstance,
      50,
      15,
      600,
      100
    );
  }
  stopDialogue(){
    if(this.count  === this.text.length) return true
  }
}
