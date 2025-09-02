
const headlines = [
     "Securing Your World Innovative Protection Strategies",
    "Your Safety, Our Mission",
    "Protecting You, Your Family, and Your Property",
    "Security You Can Rely On",
    "Committed to Your Protection",
    "Excellence in Every Layer of Security",
    "Trusted by Businesses, Families, and Communities",
    "Customized Security Solutions for Every Need",
    "Your Peace of Mind, Our Responsibility",
    "Experience. Reliability. Protection.",
    "Leading the Way in Professional Security",
];

let currentIndex = 0;
let wordIndex = 0;
let isAdding = true;

function updateHeadline() {
  const headlineContainer = document.getElementById("headlineContainer");
  const headline = headlines[currentIndex];

  if (isAdding) {
    const partialHeadline = headline.substr(0, wordIndex + 1);
    headlineContainer.textContent = partialHeadline;
    wordIndex++;
    if (wordIndex > headline.length) {
      isAdding = false;
    }
  } else {
    const partialHeadline = headline.substr(0, wordIndex);
    headlineContainer.textContent = partialHeadline;
    wordIndex--;
    if (wordIndex < 0) {
      isAdding = true;
      currentIndex = (currentIndex + 1) % headlines.length;
    }
  }
}

setInterval(updateHeadline, 80);