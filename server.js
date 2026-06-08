const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { createClient } = require('@supabase/supabase-js');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── ENV VARS (set in .env locally, Vercel env dashboard in prod) ─
const SUPABASE_URL         = process.env.SUPABASE_URL  || '';
const SUPABASE_ANON        = process.env.SUPABASE_ANON || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_KEY || '';
const WEBHOOK_URL          = process.env.WEBHOOK_URL   || '';

let supabaseAdmin = null;
if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
} else if (SUPABASE_URL && SUPABASE_ANON) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON);
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

function dataUrlToBuffer(dataUrl) {
  if (!dataUrl || !dataUrl.includes(',')) return null;
  const mime = (dataUrl.match(/:(.*?);/) || [])[1] || 'application/octet-stream';
  const raw  = dataUrl.split(',')[1];
  return { buffer: Buffer.from(raw, 'base64'), mime };
}

async function uploadBuffer(sb, bucket, filePath, buffer, mime) {
  const { data, error } = await sb.storage.from(bucket).upload(filePath, buffer, {
    contentType: mime,
    upsert: true,
  });
  if (error) return { error: error.message };
  return { path: data.path };
}

// In-memory store
const users = [];

function ago(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

const jobs = [
  { id:1,  title:"Senior Care Assistant",    company:"SunCare Group",       location:"Manchester", type:"Full-time",  salary:"£28,000–£32,000", category:"Care",             remote:false, response:"24h", featured:true,  postedAt: ago(15)   },
  { id:2,  title:"Warehouse Operative",       company:"Amazon Logistics",    location:"Birmingham", type:"Full-time",  salary:"£26,000–£29,000", category:"Warehouse",        remote:false, response:"48h", featured:false, postedAt: ago(42)   },
  { id:3,  title:"Customer Service Advisor",  company:"BT Group",            location:"Remote",     type:"Part-time",  salary:"£22,000–£25,000", category:"Customer Service", remote:true,  response:"24h", featured:true,  postedAt: ago(78)   },
  { id:4,  title:"Retail Assistant",          company:"Tesco PLC",           location:"London",     type:"Part-time",  salary:"£23,000–£24,000", category:"Retail",           remote:false, response:"48h", featured:false, postedAt: ago(130)  },
  { id:5,  title:"Admin Officer",             company:"NHS Foundation Trust",location:"Leeds",      type:"Full-time",  salary:"£24,000–£27,000", category:"Admin",            remote:false, response:"48h", featured:false, postedAt: ago(200)  },
  { id:6,  title:"Junior IT Support",         company:"TechCorp UK",         location:"Remote",     type:"Full-time",  salary:"£28,000–£35,000", category:"IT",               remote:true,  response:"24h", featured:false, postedAt: ago(320)  },
  { id:7,  title:"Cleaning Operative",        company:"CleanPro Services",   location:"Sheffield",  type:"Part-time",  salary:"£12–£14/hr",      category:"Cleaning",         remote:false, response:"24h", featured:false, postedAt: ago(480)  },
  { id:8,  title:"Teaching Assistant",        company:"Bright Futures",      location:"Bristol",    type:"Full-time",  salary:"£20,000–£24,000", category:"Teaching",         remote:false, response:"48h", featured:false, postedAt: ago(720)  },
  { id:9,  title:"Warehouse Team Leader",     company:"DHL Supply Chain",    location:"Coventry",   type:"Full-time",  salary:"£32,000–£38,000", category:"Warehouse",        remote:false, response:"48h", featured:false, postedAt: ago(1440) },
  { id:10, title:"Home Care Worker",          company:"Helping Hands",       location:"Nottingham", type:"Part-time",  salary:"£13–£16/hr",      category:"Care",             remote:false, response:"24h", featured:false, postedAt: ago(2160) },
  { id:11, title:"Data Entry Administrator",  company:"InsureNow Ltd",       location:"Remote",     type:"Full-time",  salary:"£21,000–£24,000", category:"Admin",            remote:true,  response:"48h", featured:false, postedAt: ago(2880) },
  { id:12, title:"Retail Stock Controller",   company:"Next PLC",            location:"Glasgow",    type:"Full-time",  salary:"£24,000–£27,000", category:"Retail",           remote:false, response:"48h", featured:false, postedAt: ago(4320) },
];

// ─── API ROUTES ───────────────────────────────────────────────

// GET /api/jobs — with optional ?q=&category=&location=&type=&remote=&since=ISO
app.get('/api/jobs', (req, res) => {
  let result = [...jobs];
  const { q, category, location, type, remote, since } = req.query;
  if (q)        result = result.filter(j => j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase()));
  if (category) result = result.filter(j => j.category.toLowerCase() === category.toLowerCase());
  if (location) result = result.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  if (type)     result = result.filter(j => j.type.toLowerCase() === type.toLowerCase());
  if (remote === 'true') result = result.filter(j => j.remote);
  if (since)    result = result.filter(j => new Date(j.postedAt) > new Date(since));
  // Always newest first
  result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  res.json({ total: result.length, jobs: result, serverTime: new Date().toISOString() });
});

// GET /api/jobs/:id
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// POST /api/register
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password, role, company } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    password, // plaintext — fine for demo; use bcrypt in production
    role: role || 'jobseeker',
    company: company || null,
    createdAt: new Date().toISOString()
  };
  users.push(user);

  const { password: _, ...safeUser } = user;
  res.status(201).json({ message: 'Account created successfully.', user: safeUser });
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  const { password: _, ...safeUser } = user;
  res.json({ message: 'Login successful.', user: safeUser });
});

// GET /api/config — public config for the client (safe to expose)
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl:  SUPABASE_URL,
    supabaseAnon: SUPABASE_ANON,
    webhookUrl:   WEBHOOK_URL,
  });
});

// POST /api/applications — server-side submit (bypasses client RLS issues)
app.post('/api/applications', async (req, res) => {
  const body = req.body || {};
  const {
    jobId, jobTitle, company, location,
    firstName, lastName, email, phone, city, postalCode, address, birthDate, coverLetter,
    cvBase64, cvName,
    idBase64, idName,
    selfieBase64,
    videoBase64, videoName,
  } = body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ ok: false, message: 'Name and email are required.' });
  }

  const ts = Date.now();
  const safe = (firstName + '_' + lastName).replace(/\s+/g, '_').toLowerCase();
  const warnings = [];
  let cvPath = null, idPath = null, selfiePath = null, videoPath = null;

  if (supabaseAdmin) {
    if (cvBase64) {
      const f = dataUrlToBuffer(cvBase64);
      if (f) {
        const r = await uploadBuffer(supabaseAdmin, 'cvs', safe + '_' + ts + '_cv.pdf', f.buffer, f.mime || 'application/pdf');
        if (r.error) warnings.push('CV upload: ' + r.error); else cvPath = r.path;
      }
    }
    if (idBase64) {
      const f = dataUrlToBuffer(idBase64);
      if (f) {
        const ext = (idName || 'id.jpg').split('.').pop() || 'jpg';
        const r = await uploadBuffer(supabaseAdmin, 'documents', safe + '_' + ts + '_id.' + ext, f.buffer, f.mime || 'image/jpeg');
        if (r.error) warnings.push('ID upload: ' + r.error); else idPath = r.path;
      }
    }
    if (selfieBase64) {
      const f = dataUrlToBuffer(selfieBase64);
      if (f) {
        const r = await uploadBuffer(supabaseAdmin, 'photos', safe + '_' + ts + '_selfie.jpg', f.buffer, f.mime || 'image/jpeg');
        if (r.error) warnings.push('Selfie upload: ' + r.error); else selfiePath = r.path;
      }
    }
    if (videoBase64) {
      const f = dataUrlToBuffer(videoBase64);
      if (f) {
        const ext = (videoName || 'face.webm').includes('mp4') ? 'mp4' : 'webm';
        const r = await uploadBuffer(supabaseAdmin, 'photos', safe + '_' + ts + '_face.' + ext, f.buffer, f.mime || 'video/webm');
        if (r.error) warnings.push('Video upload: ' + r.error); else videoPath = r.path;
      }
    }

    const row = {
      job_id: jobId || null,
      job_title: jobTitle || '',
      company: company || '',
      location: location || '',
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || '',
      city: city || '',
      postal_code: postalCode || '',
      address: address || '',
      birth_date: birthDate || null,
      cover_letter: coverLetter || '',
      cv_url: cvPath,
      id_doc_url: idPath,
      selfie_url: selfiePath,
      video_url: videoPath,
      status: 'pending',
    };

    const { data, error } = await supabaseAdmin.from('applications').insert(row).select('id').single();
    if (error) {
      return res.status(500).json({ ok: false, message: error.message, warnings });
    }
    return res.json({ ok: true, id: data.id, warnings });
  }

  // No Supabase — accept and return ok (client saves locally)
  res.json({ ok: true, id: 'local_' + ts, warnings: ['Supabase not configured on server'] });
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalJobs:    jobs.length,
    totalUsers:   users.length,
    featuredJobs: jobs.filter(j => j.featured).length,
  });
});

// ─── ROOT → SPLASH ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'splash.html'));
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  if (req.path.includes('.')) return res.status(404).send('Not found');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── START (local dev) / EXPORT (Vercel serverless) ──────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('');
    console.log('  ✅ JobsPlatform server running!');
    console.log(`  🌐 Open: http://localhost:${PORT}`);
    console.log('');
  });
}

module.exports = app;
