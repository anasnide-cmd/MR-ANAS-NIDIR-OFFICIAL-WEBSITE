import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzkVHHTpCFYiede77faaonqDiiV5S2C18",
    authDomain: "anas-nidir.firebaseapp.com",
    projectId: "anas-nidir",
    storageBucket: "anas-nidir.appspot.com",
    messagingSenderId: "351701049742",
    appId: "1:351701049742:web:4faa788e224e e52afe84df" 
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

console.log("Testing upload to:", firebaseConfig.storageBucket);

const storageRef = ref(storage, 'test_connection.txt');
uploadString(storageRef, 'Hello Firebase Storage!').then(() => {
    console.log("UPLOAD SUCCESS!");
    process.exit(0);
}).catch(err => {
    console.error("UPLOAD FAILED:", err.code, err.message);
    process.exit(1);
});
