<!-- Firebase Config -->
<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyCzkVHHTpCFYiede77faaonqDiiV5S2C18",
    authDomain: "anas-nidir.firebaseapp.com",
    projectId: "anas-nidir",
    storageBucket: "anas-nidir.firebasestorage.app",
    messagingSenderId: "351701049742",
    appId: "1:351701049742:web:4faa788e224e e52afe84df",
    measurementId: "G-V2T9JZT2WX"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
</script>