//import { createElement } from "../../assets/lib/create-element";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right"> 
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
</div>`);
    this.inner = createElement(`<div class="carousel__inner"></div>`);
    this.elem.append(this.inner);
    for (let key of this.slides) {
      this[key] = createSlides(key);
      this.inner.append(this[key]);
      this.productId = this[key].dataset.id;
    }

    this.btn = this.elem.querySelectorAll(".carousel__button");
    for (let btn of this.btn) {
      btn.addEventListener("click", this.onClick);
    }

    this.elem.addEventListener("product-add", (event) =>
      console.log(this.productId)
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

function createElement(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstElementChild;
}

function createSlides(key) {
  let slide = createElement(`<div class="carousel__slide" data-id="${key.id}">
  <img src="/assets/images/carousel/${key.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${key.price}</span>
    <div class="carousel__title">${key.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`);
  return slide;
}

//не могу экспортировать функцию, браузер не находит файл пишет 404 ошибку
export function initCarousel(carousel) {
  let arrowLeft = carousel.querySelector(".carousel__arrow_left");
  let arrowRigth = carousel.querySelector(".carousel__arrow_right");
  let slides = carousel.querySelector(".carousel__inner");
  let oneslide = carousel.querySelector(".carousel__slide");
  let slideWidth = oneslide.offsetWidth;
  let counter = 0;

  arrowRigth.addEventListener("click", function (event) {
    counter++;
    arrowRigth.style.display = counter == 3 ? "none" : "flex"; //написать черех slides.length
    arrowLeft.style.display = "flex";

    console.log(`счетчик : ${counter}`);
    slides.style.transform = `translateX(-${moving(counter)}px)`;
  });

  arrowLeft.addEventListener("click", function (event) {
    counter--;
    console.log(`счетчик : ${counter}`);
    arrowRigth.style.display = "flex";
    slides.style.transform = `translateX(-${moving(counter)}px)`;
    if (counter === 0) {
      arrowLeft.style.display = "none";
    }
  });

  arrowLeft.style.display = "none";

  function moving(counter) {
    let x = slideWidth * counter;
    return x;
  }
}
