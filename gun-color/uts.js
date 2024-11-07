import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas');

const posisiBunga = { x: 150, y: 250, radius: 70, kelopak: 8, color: { r: 233, g: 216, b: 254, a: 255 } };
const posisiKupuKupu = { x: 300, y: 100, size: 20, color: { r: 0, g: 255, b: 0 } };

lib.bunga(posisiBunga.x, posisiBunga.y, posisiBunga.radius, posisiBunga.kelopak, posisiBunga.color);
lib.kupu_kupu(posisiKupuKupu.x, posisiKupuKupu.y, posisiKupuKupu.size, posisiKupuKupu.color);
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
    lib.lingkaran_bergerak(targetX, targetY, warnaTerpilih, posisiBunga, posisiKupuKupu);
}

document.getElementById('my_canvas').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    peluru_warna(x, y);
});
