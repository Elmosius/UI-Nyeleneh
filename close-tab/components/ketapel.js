import { TransformasiMatriks } from "./transformasi.js";

export class Ketapel {
  constructor(canvas, posX, posY, scale = 1, color = { r: 150, g: 75, b: 0 }) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.scale = scale;
    this.color = color;

    this.isDragging = false;
    this.draggedPosition = { x: posX, y: posY }; // Posisi saat tali ditarik
    this.initMouseEvents();
  }

  // Menggambar ketapel utama dengan posisi tali saat ini
  draw(angleLeft = Math.PI / 20, angleRight = -Math.PI / 10, curveDepth = 20) {
    const center = { x: this.posX, y: this.posY };

    // Jika tidak sedang ditarik, maka tali berada di titik pusat ketapel
    if (!this.isDragging) {
      this.draggedPosition = { x: this.posX, y: this.posY };
    }

    // Titik-titik untuk pegangan ketapel
    const handlePoints = [
      { x: 0, y: 30 }, // Pegangan bawah
      { x: 0, y: 0 }, // Titik tengah
    ];

    // Titik-titik untuk batang kiri dan kanan
    const leftPoints = [
      { x: 0, y: 0 }, // Titik tengah
      { x: -20, y: -50 }, // Ujung kiri
    ];

    const rightPoints = [
      { x: 0, y: 0 }, // Titik tengah
      { x: 20, y: -50 }, // Ujung kanan
    ];

    // Matriks transformasi untuk skala dan translasi
    const translationMatrix = TransformasiMatriks.createTranslasi(this.posX, this.posY);
    const scaleMatrix = TransformasiMatriks.createSkala(this.scale, this.scale);
    const transformMatrix = TransformasiMatriks.mutiplyMatrix(translationMatrix, scaleMatrix);

    // Transformasi titik-titik pegangan
    const transformedHandlePoints = TransformasiMatriks.transformasiArray(handlePoints, transformMatrix);

    // Rotasi dan transformasi batang kiri
    const leftRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleLeft);
    const leftTransformMatrix = TransformasiMatriks.mutiplyMatrix(leftRotationMatrix, transformMatrix);
    const transformedLeftPoints = TransformasiMatriks.transformasiArray(leftPoints, leftTransformMatrix);

    // Rotasi dan transformasi batang kanan
    const rightRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleRight);
    const rightTransformMatrix = TransformasiMatriks.mutiplyMatrix(rightRotationMatrix, transformMatrix);
    const transformedRightPoints = TransformasiMatriks.transformasiArray(rightPoints, rightTransformMatrix);

    // Menggambar pegangan dan batang kiri serta kanan
    this.drawLineWithSteps(transformedHandlePoints[0], transformedHandlePoints[1], this.color);
    this.drawLineWithSteps(transformedLeftPoints[0], transformedLeftPoints[1], this.color);
    this.drawLineWithSteps(transformedRightPoints[0], transformedRightPoints[1], this.color);

    // Menggambar tali fleksibel dari ujung batang kiri dan kanan ke titik tarik
    this.drawFlexibleString(transformedLeftPoints[1], transformedRightPoints[1], this.draggedPosition, this.color, curveDepth);

    this.canvas.draw();
  }

  // Fungsi untuk menggambar tali fleksibel
  drawFlexibleString(leftPoint, rightPoint, draggedPoint, color) {
    for (let t = 0; t <= 1; t += 0.001) {
      const x = (1 - t) * (1 - t) * leftPoint.x + 2 * (1 - t) * t * draggedPoint.x + t * t * rightPoint.x;
      const y = (1 - t) * (1 - t) * leftPoint.y + 2 * (1 - t) * t * draggedPoint.y + t * t * rightPoint.y;
      this.canvas.titik(Math.round(x), Math.round(y), color);
    }
  }

  // Fungsi untuk menggambar garis
  drawLineWithSteps(p1, p2, color) {
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

  // Event handler untuk mouse agar ketapel bisa ditarik
  initMouseEvents() {
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

  // Fungsi untuk menggambar ulang ketapel dengan posisi tali baru
  redraw(angleLeft = Math.PI / 20, angleRight = -Math.PI / 10) {
    this.canvas.clear();
    this.draw(angleLeft, angleRight);
  }
}
