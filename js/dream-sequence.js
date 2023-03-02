class DreamSequence {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.spaces = {};
    this.playersHouse = undefined
    this.forest = undefined;
    this.init();
  }
  init() {
    this.forest = new Background(
      ...this.basicInformation,
      "img/forest/forest.png"
    );
    this.introduction();
  }
  introduction() {
    this.spaces.introduction = new Dialogue(this.ctx, introductionText, "click");
  }
 
  play(){
    this.draw()
    if (this.spaces.introduction) {
        this.spaces.introduction.draw();
        if (this.spaces.introduction.stopDialogue()){
          delete this.spaces.introduction;
          this.spaces.houseQuizz = new HouseQuizz(...this.basicInformation)}
    }else if(this.spaces.houseQuizz){
        this.spaces.houseQuizz.play()
        if(this.spaces.houseQuizz.ended){
          this.playersHouse = this.spaces.houseQuizz.decidePlayersHouse()
          console.log(this.playersHouse)
          delete this.spaces.houseQuizz;
        }
    }
}
draw() {
      this.forest.drawBackground();
    }
}
