// src/config/firebase.js
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBiLk5uT-l-Aue4TFC1fjzHWRYaGQJIMBw',
  authDomain: 'ezotask-c3947.firebaseapp.com',
  projectId: 'ezotask-c3947',
  storageBucket: 'ezotask-c3947.appspot.com',
  messagingSenderId: '1078787451075',
  appId: '1:1078787451075:web:9cb93ac316112d2ddcda76',
};

const app = initializeApp(firebaseConfig);

export { app, auth };
