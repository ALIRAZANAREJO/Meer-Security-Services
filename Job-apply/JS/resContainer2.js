import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmL8qcjg4S6NeY3erraq_XhlDJ7Ek2s_E",
    authDomain: "palestine-web.firebaseapp.com",
    databaseURL: "https://palestine-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "palestine-web",
    storageBucket: "palestine-web.appspot.com",
    messagingSenderId: "35190212487",
    appId: "1:35190212487:web:0a699bb1fa7b1a49113522",
    measurementId: "G-8TE04Z9ZFW"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const resContainer = document.getElementById('resContainer2');
let currentIndex = 0; // Track current card1 index

// Function to fetch and display all card1s
function fetchAndDisplaycard1s() {
    const dbRef = ref(db, "resContainer2");
    onValue(dbRef, (snapshot) => {
        resContainer.innerHTML = ""; // Clear existing card1s
        createOffBox(); // Create the off box
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            createcard1(childSnapshot.key, data); // Use the key as the ID
        });
    });
}

// Function to create a single off box
const createOffBox = () => {
    const offBox = document.createElement('div');
    resContainer.appendChild(offBox); // Append the off box
    startTimer(15 * 60, document.getElementById("timer")); // Start the timer for 15 minutes
};

// Arrow function to control arrow visibility
const handleArrwVisibility = () => {
    const Arrw2 = document.querySelector('.Arrw2'); // Updated to use Arrw2
    if (Arrw2) {
        Arrw2.style.display = 'block'; // Show the Arrw2

        // Set timer to remove the Arrw2 after 15 minutes
        setTimeout(() => {
            Arrw2.style.display = 'none'; // Hide Arrw2 after 15 minutes
        }, 15 * 60 * 1000); // 15 minutes in milliseconds
    }
};

// Timer function
const startTimer = (duration, display) => {
    let totalTime = duration; // Set total time in seconds
    const timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's up!"; // Message when time is up
            
            const resContainer2 = document.getElementById('resContainer2'); // Get the resContainer element
            if (resContainer2) {
                resContainer2.style.display = 'none'; // Hide the card1 container
            }

            const Arrw2 = document.querySelector('.Arrw2'); // Updated to use Arrw2
            if (Arrw2) {
                Arrw2.style.display = 'none'; // Hide the Arrw2
            }
        } else {
            totalTime--;
        }
    }, 1000);
};

// Function to create a card1
function createcard1(id, { Dish, Food, Price,Time, Off,Rating,Reviews, imageUrl }) {
    const card1 = document.createElement('div');
    card1.className = 'card1-container';
    card1.setAttribute('data-id', id);
    
    card1.innerHTML = `
       <div class="card1">
                    <div class="image-container">
                        <img class="imagen" src="${imageUrl}"/>
                                        <div class="gift-badgss">
                            <img src="./images/discount (1).png">
                            <div class="disss">Gift: Free delivery</div>
                        <div class="offer-badgss">
                            <img src="./images/discount (1).png">
                            <div class="disss">${Off}</div>
                        </div>
                            <div class="heart-icon">
                                <div class="circle">
                                    <img class="himg" src="./images/heart-black.png" onclick="toggleImage(this)" style="display: none;" />
                                    <img class="himg" src="./images/heart (1).png" onclick="toggleImage(this)"  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card2-content">
                        <h3 class="card2-title">${Dish}</h3>
                        <svg class="star" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke-width="3"/>
                        </svg>
                        <div class="card1-rating">
                              <span class="rating">${Rating}</span><span class="reviews">(${Reviews}+)</span>
                              </div>
                        <p class="Dish">$$ •  ${Food}</p>
                        <div class="delivery-info">
                            <img class="time" src="./images/time (1).png" alt="Clock Icon" class="clock-icon">
                            <span class="card-time">${Time} min • </span>
                            <img src="./images/bike (1).png" alt="Bike Icon" class="bike-icon">                
                            <span class="Free">${Price}</span>
                        </div>
                    </div>
                </div>


    </div>
  

           </div>
           
    </div>
    

        </div>
          <div  id="global-message" class="message">Add Favourite 🤍</div>`;

    // Append the card1 to the container
    resContainer.appendChild(card1);
}

// Move functions for carousel
function moveLeft() {
    const card1s = document.querySelectorAll('.card1');
    if (currentIndex > 0) {
        currentIndex--;
        updatecard1Position(card1s);
    }
}

function moveRight() {
    const card1s = document.querySelectorAll('.card1');
    if (currentIndex < card1s.length - 1) {
        currentIndex++;
        updatecard1Position(card1s);
    }
}

// Update card1 position based on current index
function updatecard1Position(card1s) {
    const offset = currentIndex * -310; // Adjust based on card1 width + margin
    card1s.forEach((card1) => {
        card1.style.transform = `translateX(${offset}px)`;
    });

    // Update arrow visibility
    updateArrwVisibility(card1s);
}

// Update arrow visibility based on current index
function updateArrwVisibility(card1s) {
    const leftArrw2 = document.getElementById('leftArrw2'); // Updated to use leftArrw2
    const rightArrw2 = document.getElementById('rightArrw2'); // Updated to use rightArrw2

    leftArrw2.style.opacity = currentIndex > 0 ? '1' : '0'; // Show or hide left Arrw
    rightArrw2.style.opacity = currentIndex < card1s.length - 1 ? '1' : '1';
}

// Call fetchAndDisplaycard1s on page load
window.addEventListener('DOMContentLoaded', () => {
    const leftArrw2 = document.createElement('button');
    leftArrw2.className = 'Arrw2 left';
    leftArrw2.id = 'leftArrw2';
    leftArrw2.innerHTML = '<img src="./images/right-Arrow (2).png" alt="Left Arrw" >';

    const rightArrw2 = document.createElement('button');
    rightArrw2.className = 'Arrw2 right';
    rightArrw2.id = 'rightArrw2';
    rightArrw2.innerHTML = '<img src="./images/right-Arrow (3).png" alt="Right Arrw">';

    // Create arrows outside the resContainer
    const ArrwContainer2 = document.createElement('div');
    ArrwContainer2.className = 'carousel-wrapper';
    ArrwContainer2.appendChild(leftArrw2);
    ArrwContainer2.appendChild(rightArrw2);
    document.body.insertBefore(ArrwContainer2, resContainer); // Insert arrows before resContainer

    // Attach event listeners to arrows
    leftArrw2.addEventListener('click', moveLeft);
    rightArrw2.addEventListener('click', moveRight);

    fetchAndDisplaycard1s(); // Fetch card1s after setting up arrows
    // Initial visibility update
    updateArrwVisibility(document.querySelectorAll('.card1'));
});
