import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from 'firebase/auth';



const firebaseConfig = {
     apiKey: "AIzaSyDVBMFNhddktlT4Bdke3SRj-aSIMCcVqks",
     authDomain: "reacjs-52a16.firebaseapp.com",
     projectId: "reacjs-52a16",
     storageBucket: "reacjs-52a16.appspot.com",
     messagingSenderId: "851976555461",
     appId: "1:851976555461:web:109ba6a5e5fceb2ba199ac",
     measurementId: "G-JJGTW3XK8R"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };


