"use strict";

const n_stars = 150;

const colors = ["#e27396", "#719f76"];

for (let i = 0; i < 98; i++) {
  colors.push("#ffffff");
}

const canvas = document.querySelector("#backgroundCanvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

let stars = [];

function createBackground() {
  var bg = c.createRadialGradient(
    canvas.width / 2,
    canvas.height * 3,
    canvas.height,
    canvas.width / 2,
    canvas.height,
    canvas.height * 4,
  );

  bg.addColorStop(0, "#a37eb4");
  bg.addColorStop(0.4, "#84418a");
  bg.addColorStop(0.7, "#7f4387");
  bg.addColorStop(1, "#b084c5");

  return bg;
}

let bg = createBackground();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = [];

  bg = createBackground();

  init();
});

class Star {
  constructor(x, y, radius, color) {
    this.x = x || randomInt(0, canvas.width);
    this.y = y || randomInt(0, canvas.height);
    this.radius = radius || Math.random() * 1.1;
    this.color = color || colors[randomInt(0, colors.length)];
    this.dy = -Math.random() * 0.3;
  }

  draw() {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    c.shadowBlur = randomInt(3, 15);
    c.shadowColor = this.color;

    c.strokeStyle = this.color;
    c.fillStyle = "rgba(255, 255, 255, 0.5)";

    c.fill();
    c.stroke();

    c.closePath();
  }

  update(arrayStars = []) {
    if (this.y - this.radius < 0) {
      this.createNewStar(arrayStars);
    }

    this.y += this.dy;

    this.draw();
  }

  createNewStar(arrayStars = []) {
    const i = arrayStars.indexOf(this);

    arrayStars.splice(i, 1);

    arrayStars.push(new Star(false, canvas.height + 5));
  }
}

function init() {
  for (let i = 0; i < n_stars; i++) {
    stars.push(new Star());
  }
}

init();

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = bg;

  c.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update(stars);
  });
}

animate();
