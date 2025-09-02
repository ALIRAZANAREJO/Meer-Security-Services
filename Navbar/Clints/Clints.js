// const nextBtn = document.querySelector('.next');
// const prevBtn = document.querySelector('.prev');
// const carousel = document.querySelector('.carousel');
// const list = document.querySelector('.list');
// const runningTime = document.querySelector('.timeRunning');
// const pauseBtn = document.querySelector('.pause-btn');
// const indicators = document.querySelectorAll('.indicator');
// const currentSlideElement = document.querySelector('.current-slide');

// let currentIndex = 0;
// let intervalId;
// let isPlaying = true;

// function showSlide(index) {
//   carousel.style.transform = `translateX(-${index * 103.2}%)`;
//   updateIndicators(index);
//   updateCurrentSlide(index + 1);
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % list.children.length;
//   showSlide(currentIndex);
//   resetTimeAnimation();
// }

// function prevSlide() {
//   currentIndex = (currentIndex - 1 + list.children.length) % list.children.length;
//   showSlide(currentIndex);
//   resetTimeAnimation();
// }

// function resetTimeAnimation() {
//   runningTime.style.animation = 'none';
//   runningTime.offsetHeight; /* trigger reflow */
//   runningTime.style.animation = null;
//   runningTime.style.animation = 'runningTime 12s linear 1 forwards';
// }

// function startAutoSlide() {
//   intervalId = setInterval(nextSlide, 5000);
// }

// function stopAutoSlide() {
//   clearInterval(intervalId);
// }

// function toggleAutoSlide() {
//   if (isPlaying) {
//     stopAutoSlide();
//     pauseBtn.classList.add('resume');
//   } else {
//     startAutoSlide();
//     pauseBtn.classList.remove('resume');
//   }
//   isPlaying = !isPlaying;
// }

// function updateIndicators(index) {
//   indicators.forEach((indicator, i) => {
//     indicator.classList.toggle('active', i === index);
//   });
// }

// function updateCurrentSlide(slideNumber) {
//   currentSlideElement.textContent = slideNumber;
// }

// nextBtn.addEventListener('click', nextSlide);
// prevBtn.addEventListener('click', prevSlide);
// pauseBtn.addEventListener('click', toggleAutoSlide);

// startAutoSlide();