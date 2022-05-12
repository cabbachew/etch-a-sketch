// To-dos
// - Slider with fill and configurable tick marks
// - Darken/Lighten edge cases (cannot go to perfect black/white)
//   Can use pSBC to check for RGB values above/below threshold

let input = document.querySelector("#size-input");
let setSizeButton = document.getElementById("set-size");

let background = "";
let color = "#000000";

// Set background color
let bkgdColor = document.getElementById("bkgd-color");
bkgdColor.addEventListener("input", (e) => {
  background = e.target.value;
  fillIn();
  refreshBorders();
});

// Set border color by blending pen and background color
function refreshBorders() {
  let borderColor = pSBC(0.5, color, background);
  const borders = document.querySelectorAll(".grid div");
  borders.forEach((div) => (div.style.borderColor = borderColor));
}

function fillIn() {
  let grid = document.querySelector(".grid");
  let pixels = grid.querySelectorAll("div");
  pixels.forEach((div) => {
    if (div.classList.contains("transparent")) {
      div.style.backgroundColor = background;
    }
  });
}

let penColor = document.getElementById("pen-color");
// Using 'input' event instead of 'change' to make sure first pixel is new color
penColor.addEventListener("input", (e) => {
  clearButtons();
  changeColor(e.target.value);
  refreshBorders();
});

function clearButtons() {
  buttons.forEach((item) => item.classList.remove("active"));
}

// Button functionality
const buttons = document.querySelectorAll("button");
buttons.forEach((item) => item.addEventListener("click", toggleActiveButton));
function toggleActiveButton() {
  if (this.textContent !== "Clear" && this.textContent !== "Set Size") {
    buttons.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  }
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
    pixel.classList.add("transparent");
    pixel.style.backgroundColor = background;
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
  refreshBorders();
}

const sizeSlider = document.querySelector(".slider");
sizeSlider.onchange = (e) => {
  input.value = e.target.value;
};

// Helpers
function colorPixel(e) {
  if (
    (e.type === "mousedown" && e.button === 0) ||
    (e.type === "mouseover" && isLeftClicked)
  ) {
    if (color === "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.classList.remove("transparent");
    } else if (color === "darker") {
      // Will not work if transparent
      if (this.style.backgroundColor === "") {
        this.style.backgroundColor = "#ffffff";
      }
      if (pSBC(0, this.style.backgroundColor, "c") === "#000000") {
        this.classList.add("transparent");
      } else {
        this.style.backgroundColor = pSBC(
          -0.1,
          this.style.backgroundColor,
          false,
          true
        );
        this.classList.remove("transparent");
      }
    } else if (color === "lighter") {
      // Will not work if transparent
      if (this.style.backgroundColor === "") {
        this.style.backgroundColor = "#ffffff";
      }
      if (pSBC(0, this.style.backgroundColor, "c") === "#ffffff") {
        this.classList.add("transparent");
      } else {
        this.style.backgroundColor = pSBC(
          0.1,
          this.style.backgroundColor,
          false,
          true
        );
        this.classList.remove("transparent");
      }
    } else if (color === "erase") {
      this.style.backgroundColor = background;
      this.classList.add("transparent");
    } else {
      this.style.backgroundColor = color;
      this.classList.remove("transparent");
    }
  } else if (
    (e.type === "mousedown" && e.button === 2) ||
    (e.type === "mouseover" && isRightClicked)
  ) {
    this.style.backgroundColor = background;
    this.classList.add("transparent");
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
  pixels.forEach((div) => {
    div.style.backgroundColor = "";
    div.classList.add("transparent");
  });
  background = "";
}

// pSBC.js Version 4.1
const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    m = Math.round,
    a = typeof c1 == "string";
  if (
    typeof p != "number" ||
    p < -1 ||
    p > 1 ||
    typeof c0 != "string" ||
    (c0[0] != "r" && c0[0] != "#") ||
    (c1 && !a)
  )
    return null;
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
    (f = pSBC.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != "c"
        ? pSBC.pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};

pSBC.pSBCr = (d) => {
  const i = parseInt;
  let n = d.length,
    x = {};
  if (n > 9) {
    const [r, g, b, a] = (d = d.split(","));
    n = d.length;
    if (n < 3 || n > 4) return null;
    (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
      (x.g = i(g)),
      (x.b = i(b)),
      (x.a = a ? parseFloat(a) : -1);
  } else {
    if (n == 8 || n == 6 || n < 4) return null;
    if (n < 6)
      d =
        "#" +
        d[1] +
        d[1] +
        d[2] +
        d[2] +
        d[3] +
        d[3] +
        (n > 4 ? d[4] + d[4] : "");
    d = i(d.slice(1), 16);
    if (n == 9 || n == 5)
      (x.r = (d >> 24) & 255),
        (x.g = (d >> 16) & 255),
        (x.b = (d >> 8) & 255),
        (x.a = Math.round((d & 255) / 0.255) / 1000);
    else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
  }
  return x;
};
