import { createElement } from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    window.addEventListener("keydown", function (event) {
      if (event.code === "Escape") {
        this.close();
      }
    });
  }
  open() {
    this.elem = createElement(`<div class="modal">
    
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          ${this.titletext}
        </h3>
      </div>
      <div class="modal__body">
        ${this.bodytext}
      </div>
    </div>

  </div>`);
    let body = document.querySelector("body");
    body.append(this.elem);
    body.classList.add("is-modal-open");
    this.buttonClose = this.elem.querySelector(".modal__close");
    this.buttonClose.addEventListener("click", this.close);
  }
  setTitle(titletext) {
    this.titletext = titletext;
  }
  setBody(bodyinner) {
    this.bodytext = bodyinner.textContent;
  }
  close() {
    let body = document.querySelector("body");
    body.classList.remove("is-modal-open");
    let elem = document.querySelector(".modal");
    elem.remove(); //не проходит тест, почему?
    window.removeEventListener("keydown", function (event) {
      if (event.code === "Escape") {
        this.close();
      }
    });
  }
}
