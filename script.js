// ── Carousel ──────────────────────────────────────────────────
const track  = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const imageFiles = [
  'banana.jpg',
  'city.jpg',
  'culture.jpg',
  'food.jpg',
  'overpass.jpg',
  'phillips.jpg',
  'pipes.jpg',
  'rooftop.jpg',
  'simon.jpg',
  'tour.jpg'
];
let dots;
let TOTAL;
let current = 0;
let timer;

function buildCarousel() {
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  shuffleInPlace(imageFiles);

  imageFiles.forEach((file, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';

    const img = document.createElement('img');
    img.src = `assets/images/general-images/${file}`;
    img.alt = `Carousel image ${index + 1}`;

    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `carousel__dot${index === 0 ? ' active' : ''}`;
    dot.dataset.index = `${index}`;
    dot.setAttribute('aria-label', `Slide ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  dots = dotsContainer.querySelectorAll('.carousel__dot');
  TOTAL = dots.length;
}

function shuffleInPlace(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}

buildCarousel();

function goTo(idx) {
  if (!TOTAL) {
    return;
  }

  current = ((idx % TOTAL) + TOTAL) % TOTAL;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function startTimer() { timer = setInterval(() => goTo(current + 1), 4800); }
function resetTimer()  { clearInterval(timer); startTimer(); }

document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetTimer(); });
document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetTimer(); });
dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); resetTimer(); }));

const carouselEl = document.getElementById('carousel');
carouselEl.addEventListener('mouseenter', () => clearInterval(timer));
carouselEl.addEventListener('mouseleave', startTimer);

startTimer();

// ── Day navigation ────────────────────────────────────────────
const chips       = document.querySelectorAll('.chip');
const posts       = document.querySelectorAll('.blog-post');
const blogSection = document.getElementById('blogSection');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const day = chip.dataset.day;

    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    posts.forEach(post => {
      if (post.id === `day-${day}`) {
        post.classList.remove('hidden');
        post.style.opacity   = '0';
        post.style.transform = 'translateY(14px)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          post.style.opacity   = '1';
          post.style.transform = 'translateY(0)';
        }));
      } else {
        post.classList.add('hidden');
        post.style.opacity   = '';
        post.style.transform = '';
      }
    });

    blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
