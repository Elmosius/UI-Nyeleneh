update() {
    if (this.hasHitTarget || this.ketapel.isGameEnded) return;

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
    if (this.targetIcon.checkKena(this)) {
      console.log("Target Kena!");
      this.hasHitTarget = true;
      this.ketapel.endGameWithSuccess();
      this.canvas.clear();
      return;
    }

    // Cek tabrakan kalau kena si tembok
    this.ketapel.tembokList = this.ketapel.tembokList.filter((tembok) => {
      if (tembok.checkKena(this)) {
        this.vx = -this.vx * this.pantulan;
        this.vy = -this.vy * this.pantulan;
        return false;
      }
      return true;
    });

    // gambar bola posisi baru
    this.canvas.clear();
    this.ketapel.tembokList.forEach((tembok) => tembok.draw());
    this.targetIcon.draw();
    this.ketapel.draw();
    this.canvas.lingkaran_polar(this.x, this.y, this.radius, this.color);
    this.canvas.draw();

    requestAnimationFrame(() => this.update());
  }