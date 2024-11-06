export class ImageLib {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext('2d');
        this.curtainHeight = this.canvas.height * 0.5;
        this.isDragging = false;
        this.startY = 0;
        this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        
        this.controlCurtain();
        this.drawCurtain(); // Pastikan ini memanggil fungsi yang ada
    }

    controlCurtain() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            this.startY = e.clientY;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                const diff = e.clientY - this.startY;
                this.curtainHeight = Math.min(this.canvas.height, Math.max(0, this.curtainHeight + diff));
                this.startY = e.clientY;
            }
        });

        this.canvas.addEventListener("mouseup", () => {
            this.isDragging = false;
        });
    }

    drawCurtain() {
        // Jika curtainHeight sudah mencapai 0, sembunyikan canvas dan set brightness latar belakang ke paling terang
        if (this.curtainHeight <= 0) {
            document.body.style.backgroundColor = `rgb(255, 255, 255)`; // Warna putih penuh untuk latar belakang
            this.canvas.style.display = 'none';
            return;
        }
    
        const brightness = (this.curtainHeight / this.canvas.height);
        const brightnessColor = { r: 0, g: 0, b: 0, a: Math.floor(brightness * 255) };
    
        // Mengatur warna latar belakang sesuai dengan nilai brightness
        const bgBrightness = 255 * (1 - brightness); // Semakin kecil brightness, semakin gelap latar belakang
        document.body.style.backgroundColor = `rgb(${bgBrightness}, ${bgBrightness}, ${bgBrightness})`;
    
        // Mengisi latar belakang dengan brightness layer
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                this.drawDot(this.imageData, x, y, brightnessColor);
            }
        }
    
        const curtainColor = { r: 51, g: 51, b: 51, a: 255 }; // Warna utama curtain
        const separatorColor = { r: 0, g: 0, b: 0, a: 255 }; // Warna solid hitam untuk garis pemisah
        const layer = 8; // Kurangi jumlah layer agar garis pemisah lebih jelas
        const layerHeight = Math.floor(this.curtainHeight / layer); // Tinggi setiap layer
    
        for (let i = 0; i < layer; i++) {
            let top = i * layerHeight;
    
            // Menggambar setiap layer curtain
            for (let y = top; y < top + layerHeight - 1; y++) { // Kurangi 1 piksel di atas garis pemisah
                for (let x = 0; x < this.canvas.width; x++) {
                    this.drawDot(this.imageData, x, y, curtainColor);
                }
            }
            
            // Menggambar garis pemisah di bawah setiap layer
            let separatorY = top + layerHeight - 1; // Tempatkan di posisi yang lebih jelas
            if (separatorY < this.curtainHeight) {
                for (let x = 0; x < this.canvas.width; x++) {
                    this.drawDot(this.imageData, x, separatorY, separatorColor);
                }
            }
        }
    
        // Menampilkan hasil di canvas
        this.ctx.putImageData(this.imageData, 0, 0);
    
        // Lanjutkan animasi selama curtainHeight belum mencapai 0 atau penuh
        requestAnimationFrame(() => this.drawCurtain());
    }
    drawDot(imageData, x, y, color) {
        const index = (x + y * imageData.width) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    }
}
