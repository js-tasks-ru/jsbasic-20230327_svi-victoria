import { createElement } from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }
  render() {
    this.elem = createElement(`<div class="modal">
    
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>

  </div>`);
  }
  open() {
    let body = document.querySelector("body");
    body.append(this.elem);
    body.classList.add("is-modal-open");
    this.buttonClose = this.elem.querySelector(".modal__close");
    this.buttonClose.addEventListener("click", this.close);
    document.addEventListener("keydown", this.onKeyDown);
  }
  setTitle(titletext) {
    this.elem.querySelector(".modal__title").textContent = titletext;
  }
  setBody(bodyinner) {
    this.elem.querySelector(".modal__body").innerHTML = "";
    this.elem.querySelector(".modal__body").append(bodyinner);
  }
  onKeyDown = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };
  close = (event) => {
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.close);
    this.elem.remove();
  };
}
