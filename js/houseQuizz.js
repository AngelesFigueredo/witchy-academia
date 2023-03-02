class HouseQuizz {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.questionToDisplay = {};
    this.dialogue = undefined;
    this.count = 0;
    this.direction = undefined;
    this.ended = false;
    this.house = {
      fire: "fire",
      water: "water",
      earth: "earth",
      air: "air",
    };
    this.housePoints = {
      fire: 0,
      water: 0,
      earth: 0,
      air: 0,
    };
    this.init();
  }
  init() {
    this.listen();
    this.dialogue = new Dialogue(this.ctx, quizzQuestions, "keydown");
  }
  draw() {
    this.dialogue.draw();
    this.drawQuestions()
  }
  play() {
    this.draw();
  }
  listen() {
    document.addEventListener(
      "keyup",
      (e) => {
        if (e.keyCode === keys.LEFT && this.count < 13) {
          this.direction = "left";
          ++this.count;
        } else if (e.keyCode === keys.RIGHT && this.count < 13) {
          this.direction = "right";
          ++this.count;
        }
        this.examineHouse();
      }, {once: this.ended}
    );
  }
  addPointsTo(house1, house2) {
    ++this.housePoints[house1];
    ++this.housePoints[house2];
  }
  goRight() {
    return this.direction === "right";
  }
  goLeft() {
    return this.direction === "left";
  }
  decideHousePoints(
    leftHouse = [this.house.air, this.house.water],
    rightHouse = [this.house.fire, this.house.earth]
  ) {
    this.goLeft() ? this.addPointsTo(...leftHouse) : null;
    this.goRight() ? this.addPointsTo(...rightHouse) : null;
    this.direction = undefined;
    console.log(this.direction, this.housePoints);
  }
  examineHouse() {
    switch (this.count) {
      case 0:
      case 1:
        null;
        break;
      case 7:
      case 9:
        this.decideHousePoints(
          [this.house.air, this.house.earth],
          [this.house.fire, this.house.water]
        );
        break;
      case 10:
        this.decideHousePoints(
          [this.house.air, this.house.fire],
          [this.house.earth, this.house.water]
        );
        break;
      case 13:
        this.ended = true
        break;
      default:
        this.decideHousePoints();
        break;
    }
  }
  drawQuestions(){
    switch (this.count) {
      case 0:
      case 1:
      case 2:
        case 3:
        this.drawQuestion1()
        break;
    }
  }
  decidePlayersHouse() {
    const maxPoints = Math.max(...Object.values(this.housePoints));
    const playersHouse = Object.keys(this.housePoints).find(
      (house) => this.housePoints[house] === maxPoints
    );
    return playersHouse;
  }
  drawQuestion1(){
    //¿Cuándo mueras cómo te gustaría ser recordado?
    //Respuestas posibles 
    //left Por todos los logros y las hazañas que conseguí 
    // right por haber sido una persona buena y caritativa
    this.heart = new Image();
    this.heart.src = "img/house-quizz/heart.png";
    this.ctx.drawImage(
      this.heart,
      500,
      200,
      this.canvasSize.w/3,
      this.canvasSize.h/3
    );
  }
}
