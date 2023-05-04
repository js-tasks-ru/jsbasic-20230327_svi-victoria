import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);
    this.inner = createElement(`<nav class="ribbon__inner"></nav>`);
    this.buttonRigth = this.elem.querySelector(".ribbon__arrow_right");
    this.buttonLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.elem.insertBefore(this.inner, this.buttonRigth);
    for (let item of this.categories) {
      this[item] = createCategories(item);
      this.inner.append(this[item]);
    }
    this.menuItem = this.elem.querySelectorAll(".ribbon__item");

    for (let menues of this.menuItem) {
      menues.addEventListener("click", (event) => {
        event.preventDefault();
        for (let menuItem of this.menuItem) {
          menuItem.classList.remove("ribbon__item_active");
        }
        menues.classList.add("ribbon__item_active");
      });
      menues.addEventListener("click", this.onClick);
    }

    this.elem.addEventListener("ribbon-select", (event) =>
      console.log(event.detail)
    );

    this.initScrolling();
  }
  onClick = (event) => {
    let ribbonSelect = new CustomEvent("ribbon-select", {
      detail: event.target.closest(".ribbon__item").dataset.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(ribbonSelect);
  };

  updateArrows = () => {
    let inner = this.elem.querySelector(".ribbon__inner");
    let scrollLeft = inner.scrollLeft;
    let scrollRight =
      inner.scrollWidth - (inner.scrollLeft + inner.clientWidth);

    if (scrollLeft > 0) {
      this.elem
        .querySelector(".ribbon__arrow_left")
        .classList.add("ribbon__arrow_visible");
    } else {
      this.elem
        .querySelector(".ribbon__arrow_left")
        .classList.remove("ribbon__arrow_visible");
    }

    scrollRight = scrollRight < 1 ? 0 : scrollRight;

    if (scrollRight > 0) {
      this.elem
        .querySelector(".ribbon__arrow_right")
        .classList.add("ribbon__arrow_visible");
    } else {
      this.elem
        .querySelector(".ribbon__arrow_right")
        .classList.remove("ribbon__arrow_visible");
    }
  };

  initScrolling() {
    let innerforScrolling = this.inner;
    let scrollLeft = innerforScrolling.scrollLeft;
    let scrollWidth = innerforScrolling.scrollWidth;
    let clientWidth = innerforScrolling.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.buttonRigth.addEventListener("click", (event) => {
      innerforScrolling.scrollBy(350, 0);
      this.updateArrows();
    });

    this.buttonLeft.addEventListener("click", (event) => {
      innerforScrolling.scrollBy(-350, 0);
      this.updateArrows();
    });
  }
}

function createCategories(item) {
  let oneCategory = createElement(
    `<a href="#" class="ribbon__item " data-id="${item.id}">${item.name}</a>`
  );
  return oneCategory;
}
