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
    this.friction = 0.5;
  }

  lempar(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    this.update();
  }

  update() {
    const margin = 5;

    // Tambahkan gravitasi
    this.vy += this.gravity;

    // Update posisi bola
    this.x += this.vx;
    this.y += this.vy;

    // Deteksi tabrakan dengan batas canvas dan pantulkan, tambahkan margin
    if (this.x + this.radius > this.canvas.c_handler.width - margin) {
      this.x = this.canvas.c_handler.width - this.radius - margin;
      this.vx = -this.vx * this.friction;
    } else if (this.x - this.radius < margin) {
      this.x = this.radius + margin;
      this.vx = -this.vx * this.friction;
    }

    if (this.y + this.radius > this.canvas.c_handler.height - margin) {
      this.y = this.canvas.c_handler.height - this.radius - margin;
      this.vy = -this.vy * this.friction;
    } else if (this.y - this.radius < margin) {
      this.y = this.radius + margin;
      this.vy = -this.vy * this.friction;
    }

    // Bersihkan dan gambar bola di posisi baru
    this.canvas.clear();
    this.ketapel.draw();
    this.canvas.lingkaran_polar(this.x, this.y, this.radius, this.color);
    this.canvas.draw();

    // Lanjutkan animasi bola dengan requestAnimationFrame
    requestAnimationFrame(() => this.update());
  }

  draw() {
    this.canvas.lingkaran_polar(this.x, this.y, this.radius, this.color);
  }
}
