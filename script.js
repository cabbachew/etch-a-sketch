let color = "black";

function populateGrid(size) {
  let grid = document.querySelector(".grid");
  let pixels = grid.querySelectorAll("div");
  pixels.forEach((div) => div.remove()); // remove all existing divs within grid
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let size2 = size * size;
  for (let i = 0; i < size2; i++) {
    let pixel = document.createElement("div");
    pixel.addEventListener("mouseover", colorPixel);
    pixel.addEventListener("mousedown", colorPixel);
    pixel.style.backgroundColor = "white";
    grid.insertAdjacentElement("beforeend", pixel);
  }
}

populateGrid(16);

function resizeGrid(input) {
  if (input > 1 && input < 101) {
    populateGrid(input);
  } else {
    alert("Must be a number between 2-100");
  }
}

// Helpers
function colorPixel(e) {
  if (e.type == "mouseover" && mouseDown) {
    this.style.backgroundColor = color;
  }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(newColor) {
  color = newColor;
}
