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

    } else {
      console.warn('⚠️ Supabase not configured — using localStorage fallback');
    }
  } catch (e) {
    console.warn('⚠️ Config fetch failed — using localStorage fallback:', e.message);
  }
})();
