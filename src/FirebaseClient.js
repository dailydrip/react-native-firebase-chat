const firebase = require('firebase')
import { API_KEY } from 'react-native-dotenv'

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "dailydrip-firebase-chat.firebaseapp.com",
  databaseURL: "https://dailydrip-firebase-chat.firebaseio.com",
  storageBucket: "dailydrip-firebase-chat.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
