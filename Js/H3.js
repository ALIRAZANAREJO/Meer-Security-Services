const headlines = [
    "To Help People",
    "Who Dont Have Any Resourses",
    "To Leave Peaceful Life",
    "We Provide Jobs Thousands Of People",
    "Its Not Matter Who You Are",
    "Where Are You From",
    "How Much You Studied",
    "We Are Here To Hire You",
    "We Trained You",
    "Give You Home",
    "If Your Out Of City",
    "Provide All Resourses You Need",
    "Then You have done your best",
    "We Are very Kind With ",
    "Those Peoples Who Trust Us",
    "We Give Best Protection To Our Clints",
    "Also Give Best Training To Our Guards",
    "israel is Yahoudi",
    // "We Kill You israel",
    // "We Het You",
    // "We Love Palestine",
    // "Allah May Help You",
    // "We case Fire for you",
    // "People make Dresses For Relies",
    // "To Show They Care About Palestine",
    // "But They Can,t Come To Plaestine",
    // "They Said We Have a Family",
    // "They Can,t To Leave Their Family",
    // "Because They Love Their Family",
    // "But We Want Justice for You from israel",
    // "We Apeel For Your Help",
    // "To Our Prime Minister",
    // "But Reality Primenister oF",
    // "Every Muslim Coutreis",
    // "Are Already Saled From America",
    // "Sorry To Show Our Life Reality & Truth"
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
  function updateCursorPosition() {
    const cursorElement = document.querySelector('.container span');
    cursorElement.style.marginLeft = `${document.getElementById('text').offsetWidth}px`;
  }
  setInterval(updateHeadline, 80);
  
  document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.getElementById('container');
    const spans = document.querySelectorAll('#container span');
    let currentSpanIndex = 0;
    let charIndex = 0;
    let typing = true;
    let deleting = false;
  
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 100; // milliseconds per character
    const delayBetweenWords = 30; // milliseconds
    const delayBeforeDeleting = 2000; // milliseconds before deleting all text
    const delayBetweenSpans = 100; // milliseconds between typing different spans
  
    function type() {
      if (currentSpanIndex < spans.length) {
        const currentSpan = spans[currentSpanIndex];
        const fullText = currentSpan.dataset.text;
  
        if (typing) {
          if (charIndex < fullText.length) {
            currentSpan.style.visibility = 'visible';
            currentSpan.textContent = fullText.substring(0, charIndex + 1);
            addCursor(currentSpan);
            charIndex++;
            setTimeout(type, typingSpeed);
          } else {
            // Move to the next span after the word is fully typed
            removeCursor(currentSpan);
            charIndex = 0;
            currentSpanIndex++;
            if (currentSpanIndex < spans.length) {
              setTimeout(type, delayBetweenSpans);
            } 
          }
        }
      }
    }
  
   
    function addCursor(element) {
      element.classList.add('show-cursor');
    }
  
    function removeCursor(element) {
      element.classList.remove('show-cursor');
    }
  
    // Initialize dataset.text with original span text and clear spans
    spans.forEach(span => {
      span.dataset.text = span.textContent;
      span.textContent = '';
    });
  
    type();
  });
   
  