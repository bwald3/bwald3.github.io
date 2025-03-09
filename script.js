async function loadFile(id, file) {
  const element = document.getElementById(id);
  const response = await fetch(file);
  if (response.ok) {
    element.innerHTML = await response.text();
  } else {
    console.error(`Error loading ${file}:`, response.statusText);
  }
}

// Load header and footer first
async function initPage() {
  await loadFile("navHeader", "/header.html");
  await loadFile("footer", "/footer.html");

  // Initialize Locomotive Scroll after dynamic content loads
  const scroller = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    tablet: { smooth: true }
  });

  // Select elements for shrinking and growing
  const scaleDownDiv = document.querySelector(".scroll-scale"); // Shrinks
  const scaleUpDiv = document.querySelector(".scroll-scale-up"); // Grows
  const opacityDiv = document.querySelector(".scroll-opacity"); // Fades

  const scrollLimit = window.innerHeight * 0.8; // 80vh for scaling

  // Locomotive Scroll event listener
  scroller.on("scroll", (obj) => {
    const scrollPosition = obj.scroll.y;

    // SHRINK LOGIC
    if (scaleDownDiv && scrollPosition < scrollLimit) {
      let progress = scrollPosition / scrollLimit;
      progress = Math.min(Math.max(progress, 0), 1);
      const scale = 1 - progress * 0.2;
      const opacity = 1 - progress;

      scaleDownDiv.style.transform = `scale(${scale})`;
      scaleDownDiv.style.opacity = opacity;
    }

    // GROW LOGIC
    if (scaleUpDiv && scrollPosition < scrollLimit) {
      let progress = scrollPosition / scrollLimit;
      progress = Math.min(Math.max(progress, 0), 1);
      const scale = 1 + progress * 0.2;
      scaleUpDiv.style.transform = `scale(${scale})`;
    }
  });

  // Navbar scroll behavior (avoid conflicts with Locomotive Scroll)
  scroller.on("scroll", (obj) => {
    const navbar = document.getElementById("navBar");
    if (navbar) {
      if (obj.scroll.y > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
}

// Run the initialization function after the DOM is ready
document.addEventListener("DOMContentLoaded", initPage);