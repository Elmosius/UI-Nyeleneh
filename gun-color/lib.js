
export class ImageLib {
    constructor(canvas_id){
    this.canvas_handler = document.querySelector(`#${canvas_id}`);
    this.context = this.canvas_handler.getContext("2d");
    this.image_data = this.context.getImageData(0,0,this.canvas_handler.width, this.canvas_handler.height);
    }

draw() {
    this.context.putImageData(this.image_data,0,0);
    }

clear_canvas() {
    this.context.clearRect(0, 0, this.canvas_handler.width, this.canvas_handler.height);
    this.image_data = this.context.getImageData(0, 0, this.canvas_handler.width, this.canvas_handler.height);
}

create_dot (x, y, color) {
    const index = (Math.round(x) + Math.round(y) * this.canvas_handler.width)*4;
    this.image_data.data[index] = color.r;
    this.image_data.data[index + 1] = color.g;
    this.image_data.data[index + 2] = color.b;
    this.image_data.data[index + 3] = 255;
    } 

bunga(xc, yc, radius, kelopak, color) {
    for (var theta = 0; theta < Math.PI*2; theta += 0.001){
        var x = xc + radius * Math.cos(kelopak*theta) * Math.cos(theta);
        var y = yc + radius * Math.cos(kelopak*theta) * Math.sin(theta);
        this.create_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }    

// baris 42-49 menggunakan chat gpt
kupu_kupu(xc, yc, size, color) {
    for (let theta = 0; theta < Math.PI * 12; theta += 0.001) {
        const r = Math.exp(Math.sin(theta)) - 2 * Math.cos(4 * theta) + Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5);
        const x = xc + size * r * Math.cos(theta);
        const y = yc - size * r * Math.sin(theta);
        this.create_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }

    floodFillStack(image_data, canvas, x0, y0, toFlood, color) {
        const tumpukan = [];
        tumpukan.push({ x: x0, y: y0 });
    
        // Ambil warna target awal pada titik yang ingin diganti
        const index_awal = 4 * (x0 + y0 * canvas.width);
        const target_r = image_data.data[index_awal];
        const target_g = image_data.data[index_awal + 1];
        const target_b = image_data.data[index_awal + 2];
    
        while (tumpukan.length > 0) {
            const titik_sekarang = tumpukan.pop();
            const index_sekarang = 4 * (titik_sekarang.x + titik_sekarang.y * canvas.width);
    
            const r1 = image_data.data[index_sekarang];
            const g1 = image_data.data[index_sekarang + 1];
            const b1 = image_data.data[index_sekarang + 2];
    
            // Ganti warna hanya jika sesuai dengan warna target awal
            if ((r1 === target_r) && (g1 === target_g) && (b1 === target_b)) {
                image_data.data[index_sekarang] = color.r;
                image_data.data[index_sekarang + 1] = color.g;
                image_data.data[index_sekarang + 2] = color.b;
                image_data.data[index_sekarang + 3] = 255;
    
                // Tambahkan titik sekitar ke dalam tumpukan untuk pewarnaan
                tumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y });
                tumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y });
                tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 });
                tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 });
            }
        }
    }
        
lingkaran_warna(xc, yc, radius, color) {
    for (var theta = 0; theta < Math.PI*2; theta += 0.001){
        var x = xc + radius* Math.cos(theta);
        var y = yc + radius* Math.sin(theta);
        this.create_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }   
    
    lingkaran_bergerak(targetX, targetY, color) {
        const speed = 5;
    
        let circle = { 
            x: this.canvas_handler.width / 2, 
            y: this.canvas_handler.height - 10, 
            radius: 5, 
            color: color, 
            dx: 0,
            dy: 0
        };
    
        const animate = () => {
            // Gambar ulang image_data tanpa menghapus pewarnaan area yang sudah ada
            this.context.putImageData(this.image_data, 0, 0);
    
            // Gambar objek bunga dan kupu-kupu
            this.bunga(150, 200, 70, 8, { r: 233, g: 216, b: 254, a: 255 });
            this.kupu_kupu(300, 100, 20, { r: 0, g: 255, b: 0 });
    
            const deltaX = targetX - circle.x;
            const deltaY = targetY - circle.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
            if (distance > 3) {
                // Update posisi peluru tanpa menyimpannya ke image_data
                circle.dx = (deltaX / distance) * speed;
                circle.dy = (deltaY / distance) * speed;
                circle.x += circle.dx;
                circle.y += circle.dy;
    
                // Gambar peluru menggunakan lingkaran_warna di posisi baru
                this.lingkaran_warna(circle.x, circle.y, circle.radius, circle.color);
            } else {
                // Ketika peluru mencapai target, pewarnaan area menggunakan floodFillStack
                this.floodFillStack(this.image_data, this.canvas_handler, Math.round(circle.x), Math.round(circle.y), { r: 0, g: 0, b: 0 }, circle.color);
                this.context.putImageData(this.image_data, 0, 0); // Tampilkan pewarnaan area yang baru
                return; // Hentikan animasi setelah pewarnaan
            }
    
            // Lanjutkan animasi jika jaraknya lebih dari 1 pixel
            requestAnimationFrame(animate);
        };
    
        animate();
    }        
         
}