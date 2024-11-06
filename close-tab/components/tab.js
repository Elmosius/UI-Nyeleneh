import { IconClose } from "../components/icon.js";
import { Ketapel } from "./ketapel.js";

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
    this.iconY = 14;

    this.contentPoints = [
      { x: 0, y: this.headerHeight },
      { x: this.width, y: this.headerHeight },
      { x: this.width, y: this.height },
      { x: 0, y: this.height },
    ];

    this.isHovered = false;
    this.imageLoaded = false;
    this.isCleared = false;

    this.iconHovered();
    this.iconCliked();
  }

  drawTab() {
    if (this.isCleared) return;

    const headerPoints = [
      { x: 0, y: 0 },
      { x: this.width, y: 0 },
      { x: this.width, y: this.headerHeight - 2 },
      { x: 0, y: this.headerHeight - 2 },
    ];

    this.gambar();
    this.canvas.polygon(headerPoints, this.headerColor);
    this.canvas.floodFillStack(5, 5, { r: 0, g: 0, b: 0 }, this.headerColor);

    this.canvas.polygon(this.contentPoints, this.contentColor);
    this.canvas.floodFillStack(5, this.headerHeight + 5, { r: 0, g: 0, b: 0 }, this.contentColor);

    IconClose.draw(this.canvas, this.iconX, this.iconY, this.iconSize, false, this.iconPadding, 0, 0);
    this.canvas.draw();
  }

  gambar() {
    const img = new Image();
    img.src = "./img/gbr_yt.png";

    img.onload = () => {
      console.log("gambar muncul");
      const context = this.canvas.ctx;
      const imageX = 10;
      const imageY = this.headerHeight + 10;
      const imageWidth = this.width - 20;
      const imageHeight = this.height - this.headerHeight - 20;

      context.drawImage(img, imageX, imageY, imageWidth, imageHeight);
      this.imageLoaded = true;
    };
  }

  iconCliked() {
    this.canvas.c_handler.addEventListener("click", (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      const iconBorderX = this.iconX - this.iconPadding;
      const iconBorderY = this.iconY - this.iconPadding;
      const iconBorderSize = this.iconSize + this.iconPadding * 2;

      if (mouseX >= iconBorderX && mouseX <= iconBorderX + iconBorderSize && mouseY >= iconBorderY && mouseY <= iconBorderY + iconBorderSize) {
        this.isCleared = true;
        this.canvas.clear();
        this.canvas.c_handler.style.cursor = "default";

        // Perbesar ukuran canvas dengan transisi
        this.canvas.c_handler.style.transition = "width 0.8s ease-in-out, height 0.8s ease-in-out";
        this.canvas.c_handler.style.width = "1500px"; // Atur ukuran sesuai kebutuhan
        this.canvas.c_handler.style.height = "1000px";

        const ketapelPosX = this.width / 2;
        const ketapelPosY = this.height - 30;
        this.ketapel = new Ketapel(this.canvas, ketapelPosX, ketapelPosY, 1, { r: 150 });

        this.ketapel.draw();
      }
    });
  }

  iconHovered() {
    this.canvas.c_handler.addEventListener("mousemove", (e) => {
      if (this.isCleared) return;

      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      const iconBorderX = this.iconX - this.iconPadding;
      const iconBorderY = this.iconY - this.iconPadding;
      const iconBorderSize = this.iconSize + this.iconPadding * 2;

      const isInsideIcon = mouseX >= iconBorderX && mouseX <= iconBorderX + iconBorderSize && mouseY >= iconBorderY && mouseY <= iconBorderY + iconBorderSize;

      if (isInsideIcon && !this.isHovered) {
        console.info("kena");
        this.isHovered = true;
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
        this.drawTab();
        this.canvas.draw();
      } else if (!isInsideIcon && this.isHovered) {
        this.isHovered = false;
        this.canvas.c_handler.style.cursor = "default";
        this.canvas.clear();
        this.drawTab();
      }
    });
  }
}
