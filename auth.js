// window.sb is initialised by config.js (loaded before this script)

// ─── INIT FROM URL ───────────────────────────────────────────
(function() {
  var p = new URLSearchParams(window.location.search);
  if (p.get('tab') === 'register') switchTab('register');
  if (p.get('role') === 'employer') selectRole('employer');
})();

// ─── TAB SWITCH ──────────────────────────────────────────────
function switchTab(tab) {
  document.getElementById('signinForm').style.display   = tab==='signin'   ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab==='register' ? 'block' : 'none';
  document.getElementById('successBlock').style.display = 'none';
  document.getElementById('tabSignin').classList.toggle('active',   tab==='signin');
  document.getElementById('tabRegister').classList.toggle('active', tab==='register');
}

// ─── ROLE / ID TYPE ──────────────────────────────────────────
function selectRole(role) {
  document.getElementById('roleJobseeker').classList.toggle('active', role==='jobseeker');
  document.getElementById('roleEmployer').classList.toggle('active',  role==='employer');
  document.getElementById('companyGroup').style.display = role==='employer' ? 'block' : 'none';
}

function selectIdType(type) {
  document.getElementById('idTypeNational').classList.toggle('active', type==='national');
  document.getElementById('idTypePassport').classList.toggle('active', type==='passport');
  document.getElementById('idDocLabel').textContent = type==='passport' ? 'Passport' : 'National ID Card';
}

// ─── STEP NAVIGATION ─────────────────────────────────────────
var currentStep = 1;

function goStep(n) {
  document.getElementById('regStep'+currentStep).style.display = 'none';
  currentStep = n;
  document.getElementById('regStep'+n).style.display = 'block';
  updateStepDots();
}

function updateStepDots() {
  for (var i=1; i<=3; i++) {
    var dot  = document.getElementById('step-dot-'+i);
    var line = document.querySelectorAll('.reg-step-line')[i-1];
    dot.classList.remove('active','done');
    if (i < currentStep)      dot.classList.add('done');
    else if (i === currentStep) dot.classList.add('active');
    if (line) line.classList.toggle('done', i < currentStep);
  }
}

function goStep2() {
  var fn = document.getElementById('regFirstName').value.trim();
  var ln = document.getElementById('regLastName').value.trim();
  var em = document.getElementById('regEmail').value.trim();
  var pw = document.getElementById('regPassword').value;
  var cf = document.getElementById('regConfirm').value;
  var msg = document.getElementById('regMsg1');
  if (!fn||!ln||!em||!pw) { showMsg('regMsg1','Please fill in all fields.','error'); return; }
  if (pw.length < 8)      { showMsg('regMsg1','Password must be at least 8 characters.','error'); return; }
  if (pw !== cf)          { showMsg('regMsg1','Passwords do not match.','error'); return; }
  msg.className = 'form-msg'; msg.textContent = '';
  goStep(2);
}

function goStep3() {
  var msg = document.getElementById('regMsg2');
  msg.className = 'form-msg'; msg.textContent = '';
  // CV is optional — just go to step 3
  goStep(3);
}

// ─── FILE PREVIEW ─────────────────────────────────────────────
function previewFile(inputId, previewId, type) {
  var file = document.getElementById(inputId).files[0];
  if (!file) return;
  var box = document.getElementById(previewId).parentElement;
  var preview = document.getElementById(previewId);

  if (type === 'photo' && file.type.startsWith('image/')) {
    var reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = '<img src="'+e.target.result+'" class="upload-preview-img" /><div style="padding:8px;font-size:13px;font-weight:600;color:var(--green);text-align:center;"><i class="fa-solid fa-circle-check"></i> '+file.name+'</div>';
      box.classList.add('has-file');
    };
    reader.readAsDataURL(file);
  } else {
    var icon = type==='cv' ? 'fa-file-pdf' : 'fa-id-card';
    preview.innerHTML = '<i class="fa-solid '+icon+'" style="font-size:36px;color:var(--green);"></i><span style="font-size:13px;font-weight:600;color:var(--green);">'+file.name+'</span><small>'+formatBytes(file.size)+'</small>';
    box.classList.add('has-file');
  }
}

function formatBytes(b) {
  if (b > 1048576) return (b/1048576).toFixed(1)+' MB';
  return (b/1024).toFixed(0)+' KB';
}

// ─── PASS STRENGTH ───────────────────────────────────────────
function checkPassStrength(val) {
  var bar = document.getElementById('passStrength');
  if (!val) { bar.style.background='var(--border)'; bar.style.width='0'; return; }
  var score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  var c = ['#ef4444','#f97316','#eab308','#16a34a'];
  var w = ['25%','50%','75%','100%'];
  bar.style.background = c[score-1]||'var(--border)';
  bar.style.width      = w[score-1]||'0';
}

// ─── TOGGLE PASS ─────────────────────────────────────────────
function togglePass(id, btn) {
  var inp = document.getElementById(id);
  inp.type = inp.type==='password' ? 'text' : 'password';
  btn.innerHTML = inp.type==='text' ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
}

// ─── MESSAGES ────────────────────────────────────────────────
function showMsg(id, text, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className   = 'form-msg ' + type;
}

function setLoading(txtId, spinnerId, on) {
  var t = document.getElementById(txtId);
  var s = document.getElementById(spinnerId);
  if (t) t.style.display = on ? 'none' : 'inline';
  if (s) s.style.display = on ? 'inline' : 'none';
}

// ─── SIGN IN ─────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  var email    = document.getElementById('loginEmail').value.trim();
  var password = document.getElementById('loginPassword').value;
  if (!email||!password) { showMsg('loginMsg','Please fill in all fields.','error'); return; }
  setLoading('loginBtnText','loginSpinner',true);

  if (window.sb) {
    var { data, error } = await window.sb.auth.signInWithPassword({ email, password });
    if (error) { showMsg('loginMsg', error.message, 'error'); setLoading('loginBtnText','loginSpinner',false); return; }
    // Fetch profile
    var { data: profile } = await window.sb.from('profiles').select('*').eq('id', data.user.id).single();
    var user = Object.assign({ id: data.user.id, email }, profile||{});
    localStorage.setItem('jp_user', JSON.stringify(user));
    if (window.sheetRegistration) sheetRegistration(user, {});
    showSuccess('Welcome back, '+(profile?.first_name||email)+'!', 'Redirecting...');
  } else {
    // localStorage fallback
    var users = JSON.parse(localStorage.getItem('jp_users')||'[]');
    var user  = users.find(function(u){return u.email===email && u.password===password;});
    if (!user) { showMsg('loginMsg','Invalid email or password.','error'); setLoading('loginBtnText','loginSpinner',false); return; }
    localStorage.setItem('jp_user', JSON.stringify(user));
    showSuccess('Welcome back, '+(user.firstName||email)+'!', 'Redirecting...');
  }
  setLoading('loginBtnText','loginSpinner',false);
}

// ─── REGISTER ────────────────────────────────────────────────
async function handleRegister() {
  var firstName  = document.getElementById('regFirstName').value.trim();
  var lastName   = document.getElementById('regLastName').value.trim();
  var email      = document.getElementById('regEmail').value.trim();
  var password   = document.getElementById('regPassword').value;
  var isEmployer = document.getElementById('roleEmployer').classList.contains('active');
  var company    = isEmployer ? (document.getElementById('regCompany').value.trim()||'') : '';
  var photoFile  = document.getElementById('photoInput').files[0];
  var cvFile     = document.getElementById('cvInput').files[0];
  var idFile     = document.getElementById('idInput').files[0];

  setLoading('regBtnText','regSpinner',true);

  if (window.sb) {
    // 1. Create auth user
    var { data: authData, error: authErr } = await window.sb.auth.signUp({ email, password });
    if (authErr) { showMsg('regMsg3', authErr.message, 'error'); setLoading('regBtnText','regSpinner',false); return; }
    var uid = authData.user.id;

    // 2. Upload files
    var photoUrl = null, cvUrl = null, idDocUrl = null;
    try {
      if (photoFile) {
        var { data: pd } = await window.sb.storage.from('photos').upload(uid+'/photo.'+photoFile.name.split('.').pop(), photoFile, {upsert:true});
        if (pd) { var { data:{publicUrl} } = window.sb.storage.from('photos').getPublicUrl(pd.path); photoUrl = publicUrl; }
      }
      if (cvFile) {
        var { data: cd } = await window.sb.storage.from('cvs').upload(uid+'/cv.'+cvFile.name.split('.').pop(), cvFile, {upsert:true});
        if (cd) cvUrl = uid+'/cv.'+cvFile.name.split('.').pop();
      }
      if (idFile) {
        var { data: id } = await window.sb.storage.from('documents').upload(uid+'/id.'+idFile.name.split('.').pop(), idFile, {upsert:true});
        if (id) idDocUrl = uid+'/id.'+idFile.name.split('.').pop();
      }
    } catch(fe) { console.warn('File upload error:', fe); }

    // 3. Insert profile
    var { error: profileErr } = await window.sb.from('profiles').insert({
      id: uid, first_name: firstName, last_name: lastName,
      email, role: isEmployer?'employer':'jobseeker', company,
      photo_url: photoUrl, cv_url: cvUrl, id_doc_url: idDocUrl
    });
    if (profileErr) console.warn('Profile insert:', profileErr.message);

    var user = { id:uid, firstName, lastName, email, role:isEmployer?'employer':'jobseeker', company, photo_url:photoUrl };
    localStorage.setItem('jp_user', JSON.stringify(user));
    if (window.sheetRegistration) sheetRegistration(user, { cv: !!cvFile, photo: !!photoFile, id: !!idFile });
    showSuccess('Account Created!', 'Welcome '+firstName+'! Your profile is ready.');

  } else {
    // localStorage fallback
    var users = JSON.parse(localStorage.getItem('jp_users')||'[]');
    if (users.find(function(u){return u.email===email;})) {
      showMsg('regMsg3','This email is already registered.','error');
      setLoading('regBtnText','regSpinner',false); return;
    }
    var user = {
      id: Date.now(), firstName, lastName, email, password,
      role: isEmployer?'employer':'jobseeker', company,
      hasPhoto: !!photoFile, hasCv: !!cvFile, hasId: !!idFile,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem('jp_users', JSON.stringify(users));
    localStorage.setItem('jp_user',  JSON.stringify(user));
    showSuccess('Account Created!', 'Welcome '+firstName+'! Redirecting...');
  }

  setLoading('regBtnText','regSpinner',false);
}

// ─── SOCIAL LOGIN ────────────────────────────────────────────
async function socialLogin(provider) {
  if (window.sb) {
    var opts = { redirectTo: window.location.origin+'/jobs.html' };
    var { error } = await window.sb.auth.signInWithOAuth({ provider, options: opts });
    if (error) showMsg('loginMsg', error.message, 'error');
  } else {
    showSocialFill(provider);
  }
}

function showSocialFill(provider) {
  var icon = provider==='google'
    ? '<i class="fa-brands fa-google" style="color:#EA4335;"></i> Google'
    : provider==='linkedin'
    ? '<i class="fa-brands fa-linkedin" style="color:#0A66C2;"></i> LinkedIn'
    : '<i class="fa-brands fa-facebook" style="color:#1877F2;"></i> Facebook';
  var html = '<div class="social-fill-overlay" onclick="if(event.target===this)this.remove()">' +
    '<div class="social-fill-card">' +
      '<div style="text-align:center;margin-bottom:20px;">' +
        '<div style="font-size:32px;margin-bottom:8px;">'+icon+'</div>' +
        '<h3 style="font-size:18px;font-weight:700;">Complete your profile</h3>' +
        '<p style="font-size:14px;color:var(--muted);">Fill in the details to continue with '+provider+'</p>' +
      '</div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label>First name</label><div class="input-wrap input-cream"><i class="fa-regular fa-user"></i><input type="text" id="sf_fn" placeholder="John" /></div></div>' +
        '<div class="form-group"><label>Last name</label><div class="input-wrap input-cream"><i class="fa-regular fa-user"></i><input type="text" id="sf_ln" placeholder="Doe" /></div></div>' +
      '</div>' +
      '<div class="form-group"><label>Email</label><div class="input-wrap input-cream"><i class="fa-regular fa-envelope"></i><input type="email" id="sf_em" placeholder="you@example.com" /></div></div>' +
      '<div class="form-group"><label>Password</label><div class="input-wrap input-cream"><i class="fa-solid fa-lock"></i><input type="password" id="sf_pw" placeholder="Min. 8 characters" minlength="8" /></div></div>' +
      '<div class="form-msg" id="sfMsg"></div>' +
      '<button class="btn-dark-pill" onclick="submitSocialFill(\''+provider+'\')">Create Account →</button>' +
    '</div>' +
  '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
}

function submitSocialFill(provider) {
  var fn = document.getElementById('sf_fn').value.trim();
  var ln = document.getElementById('sf_ln').value.trim();
  var em = document.getElementById('sf_em').value.trim();
  var pw = document.getElementById('sf_pw').value;
  if (!fn||!ln||!em||!pw) { showMsg('sfMsg','Please fill in all fields.','error'); return; }
  if (pw.length < 8)      { showMsg('sfMsg','Password must be at least 8 characters.','error'); return; }
  var users = JSON.parse(localStorage.getItem('jp_users')||'[]');
  if (users.find(function(u){return u.email===em;})) { showMsg('sfMsg','Email already registered.','error'); return; }
  var user = {id:Date.now(),firstName:fn,lastName:ln,email:em,password:pw,role:'jobseeker',provider:provider,createdAt:new Date().toISOString()};
  users.push(user); localStorage.setItem('jp_users',JSON.stringify(users));
  localStorage.setItem('jp_user',JSON.stringify(user));
  document.querySelector('.social-fill-overlay').remove();
  showSuccess('Welcome, '+fn+'!','Account created. Redirecting...');
}

// ─── SUCCESS ─────────────────────────────────────────────────
function showSuccess(title, msg) {
  document.getElementById('signinForm').style.display   = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('successBlock').style.display = 'block';
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').textContent   = msg;
  var returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || 'jobs.html';
  setTimeout(function(){ window.location.href = decodeURIComponent(returnUrl); }, 1800);
}

// ─── FORGOT PASSWORD ─────────────────────────────────────────
async function showForgot() {
  var email = document.getElementById('loginEmail').value.trim();
  if (!email) { showMsg('loginMsg','Enter your email first.','error'); return; }
  if (window.sb) {
    var { error } = await window.sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin+'/login.html' });
    if (error) { showMsg('loginMsg', error.message, 'error'); return; }
    showMsg('loginMsg','Password reset email sent to '+email,'success');
  } else {
    showMsg('loginMsg','Password reset sent to '+email+' (demo mode)','success');
  }
}
