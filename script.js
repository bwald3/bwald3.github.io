const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });
// Get reference to the div to scale
const scaleDiv = document.querySelector('.scroll-scale');

// Set up the total scroll height for the section
const scrollLimit = window.innerHeight * 0.8; // 80vh for scaling
const sectionHeight = window.innerHeight; // 100vh for section height

// Add scroll listener to the scroller
scroller.on('scroll', (obj) => {
// Get the current scroll position
const scrollPosition = obj.scroll.y; 

// If the scroll position is less than 80vh, scale the element
if (scrollPosition < scrollLimit) {
// Calculate the scroll progress for scaling (0 to 1)
let progress = scrollPosition / scrollLimit;

// Constrain progress between 0 and 1
progress = Math.min(Math.max(progress, 0), 1);

// Calculate the scale based on progress (from scale 1 to 1.1)
const scale = 1 + progress * 0.2;

// Apply the calculated scale to the element
scaleDiv.style.transform = `scale(${scale})`;
}

// Check if the user has scrolled past 80vh
if (scrollPosition >= scrollLimit) {
// Optional: You can unlock further scrolling here if needed
// scroller.start();
}
});

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navBar");
    if (window.scrollY > 50) { // Adjust the scroll position as needed
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});