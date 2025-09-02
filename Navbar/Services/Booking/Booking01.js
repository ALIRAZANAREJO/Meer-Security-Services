import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// DOM elements
const resContainer1 = document.getElementById('resContainer1');
const cnic = document.getElementById('Cnic');
const name = document.getElementById('Name');
const fname = document.getElementById('Fname');
const dob = document.getElementById('Dob');
const phone = document.getElementById('Phone');
const caddres = document.getElementById('Caddres');
const paddres = document.getElementById('Paddres');
const qual = document.getElementById('Qual');
const lisnt = document.getElementById('Lisnt');
const rarmy = document.getElementById('Rarmy');
const citybox = document.getElementById('Citybox');
const containerSelect1 = document.getElementById('containerSelect1');

// Function to insert data into Firebase
window.InsertData = function() {
    const selectedContainer = containerSelect1.value;
    const newCnicRef = ref(db, `${selectedContainer}/` + cnic.value);

    set(newCnicRef, {
        Cnic: cnic.value,
        Name: name.value,
        Fname: fname.value,
        Dob: dob.value,
        Phone: phone.value,
        Caddres: caddres.value,
        Paddres: paddres.value,
        Qual: qual.value,
        Lisnt: lisnt.value,
        Rarmy: rarmy.value,
        Citybox: citybox.value,
       
    }).then(() => {
        clearForm();
        alert("Your Booking Successfully Thank You");
        alert("Please Wait Few Mins For Response From Company");
        
        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        console.error("Error storing data:", error);
        alert("Error storing data: " + error.message);
    });
};

// Function to fetch and display cards based on selected container
function fetchAndDisplayCards() {
    const selectedContainer = containerSelect1.value;
    const dbRef = ref(db, selectedContainer);
    onValue(dbRef, (snapshot) => {
        const container = document.getElementById(selectedContainer);
        container.innerHTML = ""; // Clear existing cards
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            createCard(childSnapshot.key, data, selectedContainer);
        });
    });
}

// Function to create a card
function createCard(id, { Cnic, Name, Dob, Fname, Phone, Caddres, Paddres, Qual, Citybox, Lisnt, Rarmy,}, containerId) {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
        <div class="card">
            <h3 class="card-title">${Cnic}</h3>
            <p>Name: ${Name}</p>
            <p>Father's Name: ${Fname}</p>
            <p>Date of Birth: ${Dob}</p>
            <p>Phone: ${Phone}</p>
            <p>Current Address: ${Caddres}</p>
            <p>Permanent Address: ${Paddres}</p>
            <p>Qualification: ${Qual}</p>
            <p>License: ${Lisnt}</p>
            <p>Army Rank: ${Rarmy}</p>
            <p>City: ${Citybox}</p>
        
            <button onclick="DeleteData('${id}', '${containerId}')">Delete</button>
        </div>
    `;
    
    document.getElementById(containerId).appendChild(card);
}

// Function to delete data
window.DeleteData = function(id, containerId) {
    const dbRef = ref(db, `${containerId}/${id}`);
    remove(dbRef).then(() => {
        alert("Data deleted successfully!");
        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        alert("Error deleting data: " + error);
    });
};

// Function to clear the form
function clearForm() {
    cnic.value = '';
    name.value = '';
    fname.value = '';
    dob.value = '';
    phone.value = '';
    caddres.value = '';
    paddres.value = '';
    qual.value = '';
    lisnt.value = '';
    rarmy.value = '';
    citybox.value = '';
   
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();
