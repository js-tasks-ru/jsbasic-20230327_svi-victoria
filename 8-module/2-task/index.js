import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.catchFilters();
    this.updateFilter(this.filters);
  }
  render() {
    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`);
    this.gridInner = this.elem.querySelector(".products-grid__inner");
    for (let product of this.products) {
      this[product] = new ProductCard(product);
      this.gridInner.append(this[product].elem);
      this[product].elem.classList.add(`${product.id}`);
    }
  }
  catchFilters() {
    let filterItems = document.querySelectorAll("input");
    let nutsCheckbox = filterItems[0];
    nutsCheckbox.addEventListener("input", (event) => {
      this.filters.noNuts = this.filters.noNuts == true ? false : true;
      console.log(this.filters);
    });
    let vegCheckbox = filterItems[1];
    vegCheckbox.addEventListener("input", (event) => {
      this.filters.vegeterianOnly =
        this.filters.vegeterianOnly == true ? false : true;
      console.log(this.filters);
    });
    let spiceCheckbox = filterItems[2];
    spiceCheckbox.addEventListener("input", (event) => {
      this.filters.maxSpiciness =
        this.filters.maxSpiciness == true ? false : true;
      console.log(this.filters);
    });
    let categoryCheckbox = filterItems[3];
    categoryCheckbox.addEventListener("input", (event) => {
      this.filters.category =
        this.filters.category == "soups" ? "all" : "soups";
      console.log(this.filters);
    });
    for (let item of filterItems) {
      item.addEventListener("input", this.onInput);
    }
  }
  onInput = (event) => {
    let filtersChecked = new CustomEvent("filtersChecked", {
      bubbles: true,
    });
    this.elem.dispatchEvent(filtersChecked);
  };

  updateFilter(filters) {
    this.elem.addEventListener("filtersChecked", (event) => {
      for (let product of this.products) {
        if (this.filters.noNuts == true && product.nuts == true) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            // el.hidden = "true"; почему так не работает?
            el.style.display = "none";
          }
        } else if (this.filters.noNuts == false && product.nuts == true) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            // el.hidden = "false"; почему так не работает?
            el.style.display = "flex";
          }
        }
      }
    });
    this.elem.addEventListener("filtersChecked", (event) => {
      for (let product of this.products) {
        if (this.filters.vegeterianOnly == true && !("vegeterian" in product)) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "none";
          }
        } else if (
          this.filters.vegeterianOnly == false &&
          !("vegeterian" in product)
        ) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "flex";
          }
        }
      }
    });

    this.elem.addEventListener("filtersChecked", (event) => {
      for (let product of this.products) {
        if (this.filters.maxSpiciness == true && product.spiciness <= 2) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "none";
          }
        } else if (
          this.filters.maxSpiciness == false &&
          product.spiciness <= 2
        ) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "flex";
          }
        }
      }
    });

    this.elem.addEventListener("filtersChecked", (event) => {
      for (let product of this.products) {
        if (
          this.filters.category == "soups" &&
          !(product.category == "soups")
        ) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "none";
          }
        } else if (
          this.filters.category == "all" &&
          !(product.category == "soups")
        ) {
          let chosenElems = document.querySelectorAll(`.${product.id}`);
          for (let el of chosenElems) {
            el.style.display = "flex";
          }
        }
      }
    });
  }
}
