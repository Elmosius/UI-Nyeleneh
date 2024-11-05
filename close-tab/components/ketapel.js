import { TransformasiMatriks } from "./transformasi.js";

export class Ketapel {
  static draw(canvas, posX = 0, posY = 0, scale = 1, color = { r: 150, g: 75, b: 0 }, angleLeft = Math.PI / 20, angleRight = -Math.PI / 10, dalamTali = 200) {
    const center = { x: posX, y: posY };

    const handlePoints = [
      { x: 0, y: 30 }, // Pegangan bawah
      { x: 0, y: 0 }, // Titik tengah
    ];

    const leftPoints = [
      { x: 0, y: 0 }, // Titik tengah
      { x: -20, y: -50 }, // Ujung kiri
    ];

    const rightPoints = [
      { x: 0, y: 0 }, // Titik tengah
      { x: 20, y: -50 }, // Ujung kanan
    ];

    // buat pegangan
    const translationMatrix = TransformasiMatriks.createTranslasi(posX, posY);
    const scaleMatrix = TransformasiMatriks.createSkala(scale, scale);
    const transformMatrix = TransformasiMatriks.mutiplyMatrix(translationMatrix, scaleMatrix);
    const transformedHandlePoints = TransformasiMatriks.transformasiArray(handlePoints, transformMatrix);

    // batang kiri dan kanan
    const leftRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleLeft);
    const leftTransformMatrix = TransformasiMatriks.mutiplyMatrix(leftRotationMatrix, transformMatrix);
    const transformedLeftPoints = TransformasiMatriks.transformasiArray(leftPoints, leftTransformMatrix);

    const rightRotationMatrix = TransformasiMatriks.rotasiFixPoint(center.x, center.y, angleRight);
    const rightTransformMatrix = TransformasiMatriks.mutiplyMatrix(rightRotationMatrix, transformMatrix);
    const transformedRightPoints = TransformasiMatriks.transformasiArray(rightPoints, rightTransformMatrix);

    this.drawLineWithSteps(canvas, transformedHandlePoints[0], transformedHandlePoints[1], color);
    this.drawLineWithSteps(canvas, transformedLeftPoints[0], transformedLeftPoints[1], color);
    this.drawLineWithSteps(canvas, transformedRightPoints[0], transformedRightPoints[1], color);

    // gambar tali
    this.drawFlexibleString(canvas, transformedLeftPoints[1], transformedRightPoints[1], color, dalamTali);

    canvas.draw();
  }

  static drawLineWithSteps(canvas, p1, p2, color) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = 1;

    for (let j = 0; j < distance; j += step) {
      const x = p1.x + (dx / distance) * j;
      const y = p1.y + (dy / distance) * j;
      canvas.titik(Math.round(x), Math.round(y), color);
    }
  }

  static drawFlexibleString(canvas, leftPoint, rightPoint, color, curveDepth = 20) {
    const midX = (leftPoint.x + rightPoint.x) / 2;
    const midY = (leftPoint.y + rightPoint.y) / 2 - curveDepth; // Tambahkan `curveDepth` untuk ketinggian lengkungan

    for (let t = 0; t <= 1; t += 0.01) {
      const x = (1 - t) * (1 - t) * leftPoint.x + 2 * (1 - t) * t * midX + t * t * rightPoint.x;
      const y = (1 - t) * (1 - t) * leftPoint.y + 2 * (1 - t) * t * midY + t * t * rightPoint.y;
      canvas.titik(Math.round(x), Math.round(y), color);
    }
  }
}
