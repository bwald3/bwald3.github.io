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

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Hero shrink logic
    const hero = document.querySelector(".scaling-hero");
    const initialHeight = window.innerHeight * 0.8; // Start at 80vh
    let newHeight = Math.max(0, initialHeight - scrollY);
    if (hero) {
      hero.style.height = `${newHeight}px`;

      // Add or remove the "shrink" class based on scroll position
      if (scrollY > 20) { // Scrolling past 20px
        hero.classList.add("shrink");
      } else { // When scroll position is less than 20px
        hero.classList.remove("shrink");
      }
    }

    // Navbar scroll behavior
    const navbar = document.getElementById("navBar");
    if (navbar) {
      if (scrollY > 50) { // Scrolling past 50px
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
}

// Run the initialization function after the DOM is ready
document.addEventListener("DOMContentLoaded", initPage);