function populateGrid(size) {
  let grid = document.querySelector(".grid");
  let pixels = grid.querySelectorAll("div");
  pixels.forEach((div) => div.remove()); // remove all existing divs within grid
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let pixel = document.createElement("div");
    pixel.style.backgroundColor = "#CCC";
    grid.insertAdjacentElement("beforeend", pixel);
  }
}

populateGrid(16);

function resizeGrid(size) {
  populateGrid(size);
}
