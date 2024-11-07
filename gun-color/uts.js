import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas');

lib.bunga(150, 200, 70, 8, { r: 233, g: 216, b: 254, a: 255 });
lib.kupu_kupu(300, 100, 20, { r: 0, g: 255, b: 0 });
lib.draw();

let warnaTerpilih = { r: 255, g: 0, b: 0 };

function ubahWarna(r, g, b) {
    warnaTerpilih = { r: r, g: g, b: b };
}

document.getElementById('red').addEventListener('click', () => ubahWarna(255, 0, 0));
document.getElementById('green').addEventListener('click', () => ubahWarna(0, 128, 0));
document.getElementById('blue').addEventListener('click', () => ubahWarna(0, 0, 255));
document.getElementById('yellow').addEventListener('click', () => ubahWarna(255, 255, 0));
document.getElementById('purple').addEventListener('click', () => ubahWarna(128, 0, 128));
document.getElementById('cyan').addEventListener('click', () => ubahWarna(0, 255, 255));

function peluru_warna(targetX, targetY) {
    lib.lingkaran_bergerak(targetX, targetY, warnaTerpilih);
}

document.getElementById('my_canvas').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    peluru_warna(x, y);
});
