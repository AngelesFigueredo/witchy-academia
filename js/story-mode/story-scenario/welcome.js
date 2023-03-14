class Welcome {
  constructor(ctx, canvasSize, enviroments) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.enviroments = enviroments
    this.init()
  }
  init(){
    this.castle = new Background(... this.basicInformation, "img/welcome/castle.png")
    this.dialogue = new Dialogue(this.ctx, welcomeText, "click");
    this.principal = new Principal(... this.basicInformation)
  }
  draw(){
    this.castle.drawBackground()
    this.dialogue.draw()
    this.principal.drawPrincipal()
    if(this.dialogue.stopDialogue()){
      this.enviroments.battleground = new Battleground(...this.basicInformation, this.enviroments);
      delete this.enviroments.welcome
    }
  }
  
}
