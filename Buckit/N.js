

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




// Side Slider
document.addEventListener('DOMContentLoaded', () => {
   const filterButtons = document.querySelectorAll('.filter-button');

   filterButtons.forEach(button => {
       button.addEventListener('click', () => {
           button.classList.toggle('active');
       });
   });
});

function showDropdown(button) {
   const dropdown = button.nextElementSibling;
   dropdown.style.display = 'block';
}

function hideDropdown(button) {
   const dropdown = button.nextElementSibling;
   dropdown.style.display = 'none';
}

function selectOption(option) {
   alert('Selected: ' + option);
   const dropdown = document.querySelector('.dropdown');
   dropdown.style.display = 'none'; // Hide dropdown after selection
}