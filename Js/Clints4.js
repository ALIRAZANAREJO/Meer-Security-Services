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
const resContainer = document.getElementById('resContainer4');

// Function to fetch and display all data
function fetchAndDisplayData() {
    const dbRef = ref(db, "resContainer4");
    onValue(dbRef, (snapshot) => {
        resContainer.innerHTML = ""; // Clear existing data
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            displayData(childSnapshot.key, data); // Use the key as the ID
        });
    });
}

// Function to display data directly
function displayData(id,  { Cardno, Yentre, Gmail, Mobileno, Vhreq, Guardcat, Wopencat, Yourcity, Secgreq, Foji,Noogreq,Carsname,Fromdate,Todate}) {
    const dataDiv = document.createElement('div');
    dataDiv.className = 'data-container';
    dataDiv.setAttribute('data-id', id);


    dataDiv.innerHTML = `
    <div class="Apply-Form">
        <h3>Vehicle-Booking</h3>
    
     <div class="input-container">
            <div class="input-wrapper">
                <input type="text" id="Fname" placeholder="" value="${Yentre}" required>
                <label for="Fname">Clint-Name</label>
            </div>

            <div class="input-wrapper">
                <input type="text" id="Cnic" placeholder=" " value="${Gmail}" required>
                <label for="Cnic">Email</label>
            </div>
    
            <div class="input-wrapper">
                <input type="number" id="Phone" placeholder=" " value="${Mobileno}" required>
                <label for="Phone">Cont-No</label>
            </div>
    
            <div class="input-wrapper">
                <input type="text" id="Caddres" placeholder=" " value="${Cardno}" required>
                <label for="Caddres">NIC No</label>
            </div>
                        <div class="input-wrapper">
                <input type="text" id="Vhreq" placeholder=" " value="${Vhreq}" required>
                <label for="Dob">Type Of Vehicle</label>
            </div>
            <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Carsname}" required>
                    <label for="Qual">Vehicle Name</label>
                </div>
    
               <div class="input-wrapper">
                <input type="text" id="Qual" placeholder=" " value="${Secgreq}" required>
                <label for="Qual">No Of Vehicle Required</label>
            </div>

            <div class="input-wrapper">
                <input type="text" id="Paddres" placeholder=" " value="${Guardcat}" required>
                <label for="Paddres">Type Of Security</label>
            </div>
    
             <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Noogreq}" required>
                    <label for="Qual">No Of Guard Required </label>
                </div>

          <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Wopencat}" required>
                    <label for="Qual">Weapon Type</label>
                </div>

           <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Yourcity}" required>
                    <label for="Qual">City</label>
                </div>            
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Foji}" required>
                    <label for="Qual">Adress</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Fromdate}" required>
                    <label for="Qual">From Date</label>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="Qual" placeholder=" " value="${Todate}" required>
                    <label for="Qual">To Date</label>
                </div>
                
                
                
              
            </div>
    
    
    <select style="display: none;" id="containerSelect4">
        <option style="display: none;" value="resContainer4">resContainer4</option>
       
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
       const dbRef = ref(db, `resContainer4/${id}`);
   
       get(dbRef)
           .then((snapshot) => {
               if (snapshot.exists()) {
                   const clientData = snapshot.val();
   
                   // Check if Email exists in data
                   if (!clientData.Gmail) {
                       alert("❌ No email found for this client!");
                       return;
                   }
   
                   // Send confirmation email
                   sendEmailToClient(clientData.Gmail, clientData.Yentre);
   
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
   
                   setTimeout(() => popup.remove(),3000);
   
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
   function sendEmailToClient(clientGmail, clientYentre) {
       fetch("https://formsubmit.co/ajax/" + clientGmail, {
           method: "POST",
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           body: JSON.stringify({
               From: "Meer-Security_Services-pvt(LTD)"|| "Client",
               Message: `Dear ${clientYentre|| "Sir"},\n\nWe are pleased to inform you that your request has been successfully accepted.\n\nOur team will arrange Vehicle and provide the requested service within the next 2 hours.\n\nWe sincerely thank you for choosing Meer Security Services and placing your trust in us.\n\nIt's our pleasure to serve you.\n\nBest Regards,\nMeer Security Services`
           })
       })
       .then(response => response.json())
       .then(data => console.log("✅ Email sent successfully:", data))
       .catch(error => console.error("❌ Email error:", error));
   }
   