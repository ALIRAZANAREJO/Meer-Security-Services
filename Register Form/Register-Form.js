import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase,ref,get,set,child,update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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

// const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage(app);


var citybox  = document.getElementById("Citybox");
var coursebox = document.getElementById("Coursebox");
var namebox = document.getElementById("Namebox");
var fnamebox  = document.getElementById("Fnamebox");
var emailbox = document.getElementById("Emailbox");
var fcnicbox = document.getElementById("Fcnicbox");
var pnumberbox = document.getElementById("Pnumberbox");
var genbox = document.getElementById("Genbox");
var cnicbox = document.getElementById("Cnicbox");
var addressbox = document.getElementById("Addressbox");
var datebox = document.getElementById("Datebox");
var qualbox = document.getElementById("Qualbox");



var insBtn = document.getElementById("Insbtn");
var SelBtn = document.getElementById("Selbtn");
var UpdBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

function InsertData() {
  set(ref(db, "TheStudents/" + cnicbox.value), {
      City: citybox.value,
      NameofStd: namebox.value,
      Email: emailbox.value,
      Phone: pnumberbox.value,
      Date_of_Birth: datebox.value,
      Course: coursebox.value,
      Father: fnamebox.value,
      f_CNIC: fcnicbox.value,
      Gender: genbox.value,
      Address: addressbox.value,
      Qualification: qualbox.value,
      Cnic: cnicbox.value 
      
  })
  .then(() => {
      alert("Data Stored Successfully");
  })
  .catch((error) => {
      alert("Unsuccessful, error: " + error);
  });
}



const dbRef = ref(getDatabase());

function SelectData() {
  const dbref = ref(db);

  get(child(dbref, "TheStudents/" + cnicbox.value)).then((snapshot) => {
      if (snapshot.exists()) {
          citybox.value = snapshot.val().City;
          namebox.value = snapshot.val().NameofStd;
          emailbox.value = snapshot.val().Email;
          pnumberbox.value = snapshot.val().Phone;
          cnicbox.value = snapshot.val().Cnic; // Retrieve CNIC using the key 'Cnic'
          datebox.value = snapshot.val().Date_of_Birth; 
          coursebox.value = snapshot.val().Course;
          fnamebox.value = snapshot.val().Father;
          fcnicbox.value = snapshot.val().f_CNIC;
          genbox.value = snapshot.val().Gender;
          addressbox.value = snapshot.val().Address;
          qualbox.value = snapshot.val().Qualification;
      } else {
          alert("No Data Found");
      }
  })
  .catch((error) => {
      alert("Unsuccessful, error: " + error);
  });
}




function UpdateData(){
  update(ref(db,"TheStudents/"+cnicbox.value),{
    City : citybox .value,
    NameofStd : namebox.value,
    Phone :pnumberbox.value,
    Email :emailbox.value,
    Date_of_Birth : datebox.value,
    Course :coursebox.value,
    Father : fnamebox.value,
    f_CNIC :fcnicbox.value,
    Gender : genbox.value,
    Address : addressbox.value,
    Qualification :qualbox.value
  })
  .then(()=>{
      alert("Data Update Successfully");
  })
  .catch((error)=>{
      alert("Unsuccessfully,error"+error);
  });
}



function DeleteData(){
  remove(ref(db,"TheStudents/"+cnicbox.value))
  .then(()=>{
      alert("Data remove Successfully");
  })
  .catch((error)=>{
      alert("unsuccessfully,error"+error);
  })
}







insBtn.onclick('click',InsertData);
SelBtn.onclick('click',SelectData);
UpdBtn.onclick('click',UpdateData);
delBtn.onclick('click',DeleteData);




