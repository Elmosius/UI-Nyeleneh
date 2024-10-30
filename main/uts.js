import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas')

// membantu mencari titik koordinat untuk mewarnai
document.getElementById('my_canvas').addEventListener('dblclick', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x);
    console.log(y);
});

// bunga 1
lib.bunga(90, 150, 70, 2, {r: 155, g: 155, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 35, 155, {r: 0, g:0, b:0}, {r: 155, g: 155, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 100, 110, {r: 0, g:0, b:0}, {r: 155, g: 155, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 125, 150, {r: 0, g:0, b:0}, {r: 155, g: 155, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 100, 185, {r: 0, g:0, b:0}, {r: 155, g: 155, b: 254, a: 255});

// bunga 2
lib.bunga(250, 150, 70, 4, {r: 233, g: 216, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 210, 150, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 220, 120, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 220, 185, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 255, 110, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 255, 200, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 285, 125, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 300, 150, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 285, 180, {r: 0, g:0, b:0}, {r: 247, g: 240, b: 254, a: 255});

// bunga 3
lib.bunga(410, 150, 70, 6, {r: 252, g: 218, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 375, 150, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 450, 150, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 375, 130, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 375, 170, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 395, 120, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 395, 180, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 410, 110, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 410, 180, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 435, 115, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 435, 190, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 450, 130, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});
lib.floodFillStack(lib.image_data, lib.canvas_handler, 450, 180, {r: 0, g:0, b:0}, {r: 253, g: 234, b: 254, a: 255});

lib.draw();