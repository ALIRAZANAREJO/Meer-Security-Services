/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})






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



// Function to handle button selection
function selectButton(button) {
   // Deselect all buttons
   const buttons = document.querySelectorAll('.button');
   buttons.forEach(btn => btn.classList.remove('selected'));

   // Select the clicked button
   button.classList.add('selected');
}

// Function to show the dropdown
function showDropdown(button) {
   const dropdown = button.nextElementSibling; // Get the next sibling (the dropdown)
   dropdown.style.display = 'block'; // Show the dropdown
}

// Function to hide the dropdown
function hideDropdown(button) {
   const dropdown = button.nextElementSibling; // Get the next sibling (the dropdown)
   dropdown.style.display = 'none'; // Hide the dropdown
}

// Add event listeners for dropdown behavior
document.addEventListener('DOMContentLoaded', () => {
   const dropdownContainers = document.querySelectorAll('.dropdown-container');

   dropdownContainers.forEach(container => {
       const button = container.querySelector('.button');
       const dropdown = container.querySelector('.dropdown');

       // Show dropdown when hovering over the button
       button.addEventListener('mouseenter', () => showDropdown(button));
       button.addEventListener('mouseleave', () => hideDropdown(button));

       // Keep dropdown visible when hovering over it
       dropdown.addEventListener('mouseenter', () => showDropdown(button));
       dropdown.addEventListener('mouseleave', () => hideDropdown(button));
   });
});
