window.Coding = (function(){
  function init(){
    const demo = '<h1 style="font-family:system-ui">Hello NEX</h1>\n<p>Edit kod ini dan tekan Run.</p>\n<style>body{padding:16px;font:16px/1.4 system-ui}</style>';
    const ta = document.getElementById('code');
    if(ta && !ta.value) ta.value = demo;
    preview();
  }
  function preview(){
    const code = document.getElementById('code').value;
    const frame = document.getElementById('frame');
    frame.srcdoc = code;
  }
  function sendToPages(){
    const code = document.getElementById('code').value;
    sessionStorage.setItem('nex_buffer_code', code);
    alert('Code sent to Pages form.');
    location.href = '../pages/pages.html';
  }
  return { init, preview, sendToPages };
})();