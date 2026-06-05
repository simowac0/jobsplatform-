// ─── HELPERS ─────────────────────────────────────────────────
function timeAgo(iso) {
  var s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60)     return 'Just now';
  if (s < 3600)   return Math.floor(s/60) + ' min ago';
  if (s < 86400)  return Math.floor(s/3600) + 'h ago';
  if (s < 172800) return '1 day ago';
  return Math.floor(s/86400) + ' days ago';
}
function isNew(iso) { return (Date.now() - new Date(iso)) < 2*3600000; }

// ─── STATE ───────────────────────────────────────────────────
var JOBS_PER_PAGE = 10;
var total         = window.TOTAL_AVAILABLE_JOBS || 40000;
var currentPage   = 1;
var activeFilters = {};         // holds current filter values
var filteredIds   = null;       // null = no filter = show all by index desc
var filteredList  = [];         // used when filters active
var liveNewJobs   = [];         // injected live jobs (newest, prepended)
var syncTimer     = null;

// ─── GET JOB BY INDEX (newest = index 0) ─────────────────────
function getJobByRank(rank) {
  // rank 0 = newest = highest idx
  // live jobs come first
  if (rank < liveNewJobs.length) return liveNewJobs[rank];
  var engineIdx = total - 1 - (rank - liveNewJobs.length);
  if (engineIdx < 0) return null;
  return window.generateJob(engineIdx);
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

  // Scan through jobs to build filtered list (sample up to 5000 for performance)
  var SCAN = Math.min(total + liveNewJobs.length, 5000);
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

  document.getElementById('jobsCount').innerHTML =
    'Showing <strong>' + ((currentPage-1)*JOBS_PER_PAGE+1) + '–' +
    Math.min(currentPage*JOBS_PER_PAGE, totalShown) +
    '</strong> of <strong>' + totalShown.toLocaleString() + '</strong> jobs';

  if (!pageJobs.length) {
    list.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted);"><i class="fa-solid fa-magnifying-glass" style="font-size:48px;opacity:.3;display:block;margin-bottom:16px;"></i><h3 style="margin-bottom:8px;">No jobs found</h3><p>Try removing some filters.</p><button class="btn-ghost" style="margin-top:16px;" onclick="resetFilters()">Clear filters</button></div>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  list.innerHTML = pageJobs.map(function(j) {
    var hl = highlight.indexOf(j.id) >= 0;
    return '<div class="job-card ' + (j.featured?'featured':'') + ' ' + (hl?'job-new-anim':'') + '" style="cursor:pointer;" onclick="window.location.href=\'job.html?id='+j.id+'\'">' +
      '<div class="job-logo" style="background:'+j.color+'">'+j.logo+'</div>' +
      '<div class="job-body">' +
        '<div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">' +
          (j.featured ? '<span class="featured-badge"><i class="fa-solid fa-star"></i> Featured</span>' : '') +
          (isNew(j.postedAt) ? '<span class="new-badge"><i class="fa-solid fa-bolt"></i> New</span>' : '') +
          (hl ? '<span class="live-badge"><i class="fa-solid fa-circle"></i> Just posted</span>' : '') +
        '</div>' +
        '<div class="job-title">'+j.title+'</div>' +
        '<div class="job-company">'+j.company+' <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</span></div>' +
        '<div class="job-tags">' +
          '<span class="job-tag"><i class="fa-solid fa-location-dot"></i> '+j.location+'</span>' +
          '<span class="job-tag"><i class="fa-solid fa-clock"></i> '+j.type+'</span>' +
          '<span class="job-tag"><i class="fa-solid fa-sterling-sign"></i> '+j.salary+'</span>' +
          '<span class="job-tag '+(j.workMode==='Remote'?'green':'')+'"><i class="fa-solid fa-'+(j.workMode==='Remote'?'laptop-house':j.workMode==='Hybrid'?'house-laptop':'building')+'"></i> '+j.workMode+'</span>' +
          '<span class="job-tag green"><i class="fa-solid fa-hourglass-half"></i> Replies in '+j.response+'h</span>' +
        '</div>' +
        '<p style="font-size:14px;color:var(--muted);margin-bottom:14px;line-height:1.5;">'+j.desc+'</p>' +
        '<div class="job-footer">' +
          '<span class="job-posted"><i class="fa-regular fa-clock"></i> '+timeAgo(j.postedAt)+'</span>' +
          '<div class="job-actions">' +
            '<button class="btn-save" id="save-'+j.id+'" onclick="event.stopPropagation();toggleSave('+j.id+',this)"><i class="fa-regular fa-bookmark"></i> <span data-t="save">Save</span></button>' +
            '<a href="job.html?id='+j.id+'" class="btn-primary" onclick="event.stopPropagation()" data-t="apply">Apply Now</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  renderPagination(pages, totalShown);
  if (window.applyLang) applyLang(localStorage.getItem('jp_lang')||'en');
}

function renderPagination(pages, total) {
  var el = document.getElementById('pagination');
  if (pages <= 1) { el.innerHTML=''; return; }
  var html = '';
  if (currentPage > 1) html += '<button class="page-btn" onclick="goPage('+(currentPage-1)+')">←</button>';
  for (var i=1; i<=pages; i++) {
    if (i===1||i===pages||Math.abs(i-currentPage)<=1) {
      html += '<button class="page-btn'+(i===currentPage?' active':'')+'" onclick="goPage('+i+')">'+i+'</button>';
    } else if (Math.abs(i-currentPage)===2) {
      html += '<span style="padding:0 4px;color:var(--muted);">…</span>';
    }
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
document.getElementById('sortSelect').addEventListener('change', function() {
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
  var job  = null;
  for (var r=0; r<total+liveNewJobs.length; r++) { var j=getJobByRank(r); if(j&&j.id===id){job=j;break;} }
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
  btn.classList.toggle('saved');
  btn.innerHTML = btn.classList.contains('saved')
    ? '<i class="fa-solid fa-bookmark"></i> <span data-t="saved">Saved</span>'
    : '<i class="fa-regular fa-bookmark"></i> <span data-t="save">Save</span>';
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
  // Try real API
  fetch('http://localhost:3000/api/jobs?since=' + encodeURIComponent(new Date(Date.now()-35000).toISOString()))
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
      total = window.TOTAL_AVAILABLE_JOBS = (window.TOTAL_AVAILABLE_JOBS||0) + 1;
    }
  });
  if (!ids.length) return;
  showSyncToast(ids.length);
  if (currentPage === 1 && !filteredIds) renderPage(ids);
}

function showSyncToast(n) {
  var t = document.getElementById('syncToast');
  if (!t) { t=document.createElement('div'); t.id='syncToast'; t.className='sync-toast'; document.body.appendChild(t); }
  t.innerHTML = '<i class="fa-solid fa-bolt"></i> ' + n + ' new job' + (n>1?'s':'') + ' just posted!';
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');}, 4000);
}

// ─── COUNTS ───────────────────────────────────────────────────
function updateCounts() {
  var counts = {};
  // Sample 2000 jobs to estimate counts
  var sample = Math.min(total, 2000);
  for (var r=0; r<sample; r++) {
    var j = getJobByRank(r);
    if (!j) break;
    counts[j.category] = (counts[j.category]||0)+1;
    counts[j.type]     = (counts[j.type]    ||0)+1;
  }
  ['Care','Warehouse','Customer Service','Retail','Admin','IT','Cleaning','Teaching','Driving','Construction'].forEach(function(cat){
    var el = document.getElementById('cnt-'+cat.replace(/\s+/g,'-'));
    if (el && counts[cat]) el.textContent = (counts[cat] * Math.round(total/sample)).toLocaleString();
  });
}

// ─── SEARCH FORM ──────────────────────────────────────────────
document.getElementById('searchForm').addEventListener('submit', function(e){e.preventDefault();filterJobs();});
document.getElementById('searchQ').addEventListener('input',   function(){filterJobs();});
document.getElementById('searchLoc').addEventListener('input', function(){filterJobs();});

// ─── URL PARAMS ───────────────────────────────────────────────
var params = new URLSearchParams(window.location.search);
if (params.get('q'))        document.getElementById('searchQ').value   = params.get('q');
if (params.get('location')) document.getElementById('searchLoc').value = params.get('location');
if (params.get('category')) document.getElementById('searchQ').value   = params.get('category');

// ─── LIVE INDICATOR ───────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  var tb = document.querySelector('.jobs-toolbar');
  if (tb) {
    var ind = document.createElement('div');
    ind.className='live-indicator';
    ind.innerHTML='<span class="live-dot"></span> Live';
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
updateCounts();
if (params.get('q') || params.get('category') || params.get('location')) {
  filterJobs();
} else {
  renderPage();
}

// Hero subtitle
var heroSub = document.querySelector('[data-t="jobs_sub"]');
if (heroSub) heroSub.textContent = (total).toLocaleString() + ' active listings · All salaries shown · Employers respond within 48h';

// Start auto-sync
setInterval(syncJobs, 30000);
