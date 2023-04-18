function toggleText() {
  let btn = document.querySelector(".toggle-text-button");
  let text = document.getElementById("text");
  btn.addEventListener("click", (event) => {
    if (text.hidden == true) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
