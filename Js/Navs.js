function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const arrow = document.getElementById('dd');
    
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
        dd.style.transform = 'rotate(0deg)'; // Rotate to down
    } else {
        dropdownMenu.style.display = 'block';
        dd.style.transform = 'rotate(180deg)'; // Rotate to up
    }
}
function toggleLang() {
    const dropdownMenu = document.getElementById('dropdown-Lang');
    const ln = document.getElementById('ln');
    
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
        ln.style.transform = 'rotate(0deg)'; // Rotate to down
    } else {
        dropdownMenu.style.display = 'block';
        ln.style.transform = 'rotate(180deg)'; // Rotate to up
    }
}




// Side Slider
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });
});


function selectButton(button) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.classList.remove('selected')); // Remove selected class from all buttons
    button.classList.add('selected'); // Add selected class to clicked button
}
