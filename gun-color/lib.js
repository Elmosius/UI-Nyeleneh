
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
    this.context.clearRect(0, 0, this.canvas_handler.width, this.canvas_handler.height);}

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

floodFillStack(image_data, canvas, x0, y0, currentColor, newColor) {
    const stack = [];
    stack.push({ x: x0, y: y0 });

    const index_start = 4 * (x0 + y0 * canvas.width);
    const target_r = image_data.data[index_start];
    const target_g = image_data.data[index_start + 1];
    const target_b = image_data.data[index_start + 2];

    if (target_r === newColor.r && target_g === newColor.g && target_b === newColor.b) {
        return;
    }

    while (stack.length > 0) {
        const point = stack.pop();
        const index = 4 * (point.x + point.y * canvas.width);

        const r = image_data.data[index];
        const g = image_data.data[index + 1];
        const b = image_data.data[index + 2];

        if (r === target_r && g === target_g && b === target_b) {
            image_data.data[index] = newColor.r;
            image_data.data[index + 1] = newColor.g;
            image_data.data[index + 2] = newColor.b;
            image_data.data[index + 3] = 255;

            stack.push({ x: point.x + 1, y: point.y });
            stack.push({ x: point.x - 1, y: point.y });
            stack.push({ x: point.x, y: point.y + 1 });
            stack.push({ x: point.x, y: point.y - 1 });
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
    };

    const animate = () => {

        this.clear_canvas();

        this.draw();

        this.bunga(130, 200, 100, 8, { r: 233, g: 216, b: 254, a: 255 });
        this.kupu_kupu(350, 200, 30, { r: 0, g: 255, b: 0 });

        const deltaX = targetX - circle.x;
        const deltaY = targetY - circle.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 5) {
            const moveX = (deltaX / distance) * speed;
            const moveY = (deltaY / distance) * speed;

            circle.x += moveX;
            circle.y += moveY;
        } else {
            circle.x = targetX;
            circle.y = targetY;

            this.floodFillStack(this.image_data, this.canvas_handler, Math.round(circle.x), Math.round(circle.y-5), { r: 0, g: 0, b: 0 }, circle.color);
            this.draw(); 
            return; 
        }

        for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
            const x = circle.x + circle.radius * Math.cos(theta);
            const y = circle.y + circle.radius * Math.sin(theta);
            this.create_dot(x, y, circle.color);
        }

        requestAnimationFrame(animate);
    };

        animate();
    }
}