 let currentSlide = 0;
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = document.querySelectorAll('.carousel-slide').length;

  function showSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }, 6000);