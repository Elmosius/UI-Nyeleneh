import { IconClose } from "../components/icon.js";

export class WebTab {
  constructor(canvas, width, height, headerHeight = 32, headerColor = { r: 125, g: 156, b: 166 }, contentColor = { r: 245, g: 245, b: 245 }) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.headerHeight = headerHeight;
    this.headerColor = headerColor;
    this.contentColor = contentColor;

    this.iconSize = 30;
    this.iconPadding = 10;
    this.iconX = width - this.iconSize + 14;
    this.iconY = 15;

    this.contentPoints = [
      { x: 0, y: this.headerHeight },
      { x: this.width, y: this.headerHeight },
      { x: this.width, y: this.height },
      { x: 0, y: this.height },
    ];

    this.initHoverEffect();
  }

  drawTab() {
    const headerPoints = [
      { x: 0, y: 0 },
      { x: this.width, y: 0 },
      { x: this.width, y: this.headerHeight - 2 },
      { x: 0, y: this.headerHeight - 2 },
    ];
    this.canvas.polygon(headerPoints, this.headerColor);
    this.canvas.floodFillStack(5, 5, { r: 0, g: 0, b: 0 }, this.headerColor);

    this.canvas.polygon(this.contentPoints, this.contentColor);
    this.canvas.floodFillStack(5, this.headerHeight + 5, { r: 0, g: 0, b: 0 }, this.contentColor);

    IconClose.draw(this.canvas, this.iconX, this.iconY, this.iconSize, false, this.iconPadding, 0, 0);
    this.canvas.draw();
  }

  initHoverEffect() {
    this.canvas.c_handler.addEventListener("mousemove", (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      const iconBorderX = this.iconX - this.iconPadding;
      const iconBorderY = this.iconY - this.iconPadding;
      const iconBorderSize = this.iconSize + this.iconPadding * 2;

      if (mouseX >= iconBorderX && mouseX <= iconBorderX + iconBorderSize && mouseY >= iconBorderY && mouseY <= iconBorderY + iconBorderSize) {
        this.canvas.c_handler.style.cursor = "pointer";
        this.canvas.clear();

        const headerPoints = [
          { x: 0, y: 0 },
          { x: this.width - this.iconSize - 2, y: 0 },
          { x: this.width - this.iconSize - 2, y: this.headerHeight - 2 },
          { x: 0, y: this.headerHeight - 2 },
        ];
        this.canvas.polygon(headerPoints, this.headerColor);
        this.canvas.floodFillStack(5, 5, { r: 0, g: 0, b: 0 }, this.headerColor);
        this.canvas.polygon(this.contentPoints, this.contentColor);
        this.canvas.floodFillStack(5, this.headerHeight + 5, { r: 0, g: 0, b: 0 }, this.contentColor);

        IconClose.draw(this.canvas, this.iconX, this.iconY, this.iconSize, true, this.iconPadding, { r: 255, g: 255, b: 255 }, { r: 255 });
        this.canvas.draw();
      } else {
        this.canvas.c_handler.style.cursor = "default";
        this.canvas.clear();

        this.drawTab();
      }
    });
  }
}
