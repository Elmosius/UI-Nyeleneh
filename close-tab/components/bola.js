export class Bola {
  constructor(canvas, startX, startY, radius = 1, color = { r: 0, g: 0, b: 255 }) {
    this.canvas = canvas;
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.color = color;
    this.vx = 0; // kecepatan X
    this.vy = 0; // kecepatan Y
    this.gravity = 0.3; // efek gravitasi
    this.friction = 0.9; // efek gesekan
  }

  // Menentukan kecepatan awal sesuai tarikan ketapel
  lempar(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    this.update();
  }

  // Update posisi bola
  update() {
    // Tambahkan gravitasi
    this.vy += this.gravity;

    // Update posisi bola
    this.x += this.vx;
    this.y += this.vy;

    // Deteksi tabrakan dengan batas canvas
    if (this.x + this.radius > this.canvas.c_handler.width || this.x - this.radius < 0) {
      this.vx = -this.vx * this.friction; // Pantul dan kurangi kecepatan
    }
    if (this.y + this.radius > this.canvas.c_handler.height || this.y - this.radius < 0) {
      this.vy = -this.vy * this.friction;
    }

    // Bersihkan dan gambar bola di posisi baru
    this.canvas.clear();
    this.canvas.lingkaranIsi(this.x, this.y, this.radius, this.color);
    this.canvas.draw();

    requestAnimationFrame(() => this.update()); // Lanjutkan animasi
  }

  draw() {
    this.canvas.lingkaran_polar(this.x, this.y, this.radius, this.color);
  }
}
