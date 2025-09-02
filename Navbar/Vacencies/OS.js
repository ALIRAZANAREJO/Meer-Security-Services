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
const lisnt = document.getElementById('Lisnt');
const rarmy = document.getElementById('Rarmy');
const citybox = document.getElementById('Citybox');
const imageUpload = document.getElementById('ImageUpload');
const imagePreview = document.getElementById('image-preview');
const pdfUpload = document.getElementById('pdfUpload');
const pdfFileNameDisplay = document.getElementById('pdfFileNameDisplay');
const submitBtn = document.getElementById('submitBtn');
const recallBtn = document.getElementById('recallBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const resContainer8 = document.getElementById('resContainer8');

// Add event listener to the image preview circle
imagePreview.addEventListener('click', () => {
    imageUpload.click(); // Trigger the file input click
});

// Add event listener to the file input for image
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

// Add event listener to the file input for PDF
pdfUpload.addEventListener('change', () => {
    const file = pdfUpload.files[0];
    if (file) {
        pdfFileNameDisplay.textContent = file.name; // Display the PDF file name
    }
});

// Function to handle data submission
submitBtn.addEventListener('click', async () => {
    const imageFile = imageUpload.files[0];
    const pdfFile = pdfUpload.files[0];
    
    if (!imageFile) {
        alert("Please select an image to upload.");
        return;
    }

    try {
        // Upload image to Firebase Storage
        const imageStorageReference = storageRef(storage, `images/${imageFile.name}`);
        const imageSnapshot = await uploadBytes(imageStorageReference, imageFile);
        const imageUrl = await getDownloadURL(imageSnapshot.ref);

        // Upload PDF to Firebase Storage if selected
        let pdfUrl = '';
        if (pdfFile) {
            const pdfStorageReference = storageRef(storage, `pdfs/${pdfFile.name}`);
            const pdfSnapshot = await uploadBytes(pdfStorageReference, pdfFile);
            pdfUrl = await getDownloadURL(pdfSnapshot.ref);
        }

        // Store data in Firestore
        const newCnicRef = ref(db, `resContainer8/${cnic.value}`);
        await set(newCnicRef, {
            Cnic: cnic.value,
            Name: nameInput.value,
            Fname: fname.value,
            Dob: dob.value,
            Phone: phone.value,
            Caddres: caddres.value,
            Paddres: paddres.value,
            Qual: qual.value,
            Lisnt: lisnt.value,
            Rarmy: rarmy.value,
            Citybox: citybox.value,
            ImageUrl: imageUrl, // Storing the image URL
            PdfUrl: pdfUrl // Storing the PDF URL
        });

        clearForm();
        alert("Data Stored Successfully");
        fetchAndDisplayCards(); // Refresh cards display
    } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files: " + error.message);
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
        const snapshot = await get(child(ref(db), `resContainer8/${cnicValue}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            nameInput.value = data.Name;
            fname.value = data.Fname;
            dob.value = data.Dob;
            phone.value = data.Phone;
            caddres.value = data.Caddres;
            paddres.value = data.Paddres;
            qual.value = data.Qual;
            lisnt.value = data.Lisnt;
            rarmy.value = data.Rarmy;
            citybox.value = data.Citybox;
            const imageUrl = data.ImageUrl;
            imagePreview.src = imageUrl; // Update the image preview

            // Display PDF file name if available
            if (data.PdfUrl) {
                pdfFileNameDisplay.textContent = "PDF: " + data.PdfUrl.split('/').pop(); // Extract the file name
            } else {
                pdfFileNameDisplay.textContent = "No PDF uploaded.";
            }
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
    const dbRef = ref(db, "resContainer8");
    onValue(dbRef, (snapshot) => {
        resContainer8.innerHTML = ""; // Clear existing cards
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            createCard(childSnapshot.key, data);
        });
    });
}

// Function to create a card to display the data
function createCard(id, { Cnic, Name, Dob, Fname, Phone, Caddres, Paddres, Qual, ImageUrl, PdfUrl,Lisnt,Rarmy,Citybox }) {
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
        ${PdfUrl ? `<p>PDF: <a href="${PdfUrl}" target="_blank">Download</a></p>` : ""}
        <button class="select-btn" data-cnic="${Cnic}">Select</button>
         <p>List: ${Lisnt}</p>
        <p>Rarmy: ${Rarmy}</p>
        <p>City: ${Citybox}</p>
       </div>`;

    
    resContainer8.appendChild(card); // Append to the results container

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
            Lisnt: lisnt.value,
            Rarmy: rarmy.value,
            Citybox: citybox.value,
        };

        // Update image URL if a new image is uploaded
        const imageFile = imageUpload.files[0];
        if (imageFile) {
            const imageStorageReference = storageRef(storage, `images/${imageFile.name}`);
            const imageSnapshot = await uploadBytes(imageStorageReference, imageFile);
            const imageUrl = await getDownloadURL(imageSnapshot.ref);
            updatedData.ImageUrl = imageUrl; // Update image URL
        }

        // Update PDF URL if a new PDF is uploaded
        const pdfFile = pdfUpload.files[0];
        if (pdfFile) {
            const pdfStorageReference = storageRef(storage, `pdfs/${pdfFile.name}`);
            const pdfSnapshot = await uploadBytes(pdfStorageReference, pdfFile);
            const pdfUrl = await getDownloadURL(pdfSnapshot.ref);
            updatedData.PdfUrl = pdfUrl; // Update PDF URL
        }

        await update(ref(db, `resContainer8/${cnicValue}`), updatedData);
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
        await remove(ref(db, `resContainer8/${cnicValue}`));
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
    pdfUpload.value = ''; // Reset the PDF input
    pdfFileNameDisplay.textContent = ''; // Reset the PDF file name display
}

// Initial call to fetch and display cards on page load
fetchAndDisplayCards();
