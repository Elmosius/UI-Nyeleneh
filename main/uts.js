import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas');

// Membuat objek bunga dan kupu-kupu
const posisiBunga = { x: 150, y: 250, radius: 70, kelopak: 8, color: { r: 233, g: 216, b: 254, a: 255 } };
const posisiKupuKupu = { x: 300, y: 100, size: 20, color: { r: 0, g: 255, b: 0 } };

lib.bunga(posisiBunga.x, posisiBunga.y, posisiBunga.radius, posisiBunga.kelopak, posisiBunga.color);
lib.kupu_kupu(posisiKupuKupu.x, posisiKupuKupu.y, posisiKupuKupu.size, posisiKupuKupu.color);
lib.draw();

// Fungsi untuk mengubah warna
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

// Fungsi untuk menembakkan peluru
function tembakPeluru(targetX, targetY) {
    let peluruX = lib.canvas_handler.width / 2; // Titik awal peluru di tengah bawah
    let peluruY = lib.canvas_handler.height - 10;

    // Menghitung kecepatan peluru agar bergerak langsung ke target
    const deltaX = targetX - peluruX;
    const deltaY = targetY - peluruY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = 5; // Kecepatan peluru
    const moveX = (deltaX / distance) * speed;
    const moveY = (deltaY / distance) * speed;

    function animasiPeluru() {
        // Membersihkan seluruh canvas dan menggambar ulang objek statis
        lib.context.clearRect(0, 0, lib.canvas_handler.width, lib.canvas_handler.height);
        
        // Menggambar objek bunga dan kupu-kupu
        lib.bunga(posisiBunga.x, posisiBunga.y, posisiBunga.radius, posisiBunga.kelopak, posisiBunga.color);
        lib.kupu_kupu(posisiKupuKupu.x, posisiKupuKupu.y, posisiKupuKupu.size, posisiKupuKupu.color);

        // Menggambar peluru di posisi baru
        lib.lingkaran_polar(peluruX, peluruY, 5, warnaTerpilih);

        // Mengecek jika peluru sudah mencapai target atau melewati target
        if (Math.abs(targetX - peluruX) <= Math.abs(moveX) && Math.abs(targetY - peluruY) <= Math.abs(moveY)) {
            // Pewarnaan objek setelah mencapai target
            if (
                Math.abs(targetX - posisiBunga.x) <= posisiBunga.radius &&
                Math.abs(targetY - posisiBunga.y) <= posisiBunga.radius
            ) {
                // Pewarnaan untuk bunga
                lib.floodFillStack(lib.image_data, lib.canvas_handler, posisiBunga.x, posisiBunga.y, posisiBunga.color, warnaTerpilih);
            } else if (
                Math.abs(targetX - posisiKupuKupu.x) <= posisiKupuKupu.size &&
                Math.abs(targetY - posisiKupuKupu.y) <= posisiKupuKupu.size
            ) {
                // Pewarnaan untuk kupu-kupu
                lib.floodFillStack(lib.image_data, lib.canvas_handler, posisiKupuKupu.x, posisiKupuKupu.y, posisiKupuKupu.color, warnaTerpilih);
            }
            lib.draw();
        } else {
            // Memperbarui posisi peluru
            peluruX += moveX;
            peluruY += moveY;
            requestAnimationFrame(animasiPeluru);
        }
    }

    requestAnimationFrame(animasiPeluru);
}

// Event listener untuk klik pada canvas
document.getElementById('my_canvas').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tembakPeluru(x, y);
});
