class HouseQuizz {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.questionToDisplay = {};
    this.dialogue = undefined;
    this.count = 0;
    this.playersHouse = undefined;
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
    this.dialogue && this.dialogue.draw();
    this.drawQuestions();
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
      },
      { once: this.ended }
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
    leftHouses = [this.house.air, this.house.water],
    rightHouses = [this.house.fire, this.house.earth]
  ) {
    this.goLeft() && this.addPointsTo(...leftHouses);
    this.goRight() && this.addPointsTo(...rightHouses);
    this.direction = undefined;
  }
  decidePlayersHouse() {
    const maxPoints = Math.max(...Object.values(this.housePoints));
    const playersHouse = Object.keys(this.housePoints).find(
      (house) => this.housePoints[house] === maxPoints
    );
    this.playersHouse = playersHouse;
    return playersHouse;
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
      case 12:
        this.decidePlayersHouse();
        delete this.dialogue;
        break;
      case 13:
        this.ended = true;
        break;
      default:
        this.decideHousePoints();
        break;
    }
  }
  drawQuestions() {
    switch (this.count) {
      case 2:
        this.drawQuestion("q1");
        break;
      case 3:
        this.drawQuestion("q2");
        break;
      case 4:
        this.drawQuestion("q3");
        break;
      case 5:
        this.drawQuestion("q4");
        break;
      case 6:
        this.drawQuestion("q5");
        break;
      case 7:
        this.drawQuestion("q6");
        break;
      case 8:
        this.drawQuestion("q7");
        break;
      case 9:
        this.drawQuestion("q8");
        break;
      case 10:
        this.drawQuestion("q9");
        break;
      case 11:
        this.drawQuestion("q10");
        break;
      case 12:
        this.revealPlayersHouse();
        break;
    }
  }

  drawRightAnswer(imagePath) {
    const image = new Image();
    image.src = imagePath;
    this.ctx.drawImage(
      image,
      this.canvasSize.w * (1 / 2),
      this.canvasSize.h * (2 / 8),
      this.canvasSize.w * (1 / 2),
      this.canvasSize.w * (1 / 3)
    );
  }
  drawLeftAnswer(imagePath) {
    const image = new Image();
    image.src = imagePath;
    this.ctx.drawImage(
      image,
      0,
      this.canvasSize.h * (2 / 8),
      this.canvasSize.w * (1 / 2),
      this.canvasSize.w * (1 / 3)
    );
  }
  drawQuestion(question) {
    this.drawRightAnswer("img/house-quizz/" + question + "/right-answer.png");
    this.drawLeftAnswer("img/house-quizz/" + question + "/left-answer.png");
  }
  revealPlayersHouse() {
    let imagePath;
    switch (this.playersHouse) {
      case this.house.air:
        imagePath = "img/house-quizz/end/air.png";
        break;
      case this.house.water:
        imagePath = "img/house-quizz/end/water.png";
        break;
      case this.house.earth:
        imagePath = "img/house-quizz/end/earth.png";
        break;
      case this.house.fire:
        imagePath = "img/house-quizz/end/fire.png";
        break;
    }
    const image = new Image();
    image.src = imagePath;
    this.ctx.drawImage(
      image,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  }
}
