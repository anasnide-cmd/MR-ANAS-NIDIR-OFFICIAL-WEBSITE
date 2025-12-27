const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");
const id = params.get("id");

db.collection("users").doc(uid).collection("pages").doc(id).get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();
    document.getElementById("pageTitle").innerText = data.title;
    document.getElementById("pageContent").innerHTML = data.content;
  }
});