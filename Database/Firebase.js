import {initializeApp} from "firebase/app"
import {getDatabase,set,ref} from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyC3_E5Md5_sq0bL2skwFqLMYh8aufDK47M",
  authDomain: "notificycle.firebaseapp.com",
  projectId: "notificycle",
  storageBucket: "notificycle.appspot.com",
  messagingSenderId: "602762064545",
  appId: "1:602762064545:web:bee45189f421f2ffd4b6e0",
  measurementId: "G-M62M5LQPQS",
  databaseURL:"https://notificycle-default-rtdb.asia-southeast1.firebasedatabase.app/"
  
};
  // Initialize Firebase
  
  const firebase = initializeApp(firebaseConfig);
  const db = getDatabase(firebase);
  
export {set,ref,db};

