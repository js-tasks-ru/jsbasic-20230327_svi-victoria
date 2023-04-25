import { createElement } from "../../assets/lib/create-element";
export default class ProductCard {
  constructor(product) {
    this.elem = createElement(`<div class="card">
    <div class="card__top">
        <img src="../../assets/images/products/${
          product.image
        }" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>`);
    this.productId = product.id;
    this.btn = this.elem.querySelector(".card__button");
    this.btn.addEventListener("click", this.onClick);
    this.elem.addEventListener(
      "product-add",
      (event) => console.log("событие!") //не забыть убрать
    );
  }
  onClick = (event) => {
    let myEvent = new CustomEvent("product-add", {
      detail: this.productId,
      bubbles: true,
    });
    this.elem.dispatchEvent(myEvent);
  };
}
