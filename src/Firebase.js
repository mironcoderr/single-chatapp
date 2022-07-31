import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAQjrLFC39zhsvzT9cCyGSatJsX0-EN8xQ",
    authDomain: "mernadda-b8584.firebaseapp.com",
    databaseURL: "https://mernadda-b8584-default-rtdb.firebaseio.com/",
    projectId: "mernadda-b8584",
    storageBucket: "mernadda-b8584.appspot.com",
    messagingSenderId: "283064348139",
    appId: "1:283064348139:web:17ea7ba99b9e4f41317dae"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default firebaseConfig