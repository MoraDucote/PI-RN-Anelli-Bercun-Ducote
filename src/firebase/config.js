import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBevKA6aUnAgOJxUoDt_ekk_0t15jYa6aQ",
  authDomain: "rn-anelli-bercun-ducote.firebaseapp.com",
  projectId: "rn-anelli-bercun-ducote",
  storageBucket: "rn-anelli-bercun-ducote.firebasestorage.app",
  messagingSenderId: "410995341202",
  appId: "1:410995341202:web:147b5a3a46b037119a734b"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()