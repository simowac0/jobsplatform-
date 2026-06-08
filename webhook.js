// ─── WEBHOOK SENDER ──────────────────────────────────────────
// Sends data to Google Sheets via Apps Script Web App

async function sendToSheet(payload) {
  var url = window.WEBHOOK_URL;
  if (!url || url.includes('YOUR_DEPLOYMENT_ID')) {
    console.log('Webhook not configured — data saved locally only:', payload);
    return;
  }

  try {
    // Google Apps Script requires no-cors mode for cross-origin POST
    await fetch(url, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    console.log('✅ Sheet updated:', payload.type);
  } catch(err) {
    console.warn('Webhook error (data still saved locally):', err.message);
  }
}

// ─── SEND REGISTRATION ───────────────────────────────────────
function sheetRegistration(user, files) {
  sendToSheet({
    type:      'registration',
    firstName: user.firstName || user.first_name || '',
    lastName:  user.lastName  || user.last_name  || '',
    email:     user.email     || '',
    role:      user.role      || 'jobseeker',
    company:   user.company   || '',
    hasCv:     !!(files && files.cv),
    hasPhoto:  !!(files && files.photo),
    hasId:     !!(files && files.id),
    provider:  user.provider  || 'email',
    country:   'UK',
  });
}

// ─── SEND APPLICATION ────────────────────────────────────────
function sheetApplication(job, form) {
  sendToSheet({
    type:        'application',
    jobTitle:    job.title    || '',
    company:     job.company  || '',
    location:    job.location || '',
    salary:      job.salary   || '',
    firstName:   form.firstName   || '',
    lastName:    form.lastName    || '',
    email:       form.email       || '',
    phone:       form.phone       || '',
    city:        form.city        || '',
    postalCode:  form.postalCode  || '',
    address:     form.address     || '',
    birthDate:   form.birthDate   || '',
    coverLetter: form.coverLetter || '',
    hasId:       !!form.hasId,
    hasSelfie:   !!form.hasSelfie,
    // Files as base64 — saved to Google Drive by Apps Script
    idFileData:  form.idFileData  || null,
    idFileName:  form.idFileName  || null,
    selfieData:  form.selfieData  || form.faceVideoData || null,
    selfieName:  form.selfieName  || form.faceVideoName || null,
    faceVideoData: form.faceVideoData || form.selfieData || null,
    faceVideoName: form.faceVideoName || form.selfieName || null,
  });
}
