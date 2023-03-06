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
  }
  draw(){
    this.castle.drawBackground()
    this.dialogue.draw()
  }
  createSchoolprincipal(){

  }
  
}
