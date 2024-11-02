import { TransformasiMatriks } from "./transformasi.js";

export class Ketapel {
  static draw(canvas, posX = 0, posY = 0, scale = 1, color = { r: 150, g: 75, b: 0 }) {
    const points = [
      // Pegangan bawah
      { x: 0, y: 30 },
      // Titik tengah 
      { x: 0, y: 0 },
      // Ujung kiri
      { x: -20, y: -50 },
      // Kembali ke tengah
      { x: 0, y: 0 },
      // Ujung kanan
      { x: 20, y: -50 },
      // Kembali ke tengah
      { x: 0, y: 0 },
    ];

    const translationMatrix = TransformasiMatriks.createTranslasi(posX, posY);
    const scaleMatrix = TransformasiMatriks.createSkala(scale, scale);
    const transformMatrix = TransformasiMatriks.mutiplyMatrix(translationMatrix, scaleMatrix);
    const transformedPoints = TransformasiMatriks.transformasiArray(points, transformMatrix);

    for (let i = 0; i < transformedPoints.length - 1; i++) {
      const p1 = transformedPoints[i];
      const p2 = transformedPoints[i + 1];
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

    canvas.draw();
  }
}
