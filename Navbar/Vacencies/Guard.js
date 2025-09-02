import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
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

// Elements
const cnic = document.getElementById('Cnic');
const nameInput = document.getElementById('Name');
const fname = document.getElementById('Fname');
const dob = document.getElementById('Dob');
const phone = document.getElementById('Phone');
const caddres = document.getElementById('Caddres');
const paddres = document.getElementById('Paddres');
const qual = document.getElementById('Qual');
const imageUpload = document.getElementById('ImageUpload');
const imagePreview = document.getElementById('image-preview');
const submitBtn = document.getElementById('submitBtn');
const recallBtn = document.getElementById('recallBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const resContainer5 = document.getElementById('resContainer5');

// Add event listener to the image preview circle
imagePreview.addEventListener('click', () => {
    imageUpload.click(); // Trigger the file input click
});

// Add event listener to the file input
imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        updateImagePreview(file);
    }
});

// Function to update the image preview
function updateImagePreview(file) {
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
}

// Function to handle data submission
submitBtn.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

// Upload image to Firebase Storage
    const storageReference = storageRef(storage, `images/${file.name}`);
    
    try {
        const snapshot = await uploadBytes(storageReference, file);
        const url = await getDownloadURL(snapshot.ref);

        // Store data in Firestore
        const newCnicRef = ref(db, `resContainer5/${cnic.value}`);
        await set(newCnicRef, {
            Cnic: cnic.value,
            Name: nameInput.value,
            Fname: fname.value,
            Dob: dob.value,
            Phone: phone.value,
            Caddres: caddres.value,
            Paddres: paddres.value,
            Qual: qual.value,
            ImageUrl: url // Storing the image URL
        });

        clearForm();
        alert("Data Stored Successfully");
        fetchAndDisplayCards(); // Refresh cards display
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
    }
});

// Function to recall data from the database
recallBtn.addEventListener('click', async () => {
    const cnicValue = cnic.value;
    if (!cnicValue) {
        alert("Please enter a CNIC number.");
        return;
    }

    try {
        const snapshot = await get(child(ref(db), `resContainer5/${cnicValue}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            nameInput.value = data.Name;
            fname.value = data.Fname;
            dob.value = data.Dob;
            phone.value = data.Phone;
            caddres.value = data.Caddres;
            paddres.value = data.Paddres;
            qual.value = data.Qual;
            const imageUrl = data.ImageUrl;
            imagePreview.src = imageUrl; // Update the image preview
        } else {
            alert("No data found for the given CNIC number.");
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        alert("Error retrieving data: " + error.message);
    }
});

// Function to fetch and display cards based on stored data
function fetchAndDisplayCards() {
    const dbRef = ref(db, "resContainer5");
    onValue(dbRef, (snapshot) => {
        resContainer5.innerHTML = ""; // Clear existing cards
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            createCard(childSnapshot.key, data);
        });
    });
}

// Function to create a card to display the data
function createCard(id, { Cnic, Name, Dob, Fname, Phone, Caddres, Paddres, Qual, ImageUrl }) {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.setAttribute('data-id', id);
    
    card.innerHTML = `
       <div class="card">
        <div class="image-upload-circle">
          <img src="${ImageUrl}" alt="${Cnic}" style="width:100px; height:100px; object-fit: cover; border-radius: 50%;">
        </div>
        <h3 class="card-title">${Cnic}</h3>
        <p>Name: ${Name}</p>
        <p>Father's Name: ${Fname}</p>
        <p>Date of Birth: ${Dob}</p>
        <p>Phone: ${Phone}</p>
        <p>Current Address: ${Caddres}</p>
        <p>Permanent Address: ${Paddres}</p>
        <p>Qualification: ${Qual}</p>
        <button class="select-btn" data-cnic="${Cnic}">Select</button>
       </div>`;
    
    resContainer5.appendChild(card); // Append to the results container

    // Add event listener to the "Select" button
    const selectBtn = card.querySelector('.select-btn');
    selectBtn.addEventListener('click', () => {
        const cnicValue = selectBtn.dataset.cnic;
        recallData(cnicValue);
    });
}

// Function to update data in the database
updateBtn.addEventListener('click', async () => {
    const cnicValue = cnic.value;
    if (!cnicValue) {
        alert("Please enter a CNIC number.");
        return;
    }

    try {
        const updatedData = {
            Cnic: cnicValue,
            Name: nameInput.value,
            Fname: fname.value,
            Dob: dob.value,
            Phone: phone.value,
            Caddres: caddres.value,
            Paddres: paddres.value,
            Qual: qual.value,
        };

        // Update image URL if a new image is uploaded
        const file = imageUpload.files[0];
        if (file) {
            const storageReference = storageRef(storage, `images/${file.name}`);
            const snapshot = await uploadBytes(storageReference, file);
            const url = await getDownloadURL(snapshot.ref);
            updatedData.ImageUrl = url; // Update image URL
        }

        await update(ref(db, `resContainer5/${cnicValue}`), updatedData);
        alert("Data updated successfully.");
        fetchAndDisplayCards(); // Refresh cards display
    } catch (error) {
        console.error("Error updating data:", error);
        alert("Error updating data: " + error.message);
    }
});

// Function to delete data from the database
deleteBtn.addEventListener('click', async () => {
    const cnicValue = cnic.value;
    if (!cnicValue) {
        alert("Please enter a CNIC number.");
        return;
    }

    try {
        await remove(ref(db, `resContainer5/${cnicValue}`));
        alert("Data deleted successfully.");
        clearForm(); // Clear the form after deletion
        fetchAndDisplayCards(); // Refresh cards display
    } catch (error) {
        console.error("Error deleting data:", error);
        alert("Error deleting data: " + error.message);
    }
});

// Function to clear the form
function clearForm() {
    cnic.value = '';
    nameInput.value = '';
    fname.value = '';
    dob.value = '';
    phone.value = '';
    caddres.value = '';
    paddres.value = '';
    qual.value = '';
    imageUpload.value = ''; // Reset the file input
    imagePreview.src = ''; // Reset the image preview
}

// Initial call to fetch and display cards on page load
fetchAndDisplayCards();
