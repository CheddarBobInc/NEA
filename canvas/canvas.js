var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillRect(100, 100, 20, 50);
c.fillRect(50, 100, 20, 50);
c.fillRect(150, 100, 20, 50);
