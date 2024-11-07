export class TargetIcon {
  constructor(canvas, size = 50, border = true, padding = 15, color = { r: 0, g: 0, b: 0 }, borderColor = { r: 255, g: 0, b: 0 }) {
    this.canvas = canvas;
    this.size = size;
    this.border = border;
    this.padding = padding;
    this.color = color;
    this.borderColor = borderColor;
    this.halfSize = (size - padding * 2) / 2;
    this.boxHalfSize = this.halfSize + padding;
    this.setRandomPosition();
  }

  setRandomPosition() {
    const maxX = this.canvas.c_handler.width - this.boxHalfSize;
    const maxY = this.canvas.c_handler.height - this.boxHalfSize;
    const minX = this.boxHalfSize;
    const minY = this.boxHalfSize;

    // Tentukan posisi acak dalam batas canvas
    this.posX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    this.posY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  }

  draw() {
    const points = [
      { x: this.posX - this.halfSize, y: this.posY - this.halfSize },
      { x: this.posX + this.halfSize, y: this.posY + this.halfSize },
      { x: this.posX - this.halfSize, y: this.posY + this.halfSize },
      { x: this.posX + this.halfSize, y: this.posY - this.halfSize },
    ];

    this.canvas.garis(points[0].x, points[0].y, points[1].x, points[1].y, this.color);
    this.canvas.garis(points[2].x, points[2].y, points[3].x, points[3].y, this.color);

    if (this.border) {
      const boxPoints = [
        { x: this.posX - this.boxHalfSize, y: this.posY - this.boxHalfSize },
        { x: this.posX + this.boxHalfSize, y: this.posY - this.boxHalfSize },
        { x: this.posX + this.boxHalfSize, y: this.posY + this.boxHalfSize },
        { x: this.posX - this.boxHalfSize, y: this.posY + this.boxHalfSize },
        { x: this.posX - this.boxHalfSize, y: this.posY - this.boxHalfSize },
      ];

      for (let i = 0; i < boxPoints.length - 1; i++) {
        const p1 = boxPoints[i];
        const p2 = boxPoints[i + 1];
        this.canvas.garis(p1.x, p1.y, p2.x, p2.y, this.borderColor);
      }

      this.canvas.floodFillStack(this.posX - this.boxHalfSize + 1, this.posY - this.boxHalfSize + 1, { r: 0, g: 0, b: 0 }, this.borderColor);
    }

    this.canvas.draw();
  }

  // Metode deteksi tabrakan dengan bola
  checkKena(bola) {
    const distanceX = Math.abs(bola.x - this.posX);
    const distanceY = Math.abs(bola.y - this.posY);

    const maxDistance = this.boxHalfSize + bola.radius;
    if (distanceX <= maxDistance && distanceY <= maxDistance) {
      return true;
    }
    return false;
  }
}
