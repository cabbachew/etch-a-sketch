// To-dos
// - Slider with fill and configurable tick marks
// - Add color picker for both pen and background [Github: bscottnz]
// - Add shader and lightener [Github: bscottnz]

let input = document.querySelector("#size-input");
let setSizeButton = document.getElementById("set-size");

let color = "black";
let penColor = document.getElementById("pen-color");
// Using 'input' event instead of 'change' to make sure first pixel is new color
penColor.addEventListener("input", (e) => {
  clearButtons();
  changeColor(e.target.value);
});

function clearButtons() {
  buttons.forEach((item) => item.classList.remove("active"));
}

// Button functionality
const buttons = document.querySelectorAll("button");
buttons.forEach((item) => item.addEventListener("click", toggleActiveButton));
function toggleActiveButton() {
  if (this.textContent === "Clear" || this.textContent === "Set Size") {
    buttons.forEach((item) => item.classList.remove("active"));
    return;
  }
  buttons.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}

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
  return currentGridSize() > 1 && currentGridSize() < 65;
}

function currentGridSize() {
  if (input.value === "") {
    return DEFAULT_GRID_SIZE;
  }
  return input.value;
}

input.addEventListener("change", validateGridSize);

function validateGridSize() {
  if (isValidSize()) {
    errorMessage.classList.add("isHidden");
    setSizeButton.disabled = false;
    sizeSlider.disabled = false;
    sizeSlider.value = input.value;
  } else {
    errorMessage.classList.remove("isHidden");
    input.value = ""; // Clear input
    sizeSlider.value = 16; // reset slider
  }
}

// Allow user to press enter to set grid size from input
document.getElementById("size-input").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    resizeGrid();
  }
});

function resizeGrid() {
  if (isValidSize()) {
    populateGrid();
  }
}

const sizeSlider = document.querySelector(".slider");
sizeSlider.onchange = (e) => {
  input.value = e.target.value;
  validateGridSize();
};

// Helpers
function colorPixel(e) {
  // Tests
  // console.log(this.style.backgroundColor);

  if (
    (e.type === "mousedown" && e.button === 0) ||
    (e.type === "mouseover" && isLeftClicked)
  ) {
    if (color === "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = color;
    }
  } else if (
    (e.type === "mousedown" && e.button === 2) ||
    (e.type === "mouseover" && isRightClicked)
  ) {
    this.style.backgroundColor = "white";
  }
}

let isLeftClicked = false;
let isRightClicked = false;

document.body.onmousedown = (e) => {
  if (e.button === 0) {
    isLeftClicked = true;
  } else if (e.button === 2) {
    isRightClicked = true;
  }
};

document.body.onmouseup = () => {
  isLeftClicked = false;
  isRightClicked = false;
};

function changeColor(newColor) {
  color = newColor;
}

function clearGrid() {
  let grid = document.querySelector(".grid");
  let pixels = grid.querySelectorAll("div");
  pixels.forEach((div) => (div.style.backgroundColor = "white"));
}
