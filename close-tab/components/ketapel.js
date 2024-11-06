import { TransformasiMatriks } from "./transformasi.js";
import { Bola } from "./bola.js";

export class Ketapel {
  constructor(canvas, posX, posY, scale = 1, color = { r: 88, g: 77, b: 78 }) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.scale = scale;
    this.color = color;

    this.isDragging = false;
    this.draggedPosition = { x: posX, y: posY };
    this.tarikTali();
  }

  draw(angleLeft = Math.PI / 20, angleRight = -Math.PI / 10, curveDepth = 20) {
    const center = { x: this.posX, y: this.posY };

    // kalo ga ditarik posisinya ttep
    if (!this.isDragging) {
      this.draggedPosition = { x: this.posX, y: this.posY };
    }

    const pegangan = [
      { x: 0, y: 30 },
      { x: 0, y: 0 },
    ];

    const batangKiri = [
      { x: 0, y: 0 },
      { x: -20, y: -50 },
    ];

    const batangKanan = [
      { x: 0, y: 0 },
      { x: 20, y: -50 },
    ];

    const translationMatrix = TransformasiMatriks.createTranslasi(this.posX, this.posY);
    const scaleMatrix = TransformasiMatriks.createSkala(this.scale, this.scale);
    const transformMatrix = TransformasiMatriks.mutiplyMatrix(translationMatrix, scaleMatrix);

    const transformedPegangan = TransformasiMatriks.transformasiArray(pegangan, transformMatrix);

    const leftRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleLeft);
    const leftTransformMatrix = TransformasiMatriks.mutiplyMatrix(leftRotationMatrix, transformMatrix);
    const transformedBatangKiri = TransformasiMatriks.transformasiArray(batangKiri, leftTransformMatrix);

    const rightRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleRight);
    const rightTransformMatrix = TransformasiMatriks.mutiplyMatrix(rightRotationMatrix, transformMatrix);
    const transformedBatangKanan = TransformasiMatriks.transformasiArray(batangKanan, rightTransformMatrix);

    this.gambarGaris(transformedPegangan[0], transformedPegangan[1], this.color);
    this.gambarGaris(transformedBatangKiri[0], transformedBatangKiri[1], this.color);
    this.gambarGaris(transformedBatangKanan[0], transformedBatangKanan[1], this.color);

    this.drawFlexibleString(transformedBatangKiri[1], transformedBatangKanan[1], this.draggedPosition, 0, curveDepth);

    // Posisi awal bola
    if (!this.bola) {
      const leftPoint = transformedBatangKiri[1];
      const rightPoint = transformedBatangKanan[1];
      const draggedPoint = this.draggedPosition;
      const offset = 10; // Jarak kecil dari tali, bisa disesuaikan

      // Menggunakan nilai t = 0.5 untuk menempatkan bola di tengah tali fleksibel (Bezier curve)
      const midX = (1 - 0.5) * (1 - 0.5) * leftPoint.x + 2 * (1 - 0.5) * 0.5 * draggedPoint.x + 0.5 * 0.5 * rightPoint.x;
      const midY = (1 - 0.5) * (1 - 0.5) * leftPoint.y + 2 * (1 - 0.5) * 0.5 * draggedPoint.y + 0.5 * 0.5 * rightPoint.y;

      // Menambahkan offset pada posisi bola
      const initialX = midX;
      const initialY = midY - offset; // Tambahkan offset vertikal untuk memberi jarak dari tali

      this.bola = new Bola(this.canvas, initialX, initialY, 5, { r: 0, g: 0, b: 255 });
    }

    if (this.isDragging) {
      const leftPoint = transformedBatangKiri[1];
      const rightPoint = transformedBatangKanan[1];
      const draggedPoint = this.draggedPosition;

      // Tetap gunakan `t = 0.5` untuk memastikan bola berada di tengah tali
      const t = 0.4;
      const bolaX = (1 - t) * (1 - t) * leftPoint.x + 2 * (1 - t) * t * draggedPoint.x + t * t * rightPoint.x;
      const bolaY = (1 - t) * (1 - t) * leftPoint.y + 2 * (1 - t) * t * draggedPoint.y + t * t * rightPoint.y;

      this.bola.x = bolaX;
      this.bola.y = bolaY;
    }

    this.bola.draw();

    this.canvas.draw();
  }

  drawFlexibleString(leftPoint, rightPoint, draggedPoint, color) {
    for (let t = 0; t <= 1; t += 0.001) {
      const x = (1 - t) * (1 - t) * leftPoint.x + 2 * (1 - t) * t * draggedPoint.x + t * t * rightPoint.x;
      const y = (1 - t) * (1 - t) * leftPoint.y + 2 * (1 - t) * t * draggedPoint.y + t * t * rightPoint.y;
      this.canvas.titik(Math.round(x), Math.round(y), color);
    }
  }

  gambarGaris(p1, p2, color) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = 1;

    for (let j = 0; j < distance; j += step) {
      const x = p1.x + (dx / distance) * j;
      const y = p1.y + (dy / distance) * j;
      this.canvas.titik(Math.round(x), Math.round(y), color);
    }
  }

  tarikTali() {
    this.canvas.c_handler.addEventListener("mousedown", (e) => {
      const { offsetX, offsetY } = e;
      this.isDragging = true;
      this.draggedPosition = { x: offsetX, y: offsetY }; // Mulai dari posisi mouse
      this.redraw();
    });

    this.canvas.c_handler.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        const { offsetX, offsetY } = e;
        this.draggedPosition = { x: offsetX, y: offsetY };
        this.redraw();
      }
    });

    this.canvas.c_handler.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.draggedPosition = { x: this.posX, y: this.posY }; // Kembali ke posisi semula
      this.redraw();
    });
  }

  redraw(angleLeft = Math.PI / 20, angleRight = -Math.PI / 10) {
    this.canvas.clear();
    this.draw(angleLeft, angleRight);
  }
}
