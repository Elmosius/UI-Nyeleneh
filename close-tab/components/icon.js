export class IconClose {
  static draw(canvas, posX = 0, posY = 0, size = 50, border = true, padding = 15, color = { r: 0, g: 0, b: 0 }, borderColor = { r: 0, g: 0, b: 0 }) {
    const halfSize = (size - padding * 2) / 2;

    const points = [
      { x: posX - halfSize, y: posY - halfSize },
      { x: posX + halfSize, y: posY + halfSize },
      { x: posX - halfSize, y: posY + halfSize },
      { x: posX + halfSize, y: posY - halfSize },
    ];

    canvas.garis(points[0].x, points[0].y, points[1].x, points[1].y, color);
    canvas.garis(points[2].x, points[2].y, points[3].x, points[3].y, color);

    if (border) {
      const boxHalfSize = halfSize + padding;
      const boxPoints = [
        { x: posX - boxHalfSize, y: posY - boxHalfSize },
        { x: posX + boxHalfSize, y: posY - boxHalfSize },
        { x: posX + boxHalfSize, y: posY + boxHalfSize },
        { x: posX - boxHalfSize, y: posY + boxHalfSize },
        { x: posX - boxHalfSize, y: posY - boxHalfSize },
      ];

      for (let i = 0; i < boxPoints.length - 1; i++) {
        const p1 = boxPoints[i];
        const p2 = boxPoints[i + 1];
        canvas.garis(p1.x, p1.y, p2.x, p2.y, borderColor);
      }

      canvas.floodFillStack(posX - boxHalfSize + 1, posY - boxHalfSize + 1, { r: 0, g: 0, b: 0 }, borderColor);
    }

    canvas.draw();
  }
}
