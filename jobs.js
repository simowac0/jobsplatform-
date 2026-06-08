// ─── HELPERS ─────────────────────────────────────────────────
function timeAgo(iso) {
  if (window.jpTimeAgo) return window.jpTimeAgo(iso);
  var s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60)     return 'Just now';
  if (s < 3600)   return Math.floor(s/60) + ' min ago';
  if (s < 86400)  return Math.floor(s/3600) + 'h ago';
  if (s < 172800) return '1 day ago';
  return Math.floor(s/86400) + ' days ago';
}

function getSavedJobs() {
  try { return JSON.parse(localStorage.getItem('jp_saved_jobs') || '[]'); } catch(e) { return []; }
}
function isJobSaved(id) { return getSavedJobs().indexOf(id) >= 0; }
function isNew(iso) { return (Date.now() - new Date(iso)) < 2*3600000; }

// ─── STATE ───────────────────────────────────────────────────
var JOBS_PER_PAGE = 10;
var engineTotal   = window.JOBS_ENGINE_TOTAL || window.TOTAL_AVAILABLE_JOBS || 800;
var total         = window.BROWSE_JOB_COUNT || window.TOTAL_AVAILABLE_JOBS || 800;
var currentPage   = 1;
var filterTimer   = null;
var _jobMemo      = {};

function cachedGenerate(idx) {
  if (_jobMemo[idx]) return _jobMemo[idx];
  if (!window.generateJob) return null;
  var j = window.generateJob(idx);
  _jobMemo[idx] = j;
  return j;
}
var activeFilters = {};         // holds current filter values
var filteredIds   = null;       // null = no filter = show all by index desc
var filteredList  = [];         // used when filters active
var liveNewJobs   = [];         // injected live jobs (newest, prepended)
var syncTimer     = null;

// ─── GET JOB BY INDEX (newest = index 0) ─────────────────────
function getJobByRank(rank) {
  if (rank < liveNewJobs.length) return liveNewJobs[rank];
  var off = rank - liveNewJobs.length;
  if (off >= total) return null;
  var engineIdx = engineTotal - 1 - off;
  if (engineIdx < 0) return null;
  return cachedGenerate(engineIdx);
}

function getJobById(id) {
  for (var i = 0; i < liveNewJobs.length; i++) {
    if (liveNewJobs[i].id === id) return liveNewJobs[i];
  }
  var engineIdx = id - 10000;
  if (engineIdx >= 0 && engineIdx < engineTotal) {
    return cachedGenerate(engineIdx);
  }
  return null;
}

function scheduleFilter() {
  clearTimeout(filterTimer);
  filterTimer = setTimeout(filterJobs, 350);
}

// ─── FILTER ──────────────────────────────────────────────────
function filterJobs() {
  var q    = (document.getElementById('searchQ').value   || '').toLowerCase().trim();
  var loc  = (document.getElementById('searchLoc').value || '').toLowerCase().trim();
  var types = [...document.querySelectorAll('input[name="type"]:checked')].map(i=>i.value.toLowerCase());
  var cats  = [...document.querySelectorAll('input[name="cat"]:checked') ].map(i=>i.value.toLowerCase());
  var modes = [...document.querySelectorAll('input[name="loc"]:checked') ].map(i=>i.value.toLowerCase());
  var sal   = document.querySelector('input[name="salary"]:checked')?.value || 'any';
  var resp  = document.querySelector('input[name="resp"]:checked')?.value   || 'any';

  var noFilter = !q && !loc && !types.length && !cats.length && !modes.length && sal==='any' && resp==='any';
  if (noFilter) {
    filteredIds  = null;
    filteredList = [];
    currentPage  = 1;
    renderPage();
    return;
  }

  // Scan browsable jobs only (capped for speed)
  var SCAN = total + liveNewJobs.length;
  filteredList = [];
  for (var r = 0; r < SCAN; r++) {
    var j = getJobByRank(r);
    if (!j) break;
    if (q && !(j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) || j.location.toLowerCase().includes(q))) continue;
    if (loc   && !j.location.toLowerCase().includes(loc)) continue;
    if (types.length && !types.includes(j.type.toLowerCase())) continue;
    if (cats.length  && !cats.includes(j.category.toLowerCase())) continue;
    if (modes.length && !modes.includes(j.workMode.toLowerCase())) continue;
    if (sal !== 'any') {
      var parts = sal.split('-').map(Number);
      var lo = parts[0]*1000, hi = parts[1]*1000;
      var annMin = j.salaryMin >= 100 ? j.salaryMin : j.salaryMin*2080;
      if (annMin < lo || annMin > hi) continue;
    }
    if (resp !== 'any' && j.response > parseInt(resp)) continue;
    filteredList.push(j);
    if (filteredList.length >= 120) break;
  }

  filteredIds = true; // flag: use filteredList
  currentPage = 1;
  renderPage();
}

function resetFilters() {
  document.getElementById('searchQ').value   = '';
  document.getElementById('searchLoc').value = '';
  document.querySelectorAll('input[name="type"], input[name="cat"], input[name="loc"]').forEach(i=>i.checked=false);
  document.querySelector('input[name="salary"][value="any"]').checked = true;
  document.querySelector('input[name="resp"][value="any"]').checked   = true;
  filteredIds  = null;
  filteredList = [];
  currentPage  = 1;
  renderPage();
}

// ─── RENDER ──────────────────────────────────────────────────
function renderPage(highlight) {
  highlight = highlight || [];
  var list  = document.getElementById('jobsList');
  var totalShown, pages, pageJobs;

  if (filteredIds) {
    totalShown = filteredList.length;
    pages      = Math.ceil(totalShown / JOBS_PER_PAGE);
    var start  = (currentPage-1)*JOBS_PER_PAGE;
    pageJobs   = filteredList.slice(start, start+JOBS_PER_PAGE);
  } else {
    totalShown = total + liveNewJobs.length;
    pages      = Math.ceil(totalShown / JOBS_PER_PAGE);
    var start  = (currentPage-1)*JOBS_PER_PAGE;
    pageJobs   = [];
    for (var r = start; r < start+JOBS_PER_PAGE; r++) {
      var j = getJobByRank(r); if (j) pageJobs.push(j);
    }
  }

  var countEl = document.getElementById('jobsCount');
  if (countEl) {
    countEl.innerHTML =
      window.jpT('showing') + ' <strong>' + ((currentPage-1)*JOBS_PER_PAGE+1) + '–' +
      Math.min(currentPage*JOBS_PER_PAGE, totalShown) +
      '</strong> ' + window.jpT('of') + ' <strong>' + totalShown.toLocaleString() + '</strong> ' + window.jpT('jobs_word');
  }

  if (!pageJobs.length) {
    list.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted);"><i class="fa-solid fa-magnifying-glass" style="font-size:48px;opacity:.3;display:block;margin-bottom:16px;"></i><h3 style="margin-bottom:8px;">' + window.jpT('no_jobs') + '</h3><p>' + window.jpT('no_jobs_sub') + '</p><button class="btn-ghost" style="margin-top:16px;" onclick="resetFilters()">' + window.jpT('clear_filters') + '</button></div>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  list.innerHTML = pageJobs.map(function(raw) {
    var j = window.jpLocalizeJob ? window.jpLocalizeJob(raw) : raw;
    var hl = highlight.indexOf(j.id) >= 0;
    var saved = isJobSaved(j.id);
    return '<div class="job-card ' + (j.featured?'featured':'') + ' ' + (hl?'job-new-anim':'') + '" style="cursor:pointer;" onclick="window.location.href=\'job.html?id='+j.id+'\'">' +
      '<div class="job-logo" style="background:'+j.color+'">'+j.logo+'</div>' +
      '<div class="job-body">' +
        '<div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">' +
          (j.featured ? '<span class="featured-badge"><i class="fa-solid fa-star"></i> ' + window.jpT('featured') + '</span>' : '') +
          (isNew(j.postedAt) ? '<span class="new-badge"><i class="fa-solid fa-bolt"></i> ' + window.jpT('new_badge') + '</span>' : '') +
          (hl ? '<span class="live-badge"><i class="fa-solid fa-circle"></i> ' + window.jpT('just_posted') + '</span>' : '') +
        '</div>' +
        '<div class="job-title">'+j.title+'</div>' +
        '<div class="job-company">'+j.company+' <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> ' + window.jpT('verified') + '</span></div>' +
        '<div class="job-tags">' +
          '<span class="job-tag"><i class="fa-solid fa-location-dot"></i> '+j.location+'</span>' +
          '<span class="job-tag"><i class="fa-solid fa-clock"></i> '+j.typeLabel+'</span>' +
          '<span class="job-tag"><i class="fa-solid fa-sterling-sign"></i> '+j.salary+'</span>' +
          '<span class="job-tag '+(j.workMode==='Remote'?'green':'')+'"><i class="fa-solid fa-'+(j.workMode==='Remote'?'laptop-house':j.workMode==='Hybrid'?'house-laptop':'building')+'"></i> '+j.modeLabel+'</span>' +
          '<span class="job-tag green"><i class="fa-solid fa-hourglass-half"></i> ' + window.jpT('replies_in') + ' '+j.response+'h</span>' +
        '</div>' +
        '<p style="font-size:14px;color:var(--muted);margin-bottom:14px;line-height:1.5;">'+j.desc+'</p>' +
        '<div class="job-footer">' +
          '<span class="job-posted"><i class="fa-regular fa-clock"></i> '+timeAgo(j.postedAt)+'</span>' +
          '<div class="job-actions">' +
            '<button class="btn-save'+(saved?' saved':'')+'" id="save-'+j.id+'" onclick="event.stopPropagation();toggleSave('+j.id+',this)"><i class="'+(saved?'fa-solid':'fa-regular')+' fa-bookmark"></i> <span>'+(saved?window.jpT('saved'):window.jpT('save'))+'</span></button>' +
            '<a href="job.html?id='+j.id+'" class="btn-primary" onclick="event.stopPropagation()">'+window.jpT('apply')+'</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  renderPagination(pages, totalShown);
  if (window.applyLang) applyLang(localStorage.getItem('jp_lang')||'en');
}

function renderPagination(pages) {
  var el = document.getElementById('pagination');
  if (pages <= 1) { el.innerHTML=''; return; }
  var MAX_BTNS = 7;
  var html = '';
  if (currentPage > 1) html += '<button class="page-btn" onclick="goPage('+(currentPage-1)+')">←</button>';

  if (pages <= MAX_BTNS) {
    for (var i = 1; i <= pages; i++) {
      html += '<button class="page-btn'+(i===currentPage?' active':'')+'" onclick="goPage('+i+')">'+i+'</button>';
    }
  } else {
    html += '<button class="page-btn'+(currentPage===1?' active':'')+'" onclick="goPage(1)">1</button>';
    if (currentPage > 3) html += '<span style="padding:0 4px;color:var(--muted);">…</span>';
    var start = Math.max(2, currentPage - 1);
    var end   = Math.min(pages - 1, currentPage + 1);
    for (var p = start; p <= end; p++) {
      html += '<button class="page-btn'+(p===currentPage?' active':'')+'" onclick="goPage('+p+')">'+p+'</button>';
    }
    if (currentPage < pages - 2) html += '<span style="padding:0 4px;color:var(--muted);">…</span>';
    html += '<button class="page-btn'+(currentPage===pages?' active':'')+'" onclick="goPage('+pages+')">'+pages+'</button>';
  }

  if (currentPage < pages) html += '<button class="page-btn" onclick="goPage('+(currentPage+1)+')">→</button>';
  el.innerHTML = html;
}

function goPage(p) {
  currentPage = p;
  renderPage();
  document.querySelector('.jobs-layout').scrollIntoView({behavior:'smooth'});
}

// ─── SORT ────────────────────────────────────────────────────
var sortSelectEl = document.getElementById('sortSelect');
if (sortSelectEl) sortSelectEl.addEventListener('change', function() {
  var v = this.value;
  if (filteredIds && filteredList.length) {
    if (v==='salary')   filteredList.sort(function(a,b){return b.salaryMin-a.salaryMin;});
    else if (v==='response') filteredList.sort(function(a,b){return a.response-b.response;});
    else filteredList.sort(function(a,b){return new Date(b.postedAt)-new Date(a.postedAt);});
    currentPage=1; renderPage();
  } else {
    // For unfiltered, just re-render — generator order is already newest first
    currentPage=1; renderPage();
  }
});

// ─── APPLY / LOGIN REDIRECT ──────────────────────────────────
function applyToJob(id) {
  var user = JSON.parse(localStorage.getItem('jp_user') || 'null');
  if (user) { showApplyModal(id); }
  else {
    localStorage.setItem('jp_pendingApply', id);
    window.location.href = 'login.html?returnUrl=' + encodeURIComponent('jobs.html') + '&applyJobId=' + id;
  }
}

function showApplyModal(id) {
  var job = getJobById(id);
  var user = JSON.parse(localStorage.getItem('jp_user') || '{}');

  var modal = document.getElementById('applyModal');
  if (!modal) { modal=document.createElement('div'); modal.id='applyModal'; modal.className='apply-modal-overlay'; document.body.appendChild(modal); }

  modal.innerHTML = '<div class="apply-modal">' +
    '<button class="apply-modal-close" onclick="closeApplyModal()"><i class="fa-solid fa-xmark"></i></button>' +
    '<div class="apply-modal-header">' +
      '<div class="job-logo" style="background:'+(job?job.color:'#2563eb')+';width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:16px;">'+(job?job.logo:'JP')+'</div>' +
      '<div><div style="font-size:18px;font-weight:700;color:var(--dark);">'+(job?job.title:'Job Application')+'</div><div style="font-size:14px;color:var(--muted);">'+(job?job.company+' · '+job.location:'')+'</div></div>' +
    '</div>' +
    '<p style="font-size:14px;color:var(--muted);margin:16px 0;">You are applying as <strong>'+(user.firstName||'User')+' '+(user.lastName||'')+'</strong> ('+(user.email||'')+')</p>' +
    '<div class="form-group"><label>Cover Letter <span style="font-weight:400;color:var(--muted);">(optional)</span></label><textarea id="coverLetter" placeholder="Tell the employer why you are a great fit..." style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-family:inherit;font-size:14px;resize:vertical;min-height:100px;outline:none;color:var(--dark);"></textarea></div>' +
    '<div class="form-msg" id="applyMsg"></div>' +
    '<button class="btn-primary" style="width:100%;justify-content:center;padding:14px;" onclick="submitApplication('+id+')">' +
      '<i class="fa-solid fa-paper-plane"></i> Submit Application' +
    '</button></div>';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeApplyModal() {
  var m = document.getElementById('applyModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow=''; }
}

function submitApplication(jobId) {
  var msg = document.getElementById('applyMsg');
  msg.className = 'form-msg success';
  msg.textContent = '✅ Application sent! The employer will respond within 48 hours.';
  var apps = JSON.parse(localStorage.getItem('jp_applications')||'[]');
  apps.push({jobId:jobId, appliedAt:new Date().toISOString()});
  localStorage.setItem('jp_applications', JSON.stringify(apps));
  setTimeout(closeApplyModal, 2200);
}

document.addEventListener('click', function(e){ if(e.target.id==='applyModal') closeApplyModal(); });

// ─── SAVE ─────────────────────────────────────────────────────
function toggleSave(id, btn) {
  var saved = getSavedJobs();
  var idx = saved.indexOf(id);
  if (idx >= 0) saved.splice(idx, 1); else saved.push(id);
  localStorage.setItem('jp_saved_jobs', JSON.stringify(saved));
  var isSaved = idx < 0;
  btn.classList.toggle('saved', isSaved);
  btn.innerHTML = '<i class="' + (isSaved ? 'fa-solid' : 'fa-regular') + ' fa-bookmark"></i> <span>' + (isSaved ? window.jpT('saved') : window.jpT('save')) + '</span>';
}

// ─── AUTO-SYNC ────────────────────────────────────────────────
var SYNC_POOL = [
  {title:'Night Shift Warehouse',company:'Ocado Group',logo:'OG',color:'#7c3aed',location:'Hatfield',type:'Full-time',salaryMin:27000,salary:'£27k–£31k',category:'Warehouse',workMode:'On-site',response:24,featured:false,desc:'Night shift picking roles. Premium rate + weekly pay.'},
  {title:'Community Care Worker',company:'Bluebird Care',logo:'BC',color:'#2563eb',location:'Leicester',type:'Part-time',salaryMin:29120,salary:'£14–£16/hr',category:'Care',workMode:'On-site',response:24,featured:false,desc:'Community care role. Full driving licence required.'},
  {title:'Remote Support Agent',company:'Vodafone UK',logo:'VF',color:'#dc2626',location:'Remote',type:'Full-time',salaryMin:24000,salary:'£24k–£27k',category:'Customer Service',workMode:'Remote',response:48,featured:true,desc:'Fully remote customer support. Immediate start.'},
  {title:'Frontend Developer',company:'Monzo Bank',logo:'MO',color:'#f97316',location:'Remote',type:'Full-time',salaryMin:60000,salary:'£60k–£75k',category:'IT',workMode:'Remote',response:24,featured:true,desc:'React developer for Monzo web banking platform.'},
  {title:'Delivery Driver',company:'Just Eat',logo:'JE',color:'#f59e0b',location:'London',type:'Part-time',salaryMin:27040,salary:'£13–£15/hr',category:'Driving',workMode:'On-site',response:24,featured:false,desc:'Flexible food delivery shifts. Own transport required.'},
  {title:'Retail Team Leader',company:'Primark',logo:'PR',color:'#1d4ed8',location:'Birmingham',type:'Full-time',salaryMin:27000,salary:'£27k–£31k',category:'Retail',workMode:'On-site',response:48,featured:false,desc:'Supervise busy retail floor. Fashion retail experience preferred.'},
  {title:'School Cleaner',company:'ISS Facilities',logo:'IS',color:'#059669',location:'Oxford',type:'Part-time',salaryMin:22880,salary:'£11–£13/hr',category:'Cleaning',workMode:'On-site',response:24,featured:false,desc:'Early morning cleaning in a local primary school.'},
  {title:'IT Security Analyst',company:'GCHQ Partners',logo:'GC',color:'#dc2626',location:'Cheltenham',type:'Full-time',salaryMin:55000,salary:'£55k–£68k',category:'IT',workMode:'Hybrid',response:48,featured:true,desc:'Cybersecurity analyst role. SC clearance required.'},
];
var syncPoolIdx = 0;
var syncLiveId  = 99000;

function syncJobs() {
  // Try real API (relative path works in prod and local)
  fetch('/api/jobs?since=' + encodeURIComponent(new Date(Date.now()-35000).toISOString()))
    .then(function(r){return r.json();})
    .then(function(data){
      if (data.jobs && data.jobs.length) { injectLiveJobs(data.jobs); return; }
    }).catch(function(){});

  // Simulation — inject one new job every ~2 syncs
  if (Math.random() > 0.4 && syncPoolIdx < SYNC_POOL.length) {
    var template = SYNC_POOL[syncPoolIdx++ % SYNC_POOL.length];
    var newJob = Object.assign({}, template, {id: syncLiveId++, postedAt: new Date().toISOString()});
    injectLiveJobs([newJob]);
  }
}

function injectLiveJobs(newJobs) {
  var ids = [];
  newJobs.forEach(function(j) {
    if (!liveNewJobs.find(function(x){return x.id===j.id;})) {
      if (!j.logo)  j.logo  = j.company.slice(0,2).toUpperCase();
      if (!j.color) j.color = '#2563eb';
      if (!j.desc)  j.desc  = j.title + ' at ' + j.company + '. Apply now.';
      liveNewJobs.unshift(j);
      ids.push(j.id);
      engineTotal = window.JOBS_ENGINE_TOTAL = (window.JOBS_ENGINE_TOTAL||engineTotal) + 1;
    }
  });
  if (!ids.length) return;
  showSyncToast(ids.length);
  if (currentPage === 1 && !filteredIds) renderPage(ids);
}

function showSyncToast(n) {
  var t = document.getElementById('syncToast');
  if (!t) { t=document.createElement('div'); t.id='syncToast'; t.className='sync-toast'; document.body.appendChild(t); }
  t.innerHTML = '<i class="fa-solid fa-bolt"></i> ' + n + ' ' + (n>1?window.jpT('sync_news'):window.jpT('sync_new')) + ' ' + window.jpT('sync_posted');
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');}, 4000);
}

// ─── COUNTS ───────────────────────────────────────────────────
function updateCounts() {
  var weights = {
    'Care':0.11,'Warehouse':0.14,'Customer Service':0.10,'Retail':0.12,'Admin':0.09,
    'IT':0.08,'Cleaning':0.10,'Teaching':0.08,'Driving':0.09,'Construction':0.09
  };
  var base = engineTotal || total;
  ['Care','Warehouse','Customer Service','Retail','Admin','IT','Cleaning','Teaching','Driving','Construction'].forEach(function(cat){
    var el = document.getElementById('cnt-'+cat.replace(/\s+/g,'-'));
    if (el) el.textContent = Math.round(base * (weights[cat] || 0.1)).toLocaleString();
  });
}

// ─── SEARCH FORM ──────────────────────────────────────────────
var searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', function(e){e.preventDefault();filterJobs();});
  var sq = document.getElementById('searchQ');
  var sl = document.getElementById('searchLoc');
  if (sq) sq.addEventListener('input', scheduleFilter);
  if (sl) sl.addEventListener('input', scheduleFilter);
}

// ─── COMPANIES VIEW ───────────────────────────────────────────
var COMPANIES_LIST = [
  {name:'NHS Foundation Trust',logo:'NH',color:'#2563eb',jobs:1240},
  {name:'Amazon Logistics',logo:'AM',color:'#f59e0b',jobs:890},
  {name:'Tesco PLC',logo:'TE',color:'#16a34a',jobs:760},
  {name:'BT Group',logo:'BT',color:'#7c3aed',jobs:540},
  {name:'Monzo Bank',logo:'MO',color:'#f97316',jobs:320},
  {name:'SunCare Group',logo:'SC',color:'#0891b2',jobs:480},
  {name:'Deloitte UK',logo:'DE',color:'#374151',jobs:290},
  {name:'Balfour Beatty',logo:'BB',color:'#dc2626',jobs:410},
];

function showCompaniesView() {
  var layout = document.querySelector('.jobs-layout');
  if (!layout) return;
  layout.innerHTML = '<main class="jobs-main" style="grid-column:1/-1;">' +
    '<div class="section-header" style="margin-bottom:28px;"><h1 data-ui="companies_h1">' + window.jpT('companies_h1') + '</h1><p data-ui="companies_sub">' + window.jpT('companies_sub') + '</p></div>' +
    '<div class="categories-grid">' +
    COMPANIES_LIST.map(function(c) {
      return '<a href="jobs.html?q=' + encodeURIComponent(c.name) + '" class="cat-card">' +
        '<div class="cat-icon" style="background:'+c.color+'">' + c.logo + '</div>' +
        '<div class="cat-name">' + c.name + '</div>' +
        '<div class="cat-count">' + c.jobs.toLocaleString() + ' ' + window.jpT('jobs_count_label') + '</div>' +
        '<span class="verified-badge" style="margin-top:8px;"><i class="fa-solid fa-circle-check"></i> ' + window.jpT('verified') + '</span></a>';
    }).join('') +
    '</div></main>';
  if (window.jpApplyUI) window.jpApplyUI();
}

// ─── URL PARAMS ───────────────────────────────────────────────
var params = new URLSearchParams(window.location.search);
var searchQEl = document.getElementById('searchQ');
var searchLocEl = document.getElementById('searchLoc');
if (params.get('q') && searchQEl)        searchQEl.value   = params.get('q');
if (params.get('location') && searchLocEl) searchLocEl.value = params.get('location');
if (params.get('category')) {
  var catVal = params.get('category');
  var catInput = document.querySelector('input[name="cat"][value="'+catVal+'"]');
  if (catInput) { catInput.checked = true; }
  else if (searchQEl) { searchQEl.value = catVal; }
}
if (params.get('tab') === 'companies') { showCompaniesView(); }

// ─── LIVE INDICATOR ───────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  var tb = document.querySelector('.jobs-toolbar');
  if (tb) {
    var ind = document.createElement('div');
    ind.className='live-indicator';
    ind.innerHTML='<span class="live-dot"></span> ' + (window.jpT ? window.jpT('live') : 'Live');
    tb.appendChild(ind);
  }
  // Check if returning from login with pending apply
  var pendingId = localStorage.getItem('jp_pendingApply');
  if (pendingId && localStorage.getItem('jp_user')) {
    localStorage.removeItem('jp_pendingApply');
    setTimeout(function(){ showApplyModal(parseInt(pendingId)); }, 500);
  }
});

// ─── INIT ─────────────────────────────────────────────────────
window.onJpLangChange = function() {
  if (params.get('tab') === 'companies') showCompaniesView();
  else renderPage();
  updateJobsHeroSub();
  var sortLbl = document.querySelector('.jobs-sort label');
  if (sortLbl) sortLbl.textContent = window.jpT('sort_label');
};

function updateJobsHeroSub() {
  var heroSub = document.querySelector('[data-t="jobs_sub"]');
  if (heroSub) heroSub.textContent = (engineTotal).toLocaleString() + ' ' + window.jpT('listings_active');
}

if (window.jpRenderFilters) window.jpRenderFilters();
updateCounts();
if (params.get('tab') !== 'companies') {
  if (params.get('q') || params.get('category') || params.get('location') || document.querySelector('input[name="cat"]:checked')) {
    filterJobs();
  } else {
    renderPage();
  }
}
updateJobsHeroSub();

// Start auto-sync (every 60s — lighter on network)
setInterval(syncJobs, 60000);
