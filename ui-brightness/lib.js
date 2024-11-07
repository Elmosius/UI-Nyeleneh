export class ImageLib {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext('2d');
        this.curtainHeight = this.canvas.height * 0.5;
        this.isDragging = false;
        this.startY = 0;
        this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        
        this.controlCurtain();
        this.drawCurtain(); 
    }

    // fungsi untuk menggambar titik
    drawDot(imageData, x, y, color) {
        const index = (x + y * imageData.width) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    }
    
    // untuk mengontrol curtainnya
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

    // fungsi untuk menggambar curtain
    drawCurtain() {
        // untuk menyembunyikan brightness curtail
        if (this.curtainHeight <= 0) {
            document.body.style.backgroundColor = `rgb(255, 255, 255)`;
            this.canvas.style.display = 'none';
            return;
        }
    
        const brightness = (this.curtainHeight / this.canvas.height);
        const brightnessColor = { r: 0, g: 0, b: 0, a: Math.floor(brightness * 255) };
    
        // menyesuaikan background dengan warna brightness
        const bgBrightness = 255 * (1 - brightness); 
        document.body.style.backgroundColor = `rgb(${bgBrightness}, ${bgBrightness}, ${bgBrightness})`;
    
        // membuat latar belakang dengan brightness layer
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                this.drawDot(this.imageData, x, y, brightnessColor);
            }
        }
    
        const curtainColor = { r: 51, g: 51, b: 51, a: 255 }; 
        const separatorColor = { r: 0, g: 0, b: 0, a: 255 };
        const layer = 8; 
        const layerHeight = Math.floor(this.curtainHeight / layer);
    
        for (let i = 0; i < layer; i++) {
            let top = i * layerHeight;
    
            // membuat setiap layer curtain
            for (let y = top; y < top + layerHeight - 1; y++) { 
                for (let x = 0; x < this.canvas.width; x++) {
                    this.drawDot(this.imageData, x, y, curtainColor);
                }
            }
            
            // membuat garis pemisah untuk memberikan jarak antara layer
            let separatorY = top + layerHeight - 1; 
            if (separatorY < this.curtainHeight) {
                for (let x = 0; x < this.canvas.width; x++) {
                    this.drawDot(this.imageData, x, separatorY, separatorColor);
                }
            }
        }
    
        this.ctx.putImageData(this.imageData, 0, 0);
    
        // melanjutkan animasi selama curtainnya belom mentok
        requestAnimationFrame(() => this.drawCurtain());
    }
}
