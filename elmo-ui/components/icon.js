import { TransformasiMatriks } from "./transformasi.js";

export class IconClose {
  static draw(canvas, posX = 0, posY = 0, size = 50, border = true, padding = 15, color = 0, borderColor = 0) {
    const tm = TransformasiMatriks;

    const halfSize = (size - padding * 2) / 2;

    const points = [
      { x: -halfSize, y: -halfSize },
      { x: halfSize, y: halfSize },
      { x: -halfSize, y: halfSize },
      { x: halfSize, y: -halfSize },
    ];

    const translationMatrix = tm.createTranslasi(posX, posY);
    const transformedPoints = tm.transformasiArray(points, translationMatrix);

    canvas.garis(transformedPoints[0].x, transformedPoints[0].y, transformedPoints[1].x, transformedPoints[1].y, color);
    canvas.garis(transformedPoints[2].x, transformedPoints[2].y, transformedPoints[3].x, transformedPoints[3].y, color);

    if (border) {
      const boxHalfSize = halfSize + padding;
      const boxPoints = [
        { x: -boxHalfSize, y: -boxHalfSize },
        { x: boxHalfSize, y: -boxHalfSize },
        { x: boxHalfSize, y: boxHalfSize },
        { x: -boxHalfSize, y: boxHalfSize },
        { x: -boxHalfSize, y: -boxHalfSize },
      ];
      const transformedBoxPoints = tm.transformasiArray(boxPoints, translationMatrix);

      for (let i = 0; i < transformedBoxPoints.length - 1; i++) {
        const p1 = transformedBoxPoints[i];
        const p2 = transformedBoxPoints[i + 1];
        canvas.garis(p1.x, p1.y, p2.x, p2.y, borderColor);
      }
      canvas.floodFillStack(posX+1, posY=1, { r: 0, g: 0, b: 0 }, borderColor);
    }

    canvas.draw();
  }
}
