import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzkVHHTpCFYiede77faaonqDiiV5S2C18",
    authDomain: "anas-nidir.firebaseapp.com",
    projectId: "anas-nidir",
    storageBucket: "anas-nidir.firebasestorage.app",
    messagingSenderId: "351701049742",
    appId: "1:351701049742:web:4faa788e224e e52afe84df"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

addDoc(collection(db, 'creovate_projects'), {
    test: true,
    createdAt: serverTimestamp()
}).then(doc => {
  console.log('written', doc.id);
  process.exit(0);
}).catch(err => {
  console.error("ERROR", err.message);
  process.exit(1);
});
