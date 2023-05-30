import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    let carouselParent = document.querySelector(`[data-carousel-holder]`);
    carouselParent.append(this.carousel.elem);
    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonParent = document.querySelector(`[data-ribbon-holder]`);
    ribbonParent.append(this.ribbonMenu.elem);
    document
      .querySelector(".ribbon__inner :first-child")
      .classList.add("ribbon__item_active");
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    let sliderParent = document.querySelector(`[data-slider-holder]`);
    sliderParent.append(this.stepSlider.elem);
    this.cartIcon = new CartIcon();
    let cartParent = document.querySelector(`[data-cart-icon-holder]`);
    cartParent.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);

    let response = await fetch("products.json");
    let dataForGrid = await response.json();
    this.productsGrid = new ProductsGrid(dataForGrid);
    let gridParent = document.querySelector(`[data-products-grid-holder]`);
    gridParent.innerHTML = "";
    gridParent.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      let productToAdd = dataForGrid.filter(
        (item) => item.id == event.detail
      )[0];
      if (productToAdd) {
        this.cart.addProduct(productToAdd);
      }
    });
    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: this.stepSlider.value,
      });
    });
    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({ category: event.detail });
    });
    let noNutsControl = document.getElementById("nuts-checkbox");
    noNutsControl.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });
    let vegetarianOnlyControl = document.getElementById("vegeterian-checkbox");
    vegetarianOnlyControl.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }
}
