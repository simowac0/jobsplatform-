// ─── PAGE TRANSITIONS ────────────────────────────────────────
document.documentElement.classList.add('page-ready');

// Fade-in on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
  setTimeout(() => document.body.classList.add('page-enter-active'), 10);
});

// Intercept all internal links → fade-out then navigate
document.addEventListener('click', e => {
  // Close lang dropdown on any click
  document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.lang-wrap').forEach(w => w.classList.remove('open'));

  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;
  e.preventDefault();
  e.stopPropagation();
  const dest = window.jpUrlWithLang ? window.jpUrlWithLang(href, currentLang) : href;
  document.body.classList.add('page-exit');
  setTimeout(() => { window.location.href = dest; }, 280);
});

// Intercept form submits that navigate
document.addEventListener('submit', e => {
  const form = e.target;
  if (form.action && !form.action.includes('localhost')) return;
  const action = form.getAttribute('action');
  if (!action || action.startsWith('#')) return;
  // Let auth.js handle auth forms
  if (form.id === 'loginForm' || form.id === 'regForm') return;
  e.preventDefault();
  const data = new FormData(form);
  const params = new URLSearchParams(data).toString();
  var dest = action + (params ? '?' + params : '');
  if (currentLang !== 'en') {
    dest += (dest.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + currentLang;
  }
  document.body.classList.add('page-exit');
  setTimeout(() => { window.location.href = dest; }, 320);
});

// ─── MOBILE MENU ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// ─── LANGUAGE SWITCHER ────────────────────────────────────────
const LANGS = {
  en: {
    code: 'en', label: 'EN', countryCode: 'GB', langName: 'English',
    nav_jobs: 'Jobs', nav_companies: 'Companies', nav_signin: 'Sign In', nav_post: 'Post a Job',
    hero_badge: 'Verified UK Jobs Only',
    hero_h1: 'Find Jobs That Actually <span class="highlight">Respond</span>',
    hero_sub: 'No ghost jobs. No salary secrets. Real employers who actually get back to you within 48 hours — guaranteed.',
    search_ph1: 'Job title, keywords...', search_ph2: 'Location (e.g. London)', search_btn: 'Search Jobs',
    popular: 'Popular:',
    stats_text: '<strong>2,400+</strong> people found jobs this month',
    features_h2: 'Why Job Seekers Choose Us',
    features_sub: 'We solve the problems that make job searching miserable',
    cats_h2: 'Browse by Category', cats_sub: 'Find opportunities in the sectors hiring right now',
    hiw_h2: 'How It Works', hiw_sub: 'Get hired in three simple steps',
    testi_h2: 'What Job Seekers Say', testi_sub: 'Real stories from people who found their next role with us',
    cta_h2: 'Ready to Find a Job That Actually Responds?',
    cta_sub: 'Join 50,000+ job seekers who found their next role with JobsPlatform.',
    cta_btn1: 'Browse Jobs', cta_btn2: 'Create Free Profile',
    footer_note: 'Free to use · No spam · Unsubscribe any time',
    jobs_h1: 'Browse <span class="highlight">Verified</span> Jobs',
    jobs_sub: '12,847 active listings · All salaries shown · Employers respond within 48h',
    sort_recent: 'Most Recent', sort_salary: 'Highest Salary', sort_resp: 'Fastest Response',
    apply: 'Apply Now', save: 'Save', saved: 'Saved',
    signin_h: 'Welcome back', signin_sub: 'Sign in to your JobsPlatform account',
    reg_h: 'Create your free account', reg_sub: 'Start applying to verified jobs today',
    tab_signin: 'Sign In', tab_reg: 'Create Account',
  },
  fr: {
    code: 'fr', label: 'FR', countryCode: 'FR', langName: 'Français',
    nav_jobs: 'Emplois', nav_companies: 'Entreprises', nav_signin: 'Connexion', nav_post: 'Publier une offre',
    hero_badge: 'Offres UK vérifiées uniquement',
    hero_h1: 'Trouvez des emplois qui <span class="highlight">Répondent</span>',
    hero_sub: 'Pas de fausses offres. Pas de salaires cachés. De vrais employeurs qui vous répondent dans les 48h — garanti.',
    search_ph1: 'Intitulé du poste...', search_ph2: 'Lieu (ex. Paris)', search_btn: 'Rechercher',
    popular: 'Populaire :',
    stats_text: '<strong>2 400+</strong> personnes ont trouvé un emploi ce mois-ci',
    features_h2: 'Pourquoi nous choisir',
    features_sub: 'Nous résolvons les problèmes qui rendent la recherche d\'emploi pénible',
    cats_h2: 'Parcourir par catégorie', cats_sub: 'Trouvez des opportunités dans les secteurs qui recrutent',
    hiw_h2: 'Comment ça marche', hiw_sub: 'Trouvez un emploi en trois étapes simples',
    testi_h2: 'Ce que disent les candidats', testi_sub: 'De vraies histoires de personnes qui ont trouvé leur prochain emploi',
    cta_h2: 'Prêt à trouver un emploi qui répond vraiment ?',
    cta_sub: 'Rejoignez 50 000+ candidats qui ont trouvé leur prochain poste sur JobsPlatform.',
    cta_btn1: 'Voir les offres', cta_btn2: 'Créer un profil gratuit',
    footer_note: 'Gratuit · Pas de spam · Désinscription à tout moment',
    jobs_h1: 'Offres d\'emploi <span class="highlight">vérifiées</span>',
    jobs_sub: '12 847 annonces actives · Salaires affichés · Réponse sous 48h',
    sort_recent: 'Plus récents', sort_salary: 'Salaire le plus élevé', sort_resp: 'Réponse la plus rapide',
    apply: 'Postuler', save: 'Sauvegarder', saved: 'Sauvegardé',
    signin_h: 'Bon retour', signin_sub: 'Connectez-vous à votre compte JobsPlatform',
    reg_h: 'Créez votre compte gratuit', reg_sub: 'Commencez à postuler dès aujourd\'hui',
    tab_signin: 'Connexion', tab_reg: 'Créer un compte',
  },
  de: {
    code: 'de', label: 'DE', countryCode: 'DE', langName: 'Deutsch',
    nav_jobs: 'Jobs', nav_companies: 'Unternehmen', nav_signin: 'Anmelden', nav_post: 'Job veröffentlichen',
    hero_badge: 'Nur verifizierte UK-Jobs',
    hero_h1: 'Finden Sie Jobs, die wirklich <span class="highlight">Antworten</span>',
    hero_sub: 'Keine Geisterjobs. Keine versteckten Gehälter. Echte Arbeitgeber, die sich innerhalb von 48 Stunden bei Ihnen melden — garantiert.',
    search_ph1: 'Berufsbezeichnung, Stichwörter...', search_ph2: 'Ort (z.B. Berlin)', search_btn: 'Jobs suchen',
    popular: 'Beliebt:',
    stats_text: '<strong>2.400+</strong> Personen fanden diesen Monat einen Job',
    features_h2: 'Warum Jobsuchende uns wählen',
    features_sub: 'Wir lösen die Probleme, die die Jobsuche mühsam machen',
    cats_h2: 'Nach Kategorie suchen', cats_sub: 'Finden Sie Möglichkeiten in den Bereichen, die jetzt einstellen',
    hiw_h2: 'So funktioniert es', hiw_sub: 'In drei einfachen Schritten zum Job',
    testi_h2: 'Was Jobsuchende sagen', testi_sub: 'Echte Geschichten von Menschen, die ihren nächsten Job gefunden haben',
    cta_h2: 'Bereit, einen Job zu finden, der wirklich antwortet?',
    cta_sub: 'Schließen Sie sich 50.000+ Jobsuchenden an, die ihren nächsten Job auf JobsPlatform gefunden haben.',
    cta_btn1: 'Jobs durchsuchen', cta_btn2: 'Kostenloses Profil erstellen',
    footer_note: 'Kostenlos · Kein Spam · Jederzeit abmelden',
    jobs_h1: '<span class="highlight">Verifizierte</span> Jobs durchsuchen',
    jobs_sub: '12.847 aktive Anzeigen · Alle Gehälter angezeigt · Antwort innerhalb 48h',
    sort_recent: 'Neueste', sort_salary: 'Höchstes Gehalt', sort_resp: 'Schnellste Antwort',
    apply: 'Bewerben', save: 'Speichern', saved: 'Gespeichert',
    signin_h: 'Willkommen zurück', signin_sub: 'Melden Sie sich bei Ihrem Konto an',
    reg_h: 'Kostenloses Konto erstellen', reg_sub: 'Beginnen Sie noch heute mit der Bewerbung',
    tab_signin: 'Anmelden', tab_reg: 'Konto erstellen',
  },
  es: {
    code: 'es', label: 'ES', countryCode: 'ES', langName: 'Español',
    nav_jobs: 'Empleos', nav_companies: 'Empresas', nav_signin: 'Iniciar sesión', nav_post: 'Publicar empleo',
    hero_badge: 'Solo empleos verificados en UK',
    hero_h1: 'Encuentra empleos que realmente <span class="highlight">Responden</span>',
    hero_sub: 'Sin empleos fantasma. Sin salarios ocultos. Empleadores reales que te responden en 48 horas — garantizado.',
    search_ph1: 'Título del puesto...', search_ph2: 'Ubicación (ej. Madrid)', search_btn: 'Buscar empleos',
    popular: 'Popular:',
    stats_text: '<strong>2.400+</strong> personas encontraron empleo este mes',
    features_h2: 'Por qué los candidatos nos eligen',
    features_sub: 'Resolvemos los problemas que hacen la búsqueda de empleo miserable',
    cats_h2: 'Explorar por categoría', cats_sub: 'Encuentra oportunidades en los sectores que están contratando',
    hiw_h2: 'Cómo funciona', hiw_sub: 'Consigue empleo en tres pasos sencillos',
    testi_h2: 'Lo que dicen los candidatos', testi_sub: 'Historias reales de personas que encontraron su próximo trabajo',
    cta_h2: '¿Listo para encontrar un trabajo que responda de verdad?',
    cta_sub: 'Únete a más de 50.000 candidatos que encontraron su próximo puesto en JobsPlatform.',
    cta_btn1: 'Ver empleos', cta_btn2: 'Crear perfil gratuito',
    footer_note: 'Gratis · Sin spam · Darse de baja en cualquier momento',
    jobs_h1: 'Explorar empleos <span class="highlight">verificados</span>',
    jobs_sub: '12.847 anuncios activos · Salarios mostrados · Respuesta en 48h',
    sort_recent: 'Más reciente', sort_salary: 'Mayor salario', sort_resp: 'Respuesta más rápida',
    apply: 'Solicitar', save: 'Guardar', saved: 'Guardado',
    signin_h: 'Bienvenido de vuelta', signin_sub: 'Inicia sesión en tu cuenta de JobsPlatform',
    reg_h: 'Crea tu cuenta gratuita', reg_sub: 'Empieza a postularte a empleos verificados hoy',
    tab_signin: 'Iniciar sesión', tab_reg: 'Crear cuenta',
  },
};

function getLangFromUrl() {
  var params = new URLSearchParams(window.location.search);
  var l = params.get('lang');
  return LANGS[l] ? l : null;
}

let currentLang = getLangFromUrl() || localStorage.getItem('jp_lang') || 'en';

function applyLang(code) {
  const L = LANGS[code];
  if (!L) return;
  currentLang = code;
  localStorage.setItem('jp_lang', code);

  // RTL support
  document.documentElement.setAttribute('dir', L.dir || 'ltr');
  document.documentElement.setAttribute('lang', code);

  // Update lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.innerHTML = `<i class="fa-solid fa-globe lang-globe"></i><span class="lang-code">${L.countryCode}</span><span class="lang-label">${L.label}</span><i class="fa-solid fa-chevron-down lang-caret"></i>`;
  });

  // Close dropdown
  document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));

  // Translate keyed elements
  const T = (sel, key) => document.querySelectorAll(sel).forEach(el => { if (L[key] !== undefined) el.innerHTML = L[key]; });
  const TV = (sel, key) => document.querySelectorAll(sel).forEach(el => { if (L[key] !== undefined) el.placeholder = L[key]; });

  T('[data-t="nav_jobs"]',       'nav_jobs');
  T('[data-t="nav_companies"]',  'nav_companies');
  T('[data-t="nav_signin"]',     'nav_signin');
  T('[data-t="nav_post"]',       'nav_post');
  T('[data-t="hero_badge"]',     'hero_badge');
  T('[data-t="hero_h1"]',        'hero_h1');
  T('[data-t="hero_sub"]',       'hero_sub');
  T('[data-t="popular"]',        'popular');
  T('[data-t="stats_text"]',     'stats_text');
  T('[data-t="features_h2"]',    'features_h2');
  T('[data-t="features_sub"]',   'features_sub');
  T('[data-t="cats_h2"]',        'cats_h2');
  T('[data-t="cats_sub"]',       'cats_sub');
  T('[data-t="hiw_h2"]',         'hiw_h2');
  T('[data-t="hiw_sub"]',        'hiw_sub');
  T('[data-t="testi_h2"]',       'testi_h2');
  T('[data-t="testi_sub"]',      'testi_sub');
  T('[data-t="cta_h2"]',         'cta_h2');
  T('[data-t="cta_sub"]',        'cta_sub');
  T('[data-t="cta_btn1"]',       'cta_btn1');
  T('[data-t="cta_btn2"]',       'cta_btn2');
  T('[data-t="footer_note"]',    'footer_note');
  T('[data-t="jobs_h1"]',        'jobs_h1');
  T('[data-t="jobs_sub"]',       'jobs_sub');
  T('[data-t="search_btn"]',     'search_btn');
  T('[data-t="apply"]',          'apply');
  T('[data-t="tab_signin"]',     'tab_signin');
  T('[data-t="tab_reg"]',        'tab_reg');
  T('[data-t="signin_h"]',       'signin_h');
  T('[data-t="signin_sub"]',     'signin_sub');
  T('[data-t="reg_h"]',          'reg_h');
  T('[data-t="reg_sub"]',        'reg_sub');
  TV('[data-t="search_ph1"]',    'search_ph1');
  TV('[data-t="search_ph2"]',    'search_ph2');

  // Sort options
  const sel = document.getElementById('sortSelect');
  if (sel) {
    sel.options[0] && (sel.options[0].text = L.sort_recent);
    sel.options[1] && (sel.options[1].text = L.sort_salary);
    sel.options[2] && (sel.options[2].text = L.sort_resp);
  }

  // Extended UI translations (i18n.js)
  if (window.jpApplyUI) window.jpApplyUI();
  if (window.jpApplySEO) window.jpApplySEO(code);
  if (window.onJpLangChange) window.onJpLangChange();

  try {
    var url = new URL(window.location.href);
    if (code !== 'en') url.searchParams.set('lang', code);
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  } catch (e) {}
}

function buildLangDropdown() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const wrap = document.createElement('div');
    wrap.className = 'lang-wrap';
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);

    const dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';

    Object.values(LANGS).forEach(L => {
      const item = document.createElement('button');
      item.className = 'lang-option' + (L.code === currentLang ? ' active' : '');
      item.dataset.code = L.code;
      item.innerHTML = `
        <span class="lang-option-code">${L.countryCode}</span>
        <span class="lang-option-name">${L.langName}</span>
        <i class="fa-solid fa-check lang-option-check"></i>`;
      item.onclick = e => {
        e.stopPropagation();
        applyLang(L.code);
        dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o === item));
        dropdown.classList.remove('open');
        wrap.classList.remove('open');
      };
      dropdown.appendChild(item);
    });

    wrap.appendChild(dropdown);

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.lang-wrap').forEach(w => w.classList.remove('open'));
      if (!isOpen) { dropdown.classList.add('open'); wrap.classList.add('open'); }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.lang-wrap').forEach(w => w.classList.remove('open'));
  });
}

// ─── STATS COUNTER ────────────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num').forEach(num => {
      const raw = num.textContent.replace(/[^0-9.]/g, '');
      const val = parseFloat(raw);
      if (!isNaN(val) && val > 0 && !num.dataset.animated) {
        num.dataset.animated = '1';
        const suffix = num.textContent.replace(raw, '').trim();
        animateCounter(num, val);
        if (suffix) setTimeout(() => { num.textContent = num.textContent + suffix; }, 1600);
      }
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-cards, .cta-stats').forEach(el => observer.observe(el));

// ─── AUTH STATE IN NAVBAR ────────────────────────────────────
function updateNavAuth() {
  var user = null;
  try { user = JSON.parse(localStorage.getItem('jp_user')||'null'); } catch(e){}
  var navRight = document.querySelector('.nav-right');
  if (!navRight) return;

  // Remove old auth buttons
  navRight.querySelectorAll('.nav-auth-zone').forEach(function(el){el.remove();});

  if (user) {
    var initials = ((user.firstName||user.first_name||'U')[0] + (user.lastName||user.last_name||'')[0]).toUpperCase();
    var zone = document.createElement('div');
    zone.className = 'nav-auth-zone';
    zone.style.cssText = 'display:flex;align-items:center;gap:10px;';
    zone.innerHTML =
      '<div class="nav-user-chip" onclick="toggleUserMenu(this)">' +
        '<div class="nav-avatar">' + initials + '</div>' +
        '<span class="nav-username">' + (user.firstName||user.first_name||user.email||'User') + '</span>' +
        '<i class="fa-solid fa-chevron-down" style="font-size:10px;color:var(--muted);"></i>' +
      '</div>' +
      '<div class="nav-user-menu" id="navUserMenu">' +
        '<a href="jobs.html"><i class="fa-solid fa-magnifying-glass"></i> ' + (window.jpT ? window.jpT('browse_jobs') : 'Browse Jobs') + '</a>' +
        '<a href="#" onclick="signOut();return false;"><i class="fa-solid fa-right-from-bracket"></i> ' + (window.jpT ? window.jpT('sign_out') : 'Sign Out') + '</a>' +
      '</div>';
    navRight.appendChild(zone);
  } else {
    var zone = document.createElement('div');
    zone.className = 'nav-auth-zone';
    zone.style.cssText = 'display:flex;align-items:center;gap:10px;';
    zone.innerHTML =
      '<a href="login.html" class="btn-ghost" data-t="nav_signin">Sign In</a>' +
      '<a href="login.html?tab=register&role=employer" class="btn-primary" data-t="nav_post">Post a Job</a>';
    navRight.appendChild(zone);
  }
}

function toggleUserMenu(chip) {
  var menu = document.getElementById('navUserMenu');
  if (menu) menu.classList.toggle('open');
}

function signOut() {
  localStorage.removeItem('jp_user');
  localStorage.removeItem('jp_pendingApply');
  document.body.classList.add('page-exit');
  setTimeout(function(){ window.location.href = 'index.html'; }, 280);
}

// ─── OAUTH CALLBACK HANDLER ──────────────────────────────────
async function handleOAuthCallback() {
  if (!window.location.hash.includes('access_token')) return;
  // Wait for window.sb (config.js async)
  for (var i = 0; i < 50; i++) {
    if (window.sb) break;
    await new Promise(function(r) { setTimeout(r, 100); });
  }
  if (!window.sb) return;
  var { data: { session } } = await window.sb.auth.getSession();
  if (!session || !session.user) return;
  var u = session.user;
  var meta = u.user_metadata || {};
  var fullName = meta.full_name || meta.name || '';
  var user = {
    id: u.id,
    email: u.email,
    firstName: fullName ? fullName.split(' ')[0] : u.email.split('@')[0],
    lastName:  fullName ? fullName.split(' ').slice(1).join(' ') : '',
    avatar: meta.avatar_url || '',
    role: 'jobseeker'
  };
  localStorage.setItem('jp_user', JSON.stringify(user));
  history.replaceState(null, '', window.location.pathname + window.location.search);
  updateNavAuth();
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildLangDropdown();
  applyLang(currentLang);
  updateNavAuth();
  handleOAuthCallback();
});
