async function loadFile(id, file) {
  const element = document.getElementById(id);
  const response = await fetch(file);
  if (response.ok) {
    element.innerHTML = await response.text();
  } else {
    console.error(`Error loading ${file}:`, response.statusText);
  }
}
loadFile("navHeader", "/header.html");
loadFile("footer", "/footer.html");


const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  //   smartphone: {
  //      smooth: true
  //  },
   tablet: {
       smooth: true
   }
  });
// Select elements for shrinking and growing
const scaleDownDiv = document.querySelector('.scroll-scale'); // Shrinks
const scaleUpDiv = document.querySelector('.scroll-scale-up'); // Grows
const opacityDiv = document.querySelector('.scroll-opacity'); // Grows

// Set up the total scroll height for scaling
const scrollLimit = window.innerHeight * 0.8; // 80vh for scaling

// Add scroll listener to the scroller
scroller.on('scroll', (obj) => {
  // Get the current scroll position
  const scrollPosition = obj.scroll.y;

  // SHRINK LOGIC: Scale down from 1.1 to 1
  if (scaleDownDiv && scrollPosition < scrollLimit) {
    let progress = scrollPosition / scrollLimit;
    progress = Math.min(Math.max(progress, 0), 1); // Constrain progress between 0 and 1
    const scale = 1 - progress * 0.2; // Shrink from 1.1 to 1
    const opacity = 1 - progress; // Fade out from 1 to 0

    scaleDownDiv.style.transform = `scale(${scale})`;
    scaleDownDiv.style.opacity = opacity;
  }

  // GROW LOGIC: Scale up from 1 to 1.1
  if (scaleUpDiv && scrollPosition < scrollLimit) {
    let progress = scrollPosition / scrollLimit;
    progress = Math.min(Math.max(progress, 0), 1); // Constrain progress between 0 and 1
    const scale = 1 + progress * 0.2; // Grow from 1 to 1.1
    scaleUpDiv.style.transform = `scale(${scale})`;
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