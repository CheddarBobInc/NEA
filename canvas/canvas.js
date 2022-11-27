let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


// // rectangle

// for (let i = 1; i < 50; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let w = Math.random() * 50;
//     let h = Math.random() * 50;
//     let randomColor = Math.floor(Math.random()*16777215).toString(16);
//     c.fillStyle = "#" + randomColor;
//     c.fillRect(x, y, w, h);
//     c.stroke();
// }

// c.fillStyle = 'rgba(2550, 0, 0, 0.5';
// c.fillRect(100, 100, 20, 50);
// c.fillRect(50, 100, 20, 50);
// c.fillRect(150, 100, 20, 50);

// // line

// for (let i = 1; i < 50; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let randomColor = Math.floor(Math.random()*16777215).toString(16);
//     c.beginPath();
//     c.moveTo(x, y);
//     c.lineTo(x + y, y + x);
//     c.strokeStyle = "#" + randomColor;
//     c.stroke();
// }

// // arc

// for (let i = 1; i < 50; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let r = Math.random() * 100;
//     let randomColor = Math.floor(Math.random()*16777215).toString(16);
//     c.beginPath();
//     c.arc(x, y, r, 0, Math.PI * 2, false);
//     c.strokeStyle = "#" + randomColor;
//     c.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined,
}

let colourArray = [
    '#234dff',
    '#dad345',
    '#123456',
    '#fbf456',
    '#23dffa',
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    innit();
})

function Circle(x, y, r, minR, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.minR = minR;
    this.dx = dx;
    this.dy = dy;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
            mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.r < this.minR + 50) {
            this.r += 1;
        } else if (this.r > this.minR || this.r > this.minR + 50){
            this.r -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

for (let i = 0; i < 800; i++) {
    let r = (Math.random() * 5) + 5;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = (Math.random() - 0.5) * 7;
    let dy = (Math.random() - 0.5) * 7;
    circleArray.push(new Circle(x, y, r, r, dx, dy));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function innit(){
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let dx = 0;
        let dy = 0;
        let r = (Math.random() * 5) + 5;
        let x = Math.random() * (innerWidth - r * 2) + r;
        let y = Math.random() * (innerHeight - r * 2) + r;
        dx = (Math.random() - 0.5) * 3;
        dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, r, r, dx, dy));
    }
    animate();
}

innit();
