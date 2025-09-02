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
const resContainer = document.getElementById('resContainer3');

// Function to fetch and display all data
function fetchAndDisplayData() {
    const dbRef = ref(db, "resContainer3");
    onValue(dbRef, (snapshot) => {
        resContainer.innerHTML = ""; // Clear existing data
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            displayData(childSnapshot.key, data); // Use the key as the ID
        });
    });
}

// Function to display data directly
function displayData(id,  { Myidno, Myname, Ali, Mypno, Sdeparea, Equipmentreq, Selwapen, Mycity, Selgcat, Optionalinf,Ssw,Wtg,Militry,Ss,Tc,Cctv,Other,}) {
    const dataDiv = document.createElement('div');
    dataDiv.className = 'data-container';
    dataDiv.setAttribute('data-id', id);

        
    dataDiv.innerHTML = `
    <div class="Apply-Form">
        <h3>Event-Security-Booking</h3>
    
     <div class="input-container">
            <div class="input-wrapper">
                <input type="text" id="Fname" placeholder="" value="${Myname}" required>
                <label for="Fname">Clint-Name</label>
            </div>


                        <div class="input-wrapper">
                <input type="text" id="Caddres" placeholder=" " value="${Ali}" required>
                <label for="Caddres">Email</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="Cnic" placeholder=" " value="${Myidno}" required>
                <label for="Cnic">CNIC-No</label>
            </div>    
            <div class="input-wrapper">
                <input type="number" id="Phone" placeholder=" " value="${Mypno}" required>
                <label for="Phone">Phone-No</label>
            </div>

            <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Mycity}" required>
                    <label for="Qual">City</label>
                </div>
    
            <div class="input-wrapper">
                <input type="text" id="Paddres" placeholder=" " value="${Sdeparea}" required>
                <label for="Paddres">Deployment Area</label>
            </div>

                 <div class="input-wrapper">
                <input type="text" id="Dob" placeholder=" " value="${Selgcat}" required>
                <label for="Dob">Securtiy Category</label>
            </div>
    
            <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Equipmentreq}" required>
                <label for="Qual">Equipment Req</label>
            </div>
          <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Selwapen}" required>
                    <label for="Qual">Weapon Type</label>
                </div>

                
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Ssw}" required>
                    <label for="Qual">Special Security Wing(SSW)</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Wtg}" required>
                    <label for="Qual">Walk Thr Gate</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Militry}" required>
                    <label for="Qual">Ex-Army Man</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Ss}" required>
                    <label for="Qual">Security Sup</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Tc}" required>
                    <label for="Qual">Trained Civilian</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Cctv}" required>
                    <label for="Qual">CCTV Operator</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Other}" required>
                    <label for="Qual">Others</label>
                </div>

                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Optionalinf}" required>
                    <label for="Qual">Another Demond</label>
                </div>           
            </div>
    <select style="display: none;" id="containerSelect3">
        <option style="display: none;" value="resContainer3">resContainer3</option>
    </select>
    <button class="sbbt" onclick="acceptRequest('${id}')">Accept Booking</button>
    
    
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
        const dbRef = ref(db, `resContainer3/${id}`);
    
        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const clientData = snapshot.val();
    
                    // Check if Email exists in data
                    if (!clientData.Ali) {
                        alert("❌ No email found for this client!");
                        return;
                    }
    
                    // Send confirmation email
                    sendEmailToClient(clientData.Ali, clientData.Myname);
    
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
    function sendEmailToClient(clientAli, clientMyname) {
        fetch("https://formsubmit.co/ajax/" + clientAli, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                From: "Meer-Security_Services-pvt(LTD)"|| "Meer-Security_Services-pvt(LTD)",
                Message: `Dear ${clientMyname|| "Sir"},\n\nWe are pleased to inform you that your request has been successfully accepted.\n\nOur team will arrange and provide the requested service within the next 2 hours.\n\nWe sincerely thank you for choosing Meer Security Services and placing your trust in us.\n\nIt's our pleasure to serve you.\n\nBest Regards,\nMeer Security Services`
            })
        })
        .then(response => response.json())
        .then(data => console.log("✅ Email sent successfully:", data))
        .catch(error => console.error("❌ Email error:", error));
    }
    