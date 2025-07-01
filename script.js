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
  document.getElementById("getYear").textContent = new Date().getFullYear();


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

      const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.side-nav a');

  let currentSection = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    // Apply active class when the section is near the top of the viewport
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
  });
  });
}

// Run the initialization function after the DOM is ready
document.addEventListener("DOMContentLoaded", initPage);

// Modal Scripts
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".open-modal");
  const imageModal = document.getElementById("image-modal");
  const closeButtons = document.querySelectorAll(".close-modal");
  const modalImage = document.getElementById("modal-image");
  let scale = 1, isDragging = false, startX, startY, offsetX = 0, offsetY = 0;

  buttons.forEach(button => {
      button.addEventListener("click", () => {
          const type = button.getAttribute("data-type");
          const targetId = button.getAttribute("data-target");

          if (type === "video") {
              const modal = document.getElementById(targetId);
              const video = modal.querySelector("video");
              const videoSrc = button.getAttribute("data-src");

              if (videoSrc) {
                  video.src = videoSrc; // Set the video source dynamically
                  video.load();
                  video.play().catch(err => console.error("Autoplay failed:", err));
              }

              modal.style.display = "flex";
          } else if (type === "image") {
              const imgSrc = button.getAttribute("data-src");
              if (imgSrc) {
                  modalImage.src = imgSrc;
                  imageModal.style.display = "flex";
                  resetZoom();
              }
          }
      });
  });

  closeButtons.forEach(button => {
      button.addEventListener("click", () => {
          const modal = button.closest(".modal");
          modal.style.display = "none";

          // Stop video playback
          const video = modal.querySelector("video");
          if (video) {
              video.pause();
              video.src = ""; // Clear source to stop loading
          }
      });
  });

  // Close modals when clicking outside
  document.querySelectorAll(".modal").forEach(modal => {
      modal.addEventListener("click", (event) => {
          if (event.target.classList.contains("modal") || event.target.classList.contains("close-modal")) {
              modal.style.display = "none";

              // Stop video playback
              const video = modal.querySelector("video");
              if (video) {
                  video.pause();
                  video.src = "";
              }
          }
      });
  });

  // Zoom functionality
  document.getElementById("zoom-in").addEventListener("click", () => {
      scale += 0.2;
      updateTransform();
  });

  document.getElementById("zoom-out").addEventListener("click", () => {
      if (scale > 0.6) {
          scale -= 0.2;
          updateTransform();
      }
  });

  document.getElementById("reset-zoom").addEventListener("click", () => {
      resetZoom();
  });

  function updateTransform() {
      modalImage.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
  }

  function resetZoom() {
      scale = 1;
      offsetX = 0;
      offsetY = 0;
      updateTransform();
  }

  // Drag functionality for zoomed-in images
  modalImage.addEventListener("mousedown", (e) => {
      if (scale > 1) {
          isDragging = true;
          startX = e.clientX - offsetX;
          startY = e.clientY - offsetY;
          modalImage.style.cursor = "grabbing";
          e.preventDefault(); // Prevent text selection issues
      }
  });

  document.addEventListener("mousemove", (e) => {
      if (isDragging) {
          offsetX = e.clientX - startX;
          offsetY = e.clientY - startY;
          updateTransform();
      }
  });

  document.addEventListener("mouseup", () => {
      isDragging = false;
      modalImage.style.cursor = "grab";
  });
});
