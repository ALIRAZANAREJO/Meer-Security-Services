// Accept Request Function
window.acceptRequest = function (id, containerId) {
    const dbRef = ref(db, `${containerId}/${id}`);

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const clientData = snapshot.val();

            if (!clientData.Email) {
                alert("❌ No email found for this client!");
                return;
            }

            // Send confirmation email
            sendEmailToClient(clientData.Email, clientData.Name);

            // Show success popup
            const popup = document.createElement("div");
            popup.innerText = "✅ Client request accepted. Email sent!";
            popup.style.position = "fixed";
            popup.style.bottom = "20px";
            popup.style.right = "20px";
            popup.style.background = "#28a745";
            popup.style.color = "#fff";
            popup.style.padding = "12px 18px";
            popup.style.borderRadius = "8px";
            popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
            document.body.appendChild(popup);

            setTimeout(() => popup.remove(), 3000);
        } else {
            alert("❌ No client data found!");
        }
    }).catch((error) => {
        console.error(error);
        alert("❌ Error fetching client data.");
    });
};

// Function: Send Email to Client
function sendEmailToClient(clientEmail, clientName) {
    fetch("https://formsubmit.co/ajax/" + clientEmail, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            message: `Dear ${clientName},\n\nWe are pleased to inform you that your request has been successfully accepted.\n\nOur team will arrange and provide the requested service within the next 2 hours.\n\nWe sincerely thank you for choosing Meer Security Services and placing your trust in us.\n\nIt's our pleasure to serve you.\n\nBest Regards,\nMeer Security Services`
        })
    })
    .then(response => response.json())
    .then(data => console.log("✅ Email sent successfully:", data))
    .catch(error => console.error("❌ Email error:", error));
}
