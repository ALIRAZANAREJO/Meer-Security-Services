let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function() {
    showSlider('next');
};

prevButton.onclick = function() {
    showSlider('prev');
};

const showSlider = (type) => {
    // Remove pointer-events block
    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');

    if (type === 'next') {
        listHTML.appendChild(items[0]); // Move first to end
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]); // Move last to front
        carousel.classList.add('prev');
    }
};

seeMoreButtons.forEach((button) => {
    button.onclick = function(e) {
        // Only prevent default if it's not a real link
        if (button.tagName.toLowerCase() !== 'a') {
            e.preventDefault();
            carousel.classList.remove('next', 'prev');
            carousel.classList.add('showDetail');
        }
    };
});

backButton.onclick = function() {
    carousel.classList.remove('showDetail');
};
