window.App = (function(){
  const UKEY = 'nex_user';
  function setUser(u){ localStorage.setItem(UKEY, JSON.stringify(u)); }
  function getUser(){ try{return JSON.parse(localStorage.getItem(UKEY)||'null')}catch(_){return null} }
  function login(){
    const username = document.getElementById('username')?.value?.trim();
    const plan = document.getElementById('plan')?.value || 'free';
    if(!username){ alert('Masukkan username'); return; }
    const user = { username, plan };
    setUser(user);
    location.href = 'dashboard.html';
  }
  function logout(){ localStorage.removeItem(UKEY); location.href = 'index.html'; }
  function requireAuth(){ if(!getUser()) location.href='index.html'; }
  function requireSubscriber(){ const u=getUser(); if(!u||u.plan!=='subscriber'){ location.href='upgrade.html'; } }

  // Pages store helpers (per user)
  function pagesKey(owner){ return `nexpages_${owner||getUser()?.username}` }
  function loadPages(owner){ try{ return JSON.parse(localStorage.getItem(pagesKey(owner))||'[]') }catch(_){ return [] } }
  function savePages(pages, owner){ localStorage.setItem(pagesKey(owner), JSON.stringify(pages)); }

  // Dashboard overview updater
  function initDashboard(){
    const u = getUser();
    if(!u) return;
    const avatar = document.getElementById('avatar');
    if(avatar) avatar.textContent = (u.username||'?').slice(0,1).toUpperCase();
    const welcome = document.getElementById('welcome');
    if(welcome) welcome.textContent = `Hi, ${u.username}`;
    const planText = document.getElementById('planText');
    if(planText) planText.textContent = u.plan === 'subscriber' ? 'Subscriber ✅' : 'Free ❌';
    const pages = loadPages(u.username);
    const statPages = document.getElementById('statPages');
    const statPublished = document.getElementById('statPublished');
    if(statPages) statPages.textContent = pages.length;
    if(statPublished) statPublished.textContent = pages.filter(p=>p.status==='published').length;
  }

  // Slug helper
  function slugify(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

  // Export public helpers
  return { login, logout, getUser, setUser, requireAuth, requireSubscriber, initDashboard, loadPages, savePages, slugify, pagesKey };
})();