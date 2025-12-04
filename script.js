// Firebase initialization + real-time sync
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZu2O_dZG3NrbMNesHcVL6Mc2tm-JT0hQ",
  authDomain: "sample-b492e.firebaseapp.com",
  databaseURL: "https://sample-b492e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sample-b492e",
  storageBucket: "sample-b492e.firebasestorage.app",
  messagingSenderId: "228031625953",
  appId: "1:228031625953:web:9494c5a0511229813f15a0",
  measurementId: "G-N3Q5VT83M7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Example: write attendance
export function saveAttendance(name, status) {
  const entry = push(ref(db, "attendance"));
  set(entry, {
    name,
    status,
    timestamp: Date.now()
  });
}

// Example: listen for updates
onValue(ref(db, "attendance"), (snapshot) => {
  const data = snapshot.val();
  console.log("Realtime Attendance:", data);
});
