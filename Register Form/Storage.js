import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvFB82TeK-CZhpPwLuuj3V5FfXDpsW9B0",
  authDomain: "sign-up-and-in-7a325.firebaseapp.com",
  databaseURL: "https://sign-up-and-in-7a325-default-rtdb.firebaseio.com",
  projectId: "sign-up-and-in-7a325",
  storageBucket: "sign-up-and-in-7a325.appspot.com",
  messagingSenderId: "184191318961",
  appId: "1:184191318961:web:7eb3d6282a90282e34db90",
  measurementId: "G-SRMHJDFEDM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload image
async function uploadImage() {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  const storagePath = storageRef(storage, `im/${file.name}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storagePath, file);
    console.log('Uploaded a file!', snapshot);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    alert("Image uploaded successfully! URL: " + downloadURL);
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Upload failed: " + error.message);
  }
}

// Attach event listener to the button
document.getElementById('uploadButton').addEventListener('click', uploadImage);
