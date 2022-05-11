function populateGrid(size) {
  let grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    let pixel = document.createElement("div");
    pixel.style.backgroundColor = "#CCC";
    grid.insertAdjacentElement("beforeend", pixel);
  }
}

populateGrid(16);
