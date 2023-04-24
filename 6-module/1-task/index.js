export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("table");
    this.elemHeader = document.createElement("thead");
    this.elem.append(this.elemHeader);
    this.headerName = document.createElement("tr");
    this.elemHeader.append(this.headerName);
    this.headerName.insertAdjacentHTML("beforeend", "<th>Имя</th>");
    this.headerName.insertAdjacentHTML("beforeend", "<th>Возраст</th>");
    this.headerName.insertAdjacentHTML("beforeend", "<th>Зарплата</th>");
    this.headerName.insertAdjacentHTML("beforeend", "<th>Город</th>");
    this.elemBody = document.createElement("tbody");
    this.elem.append(this.elemBody);
    for (let j of rows) {
      this.bodyTr = document.createElement("tr");
      this.elemBody.append(this.bodyTr);
      for (let i = 0; i <= 3; i++) {
        this.bodyTr.insertAdjacentHTML(
          "beforeend",
          `<td>${Object.values(j)[i]}</td>`
        );
      }
      this.btncell = document.createElement("td");
      this.bodyTr.append(this.btncell);
      this.btn = document.createElement("button");
      this.btn.textContent = "X";
      this.btncell.append(this.btn);
      this.btn.addEventListener("click", (event) =>
        event.target.closest("tr").remove()
      );
    }
  }
}
