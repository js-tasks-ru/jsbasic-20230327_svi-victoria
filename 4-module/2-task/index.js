function makeDiagonalRed(table) {
  let rows = table.querySelectorAll("tr");
  let cells = table.querySelectorAll("td");
  for (let i = 0; i <= rows.length - 1; i++) {
    rows[i].cells[i].style.background = "red";
  }
  return cells;
}
