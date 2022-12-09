const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

function innit() {
  fitToContainer(canvas);
  grid = new grid(canvas.width, canvas.height);
}

function fitToContainer(canvas) {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class grid {
  constructor(width, height) {
    this.width = width - 100;
    this.height = height - 100;
    let size = {
      rows: 10,
      columns: 10,
    };
    let padding = 50;

    c.moveTo(padding, padding);
    c.lineTo(width - padding, padding);
    c.lineTo(width - padding, height - padding);
    c.lineTo(padding, height - padding);
    c.lineTo(padding, padding);
    c.stroke();

    for (let i = 0; i < size.rows; i++) {
      c.moveTo(padding, padding + (width ));
      c.lineTo(width - padding, padding * i);
      c.stroke();
    }
  }
}

innit();
