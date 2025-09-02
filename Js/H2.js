const headlines = [
    "Securing Your World Innovative Protection Strategies                 ",
    "Protect You & Your Family",


  ];
  
  let currentIndex = 0;
  let wordIndex = 0;
  let isAdding = true;
  
  function updateHeadline() {
    const text = document.getElementById("text");
    const headline = headlines[currentIndex];
  
    if (isAdding) {
      const partialHeadline = headline.substr(0, wordIndex + 1);
      text.textContent = partialHeadline;
      wordIndex++;
      if (wordIndex > headline.length) {
        isAdding = false;
      }
    } else {
      const partialHeadline = headline.substr(0, wordIndex);
      text.textContent = partialHeadline;
      wordIndex--;
      if (wordIndex < 0) {
        isAdding = true;
        currentIndex = (currentIndex + 1) % headlines.length;
      }
    }
  }
  setInterval(updateHeadline, 150);    
  