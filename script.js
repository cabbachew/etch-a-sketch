// To-dos
// - Adjust grid size using slider
// - Right click for eraser
// - Make responsive to window size
// - Explore button effects
// - Each pass darkens block by 10%

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

// Default grid size
populateGrid(16);

let errorMessage = document.querySelector(".error");

function validateGridSize(input) {
  if (input > 1 && input < 101) {
    errorMessage.classList.add("isHidden");
  } else {
    errorMessage.classList.remove("isHidden");
  }
}

function resizeGrid() {
  let input = document.querySelector("input");
  if (errorMessage.classList.contains("isHidden")) {
    populateGrid(input.value);
  }
}

// Helpers
function colorPixel(e) {
  if ((e.type == "mouseover" && mouseDown) || e.type == "mousedown") {
    if (color == "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = color;
    }
  }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(newColor) {
  color = newColor;
}

function clearGrid() {
  let grid = document.querySelector(".grid");
  let pixels = grid.querySelectorAll("div");
  pixels.forEach((div) => (div.style.backgroundColor = "white"));
}
