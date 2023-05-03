import createElement from "../../assets/lib/create-element.js";

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
    }

    this.btn = this.elem.querySelectorAll(".carousel__button");
    for (let btn of this.btn) {
      btn.addEventListener("click", this.onClick);
    }

    this.elem.addEventListener("product-add", (event) =>
      console.log(event.detail)
    );
    this.initCarousel();
  }
  onClick = (event) => {
    let myEvent = new CustomEvent("product-add", {
      detail: event.target.closest(".carousel__slide").dataset.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(myEvent);
  };
  initCarousel() {
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    let arrowRigth = this.elem.querySelector(".carousel__arrow_right");
    let slides = this.elem.querySelector(".carousel__inner");
    let oneslide = this.elem.querySelector(".carousel__slide");
    let slideWidth = oneslide.offsetWidth;
    let counter = 0;
    let finalslide = this.slides.length - 1;

    arrowRigth.addEventListener("click", function (event) {
      let slideWidth = oneslide.offsetWidth;
      counter++;
      arrowRigth.style.display = counter == finalslide ? "none" : "flex";
      arrowLeft.style.display = "flex";

      console.log(`счетчик : ${counter}`);
      slides.style.transform = `translateX(-${moving(counter, slideWidth)}px)`;
    });

    arrowLeft.addEventListener("click", function (event) {
      let slideWidth = oneslide.offsetWidth;
      counter--;
      console.log(`счетчик : ${counter}`);
      arrowRigth.style.display = "flex";
      slides.style.transform = `translateX(-${moving(counter, slideWidth)}px)`;
      if (counter === 0) {
        arrowLeft.style.display = "none";
      }
    });

    arrowLeft.style.display = "none";

    function moving(counter, slideWidth) {
      let x = slideWidth * counter;
      return x;
    }
  }
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
