import { TransformasiMatriks } from "./transformasi.js";
import { Bola } from "./bola.js";

export class Ketapel {
  constructor(canvas, posX, posY, scale = 1, color = { r: 88, g: 77, b: 78 }, targetIcon, tembokList, tab) {
    this.canvas = canvas;
    this.tab = tab;

    this.posX = posX;
    this.posY = posY;
    this.scale = scale;
    this.color = color;
    this.tembokList = tembokList;
    this.targetIcon = targetIcon;
    this.isDragging = false;
    this.isGameEnded = false;
    this.draggedPosition = { x: posX, y: posY };
    this.kesempatan = 3;
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
    this.gambarTali(transformedBatangKiri[1], transformedBatangKanan[1], this.draggedPosition, 0, curveDepth);

    // MEMAKAI BANTUAN CHATGPT //
    // Untuk menempelkan bola ke tali (menggunakan persamaan Bezier Curve untuk menentukan posisi bola di tali)
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

      this.bola = new Bola(this.canvas, initialX, initialY, 5, { r: 0, g: 0, b: 255 }, this, this.targetIcon);
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

  gambarTali(leftPoint, rightPoint, draggedPoint, color) {
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

  showAlert(message, type = "info") {
    const alertElement = document.getElementById("game-alert");
    alertElement.className = `alert alert-${type}`;
    alertElement.innerText = message;
    alertElement.parentElement.style.display = "block";

    setTimeout(() => {
      alertElement.parentElement.style.display = "none";
    }, 3000);
  }

  endGameWithSuccess() {
    this.showAlert("Target terkena! HAHAA SELAMAT YAA!", "success");
    this.isGameEnded = true;
    this.bola = null;
    this.isDragging = false;
    this.canvas.clear();
  }

  endGameWithFailure() {
    this.showAlert("Kesempatan habis! COBA LAGII HEHE:)", "danger");
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  async resetBola() {
    if (this.kesempatan > 0 && !this.isGameEnded) {
      this.kesempatan -= 1;
      this.tab.updateLivesDisplay();
      if (this.kesempatan > 0) {
        const midX = this.posX;
        const midY = this.posY - 30;
        this.bola = new Bola(this.canvas, midX, midY, 5, { r: 0, g: 0, b: 255 }, this, this.targetIcon);
        this.bola.draw();
        console.log(`Kesempatan tersisa: ${this.kesempatan}`);
      } else {
        await this.checkLastShot();
      }
    } else if (this.kesempatan <= 0) {
      await this.checkLastShot();
    }
  }

  // Pastiin menang atau engga di peluru terakhir
  async checkLastShot() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (this.isGameEnded) {
      this.showAlert("Selamat! kamu berhasil keluar!", "success");
    } else {
      this.endGameWithFailure();
    }
  }

  tarikTali() {
    this.canvas.c_handler.addEventListener("mousedown", (e) => {
      if (this.isGameEnded || this.kesempatan <= 0) return;

      const { offsetX, offsetY } = e;
      this.isDragging = true;
      this.draggedPosition = { x: offsetX, y: offsetY };
    });

    window.addEventListener("mousemove", (e) => {
      if (this.isDragging && !this.isGameEnded) {
        const rect = this.canvas.c_handler.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let offsetY = e.clientY - rect.top;

        // Biar offsetX tidak menembus dari kiri ke kanan atau sebaliknya
        if (offsetX < 0) {
          offsetX = 0;
        } else if (offsetX > rect.width) {
          offsetX = rect.width;
        }

        this.draggedPosition = { x: offsetX, y: offsetY };
        this.redraw();
      }
    });

    // MENGGUNAKAN BANTUAN CHATGPT //
    // Untuk melempar bola ketika mouseup menggunakan vektor 
    window.addEventListener("mouseup", () => {
      if (this.isDragging && !this.isGameEnded) {
        this.isDragging = false;

        // Hitung vektor tarikan
        const dx = this.posX - this.draggedPosition.x;
        const dy = this.posY - this.draggedPosition.y;

        // Hitung magnitudo (jarak tarikan) untuk menentukan kekuatan
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        // Tentukan sudut lemparan menggunakan atan2
        const angle = Math.atan2(dy, dx);

        // Skala kecepatan berdasarkan magnitudo, sesuaikan scaleFactor untuk hasil yang diinginkan
        const scaleFactor = 0.25; 
        const kecepatanAwal = magnitude * scaleFactor;

        const kecepatanAwalX = kecepatanAwal * Math.cos(angle);
        const kecepatanAwalY = kecepatanAwal * Math.sin(angle);

        this.bola.lempar(kecepatanAwalX, kecepatanAwalY);
        this.resetBola();
      }
      this.draggedPosition = { x: this.posX, y: this.posY };

      this.redraw();
    });
  }

  redraw() {
    this.canvas.clear();
    this.draw();
    if (this.bola) {
      this.tembokList.forEach((tembok) => tembok.draw());
      this.targetIcon.draw();
      this.targetIcon.draw();
      this.bola.draw();
    }
  }
}
