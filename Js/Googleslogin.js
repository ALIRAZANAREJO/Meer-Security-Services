// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyABmS9gvQF9OjgF2Aj3M5B3QjNW0DHIVmc",
  authDomain: "meer-security.firebaseapp.com",
  databaseURL: "https://meer-security-default-rtdb.firebaseio.com",
  projectId: "meer-security",
  storageBucket: "meer-security.firebasestorage.app",
  messagingSenderId: "335010941797",
  appId: "1:335010941797:web:ffc86d361cc03592bd2f8c",
  measurementId: "G-EJ9LS3CR57"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elements
const popup = document.getElementById("signin-popup");
const profileBtn = document.getElementById("user-profile-btn");
const googleBtn = document.getElementById("google-signin-btn");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupEmail = document.getElementById("popup-email");
const popupContinue = document.getElementById("popup-continue");
const closeBtn = document.getElementById("popup-close");

// User session
let currentUser = null;
let loggedIn = false;

// Clear localStorage on logout
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loggedIn = true;

    // Store the new user data
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userPhoto", user.photoURL);
  } else {
    // Clear user data on logout
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");
  }
});

// Utility: Show popup
function showPopup() {
  if (currentUser) {
    // Show the logged-in user's data in the popup
    popupImg.src = currentUser.photoURL || "";
    popupName.textContent = currentUser.displayName || "User";
    popupEmail.textContent = currentUser.email;
    popupContinue.textContent = Continue 
     ${currentUser.displayName};

    popupContinue.style.display = "none"; // Already logged in
  } else {
    // If no user, show sign-in button
    popupImg.src = "";
    popupName.textContent = "Sign in with Google";
    popupEmail.textContent = "";
    popupContinue.textContent = "Sign in with Google";
    popupContinue.style.display = "block";
  }
  popup.style.display = "block";
}

// Utility: Hide popup
function hidePopup() {
  popup.style.display = "none";
}

// Link Interception
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const targetHref = this.getAttribute("href");

    if (!loggedIn) {
      e.preventDefault();
      showPopup();

      // On continue, sign in and go
      popupContinue.onclick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(result => {
          currentUser = result.user;
          loggedIn = true;

          localStorage.setItem("userEmail", currentUser.email);
          localStorage.setItem("userName", currentUser.displayName);
          localStorage.setItem("userPhoto", currentUser.photoURL);

          hidePopup();
          window.location.href = targetHref;
        });
      };
    }
  });
});

// Profile Button
profileBtn?.addEventListener("click", () => {
  showPopup();
  popupContinue.style.display = "none"; // Don't show button again
});

// Google Sign-In button (for direct signin)
googleBtn?.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    currentUser = result.user;
    loggedIn = true;

    localStorage.setItem("userEmail", currentUser.email);
    localStorage.setItem("userName", currentUser.displayName);
    localStorage.setItem("userPhoto", currentUser.photoURL);

    hidePopup();
  });
});

// Close popup on click outside or red close button
closeBtn?.addEventListener("click", hidePopup);
window.addEventListener("click", (e) => {
  if (e.target === popup) hidePopup();
});
