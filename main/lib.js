export class ImageLib {
    constructor(canvas_id){
    this.canvas_handler = document.querySelector(`#${canvas_id}`);
    this.context = this.canvas_handler.getContext("2d");
    this.image_data = this.context.getImageData(0,0,this.canvas_handler.width, this.canvas_handler.height);
    }

draw() {
    this.context.putImageData(this.image_data,0,0);
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
}