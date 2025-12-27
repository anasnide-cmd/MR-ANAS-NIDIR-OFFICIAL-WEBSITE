document.getElementById("loginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(async (res) => {
    const user = res.user;
    const ref = db.collection("users").doc(user.uid);
    const docSnap = await ref.get();
    if (!docSnap.exists) {
      await ref.set({
        email: user.email,
        username: user.displayName.split(" ")[0].toLowerCase(),
        createdAt: Date.now()
      });
    }
    window.location = "dashboard.html";
  });
});