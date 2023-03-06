class DreamSequence {
  constructor(ctx, canvasSize, enviroments) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.basicInformation = [this.ctx, this.canvasSize];
    this.enviroments = enviroments;
    this.scenario = {};
    this.playersHouse = undefined;
    this.forest = undefined;
    this.hasFinished = false;
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
    this.scenario.introduction = new Dialogue(
      this.ctx,
      introductionText,
      "click"
    );
  }

  play() {
    this.draw();
    if (this.scenario.introduction) {
      this.scenario.introduction.draw();
      if (this.scenario.introduction.stopDialogue()) {
        delete this.scenario.introduction;
        this.scenario.houseQuizz = new HouseQuizz(...this.basicInformation);
      }
    } else if (this.scenario.houseQuizz) {
      this.scenario.houseQuizz.play();
      if (this.scenario.houseQuizz.ended) {
        this.playersHouse = this.scenario.houseQuizz.decidePlayersHouse();
        this.enviroments.welcome = new Welcome(
          this.ctx,
          this.canvasSize,
          this.enviroments
        );
        delete this.scenario.houseQuizz;
        delete this.enviroments.dreamSequence;
      }
    }
  }
  draw() {
    this.forest.drawBackground();
  }
}
