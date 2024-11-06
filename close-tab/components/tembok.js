export class Tembok {
  constructor(canvas, posX, posY, minPanjang = 50, maxPanjang = 150, orientasi = "vertikal", color = { r: 100, g: 100, b: 100 }) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.panjang = Math.floor(Math.random() * (maxPanjang - minPanjang + 1)) + minPanjang; // Panjang acak
    this.tebal = 10;
    this.orientasi = orientasi;
    this.color = color;

    // Tentukan posisi akhir berdasarkan orientasi
    if (orientasi === "vertikal") {
      this.xAkhir = posX;
      this.yAkhir = posY + this.panjang;
    } else {
      this.xAkhir = posX + this.panjang;
      this.yAkhir = posY;
    }
  }

  draw() {
    const points =
      this.orientasi === "vertikal"
        ? [
            { x: this.posX - this.tebal / 2, y: this.posY },
            { x: this.posX + this.tebal / 2, y: this.posY },
            { x: this.posX + this.tebal / 2, y: this.yAkhir },
            { x: this.posX - this.tebal / 2, y: this.yAkhir },
            { x: this.posX - this.tebal / 2, y: this.posY },
          ]
        : [
            { x: this.posX, y: this.posY - this.tebal / 2 },
            { x: this.xAkhir, y: this.posY - this.tebal / 2 },
            { x: this.xAkhir, y: this.posY + this.tebal / 2 },
            { x: this.posX, y: this.posY + this.tebal / 2 },
            { x: this.posX, y: this.posY - this.tebal / 2 },
          ];

    this.canvas.polygon(points, this.color);
    this.canvas.floodFillStack(this.posX + 1, this.posY + 1, { r: 0, g: 0, b: 0 }, this.color);
    this.canvas.draw();
  }

  checkCollision(bola) {
    const jarakX = Math.abs(bola.x - (this.orientasi === "vertikal" ? this.posX : (this.posX + this.xAkhir) / 2));
    const jarakY = Math.abs(bola.y - (this.orientasi === "horizontal" ? this.posY : (this.posY + this.yAkhir) / 2));

    if (jarakX <= this.tebal / 2 + bola.radius && jarakY <= this.panjang / 2 + bola.radius) {
      return true;
    }
    return false;
  }
}
