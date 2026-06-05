// ════════════════════════════════════════════════════════════════
// JOBSPLATFORM — Google Apps Script Webhook
// ════════════════════════════════════════════════════════════════
// INSTALLATION:
// 1. Open Google Sheets → Extensions → Apps Script
// 2. Paste this entire file → Save
// 3. Deploy → New Deployment → Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the Web App URL → paste in webhook-config.js
// ════════════════════════════════════════════════════════════════

var SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Sheet names
var SHEET_REGISTRATIONS = 'Inscriptions';
var SHEET_APPLICATIONS  = 'Candidatures';

// Google Drive root folder for all uploaded files
var DRIVE_FOLDER_NAME = 'JobsPlatform — Candidatures';

// ─── RECEIVE POST REQUEST ────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type;

    if (type === 'registration') {
      saveRegistration(data);
    } else if (type === 'application') {
      saveApplication(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── ALSO HANDLE GET (for testing) ───────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'JobsPlatform webhook active ✅' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── SAVE REGISTRATION ───────────────────────────────────────
function saveRegistration(data) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = getOrCreateSheet(ss, SHEET_REGISTRATIONS, [
    'Date & Heure',
    'Prénom',
    'Nom',
    'Email',
    'Rôle',
    'Entreprise',
    'A un CV',
    'A une Photo',
    'A une Pièce d\'Identité',
    'Fournisseur',
    'Pays',
    'IP Approximatif',
  ]);

  sheet.appendRow([
    new Date(),
    data.firstName   || '',
    data.lastName    || '',
    data.email       || '',
    data.role        || 'jobseeker',
    data.company     || '',
    data.hasCv       ? '✅ Oui' : '❌ Non',
    data.hasPhoto    ? '✅ Oui' : '❌ Non',
    data.hasId       ? '✅ Oui' : '❌ Non',
    data.provider    || 'email',
    data.country     || 'UK',
    data.ip          || '',
  ]);
}

// ─── SAVE APPLICATION ────────────────────────────────────────
function saveApplication(data) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = getOrCreateSheet(ss, SHEET_APPLICATIONS, [
    'Date & Heure',
    'Poste',
    'Entreprise',
    'Lieu',
    'Salaire',
    'Prénom Candidat',
    'Nom Candidat',
    'Email',
    'Téléphone',
    'Ville',
    'Code Postal',
    'Adresse',
    'Date de Naissance',
    'Lettre de Motivation',
    'Pièce d\'Identité (Drive)',
    'Selfie (Drive)',
    'Statut',
  ]);

  // Upload files to Google Drive and get shareable links
  var idLink     = uploadFileToDrive(data, 'id');
  var selfieLink = uploadFileToDrive(data, 'selfie');

  sheet.appendRow([
    new Date(),
    data.jobTitle    || '',
    data.company     || '',
    data.location    || '',
    data.salary      || '',
    data.firstName   || '',
    data.lastName    || '',
    data.email       || '',
    data.phone       || '',
    data.city        || '',
    data.postalCode  || '',
    data.address     || '',
    data.birthDate   || '',
    data.coverLetter || '',
    idLink     ? idLink     : (data.hasId     ? '✅ Reçu' : '❌ Non'),
    selfieLink ? selfieLink : (data.hasSelfie ? '✅ Reçu' : '❌ Non'),
    '🟡 En attente',
  ]);
}

// ─── UPLOAD FILE TO GOOGLE DRIVE ─────────────────────────────
function uploadFileToDrive(data, type) {
  try {
    var fileData = type === 'id' ? data.idFileData : data.selfieData;
    var fileName = type === 'id' ? data.idFileName : data.selfieName;
    if (!fileData || !fileName) return null;

    // Parse data URL: "data:image/jpeg;base64,/9j/..."
    var parts    = fileData.split(',');
    var mimeType = parts[0].match(/:(.*?);/)[1];
    var decoded  = Utilities.base64Decode(parts[1]);
    var blob     = Utilities.newBlob(decoded, mimeType, fileName);

    // Get or create root folder
    var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
    var root    = folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);

    // Sub-folder per applicant: "email — jobTitle — date"
    var subName = (data.email || 'unknown')
      + ' — ' + (data.jobTitle || 'job')
      + ' — ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var subs = root.getFoldersByName(subName);
    var sub  = subs.hasNext() ? subs.next() : root.createFolder(subName);

    var file = sub.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch(e) {
    Logger.log('Drive upload error (' + type + '): ' + e.message);
    return null;
  }
}

// ─── HELPER: get or create sheet with headers ────────────────
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Style the header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground('#1a2035');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, headers.length, 160);
  }
  return sheet;
}
