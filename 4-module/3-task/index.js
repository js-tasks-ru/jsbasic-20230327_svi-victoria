function highlight(table) {
  let tr = table.querySelectorAll("tbody tr");
  for (let teacher of tr) {
    let td = teacher.querySelectorAll("td");

    if (td[2].textContent == "m") {
      teacher.classList.add("male");
    } else if (td[2].textContent == "f") {
      teacher.classList.add("female");
    }

    if (td[1].textContent < 18) {
      teacher.style = "text-decoration: line-through";
    }

    if (td[3].dataset.available == "true") {
      teacher.classList.add("available");
    } else if (td[3].dataset.available == "false") {
      teacher.classList.add("unavailable");
    } else if (td[3].dataset.available == null) {
      teacher.hidden = true;
    }
  }
}
