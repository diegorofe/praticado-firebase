import firebase from "firebase";
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAEScKd9Rb4LQAYfu9aOVzLM_YTWifLB1Q",
    authDomain: "cursoapp-f2ff1.firebaseapp.com",
    projectId: "cursoapp-f2ff1",
    storageBucket: "cursoapp-f2ff1.appspot.com",
    messagingSenderId: "103968206186",
    appId: "1:103968206186:web:2526caf9d9ab1cf3c88913",
    measurementId: "G-RT22KQPRL2"
  };
  
  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
  // abre uma conexção com o fire
 