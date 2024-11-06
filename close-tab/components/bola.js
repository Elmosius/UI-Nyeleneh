export class Bola {
  constructor(canvas, startX, startY, radius = 1, color = { r: 0, g: 0, b: 255 }, ketapel) {
    this.canvas = canvas;
    this.ketapel = ketapel; // Tambahkan referensi ke ketapel
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.5;
    this.friction = 0.9;
  }

  lempar(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    this.update();
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.radius > this.canvas.c_handler.width) {
      this.x = this.canvas.c_handler.width - this.radius;
      this.vx = -this.vx * this.friction;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx = -this.vx * this.friction;
    }

    if (this.y + this.radius > this.canvas.c_handler.height) {
      this.y = this.canvas.c_handler.height - this.radius;
      this.vy = -this.vy * this.friction;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy = -this.vy * this.friction;
    }

    this.canvas.clear();
    this.ketapel.draw(); // Panggil untuk menggambar ulang ketapel
    this.canvas.lingkaranIsi(this.x, this.y, this.radius, this.color);
    this.canvas.draw();

    requestAnimationFrame(() => this.update());
  }

  draw() {
    this.canvas.lingkaran_polar(this.x, this.y, this.radius, this.color);
  }
}
