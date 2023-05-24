import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(productToAdd) {
    let cartItem;
    if (!productToAdd) {
      return;
    } else {
      cartItem = { product: productToAdd, count: 1 };
      if (this.cartItems.length == 0) {
        this.cartItems.push(cartItem);
      } else {
        let filtratedItem = this.cartItems.filter(
          (item) => item.product == productToAdd
        );
        if (filtratedItem.length == 0) {
          this.cartItems.push(cartItem);
        } else {
          let indexOfProduct = this.cartItems.findIndex(
            (item) => item.product == filtratedItem[0].product
          );
          this.cartItems[indexOfProduct].count += 1;
        }
      }
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let indexOfProduct = this.cartItems.findIndex((item) => {
      if (item.product.id == productId) {
        return true;
      }
    });
    this.cartItems[indexOfProduct].count += amount;
    let cartItem = this.cartItems[indexOfProduct];
    if (this.cartItems[indexOfProduct].count == 0) {
      this.cartItems.splice(indexOfProduct, 1);
      cartItem = null;
    }

    let emptyCart = this.getTotalCount();
    if (emptyCart === 0) {
      this.cartItems.length = 0;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    let checkEmpty = this.cartItems.length == 0 ? true : false;
    return checkEmpty;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce(function (total, item) {
      return total + item.count;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce(function (total, item) {
      return total + item.product.price * item.count;
    }, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(
            2
          )}</div> 
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal.open();

    let renderList = this.cartItems.reduce((total, item) => {
      total.append(this.renderProduct(item.product, item.count));
      return total;
    }, createElement("<div></div>"));
    renderList.append(this.renderOrderForm());
    this.modal.setBody(renderList);
    let btnCounter = document.querySelectorAll(".cart-counter__button");
    for (let el of btnCounter) {
      el.addEventListener("click", (event) => {
        let productId = event.target.closest(".cart-product").dataset.productId;
        let amount = el.classList.contains("cart-counter__button_plus")
          ? 1
          : -1;
        this.updateProductCount(productId, amount);
      });
    }
    let cartForm = document.querySelector(".cart-form");
    cartForm.addEventListener("submit", (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!this.modal || !document.body.classList.contains("is-modal-open")) {
      return;
    }
    let modalBody = document.querySelector(".modal__body");

    if (!cartItem) {
      if (this.cartItems.length == 0) {
        this.modal.close();
        return;
      } else {
        this.modal.close();
        this.renderModal();
        return;
      }
    }

    let productId = cartItem.product.id;
    let productCount = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );
    let productPrice = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`
    );
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(
      cartItem.product.price * cartItem.count
    ).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  onSubmit(event) {
    console.log("сабмит");
    event.preventDefault();
    let cartForm = document.querySelector(".cart-form");
    let btnSubmit = document.querySelector(".cart-buttons__button");
    btnSubmit.classList.add("is-loading");

    let formDataOrder = new FormData(cartForm);
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formDataOrder,
    }).then((response) => {
      if (response.ok) {
        let modalHeader = document.querySelector(".modal__title");
        let modalBody = document.querySelector(".modal__body");
        modalHeader.textContent = "Success!";
        this.cartItems.length = 0;
        modalBody.innerHTML = `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We\’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;

        console.log("ok");
      }
    });
  }
}
