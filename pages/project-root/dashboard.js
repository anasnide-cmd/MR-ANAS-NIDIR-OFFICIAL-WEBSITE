// Utility: slugify
function slugify(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let currentPageId = null;
let currentUsername = null;

auth.onAuthStateChanged(async (user) => {
  if (!user) { location.href = "index.html"; return; }

  const ref = db.collection("users").doc(user.uid);
  const snap = await ref.get();
  const data = snap.data() || {};
  currentUsername = data.username || ("user" + user.uid.slice(0, 6));

  // Papar username
  document.getElementById("username").innerText = currentUsername;

  // Update username (pastikan unik)
  document.getElementById("saveProfile").onclick = async () => {
    const newName = document.getElementById("usernameInput").value.trim().toLowerCase();
    if (!newName.match(/^[a-z0-9_]+$/)) { alert("Hanya huruf kecil, nombor, underscore."); return; }
    const exists = await db.collection("users").where("username", "==", newName).limit(1).get();
    if (!exists.empty && exists.docs[0].id !== user.uid) {
      alert("Username sudah digunakan.");
      return;
    }
    await ref.set({ username: newName }, { merge: true });
    currentUsername = newName;
    document.getElementById("username").innerText = newName;
    alert("Username updated!");
  };

  // Logout
  document.getElementById("logoutBtn").onclick = () => auth.signOut();

  // Pages CRUD
  const pagesRef = ref.collection("pages");
  const pagesList = document.getElementById("pagesList");

  // LIST
  pagesRef.orderBy("createdAt", "desc").onSnapshot((snap) => {
    pagesList.innerHTML = "";
    snap.forEach((doc) => {
      const p = doc.data();
      const div = document.createElement("div");
      const viewURL = `/u/${encodeURIComponent(currentUsername)}/${encodeURIComponent(p.slug || "")}`;
      div.innerHTML = `
        <b>${p.title || "(untitled)"}</b> 
        <span style="opacity:.6">/ ${p.slug || ""}</span>
        <span class="badge" style="margin-left:8px">${p.status || "draft"}</span>
        <div style="margin-top:6px">
          <a href="${viewURL}" target="_blank">View</a>
          <button onclick="editPage('${doc.id}')">Edit</button>
          <button onclick="deletePage('${doc.id}')">Delete</button>
        </div>
      `;
      pagesList.appendChild(div);
    });
  });

  // UI Editor (ringkas)
  const editor = document.getElementById("editor");
  const titleEl = document.getElementById("pageTitle");
  const contentEl = document.getElementById("pageContent");

  document.getElementById("newPageBtn").onclick = () => {
    currentPageId = null;
    titleEl.value = "";
    contentEl.value = "<h1>Hello</h1>";
    editor.classList.remove("hidden");
  };

  document.getElementById("savePage").onclick = async () => {
    const title = (titleEl.value || "").trim();
    const content = contentEl.value || "";
    const slug = slugify(title || "untitled");

    // pastikan slug unik dalam user
    const dupQ = await pagesRef.where("slug", "==", slug).get();
    if (!dupQ.empty && (!currentPageId || dupQ.docs[0].id !== currentPageId)) {
      alert("Slug sudah digunakan. Tukar tajuk atau edit slug manual (boleh tambah '-2').");
      return;
    }

    const payload = {
      title,
      content,
      slug,
      status: "published", // boleh tukar ke 'draft' jika perlu
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (currentPageId) {
      delete payload.createdAt;
      await pagesRef.doc(currentPageId).set(payload, { merge: true });
    } else {
      await pagesRef.add(payload);
    }
    editor.classList.add("hidden");
  };

  document.getElementById("cancelEdit").onclick = () => {
    editor.classList.add("hidden");
  };
});

// Global funcs dipanggil dari HTML list
async function editPage(id) {
  const user = auth.currentUser;
  if (!user) return;
  const ref = db.collection("users").doc(user.uid).collection("pages").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return;
  const p = doc.data();
  currentPageId = id;
  document.getElementById("editor").classList.remove("hidden");
  document.getElementById("pageTitle").value = p.title || "";
  document.getElementById("pageContent").value = p.content || "";
}

async function deletePage(id) {
  if (!confirm("Delete this page?")) return;
  const user = auth.currentUser;
  if (!user) return;
  await db.collection("users").doc(user.uid).collection("pages").doc(id).delete();
}