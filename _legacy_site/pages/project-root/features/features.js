window.Features = (function(){
  let html = '';
  function init(){
    const code = document.getElementById('code');
    if(code) code.value = '<section style="font:16px/1.5 system-ui;padding:24px">\n\n</section>';
    preview();
  }
  function addBlock(){
    const type = document.getElementById('blockSelect').value;
    let block = '';
    if(type==='text') block = '<h2>Section Title</h2>\n<p>Write something here…</p>';
    if(type==='image') block = '<img src="https://via.placeholder.com/800x400" alt="Image" style="max-width:100%;border-radius:12px">';
    if(type==='button') block = '<p><a href="#" style="display:inline-block;padding:10px 14px;background:#6b8afd;color:#fff;border-radius:10px;text-decoration:none">Click Me</a></p>';
    if(type==='hero') block = '<section style="padding:48px;text-align:center;background:linear-gradient(135deg,#1a2140,#0f1426);border-radius:16px">\n  <h1 style="margin:0 0 8px">Your Hero Title</h1>\n  <p class="muted" style="margin:0 0 16px">Short subtitle goes here.</p>\n  <a href="#" style="display:inline-block;padding:12px 16px;background:#6b8afd;color:#fff;border-radius:10px;text-decoration:none">Get Started</a>\n</section>';
    if(type==='contact') block = '<form onsubmit="alert(\'Demo only\');return false">\n  <div style="display:grid;gap:8px">\n    <input placeholder="Your Name" style="padding:10px;border-radius:10px;border:1px solid #ccc">\n    <input placeholder="Email" style="padding:10px;border-radius:10px;border:1px solid #ccc">\n    <textarea placeholder="Message" style="padding:10px;border-radius:10px;border:1px solid #ccc"></textarea>\n    <button style="padding:10px;border-radius:10px;background:#6b8afd;color:#fff;border:0">Send</button>\n  </div>\n</form>';
    const code = document.getElementById('code');
    code.value = code.value.replace(/\n<\/section>\s*$/,'\n  '+block+'\n</section>');
    preview();
  }
  function preview(){
    const code = document.getElementById('code').value;
    document.getElementById('frame').srcdoc = code;
  }
  function sendToPages(){
    const code = document.getElementById('code').value;
    sessionStorage.setItem('nex_buffer_code', code);
    alert('Layout dihantar ke Pages form.');
    location.href = '../pages/pages.html';
  }
  return { init, addBlock, preview, sendToPages };
})();