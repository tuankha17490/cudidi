import firebase from 'firebase'

// copy the config from the console https://console.firebase.google.com/u/0/project/sign-11111/settings/general/
var firebaseConfig = {
  apiKey: "AIzaSyAYcW7KpvI4MkyvspXFff_zMakdsBLUtDU",
  authDomain: "cudidi.firebaseapp.com",
  databaseURL: "https://cudidi.firebaseio.com",
  projectId: "cudidi",
  storageBucket: "cudidi.appspot.com",
  messagingSenderId: "212695609036",
  appId: "1:212695609036:web:d2d953b37f223d352d1c69",
  measurementId: "G-YNCBE2Q75M"
};
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', firebase)
}
