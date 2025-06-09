let peixe;

let bolhas = [];

let aguasVivas = [];

let pontuacao = 0;

function setup() {

  createCanvas(800, 600);

  peixe = new Peixe();

  for (let i = 0; i < 5; i++) {

    bolhas.push(new Bolha());

    aguasVivas.push(new AguaViva());

  }

}

function draw() {

  background(0, 100, 200); // azul oceano

  desenharFundoDoMar();

  peixe.mover();

  peixe.exibir();

  for (let bolha of bolhas) {

    bolha.mover();

    bolha.exibir();

    if (peixe.colidiu(bolha)) {

      pontuacao++;

      bolha.reiniciar();

    }

  }

  for (let agua of aguasVivas) {

    agua.mover();

    agua.exibir();

    if (peixe.colidiu(agua)) {

      pontuacao--;

      agua.reiniciar();

    }

  }

  fill(255);

  textSize(24);

  text("Pontuação: " + pontuacao, 10, 30);

}

function keyPressed() {

  if (keyCode === UP_ARROW) peixe.direcao = -1;

  if (keyCode === DOWN_ARROW) peixe.direcao = 1;

}

function keyReleased() {

  peixe.direcao = 0

}

class Peixe {

  constructor() {

    this.x = 100;

    this.y = height / 2;

    this.direcao = 0;

  }

  mover() {

    this.y += this.direcao * 5;

    this.y = constrain(this.y, 0, height);

  }

  exibir() {

    fill(255, 150, 0);

    ellipse(this.x, this.y, 50, 30);

    triangle(this.x - 25, this.y, this.x - 45, this.y - 10, this.x - 45, this.y + 10);

  }

  colidiu(obj) {

    return dist(this.x, this.y, obj.x, obj.y) < 30;

  }

}

class Bolha {

  constructor() {

    this.reiniciar();

  }

  reiniciar() {

    this.x = random(width, width + 100);

    this.y = random(height);

    this.velocidade = random(2, 4);

  }

  mover() {

    this.x -= this.velocidade;

    if (this.x < -20) this.reiniciar();

  }

  exibir() {

    fill(0, 200, 255, 150);

    ellipse(this.x, this.y, 20, 20);

  }

}

class AguaViva {

  constructor() {

    this.reiniciar();

  }

  reiniciar() {

    this.x = random(width, width + 200);

    this.y = random(height);

    this.velocidade = random(1, 3);

  }

  mover() {

    this.x -= this.velocidade;

    if (this.x < -20) this.reiniciar();

  }

  exibir() {

    fill(255, 100, 200, 180);

    ellipse(this.x, this.y, 30, 40);

    line(this.x, this.y + 20, this.x, this.y + 40);

  }

}

function desenharFundoDoMar() {

  noStroke();

  fill(0, 80, 180, 100);

  rect(0, height - 100, width, 100);

  fill(255, 255, 0);

  ellipse(700, 100, 80, 80); // sol

}