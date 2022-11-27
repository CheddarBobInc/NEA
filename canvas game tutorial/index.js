const canvas = document.querySelector('canvas');
const scoreElement = document.querySelector('#scoreElement');
const bigScoreElement = document.querySelector('#bigScoreElement')
const startGameBtn = document.querySelector('#startGameBtn');
const modalElement = document.querySelector('#modalElement');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
let projectiles = [];
let enemies = [];
let particles = [];

function innit() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    projectiles = [];
    enemies = [];
    particles = [];
    player = new Player(canvas.width / 2, canvas.height / 2, 30, 'white');
    score = 0;
    scoreElement.innerHTML = score;
}

// player class
class Player {
    constructor(x, y, radius, colour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }
}

// projectile class
class Projectile {
    constructor(x, y, radius, colour, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

// enemy class
class Enemy {
    constructor(x, y, radius, colour, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const friction = 0.99;
// particle class
class Particle {
    constructor(x, y, radius, colour, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

// spawns enemies
function spawnEnemies() {
    // once every second
    setInterval(() => {
        const radius = (Math.random() * 20) + 30;

        let x;
        let y;

        // calculates where to spawn
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const colour = `hsl(${Math.random() * 360}, 50%, 50%`;

        // sets velocity towards the player
        const angle = Math.atan2(canvas.height / 2 - y,canvas.width / 2 - x);
        const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

        enemies.push(new Enemy(x, y, radius, colour, velocity));
    }, 1000);
}

// update function calls every frame
let animationID;
let score = 0;
function animate() {
    animationID = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    // deletes particles once faded out
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            setTimeout(() => {
                particles.splice(i, 1);
            }, 0);
        }
        else{
            particle.update();
        }
    })

    // projectile animation
    projectiles.forEach((projectile, i) => {
        projectile.update();

        if (projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width || 
            projectile.y + projectile.radius < 0 || 
            projectile.y - projectile.radius > canvas.height) {
                setTimeout(() => {
                    projectiles.splice(i, 1);
                }, 0);
            }
    });

    // collision detection
    enemies.forEach((enemy, ei) => {
        enemy.update();

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        // collision between player and enemy
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationID);
            modalElement.style.display = 'flex';
            bigScoreElement.innerHTML = score;
        }

        // collision between projectile and enemy
        projectiles.forEach((projectile, pI) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - enemy.radius - projectile.radius < 1) {
                // creates particle animation
                for (let i = 0; i < enemy.radius; i++) {
                    particles.push(new Particle(enemy.x, enemy.y, Math.random() * 2, enemy.colour, {
                        x: (Math.random() - 0.5) * (Math.random() * 6), y: (Math.random() - 0.5) * (Math.random() * 6)
                    }))
                }
                if (enemy.radius - 10 > 15) {
                    score += 10;
                scoreElement.innerHTML = score;
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(pI, 1);
                    }, 0);
                // deletes enemies and projectiles
                } else {
                    setTimeout(() => {
                        score += 100;
                        scoreElement.innerHTML = score;
                        projectiles.splice(pI, 1);
                        enemies.splice(ei, 1);
                    }, 0);
                }
            }
        });
    });
}

// spawns enemy on click
addEventListener('click', (event) => {
    console.log(projectiles);
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
})

let player = new Player(canvas.width / 2, canvas.height / 2, 30, 'white');

startGameBtn.addEventListener('click', () => {
    innit();
    animate();
    spawnEnemies();
    modalElement.style.display = 'none';
})