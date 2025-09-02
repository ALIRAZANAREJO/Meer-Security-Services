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
const resContainer4 = document.getElementById('resContainer4');

const cardno = document.getElementById('Cardno');
const yentre = document.getElementById('Yentre');
const gmail = document.getElementById('Gmail');
const mobileno = document.getElementById('Mobileno');
const vhreq = document.getElementById('Vhreq');
const guardcat = document.getElementById('Guardcat');
const wopencat = document.getElementById('Wopencat');
const secgreq = document.getElementById('Secgreq');
const foji = document.getElementById('Foji');
const fromdate = document.getElementById('Fromdate');
const todate = document.getElementById('Todate');
const yourcity = document.getElementById('Yourcity');
const noogreq = document.getElementById('Noogreq');
const carsname = document.getElementById('Carsname');
const containerSelect4 = document.getElementById('containerSelect4');

// Function to insert data into Firebase
window.Ensert = function() {
    const selectedContainer = containerSelect4.value;
    const newCardnoRef = ref(db, `${selectedContainer}/` + cardno.value);

    set(newCardnoRef, {
        Cardno: cardno.value,
        Yentre: yentre.value,
        Gmail: gmail.value,
        Mobileno: mobileno.value,
        Vhreq: vhreq.value,
        Guardcat: guardcat.value,
        Wopencat: wopencat.value,
        Secgreq: secgreq.value,
        Foji: foji.value,
        Yourcity: yourcity.value,
        Noogreq: noogreq.value,
        Carsname: carsname.value,
        Fromdate: fromdate.value,
        Todate: todate.value,
       
    }).then(() => {
        clearForm();
        alert("Data Stored Successfully");
        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        console.error("Error storing data:", error);
        alert("Error storing data: " + error.message);
    });
};

// Function to fetch and display cards based on selected container
function fetchAndDisplayCards() {
    const selectedContainer = containerSelect4.value;
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
function createCard(id, { Cardno, Yentre, Gmail, Mobileno, Vhreq, Guardcat, Wopencat, Yourcity, Secgreq, Foji,Noogreq,Carsname,Fromdate,Todate}, containerId) {
    const card = document.createElement('div');
    card.classYentre = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
        <div class="card">
            <h3 class="card-title">${Cardno}</h3>
            <p>Yentre: ${Yentre}</p>
            <p>Father's Name: ${Gmail}</p>
            <p>Mobileno: ${Mobileno}</p>
            <p>Current Address: ${Vhreq}</p>
            <p>Permanent Address: ${Guardcat}</p>
            <p>Wopencatification: ${Wopencat}</p>
            <p>License: ${Secgreq}</p>
            <p>Army Rank: ${Foji}</p>
            <p>City: ${Yourcity}</p>
            <p>City: ${Noogreq}</p>
            <p>City: ${Carsname}</p>
            <p>City: ${Fromdate}</p>
            <p>City: ${Todate}</p>
        
            <button onclick="DeleteData('${id}', '${containerId}')">Delete</button>
        </div>
    `;
    
    document.getElementById(containerId).appendChild(card);
}

// Function to delete data
window.DeleteData = function(id, containerId) {
    const dbRef = ref(db, `${containerId}/${id}`);
    remove(dbRef).then(() => {
        alert("Your Booking Successfully Thank You");
        alert("Please Wait Few Mins For Response From Company");
                fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        alert("Error deleting data: " + error);
    });
};

// Function to clear the form
function clearForm() {
    cardno.value = '';
    yentre.value = '';
    gmail.value = '';
    mobileno.value = '';
    vhreq.value = '';
    guardcat.value = '';
    wopencat.value = '';
    secgreq.value = '';
    foji.value = '';
    yourcity.value = '';
    noogreq.value = '';
    carsname.value = '';
    fromdate.value = '';
    todate.value = '';
   
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();
