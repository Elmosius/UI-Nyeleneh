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

lingkaran_polar(xc, yc, radius, color) {
    for (var theta = 0; theta < Math.PI*2; theta += 0.001){
        var x = xc + radius* Math.cos(theta);
        var y = yc + radius* Math.sin(theta);
        this.create_dot(Math.ceil(x), Math.ceil(y), color);
        }
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
    var tumpukan = [];
    tumpukan.push({x: x0, y: y0});

    while (tumpukan.length > 0) {
        // ambil satu buah titik dari tumpukan
        // cek titik tersebut bisa diwarna atau tidak
        // kalo bisa warna lalu masukkan dalam tumpukan titik sekitarnya
        var titik_sekarang = tumpukan.pop();
        var index_sekarang = 4 * (titik_sekarang.x + titik_sekarang.y * canvas.width)

        var r1 = image_data.data[index_sekarang];
        var g1 = image_data.data[index_sekarang + 1];
        var b1 = image_data.data[index_sekarang + 2];

        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            image_data.data[index_sekarang] = color.r;
            image_data.data[index_sekarang + 1] = color.g;
            image_data.data[index_sekarang + 2] = color.b;
            image_data.data[index_sekarang + 3] = 255;
    
            tumpukan.push({x: titik_sekarang.x+1, y:titik_sekarang.y});
            tumpukan.push({x: titik_sekarang.x-1, y:titik_sekarang.y});
            tumpukan.push({x: titik_sekarang.x, y:titik_sekarang.y+1});
            tumpukan.push({x: titik_sekarang.x, y:titik_sekarang.y-1});
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
        const canvasWidth = this.canvas_handler.width;
        const canvasHeight = this.canvas_handler.height;
        const speed = 2; // Kecepatan gerak lingkaran

        let circle = { 
            x: canvasWidth / 2, 
            y: canvasHeight - 10, 
            radius: 20, 
            color: color, 
            dx: 0,
            dy: 0
        };

        const animate = () => {
            this.clear_canvas();

            const deltaX = targetX - circle.x;
            const deltaY = targetY - circle.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > 1) {
                circle.dx = (deltaX / distance) * speed;
                circle.dy = (deltaY / distance) * speed;

                circle.x += circle.dx;
                circle.y += circle.dy;
            } else {
                circle.x = targetX;
                circle.y = targetY;
            }

            this.lingkaran_warna(circle.x, circle.y, circle.radius, circle.color);
            this.floodFillStack(this.image_data, this.canvas_handler, Math.round(circle.x), Math.round(circle.y), { r: 0, g: 0, b: 0 }, circle.color);

            this.draw();

            if (distance > 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }
    
        
rotasi(titik_lama, sudut){
    var x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut);
    var y_baru = titik_lama.x * Math.sin(sudut) + titik_lama.y * Math.cos(sudut);
    return {x: x_baru, y:y_baru};
    }

rotasi_fp(titik_lama, titik_putar, sudut){
    var p1 = this.translasi(titik_lama, {x: -titik_putar.x, y: -titik_putar.y});
    var p2 = this.rotasi(p1, sudut);
    var p3 = this.translasi(p2, titik_putar);
    return p3;
    }

rotasi_array(array_titik, titik_pusat, sudut){
    var array_hasil = [];
    for (var i=0; i<array_titik.length; i++){
        var temp = this.rotasi_fp(array_titik[i], titik_pusat, sudut);
        array_hasil.push(temp);
        }
    return array_hasil;
    }
}