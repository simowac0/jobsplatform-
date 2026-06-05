// ─── CONFIG LOADER ───────────────────────────────────────────
// Fetches public config from /api/config (env vars set on server)
// then initialises Supabase and exposes window.sb for auth.js

window.sb          = null;
window.WEBHOOK_URL = '';

(async function initConfig() {
  try {
    var res = await fetch('/api/config');
    var cfg = await res.json();

    window.WEBHOOK_URL = cfg.webhookUrl || '';

    if (cfg.supabaseUrl && window.supabase) {
      window.sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnon);
      console.log('✅ Supabase connected');

      // Handle OAuth redirect callback (Google etc.)
      var hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        var { data: { session }, error } = await window.sb.auth.getSession();
        if (session && session.user) {
          var u = session.user;
          var meta = u.user_metadata || {};
          var user = {
            id: u.id,
            email: u.email,
            firstName: meta.full_name ? meta.full_name.split(' ')[0] : (meta.name || u.email),
            lastName:  meta.full_name ? meta.full_name.split(' ').slice(1).join(' ') : '',
            avatar: meta.avatar_url || '',
            role: 'jobseeker'
          };
          localStorage.setItem('jp_user', JSON.stringify(user));
          // Clean URL hash
          history.replaceState(null, '', window.location.pathname + window.location.search);
          // Refresh navbar if updateNavAuth exists
          if (typeof updateNavAuth === 'function') updateNavAuth();
        }
      }
    } else {
      console.warn('⚠️ Supabase not configured — using localStorage fallback');
    }
  } catch (e) {
    console.warn('⚠️ Config fetch failed — using localStorage fallback:', e.message);
  }
})();
