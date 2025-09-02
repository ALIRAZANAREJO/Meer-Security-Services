// ================= Firebase Config =================
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ================= Elements =================
const authModal = document.getElementById("authModal");
const authPhoto = document.getElementById("authPhoto");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authContinue = document.getElementById("authContinue");
const authFirstName = document.getElementById("authFirstName");
const closeBtn = document.querySelector(".auth-close");
const authProgress = document.getElementById("authProgress");
const userGmail = document.getElementById("user-gmail");
const userProfileImg = document.getElementById("user-profile-img");
const authCard = document.querySelector(".auth-card");

// Optional: Profile button (if you add it later)
const profileBtn = document.getElementById("user-profile-btn");

// ================= Variables =================
let currentUser = null;
let loggedIn = false;

// ================= Auth State Change =================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loggedIn = true;

    // Save user info in localStorage
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.displayName || "");
    localStorage.setItem("userPhoto", user.photoURL || "");

    updateUI(user);
  } else {
    currentUser = null;
    loggedIn = false;

    // Clear localStorage when logged out
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");

    updateUI(null);
  }
});

// ================= Update UI =================
function updateUI(user) {
  if (user) {
    const name = user.displayName || user.email.split("@")[0] || "User";

    // Update popup details
    authPhoto.src = user.photoURL || "";
    authName.textContent = name;
    authEmail.textContent = user.email;
    authFirstName.textContent = name.split(" ")[0];
    authContinue.textContent = `Continue as ${name}`;
    authContinue.style.display = "none";

    // Show Gmail + Profile in Navbar
    if (userGmail) userGmail.textContent = user.email;
    if (userProfileImg) {
      userProfileImg.src = user.photoURL || "";
      userProfileImg.style.display = "inline-block";
    }

    // ❌ REMOVE automatic popup on login
    // We won't show the popup here anymore!
  } else {
    // Reset everything when signed out
    authPhoto.src = "";
    authName.textContent = "Sign in with Google";
    authEmail.textContent = "";
    authFirstName.textContent = "User";
    authContinue.style.display = "block";

    if (userGmail) userGmail.textContent = "";
    if (userProfileImg) {
      userProfileImg.src = "";
      userProfileImg.style.display = "none";
    }
  }
}

// ================= Show Modal =================
function showModal() {
  authModal.style.display = "flex";
  authCard.classList.remove("hide");
}

// ================= Hide Modal =================
function hideModal() {
  authCard.classList.add("hide");
  setTimeout(() => {
    authModal.style.display = "none";
  }, 300);
}

// ================= Link Interception =================
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const targetHref = this.getAttribute("href");

    if (!loggedIn) {
      e.preventDefault();
      showModal();

      // On continue, sign in and redirect
      authContinue.onclick = () => {
        startProgress();

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
          .then(result => {
            currentUser = result.user;
            loggedIn = true;

            localStorage.setItem("userEmail", currentUser.email);
            localStorage.setItem("userName", currentUser.displayName || "");
            localStorage.setItem("userPhoto", currentUser.photoURL || "");

            stopProgress();
            hideModal();
            window.location.href = targetHref;
          })
          .catch(err => {
            console.error("Sign-in error:", err);
            stopProgress();
          });
      };
    }
  });
});

// ================= Progress Bar =================
function startProgress() {
  authProgress.style.width = "0%";
  setTimeout(() => {
    authProgress.style.width = "100%";
  }, 50);
}

function stopProgress() {
  authProgress.style.width = "0%";
}

// ================= Profile Button =================
profileBtn?.addEventListener("click", () => {
  showModal();
  authContinue.style.display = "none"; // Hide continue button when already logged in
});

// ================= Close Events =================
closeBtn?.addEventListener("click", hideModal);
window.addEventListener("click", (e) => {
  if (e.target === authModal) hideModal();
});
