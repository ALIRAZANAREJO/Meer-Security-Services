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

// Function to count total items in multiple containers
function countTotalItems() {
    const containers = ['resContainer1', 'resContainer2', 'resContainer3', 'resContainer4'];
    let totalItemCount = 0;

    containers.forEach(container => {
        const dbRef = ref(db, container);
        onValue(dbRef, (snapshot) => {
            let itemCount = 0;
            snapshot.forEach(() => {
                itemCount++; // Increment count for each child
            });
            totalItemCount += itemCount; // Add to total count
            autoCountTo(totalItemCount); // Start auto counting
        });
    });
}

// Function to auto count to the target number
function autoCountTo(target) {
    let count = 0;
    const duration = 2000; // Duration of the counting effect in milliseconds
    const incrementTime = 50; // Time between increments in milliseconds
    const steps = duration / incrementTime; // Total steps to reach the target
    const increment = Math.ceil(target / steps); // Increment value for each step

    const countingInterval = setInterval(() => {
        count += increment; // Increment the count
        if (count >= target) {
            count = target; // Ensure it doesn't exceed the target
            clearInterval(countingInterval); // Stop the counting
        }
        document.getElementById('clintsCount').textContent = `${count}`;
    }, incrementTime);
}

// Call the function to count items when the script loads
countTotalItems();
