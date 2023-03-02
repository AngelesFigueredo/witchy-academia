const witchyAcademia = {
  name: "Witchy Academia",
  description: "This is a fantansy game with 3 levels",
  version: "1.0.0",
  license: undefined,
  author: "Ángeles Figueredo",
  canvasTag: undefined,
  ctx: undefined,
  environments: {},
  player: undefined,
  

  canvasSize: {
    w: undefined,
    h: undefined,
  },

  init() {
    this.createContext();
    this.setDimensions();
    this.createStart();
    this.player = new Player()
    this.game();
  },
  createContext() {
    this.canvasTag = document.querySelector("canvas");
    this.ctx = this.canvasTag.getContext("2d");
  },
  setDimensions() {
    this.canvasSize = {
      w: window.innerWidth - 20,
      h: window.innerHeight - 20,
    };
    this.canvasTag.setAttribute("width", this.canvasSize.w);
    this.canvasTag.setAttribute("height", this.canvasSize.h);
  },
  game() {
    setInterval(() => {
      this.clearAll();
      this.drawAll();
    }, 30);
  },
  createStart() {
    this.environments.start = new Start(this.ctx, this.canvasSize, this.environments);
  },
  drawAll() {
    if (this.environments.start) {
      this.environments.start.draw();
    } else if (this.environments.dreamSequence) {
      this.environments.dreamSequence.play()

    } else if (this.environments.welcome) {
      this.environments.welcome.draw();
    }
  },
  clearAll() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

};

witchyAcademia.init();
