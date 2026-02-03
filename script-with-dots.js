const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
const likeBtn = document.getElementById('like-btn');
const likeCountEl = document.getElementById('like-count');
const followBtn = document.getElementById('follow-btn');

let likes = 0;

/* =====================
   LIKE BUTTON
===================== */
likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('liked');
  likes += likeBtn.classList.contains('liked') ? 1 : -1;
  likeCountEl.textContent = `${likes} likes`;
});

/* =====================
   FOLLOW BUTTON
===================== */
followBtn.addEventListener('click', () => {
  followBtn.textContent = "Following";
  followBtn.classList.add('following');
  followBtn.disabled = true;
});

/* =====================
   DOTS
===================== */
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

carousel.addEventListener('scroll', () => {
  const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
  updateDots(index);
});

function updateDots(activeIndex) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

/* =====================
   DRAG TO SCROLL (DESKTOP)
===================== */
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('dragging');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.5;
  carousel.scrollLeft = scrollLeft - walk;
});
