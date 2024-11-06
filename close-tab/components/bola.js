export class Bola {
  constructor(canvas, startX, startY, radius = 1, color = { r: 0, g: 0, b: 255 }, ketapel, targetIcon) {
    this.canvas = canvas;
    this.ketapel = ketapel;
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.grativasi = 0.55;
    this.pantulan = 0.75;
    this.targetIcon = targetIcon;
    this.hasHitTarget = false;
  }

  lempar(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    this.update();
  }

  update() {
    if (this.hasHitTarget) return;

    const margin = 5;

    // Tambahkan gravitasi
    this.vy += this.grativasi;

    // Update posisi bola
    this.x += this.vx;
    this.y += this.vy;

    // Deteksi tabrakan dengan batas canvas dan pantulkan, tambahkan margin
    if (this.x + this.radius > this.canvas.c_handler.width - margin) {
      this.x = this.canvas.c_handler.width - this.radius - margin;
      this.vx = -this.vx * this.pantulan;
    } else if (this.x - this.radius < margin) {
      this.x = this.radius + margin;
      this.vx = -this.vx * this.pantulan;
    }

    if (this.y + this.radius > this.canvas.c_handler.height - margin) {
      this.y = this.canvas.c_handler.height - this.radius - margin;
      this.vy = -this.vy * this.pantulan;
    } else if (this.y - this.radius < margin) {
      this.y = this.radius + margin;
      this.vy = -this.vy * this.pantulan;
    }

    // Cek tabrakan dengan target
    if (this.targetIcon.checkCollision(this)) {
      console.log("Target Hit!");
      this.hasHitTarget = true;
      this.ketapel.endGameWithSuccess();
      this.canvas.clear();
      return;
    }

    // Cek tabrakan dengan setiap tembok dalam tembokList
    this.ketapel.tembokList = this.ketapel.tembokList.filter((tembok) => {
      if (tembok.checkCollision(this)) {
        // Pantulkan bola saat mengenai tembok
        this.vx = -this.vx * this.pantulan;
        this.vy = -this.vy * this.pantulan;
        return false; // Menghapus tembok dari daftar
      }
      return true;
    });

    // Bersihkan dan gambar bola di posisi baru
    this.canvas.clear();
    this.ketapel.tembokList.forEach((tembok) => tembok.draw());
    this.targetIcon.draw();
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
