// window.sb is initialised by config.js

// ─── INIT FROM URL ───────────────────────────────────────────
(function() {
  var p = new URLSearchParams(window.location.search);
  if (p.get('tab') === 'register') switchTab('register');
})();

// ─── TAB SWITCH ──────────────────────────────────────────────
function switchTab(tab) {
  document.getElementById('signinBlock').style.display   = tab === 'signin'   ? 'block' : 'none';
  document.getElementById('registerBlock').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('successBlock').style.display  = 'none';
  document.getElementById('tabSignin').classList.toggle('active',   tab === 'signin');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}

// ─── TOGGLE PASSWORD ─────────────────────────────────────────
function togglePass(id, btn) {
  var inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.innerHTML = inp.type === 'text'
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
}

// ─── MESSAGES ────────────────────────────────────────────────
function showMsg(id, text, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = 'form-msg ' + type;
}

function setLoading(txtId, spinId, on) {
  var t = document.getElementById(txtId);
  var s = document.getElementById(spinId);
  if (t) t.style.display = on ? 'none' : 'inline';
  if (s) s.style.display = on ? 'inline' : 'none';
}

// ─── SIGN IN ─────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  var email    = document.getElementById('loginEmail').value.trim();
  var password = document.getElementById('loginPassword').value;
  if (!email || !password) { showMsg('loginMsg', 'Please fill in all fields.', 'error'); return; }
  setLoading('loginTxt', 'loginSpin', true);

  // Wait for config.js to finish if needed
  await new Promise(function(r) { setTimeout(r, 300); });

  if (window.sb) {
    var { data, error } = await window.sb.auth.signInWithPassword({ email, password });
    if (error) { showMsg('loginMsg', error.message, 'error'); setLoading('loginTxt', 'loginSpin', false); return; }
    var { data: profile } = await window.sb.from('profiles').select('*').eq('id', data.user.id).single();
    var user = Object.assign({ id: data.user.id, email }, profile || {});
    localStorage.setItem('jp_user', JSON.stringify(user));
    showSuccess('Welcome back!', 'Redirecting...');
  } else {
    var users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    var user  = users.find(function(u) { return u.email === email && u.password === password; });
    if (!user) { showMsg('loginMsg', 'Invalid email or password.', 'error'); setLoading('loginTxt', 'loginSpin', false); return; }
    localStorage.setItem('jp_user', JSON.stringify(user));
    showSuccess('Welcome back, ' + (user.firstName || email) + '!', 'Redirecting...');
  }
  setLoading('loginTxt', 'loginSpin', false);
}

// ─── REGISTER ────────────────────────────────────────────────
async function handleRegister() {
  var firstName = document.getElementById('regFirstName').value.trim();
  var lastName  = document.getElementById('regLastName').value.trim();
  var email     = document.getElementById('regEmail').value.trim();
  var password  = document.getElementById('regPassword').value;

  if (!firstName || !lastName || !email || !password) { showMsg('regMsg', 'Please fill in all fields.', 'error'); return; }
  if (password.length < 8) { showMsg('regMsg', 'Password must be at least 8 characters.', 'error'); return; }
  setLoading('regTxt', 'regSpin', true);

  await new Promise(function(r) { setTimeout(r, 300); });

  if (window.sb) {
    var { data: authData, error: authErr } = await window.sb.auth.signUp({ email, password });
    if (authErr) { showMsg('regMsg', authErr.message, 'error'); setLoading('regTxt', 'regSpin', false); return; }
    var uid = authData.user.id;
    await window.sb.from('profiles').insert({
      id: uid, first_name: firstName, last_name: lastName,
      email, role: 'jobseeker'
    });
    var user = { id: uid, firstName, lastName, email, role: 'jobseeker' };
    localStorage.setItem('jp_user', JSON.stringify(user));
    if (window.sheetRegistration) sheetRegistration(user, {});
    showSuccess('Account Created!', 'Welcome ' + firstName + '!');
  } else {
    var users = JSON.parse(localStorage.getItem('jp_users') || '[]');
    if (users.find(function(u) { return u.email === email; })) {
      showMsg('regMsg', 'Email already registered.', 'error');
      setLoading('regTxt', 'regSpin', false); return;
    }
    var user = { id: Date.now(), firstName, lastName, email, password, role: 'jobseeker', createdAt: new Date().toISOString() };
    users.push(user);
    localStorage.setItem('jp_users', JSON.stringify(users));
    localStorage.setItem('jp_user',  JSON.stringify(user));
    if (window.sheetRegistration) sheetRegistration(user, {});
    showSuccess('Account Created!', 'Welcome ' + firstName + '!');
  }
  setLoading('regTxt', 'regSpin', false);
}

// ─── SOCIAL LOGIN ────────────────────────────────────────────
async function socialLogin(provider) {
  await new Promise(function(r) { setTimeout(r, 500); });
  if (window.sb) {
    var redirectTo = window.location.origin + '/jobs.html';
    var returnUrl  = new URLSearchParams(window.location.search).get('returnUrl');
    if (returnUrl) redirectTo = window.location.origin + '/' + decodeURIComponent(returnUrl);
    var { error } = await window.sb.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) showMsg('loginMsg', error.message, 'error');
  } else {
    alert('Social login requires Supabase configuration. Please use email/password.');
  }
}

// ─── FORGOT PASSWORD ─────────────────────────────────────────
async function showForgot() {
  var email = document.getElementById('loginEmail').value.trim();
  if (!email) { showMsg('loginMsg', 'Enter your email first.', 'error'); return; }
  if (window.sb) {
    var { error } = await window.sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/login.html' });
    if (error) { showMsg('loginMsg', error.message, 'error'); return; }
    showMsg('loginMsg', 'Reset email sent to ' + email, 'success');
  } else {
    showMsg('loginMsg', 'Password reset sent to ' + email + ' (demo)', 'success');
  }
}

// ─── SUCCESS ─────────────────────────────────────────────────
function showSuccess(title, msg) {
  document.getElementById('signinBlock').style.display   = 'none';
  document.getElementById('registerBlock').style.display = 'none';
  document.getElementById('successBlock').style.display  = 'block';
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').textContent   = msg;
  var returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || 'jobs.html';
  setTimeout(function() { window.location.href = decodeURIComponent(returnUrl); }, 1800);
}
