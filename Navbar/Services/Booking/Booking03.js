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
const resContainer3 = document.getElementById('resContainer3');

const myidno = document.getElementById('Myidno');
const myname = document.getElementById('Myname');
const ali = document.getElementById('Ali');
const mypno = document.getElementById('Mypno');
const sdeparea = document.getElementById('Sdeparea');
const equipmentreq = document.getElementById('Equipmentreq');
const selwapen = document.getElementById('Selwapen');
const selgcat = document.getElementById('Selgcat');
const optionalinf = document.getElementById('Optionalinf');
const ssw = document.getElementById('Ssw');
const wtg = document.getElementById('Wtg');
const militry = document.getElementById('Militry');
const ss = document.getElementById('Ss');
const tc = document.getElementById('Tc');
const cctv = document.getElementById('Cctv');
const other = document.getElementById('Other');
const mycity = document.getElementById('Mycity');
const containerSelect3 = document.getElementById('containerSelect3');

// Function to insert data into Firebase
window.Asure = function() {
    const selectedContainer = containerSelect3.value;
    const newMyidnoRef = ref(db, `${selectedContainer}/` + myidno.value);

    set(newMyidnoRef, {
        Myidno: myidno.value,
        Myname: myname.value,
        Ali: ali.value,
        Mypno: mypno.value,
        Sdeparea: sdeparea.value,
        Equipmentreq: equipmentreq.value,
        Selwapen: selwapen.value,
        Selgcat: selgcat.value,
        Optionalinf: optionalinf.value,
        Mycity: mycity.value,
        Ssw:  ssw.value,
        Wtg: wtg.value,
        Militry:  militry.value,
        Ss:  ss.value,
        Tc:  tc.value,
        Cctv:  cctv.value,
        Other:  other.value,
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
    const selectedContainer = containerSelect3.value;
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
function createCard(id, { Myidno, Myname, Ali, Mypno, Sdeparea, Equipmentreq, Selwapen, Mycity, Selgcat, Optionalinf,Ssw,Wtg,Militry,Ss,Tc,Cctv,Other,}, containerId) {
    const card = document.createElement('div');
    card.classMyname = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
        <div class="card">
            <h3 class="card-title">${Myidno}</h3>
            <p>Myname: ${Myname}</p>
            <p>Father's Name: ${Ali}</p>
            <p>Mypno: ${Mypno}</p>
            <p>Current Address: ${Sdeparea}</p>
            <p>Permanent Address: ${Equipmentreq}</p>
            <p>Selwapenification: ${Selwapen}</p>
            <p>License: ${Selgcat}</p>
            <p>Army Rank: ${Optionalinf}</p>
            <p>City: ${Mycity}</p>
            ${Ssw}
            ${Wtg}
            ${Militry}
            ${Ss}
            ${Tc}
            ${Cctv}
            ${Other}
        
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
        alert("Please Wait Few Mins For Response From Company");        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        alert("Error deleting data: " + error);
    });
};

// Function to clear the form
function clearForm() {
    myidno.value = '';
    myname.value = '';
    ali.value = '';
    mypno.value = '';
    sdeparea.value = '';
    equipmentreq.value = '';
    selwapen.value = '';
    selgcat.value = '';
    optionalinf.value = '';
    mycity.value = '';
    ssw.value = '';
    wtg.value = '';
    militry.value = '';
    ss.value = '';
    tc.value = '';
    cctv.value = '';
    other.value = '';
   
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();
