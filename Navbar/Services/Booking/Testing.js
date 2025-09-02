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
const resContainer = document.getElementById('resContainer');

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
const ssw = document.getElementById('Ssw');
const wtg = document.getElementById('Wtg');
const exarme = document.getElementById('Exarme');
const ss = document.getElementById('Ss');
const tc = document.getElementById('Tc');
const cctv = document.getElementById('Cctv');
const other = document.getElementById('Other');
const containerSelect = document.getElementById('containerSelect');

// Function to insert data into Firebase
window.InsertData = function() {
    const selectedContainer = containerSelect.value;
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
        Ssw: ssw.value,
        Wtg: wtg.value,
        Exarme: exarme.value,
        Ss: ss.value,
        Tc: tc.value,
        Cctv: cctv.value,
        Other:other .value,
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
    const selectedContainer = containerSelect.value;
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
function createCard(id, { Cnic, Name, Dob, Fname, Phone, Caddres, Paddres, Qual, Citybox, Lisnt, Rarmy,Ssw,Wtg,Exarme,Ss,Tc,Cctv,Other }, containerId) {
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
            ${Ssw}
            ${Wtg}
            ${Exarme}
            ${Ss}
            ${Tc}
            ${Cctv}
            ${Other}
            <button onclick="DeleteData('${id}', '${containerId}')">Delete</button>
        </div>
    `;
    
    document.getElementById(containerId).appendChild(card);
}
// Function to select data by cnic name
window.SelectDataByName = function() {
    const cnicName = cnic.value.trim();
    const dbRef = ref(db, "resContainer2"); // Reference to the entire Res-Card node

    get(dbRef).then((snapshot) => {
        let found = false;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.Cnic === cnicName) {
                // If the cnic name matches, fill the input fields
                name.value = data.Name || '';
                fname.value = data.Fname || '';
                dob.value = data.Dob || ''; 
                phone.value = data.Phone || '';
                caddres.value = data.Caddres || '';
                paddres.value = data.Paddres || '';
                qual.value = data.Qual || '';
                lisnt.value = data.Lisnt || '';
                lisnt.value = data.Lisnt || '';
                rarmy.value = data.Rarmy || '';
                ssw.value = data.Ssw || '';
                wtg.value = data.Wtg || '';
                exarme.value = data.Exarme || '';
                ss.value = data.SS || '';
                tc.value = data.Tc || '';
                cctv.value = data.Cctv || '';
                other.value = data.Other || '';
                found = true;
                return; // Exit the loop
            }
        });
        if (!found) {
            alert("No data found for this cnic name.");
        }
    }).catch((error) => {
        alert("Error fetching data: " + error);
    });
};

// Function to select data by ID (when clicking the Edit button)
// window.SelectDataById = function(id) {
//     const selectedContainer = containerSelect.value;
//     const dbRef = ref(db, `${selectedContainer}/${id}`); // Use the ID to get the specific cnic
//     get(dbRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             cnic.value = data.Cnic || '';
//             name.value = data.Name || '';
//             fname.value = data.Fname || '';
//             dob.value = data.Dob || '';
//             phone.value = data.Phone || '';
//             caddres.value = data.Caddres || '';
//             paddres.value = data.Paddres || '';
//             qual.value = data.Qual || '';
//             lisnt.value = data.Lisnt || '';
//             rarmy.value = data.Rarmy || '';
//             citybox.value = data.Citybox || '';
//             fileNameDisplay.textContent = data.imageUrl || '';
//         } else {
//             alert("No data available for this cnic.");
//         }
//     }).catch((error) => {
//         alert("Error fetching data: " + error);
//     });
// };
// // Function to delete data
// window.DeleteData = function(id, containerId) {
//     const dbRef = ref(db, `${containerId}/${id}`);
//     remove(dbRef).then(() => {
//         alert("Data deleted successfully!");
//         fetchAndDisplayCards(); // Refresh cards display
//     }).catch((error) => {
//         alert("Error deleting data: " + error);
//     });
// };

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
    wtg.value = '';
    exarme.value = '';
    ss.value = '';
    tc.value = '';
    cctv.value = '';
    other .value = '';
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();
