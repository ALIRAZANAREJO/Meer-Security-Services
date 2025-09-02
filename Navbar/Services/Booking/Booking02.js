import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

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
const storage = getStorage(app);

// DOM Elements
const resContainer2 = document.getElementById('resContainer2');
const identitynic = document.getElementById('Identitynic');
const yname = document.getElementById('Yname');
const email = document.getElementById('Email');
const noofguardsrequired = document.getElementById('NoofGuardsrequired');
const number = document.getElementById('Number');
const vehicles = document.getElementById('Vehicles');
const deploymentarea = document.getElementById('Deploymentarea');
const gcategory = document.getElementById('Gcategory');
const wcategory = document.getElementById('Wcategory');
const addinf = document.getElementById('Addinf');
const selectcity = document.getElementById('Selectcity');
const containerSelect2 = document.getElementById('containerSelect2');

// Function to insert data
window.SubmitData = function() {
    const selectedContainer = containerSelect2.value;
    const newIdentitynicRef = ref(db, `${selectedContainer}/` + identitynic.value); // Use selected container
    return set(newIdentitynicRef, {
        Identitynic: identitynic.value,
        Yname: yname.value,
        Email: email.value,
        NoofGuardsrequired: noofguardsrequired.value,
        Number: number.value,
        Vehicles: vehicles.value,
        Deploymentarea: deploymentarea.value,
        Addinf: addinf.value,
        Selectcity: selectcity.value,
        Gcategory: gcategory.value,
        Wcategory: wcategory.value,
    });
};

// Function to select container based on button click
document.addEventListener("DOMContentLoaded", function() {
    // تمام JavaScript کوڈ یہاں رکھیں

    // Function to select container based on button click
    window.selectContainer = function(containerId) {
        const containerSelect2 = document.getElementById('containerSelect2');
        if (containerSelect2) { // Check if containerSelect2 exists
            containerSelect2.value = containerId; // Set the selected container value
            fetchAndDisplayCards(); // Refresh cards display for the selected container
        } else {
            console.error("containerSelect2 is null");
        }
    };

    // Other functions...
    fetchAndDisplayCards(); // Call fetchAndDisplayCards on page load
});

// Function to fetch and display cards
function fetchAndDisplayCards() {
    const selectedContainer = containerSelect2.value;
    const containerRef = ref(db, selectedContainer);
    
    onValue(containerRef, (snapshot) => {
        resContainer2.innerHTML = ''; // Clear previous content
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            createCard(data);
        });
    });
}

// Function to create a card for each entry
// function createCard(data) {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//         <p>IDENTITYNIC: ${data.Identitynic}</p>
//         <p>Name: ${data.Name}</p>
//         <p>Father's Name: ${data.Email}</p>
//         <p>Date of Birth: ${data.NoofGuardsrequired}</p>
//         <p>Number: ${data.Number}</p>
//         <p>Current Address: ${data.Vehicles}</p>
//         <p>Permanent Address: ${data.Deploymentarea}</p>
//         <p>Gcategoryification: ${data.Gcategory}</p>
//         <p>License: ${data.Wcategory}</p>
//         <p>Army: ${data.Addinf}</p>
//         <p>City: ${data.Selectcity}</p>
//     `;
//     resContainer.appendChild(card);
// }

// // Call fetchAndDisplayCards on page load
// fetchAndDisplayCards();


// Function to create a card
function createCard(id, { Identitynic, Yname, NoofGuardsrequired, Email, Number, Vehicles, Deploymentarea, Gcategory, Selectcity, Wcategory, Addinf,}, containerId) {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
        <div class="card">
            <h3 class="card-title">${Identitynic}</h3>
            <p>Yname: ${Yname}</p>
            <p>Father's Name: ${Email}</p>
            <p>Date of Birth: ${NoofGuardsrequired}</p>
            <p>Number: ${Number}</p>
            <p>Current Address: ${Vehicles}</p>
            <p>Permanent Address: ${Deploymentarea}</p>
            <p>Gcategoryification: ${Gcategory}</p>
            <p>License: ${Wcategory}</p>
            <p>Army Rank: ${Addinf}</p>
            <p>City: ${Selectcity}</p>
        
            <button onclick="DeleteData('${id}', '${containerId}')">Delete</button>
        </div>
    `;
    
    
    document.getElementById(containerId).appendChild(card); // Append to the selected container
}

// Function to select data by identitynic yname
window.SelectDataByName = function() {
    const identitynicYname = identitynic.value.trim();
    const dbRef = ref(db, "resContainer2"); // Reference to the entire Res-Card node

    get(dbRef).then((snapshot) => {
        let found = false;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.Identitynic === identitynicYname) {
                // If the identitynic yname matches, fill the input fields
                food.value = data.Food || '';
                time.value = data.Time || '';
                price.value = data.Price || ''; 
                off.value = data.Off || '';
                rating.value = data.Rating || '';
                reviews.value = data.Reviews || '';
                found = true;
                return; // Exit the loop
            }
        });
        if (!found) {
            alert("No data found for this identitynic yname.");
        }
    }).catch((error) => {
        alert("Error fetching data: " + error);
    });
};

// Function to select data by ID (when clicking the Edit button)
window.SelectDataById = function(id) {
    const selectedContainer = containerSelect2.value;
    const dbRef = ref(db, `${selectedContainer}/${id}`); // Use the ID to get the specific identitynic
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            identitynic.value = data.Identitynic || '';
            food.value = data.Food || '';
            time.value = data.Time || '';
            price.value = data.Price || '';
            off.value = data.Off || '';
            rating.value = data.Rating || '';
            reviews.value = data.Reviews || '';
        } else {
            alert("No data available for this identitynic.");
        }
    }).catch((error) => {
        alert("Error fetching data: " + error);
    });
};

// Function to delete data
window.DeleteData = function(id, resContainer2) {
    const dbRef = ref(db, `${resContainer2}/${id}`);
    remove(dbRef).then(() => {
        alert("Your Booking Successfully Thank You");
        alert("Please Wait Few Mins For Response From Company");        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        alert("Error deleting data: " + error);
    });
};

// Function to clear the form
function clearForm() {
    identitynic.value = '';
    yname.value = '';
    email.value = '';
    noofguardsrequired.value = '';
    number.value = '';
    vehicles.value = '';
    deploymentarea.value = '';
    gcategory.value = '';
    wcategory.value = '';
    addinf.value = '';
    selectcity.value = '';
   
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();

