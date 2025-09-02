// Function to start counting from 0 to a specified value within a specific duration
function startCounting(targetElementId, targetValue, duration) {
    let count = 0;
    const element = document.getElementById(targetElementId);
    const increment = Math.ceil(targetValue / (duration / 1.5)); // Calculate the increment based on duration
    const interval = setInterval(() => {
      element.textContent = count;
      count += increment;
      if (count >= targetValue) {
        element.textContent = targetValue; // Set the final value
        clearInterval(interval); // Stop the counting
      }
    }, 10); // Adjust the interval for smoother animation
  }
  
  // Intersection Observer to trigger counting when the second frame comes into view
  const secondFrame = document.querySelector('.frame');
  let countingStarted = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countingStarted) {
        startCounting('count1', 25, 5000000); // Start counting from 0 to 300000 in 5 seconds
        startCounting('count2', 220, 500000); // Start counting from 0 to 20000 in 5 seconds
        startCounting('count3', 300, 500000); // Start counting from 0 to 25000 in 5 seconds
        startCounting('count4', 550, 500000); // Start counting from 0 to 125000 in 5 seconds
        startCounting('count5', 500, 500000); // Start counting from 0 to 125000 in 5 seconds
        countingStarted = true; // Mark the counting as started
        observer.unobserve(secondFrame); // Stop observing once counting starts
      }
    });
  }, { threshold: 1 }); // Trigger when 50% of the second frame is visible
  
  if (secondFrame) {
    observer.observe(secondFrame);
  }