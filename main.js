////////////////////////
// NAVBAR
const iconOpen = document.querySelector(".icon-open");
const iconClose = document.querySelector(".icon-close");
const navBar = document.querySelector("nav");

iconOpen.addEventListener("click", function (e) {
  e.preventDefault();
  navBar.style.transform = "translateX(0%)";
});

iconClose.addEventListener("click", function (e) {
  e.preventDefault();
  navBar.style.transform = "translateX(200%)";
});

///////////////////////////////

////////////////////////////
// SLIDER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slides");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

slider.style.overflow = "hidden";

const goToSlide = function (indexslide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - indexslide)}%)`;
  });
};

let curslide = 0;
let maxSlide = slides.length;

const createDot = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

goToSlide(0);
createDot();
activateDot(curslide);

const nextSlide = function () {
  if (curslide !== maxSlide - 1) {
    curslide++;
  } else {
    curslide = 0;
  }
  goToSlide(curslide);
  activateDot(curslide);
};

const prevSlide = function () {
  if (curslide == 0) {
    curslide = maxSlide - 1;
  } else {
    curslide--;
  }
  goToSlide(curslide);
  activateDot(curslide);
};

btnRight.addEventListener("click", function () {
  nextSlide();
});
btnLeft.addEventListener("click", function () {
  prevSlide();
});

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") nextSlide();
  if (e.key == "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.dataset) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//////////////////////////
const navLinks = document.querySelector(".nav-links");
// SMOOTH SCROLL

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////
//STICKY-MENU

const heroSection = document.querySelector(".hero");
const header = document.querySelector("header");

const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-80px",
};

const menuObserver = new IntersectionObserver(obsCallback, obsOptions);

menuObserver.observe(heroSection);

//////////////////////
const cardContainer = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card");

//CARD ANIMATION

const cardCallback = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    cards.forEach((card) => card.classList.remove("show"));
    entry.target.classList.add("show");
  } else {
    entry.target.classList.remove("show");
  }
};

const cardOptions = {
  root: null,
  threshold: 0.9,
};

const cardObserver = new IntersectionObserver(cardCallback, cardOptions);

cards.forEach((card) => {
  cardObserver.observe(card);
});
