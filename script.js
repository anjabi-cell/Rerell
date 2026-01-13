const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ⭐ Bintang interaktif yang bisa digeser
class Star {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.r = Math.random() * 1.5; this.s = Math.random() * 0.5 + 0.1; this.alpha = Math.random(); this.aChange = Math.random() * 0.02; }
    update() { this.y -= this.s; this.alpha += this.aChange; if (this.alpha > 1 || this.alpha < 0) this.aChange *= -1; if (this.y < 0) this.reset(); }
    draw() { ctx.fillStyle = `rgba(255,255,255,${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); }
}

const stars = Array.from({ length: 600 }, () => new Star());

let particles = [];
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    ctx.fillStyle = "#0b0c17";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // bintang ikut mouse
    stars.forEach(s => {
        s.update();
        s.x += (mouseX - s.x) * 0.001; // tarik bintang ke mouse
        s.y += (mouseY - s.y) * 0.001;
        s.draw();
    });

    particles.forEach((p, i) => {
        p.x += p.sX;
        p.y += p.sY;
        p.alpha -= 0.03;
        ctx.fillStyle = `rgba(255,150,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

// 💌 Typing panjang & ngoko modern anak muda
const text = "Yo Aurel 🌸. Aku ngerti kito durung ketemu langsung, tapi aku kepengin jujur wae. Aku seneng caramu ngobrol, cara kowe nanggepi aku, lan kabeh sikapmu sing gokil. Aku pengin kenal kowe luwih deket, santai wae, opo wae tak jaluk nek gelem. Yen kowe ngrasakke padha, aku seneng banget, nek ora ya ora popo, tetep tak hargai 💖.";
let i = 0;
const typingEl = document.getElementById("typing");
function typeEffect() { if (i < text.length) { typingEl.innerHTML += text.charAt(i); i++; setTimeout(typeEffect, 45); } }
typeEffect();

// ✨ Partikel ledakan pas klik/touch
canvas.addEventListener("click", (e) => {
    for (let j = 0; j < 60; j++) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            r: Math.random() * 2 + 1,
            sX: (Math.random() - 0.5) * 7,
            sY: (Math.random() - 0.5) * 7,
            alpha: 1
        });
    }
});

// Tombol WA interaktif
document.getElementById("replyBtn").addEventListener("click", () => {
    alert("Muga Aurel uga ngrasakke padha 💖");
});
