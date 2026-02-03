const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
const likeBtn2 = document.getElementById('like-btn');

// Heart toggle
likeBtn2.addEventListener('click', () => {
  likeBtn2.classList.toggle('liked');
});

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    carousel.scrollTo({
      left: index * carousel.offsetWidth,
      behavior: 'smooth'
    });
    updateDots(index);
  });
  dotsContainer.appendChild(dot);
});

// Update active dot on scroll
carousel.addEventListener('scroll', () => {
  const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
  updateDots(index);
});

function updateDots(activeIndex) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[activeIndex].classList.add('active');
}
