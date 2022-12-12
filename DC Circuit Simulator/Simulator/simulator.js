const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let cellsArray = [];
let rows = 7;
let columns = 11;
let padding = 10;
let cellWidth = 100;

function innit() {
  fitToContainer(canvas);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      cellsArray[i + j] = new cells(cellWidth * i + padding, cellWidth * j + padding, cellWidth);
      cellsArray[i + j].draw();
    }
  }
}

function fitToContainer(canvas) {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class cells {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw() {
    c.moveTo(this.x, this.y);
    c.rect(this.x, this.y, this.w, this.w);
    c.stroke();
  }
}

// class grid extends cells {
//   constructor(x, y, w, rows, columns, padding) {
//     super(x, y, w);
//     this.rows = rows;
//     this.columns = columns;
//     this.padding = padding;
//     let cellsArray = [];

//     // innitialising cells
//     for (let i = 0; i < this.columns; i++) {
//       for (let j = 0; j < this.rows; j++) {
//         cellsArray[i + j] = new cells(
//           j * this.w + this.padding,
//           i * this.w + this.padding,
//           50
//         );
//         cellsArray[i + j].draw();
//       }
//     }

//     for (let i = 0; i < columns; i++) {
//       this.grid[i] = cell;
//     }
//   }

//   innitCells() {
//     for (let i = 0; i < this.columns; i++) {
//       for (let j = 0; j < this.rows; j++) {
//         this.grid[i] = new cells(j + this.padding, i + this.padding, 50);
//         console.log(this.grid[i]);
//       }
//     }
//   }
// }

innit();
