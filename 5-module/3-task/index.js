function initCarousel() {
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRigth = document.querySelector(".carousel__arrow_right");
  let slides = document.querySelector(".carousel__inner");
  let oneslide = document.querySelector(".carousel__slide");
  let slideWidth = oneslide.offsetWidth;
  let counter = 0;

  arrowRigth.addEventListener("click", function (event) {
    counter++;
    arrowRigth.style.display = counter == 3 ? "none" : "flex";
    arrowLeft.style.display = "flex";

    console.log(`счетчик : ${counter}`);
    slides.style.transform = `translateX(-${moving(counter)}px)`;
  });

  arrowLeft.addEventListener("click", function (event) {
    counter--;
    console.log(`счетчик : ${counter}`);
    arrowRigth.style.display = "flex";
    slides.style.transform = `translateX(-${moving(counter)}px)`;
  });

  if (counter === 0) {
    arrowLeft.style.display = "none";
  }

  function moving(counter) {
    let x = slideWidth * counter;
    return x;
  }
}
