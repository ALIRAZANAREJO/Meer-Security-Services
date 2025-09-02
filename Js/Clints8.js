import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase,get, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const resContainer = document.getElementById('resContainer8');

// Function to fetch and display all data
function fetchAndDisplayData() {
    const dbRef = ref(db, "resContainer8");
    onValue(dbRef, (snapshot) => {
        resContainer.innerHTML = ""; // Clear existing data
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            displayData(childSnapshot.key, data); // Use the key as the ID
        });
    });
}

// Function to display data directly
function displayData(id, { Cnic, Name, Dob, Fname, Phone, Caddres, Paddres, Qual, ImageUrl ,Rarmy,Lisnt,Citybox,pdfUrl}) {
    const dataDiv = document.createElement('div');
    dataDiv.className = 'data-container';
    dataDiv.setAttribute('data-id', id);
    
    dataDiv.innerHTML = `
     <div class="Apply-Form">
            <div class="image-upload-container">
              <label for="ImageUpload"></label>
              <input type="file" id="ImageUpload" style="display: none;" />
              <div class="image-upload-circle">
                <img class="profile" id="image-preview" src="${ImageUrl}" alt="........Please Upload Your Profile Pic">
              </div>
              </div>
        <h3>Operation-Sup-Application</h3>
    
     <div class="input-container">
            <div class="input-wrapper">
                <input type="text" id="Fname" placeholder="" value="${Name}" required>
                <label for="Fname">Enter Name</label>
            </div>
    
            <div class="input-wrapper">
                <input type="text" id="Fname2" placeholder=" " value="${Fname}" required>
                <label for="Fname2">Father Name</label>
            </div>

        <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Lisnt}" required>
                <label for="Qual">Email</label>
            </div>


            <div class="input-wrapper">
                <input type="number" id="Cnic" placeholder=" " value="${Cnic}" required>
                <label for="Cnic">CNIC-No</label>
            </div>
    
            <div class="input-wrapper">
                <input type="number" id="Phone" placeholder=" " value="${Phone}" required>
                <label for="Phone">Phone-No</label>
            </div>

            <div class="input-wrapper">
                <input type="date" id="Dob" placeholder=" " value="${Dob}" required>
                <label for="Dob">Date Of Birth</label>
            </div>
        
            <div class="input-wrapper">
                <input type="text" id="Caddres" placeholder=" " value="${Caddres}" required>
                <label for="Caddres">Current Address</label>
            </div>
    
            <div class="input-wrapper">
                <input type="text" id="Paddres" placeholder=" " value="${Paddres}" required>
                <label for="Paddres">Permanent Address</label>
            </div>
    
            <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Qual}" required>
                <label for="Qual">Qualification</label>
            </div>

            <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Rarmy}" required>
                <label for="Qual">Civil Or Ex-Armed-Force</label>
            </div>
            <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Citybox}" required>
                <label for="Qual">City</label>
            </div>
             <div style="margin-top: 10px; display: flex; gap: 10px; justify-content: center;">
                ${pdfUrl && pdfUrl.trim() !== "" 
                    ? `<button class="pdf-btn" onclick="window.open('${pdfUrl}', '_blank')">📄 View CV</button>` 
                    : `<button class="pdf-btn" disabled>No CV</button>`}
            </div>
            </div>
    
    
    <select style="display: none;" id="containerSelect7">
        <option style="display: none;" value="resContainer7">resContainer7</option>
       
    </select>
    
    <button class="sbbt" onclick="acceptRequest('${id}')">Accept Application</button>
    
    
        </div>
        `;
        // Append the data to the container
        resContainer.appendChild(dataDiv);
    }
    
    // Call fetchAndDisplayData on page load
    window.addEventListener('DOMContentLoaded', () => {
        fetchAndDisplayData(); // Fetch data on page load
    });
    
    
    
    
    // Accept Request Function
    window.acceptRequest = function (id) {
        // Correct path to your database folder + client ID
        const dbRef = ref(db, `resContainer8/${id}`);
    
        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const clientData = snapshot.val();
    
                    // Check if Email exists in data
                    if (!clientData.Lisnt) {
                        alert("❌ No email found for this client!");
                        return;
                    }
    
                    // Send confirmation email
                    sendEmailToClient(clientData.Lisnt, clientData.Name);
    
                    // Show success popup
                    const popup = document.createElement("div");
                    popup.innerText = "✅ Client request accepted.Email Sent To Clint Successfully";
                    popup.style.position = "fixed";
                    popup.style.bottom = "20px";
                    popup.style.right = "20px";
                    popup.style.background = "#0031f6ff";
                    popup.style.color = "#fff";
                    popup.style.padding = "12px 18px";
                    popup.style.borderRadius = "8px";
                    popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
                    popup.style.zIndex = "9999";
                    document.body.appendChild(popup);
    
                    setTimeout(() => popup.remove(), 3000);
    
                } else {
                    alert(`❌ No client data found for ID: ${id}`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert("❌ Error fetching client data.");
            });
    };
    
    // Function: Send Email to Client
    function sendEmailToClient(clientLisnt, clientName) {
        fetch("https://formsubmit.co/ajax/" + clientLisnt, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
               From: "Meer-Security_Services-pvt(LTD)"|| "Meer-Security_Services-pvt(LTD)",
Message: `Dear ${clientName || "Candidate"},\n\nWe are pleased to inform you that you have been shortlisted for an interview at **Meer Security Services Pvt. Ltd.**\n\nYour interview is scheduled for **tomorrow**. Please bring your **original CNIC, educational certificates, and any relevant experience documents** along with a recent passport-size photograph.\n\nVenue: Meer Security Services Pvt. Ltd. [Head Office: 2nd Floor, Plot No: 42-C, 10m Commercial Street, Badar Commercial,
Phase 5, Defence Housing Authority Karachi.]\nInterview: [Tomorrow]\nTime: [10.00 AM]\n\nWe appreciate your interest in joining our team and look forward to meeting you.\n\nBest Regards,\nMeer Security Services Pvt. Ltd.`
        })
        })
        .then(response => response.json())
        .then(data => console.log("✅ Email sent successfully:", data))
        .catch(error => console.error("❌ Email error:", error));
    }
    