// To-dos
// - Adjust grid size using slider
// - Make responsive to window size
// - Explore button effects
// - Right click for eraser + erase while dragging(!)
// - Each pass darkens block by 10%
// - Error message disables "Set Size" button
// - Add keypress event listener for "Enter"

let color = "black";

function populateGrid() {
  let size = currentGridSize();
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
const DEFAULT_GRID_SIZE = 16;
populateGrid();

let errorMessage = document.querySelector(".error");

function isValidSize() {
  return currentGridSize() > 1 && currentGridSize() < 101;
}

function currentGridSize() {
  let input = document.querySelector("input").value;
  if (input == "") {
    return DEFAULT_GRID_SIZE;
  }
  return input;
}

function validateGridSize() {
  if (isValidSize()) {
    errorMessage.classList.add("isHidden");
  } else {
    errorMessage.classList.remove("isHidden");
  }
}

function resizeGrid() {
  if (isValidSize()) {
    populateGrid();
  }
}

// Helpers
function colorPixel(e) {
  // Tests
  console.log(e.type);
  console.log(e.button);

  if ((e.type == "mouseover" && mouseDown) || e.type == "mousedown") {
    if (e.button === 2) {
      this.style.backgroundColor = "white";
      return false;
    }
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
