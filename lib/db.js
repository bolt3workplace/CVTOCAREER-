const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SUBMISSIONS_PATH = path.join(DATA_DIR, 'submissions.json');
const SETTINGS_PATH = path.join(DATA_DIR, 'db.json');
const SESSIONS_PATH = path.join(DATA_DIR, 'sessions.json');

function ensureFile(filePath, defaultValue) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
  }
}

function readJSON(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJSON(filePath, data) {
  ensureFile(filePath, data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function getSettings() {
  ensureFile(SETTINGS_PATH, {});
  return readJSON(SETTINGS_PATH, {});
}

function saveSettings(data) {
  writeJSON(SETTINGS_PATH, data);
}

function getSubmissions() {
  ensureFile(SUBMISSIONS_PATH, []);
  return readJSON(SUBMISSIONS_PATH, []);
}

function addSubmission(record) {
  const all = getSubmissions();
  all.push(record);
  writeJSON(SUBMISSIONS_PATH, all);
  return record;
}

function getSessions() {
  ensureFile(SESSIONS_PATH, {});
  return readJSON(SESSIONS_PATH, {});
}

function saveSession(sessionId, sessionData) {
  const all = getSessions();
  all[sessionId] = sessionData;
  writeJSON(SESSIONS_PATH, all);
}

function getSession(sessionId) {
  const all = getSessions();
  return all[sessionId] || null;
}

function deleteSession(sessionId) {
  const all = getSessions();
  delete all[sessionId];
  writeJSON(SESSIONS_PATH, all);
}

module.exports = {
  getSettings,
  saveSettings,
  getSubmissions,
  addSubmission,
  getSessions,
  saveSession,
  getSession,
  deleteSession,
  ensureFile,
  SUBMISSIONS_PATH,
  SETTINGS_PATH,
  SESSIONS_PATH,
};
