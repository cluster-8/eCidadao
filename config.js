// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdllnqCUU0lOd3NuLY_9-9U6_dF8CcVaU',
  authDomain: 'images-ecidadao.firebaseapp.com',
  projectId: 'images-ecidadao',
  storageBucket: 'images-ecidadao.appspot.com',
  messagingSenderId: '541186239839',
  appId: '1:541186239839:web:62ddab9a6fc79d6aa49aea',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
