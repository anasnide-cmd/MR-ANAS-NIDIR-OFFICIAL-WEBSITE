window.Contact = (function(){
  const KEY = 'nex_contact_requests';
  function load(){ try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(_){return []} }
  function save(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

  function init(){
    const u = App.getUser();
    document.getElementById('waLink').href = `https://wa.me/60123456789?text=${encodeURIComponent('Hi, saya '+(u?.username||'user')+' — perlukan bantuan NEX Services.')}`;
    document.getElementById('mailLink').href = `mailto:ceo@anasnidir.com?subject=${encodeURIComponent('NEX Help Request')}`;
    render();
  }

  function submit(){
    const subject = document.getElementById('subject').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!subject||!message){ alert('Subject & message diperlukan'); return; }
    const u = App.getUser();
    const items = load();
    items.unshift({ id: Date.now(), user:u?.username, subject, contact, message, createdAt:new Date().toISOString() });
    save(items);
    render();
    alert('Request dihantar (demo).');
  }

  function render(){
    const items = load();
    const el = document.getElementById('list');
    if(!items.length){ el.innerHTML = '<p class="muted">Tiada request.</p>'; return; }
    el.innerHTML = items.map(r=>`
      <div class="list-item">
        <div>
          <div><b>${r.subject}</b></div>
          <div class="muted small">${r.user||'-'} • ${new Date(r.createdAt).toLocaleString()}</div>
        </div>
        <div class="badge">Saved</div>
      </div>
    `).join('');
  }

  return { init, submit };
})();