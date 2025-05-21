/*-------------------- Moving dots --------------------*/

const canvas = document.createElement('canvas');
document.body.insertBefore(canvas, document.body.firstChild);
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Point {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.15) * 0.15;
        this.speedY = (Math.random() - 0.15) * 0.15;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

const points = Array.from({ length: 100 }, () => new Point());
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        point.update();
        point.draw();

        const distance = Math.hypot(point.x - mouseX, point.y - mouseY);
        const maxDistance = 150;

        if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(point.x, point.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.stroke();
        }
    });

    requestAnimationFrame(animate);
}

animate();

/*-------------------- click hamburger --------------------*/

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('collapsed');
    } else {
        navbar.classList.remove('collapsed');
    }
});

document.querySelector('.navbar').addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('collapsed');
});

document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    if (!navbar.classList.contains('collapsed')) {
        navbar.classList.add('collapsed');
    }
});
