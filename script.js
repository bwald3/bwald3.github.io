const container = document.querySelector('.grow-container');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const containerOffset = container.getBoundingClientRect().top + window.scrollY;
    const distanceScrolled = scrollY - containerOffset;

    if (distanceScrolled > 0) {
        const scaleValue = Math.min(1 + distanceScrolled / 1000, 2); // Max scale value is 2
        container.style.transform = `scale(${scaleValue})`;
    }
});