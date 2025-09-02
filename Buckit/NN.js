// Handle dropdowns on desktop (hover) and mobile (click)
document.addEventListener('DOMContentLoaded', () => {
  const dropdownContainers = document.querySelectorAll('.dropdown-container');

  dropdownContainers.forEach(container => {
    const button = container.querySelector('.button');
    const dropdown = container.querySelector('.dropdown');

    let timeout;

    // Desktop behavior: show dropdown on hover
    container.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        clearTimeout(timeout);
        dropdown.style.display = 'block';
      }
    });

    container.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        timeout = setTimeout(() => {
          dropdown.style.display = 'none';
        }, 200);
      }
    });

    // Mobile behavior: show dropdown on click
    button.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent default action if button is inside a link

        const isVisible = dropdown.style.display === 'block';

        // Hide all other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
          d.style.display = 'none';
        });

        // Toggle clicked dropdown
        dropdown.style.display = isVisible ? 'none' : 'block';
      }
    });
  });
});

// Mobile menu toggle
function toggleNavbar() {
  const menu = document.querySelector('.button-container');
  menu.classList.toggle('show');
}
