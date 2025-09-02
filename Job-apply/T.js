import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

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

const resContainer = document.getElementById('resContainer');
const cnic = document.getElementById('Cnic');
const name = document.getElementById('Name');
const fname = document.getElementById('Fname');
const dob = document.getElementById('Dob');
const phone = document.getElementById('Phone');
const caddres = document.getElementById('Caddres');
const paddres = document.getElementById('Paddres');
const qual = document.getElementById('Qual');
const imageUpload = document.getElementById('ImageUpload');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const uploadedImage = document.getElementById('uploadedImage');
const containerSelect = document.getElementById('containerSelect');

// Function to update the displayed file name
window.updateFileName = function() {
    const file = imageUpload.files[0];
    fileNameDisplay.textContent = file ? file.name : "";
};

// Function to insert data
window.InsertData = function() {
    const file = imageUpload.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
        alert("File size exceeds 5 MB limit.");
        return;
    }

    const storageReference = storageRef(storage, `images/${file.name}`);
    
    uploadBytes(storageReference, file).then((snapshot) => {
        return getDownloadURL(storageReference);
    }).then((url) => {
        const selectedContainer = containerSelect.value;
        const newCnicRef = ref(db, `${selectedContainer}/` + cnic.value); // Use selected container
        return set(newCnicRef, {
            Cnic: cnic.value,
            Name: name.value,
            Fname: fname.value,
            Dob: dob.value,
            Caddres: caddres.value,
            Paddres: paddres.value,
            Qual: qual.value,
            Phone: phone.value,
            imageUrl: url
        });
    }).then(() => {
        clearForm();
        alert("Data Stored Successfully");
        fetchAndDisplayCards(); // Refresh cards display
    }).catch((error) => {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
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
            createCard(childSnapshot.key, data, selectedContainer); // Pass selected container
        });
    });
}

// Function to create a card
function createCard(id, { Cnic, Name, Dob,Fname,Phone,Caddres,Paddres,Qual, imageUrl }, containerId) {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
       <div class="card">
        <div class="image-container">
                    <img  class="imagen" src="${imageUrl}" alt="${Cnic}">
            <div class="phoneer-badge">${Phone}</div>
            <div class="gift-badge">Gift: Free delivery</div>
            <div class="heart-icon">
                <div class="circle">
                    <img class="himg" id="image1" src="./images/heart (1).png"   onclick="toggleImage()" />
                    <img class="himg" id="image2" src="./images/heart-black.png" onclick="toggleImage()" style="display: none;" />
                </div> 
                </div>
        </div>
        <div class="card-content">
            <h3 class="card-title"> ${Cnic}</h3>
            <svg class="star" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke-width="3"/>
            </svg>
            <div class="card-caddres">
                <span class="caddres">${Caddres}</span><span class="paddres">(${Paddres}+)</span>
            </div>

            <p class="Cnic">$$ •${Name}</p>
            <div class="delivery-info">
                <img class="fnamer" src="./images/fname (1).png" alt="Clock Icon" class="clock-icon">
                <span class="card-fname">${Fname} min • </span>
                <img src="./images/bike (1).png" alt="Bike Icon" class="bike-icon">                
                <span class="Free">Rs. ${Dob}</span>
                <span class="Free">Rs. ${Qual}</span>
        
            </div>
        </div>
        </div>
    </div>
    </div>
    <div id="message" class="hidden">Add Favourite 🤍</div>`;
    
    document.getElementById(containerId).appendChild(card); // Append to the selected container
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
                fileNameDisplay.textContent = data.imageUrl || '';
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
window.SelectDataById = function(id) {
    const selectedContainer = containerSelect.value;
    const dbRef = ref(db, `${selectedContainer}/${id}`); // Use the ID to get the specific cnic
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            cnic.value = data.Cnic || '';
            name.value = data.Name || '';
            fname.value = data.Fname || '';
            dob.value = data.Dob || '';
            phone.value = data.Phone || '';
            caddres.value = data.Caddres || '';
            paddres.value = data.Paddres || '';
            qual.value = data.Qual || '';
            fileNameDisplay.textContent = data.imageUrl || '';
        } else {
            alert("No data available for this cnic.");
        }
    }).catch((error) => {
        alert("Error fetching data: " + error);
    });
};

// Function to delete data
window.DeleteData = function(id, resContainer7) {
    const dbRef = ref(db, `${resContainer7}/${id}`);
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
    imageUpload.value = '';
    fileNameDisplay.textContent = '';
    uploadedImage.style.display = 'none';
}

// Call fetchAndDisplayCards on page load
fetchAndDisplayCards();
