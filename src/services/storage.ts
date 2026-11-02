import { UserStats, TruthReport } from '../types';

const STATS_KEY = 'nyayaverse_user_stats';
const SCANS_KEY = 'nyayaverse_scan_history';
const COMPLAINTS_KEY = 'nyayaverse_saved_complaints';
const RADAR_USER_REPORTS_KEY = 'nyayaverse_user_radar_reports';

const INITIAL_STATS: UserStats = {
  consumerIQ: 68,
  moneySaved: 12450,
  scansCount: 4,
  courtroomWins: 2,
  scamSurvivalScore: 780,
  badgesUnlocked: ['cadet', 'first_scan', 'mrp_defender'],
  savedComplaints: 1,
};

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_STATS;
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {}
}

export function updateUserStats(updater: (prev: UserStats) => UserStats) {
  const current = getUserStats();
  const next = updater(current);
  saveUserStats(next);
  return next;
}

export function getScanHistory(): TruthReport[] {
  try {
    const raw = localStorage.getItem(SCANS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveScanToHistory(report: TruthReport) {
  try {
    const history = getScanHistory();
    const updated = [report, ...history.filter(h => h.id !== report.id)].slice(0, 20);
    localStorage.setItem(SCANS_KEY, JSON.stringify(updated));
    updateUserStats(s => ({
      ...s,
      scansCount: s.scansCount + 1,
      consumerIQ: Math.min(100, s.consumerIQ + 3),
      badgesUnlocked: Array.from(new Set([...s.badgesUnlocked, 'evidence_master']))
    }));
  } catch {}
}

export function getSavedComplaints(): any[] {
  try {
    const raw = localStorage.getItem(COMPLAINTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveComplaint(complaint: any) {
  try {
    const list = getSavedComplaints();
    const updated = [complaint, ...list].slice(0, 15);
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
    updateUserStats(s => ({
      ...s,
      savedComplaints: s.savedComplaints + 1,
      consumerIQ: Math.min(100, s.consumerIQ + 5),
      badgesUnlocked: Array.from(new Set([...s.badgesUnlocked, 'legal_eagle']))
    }));
  } catch {}
}

export function getUserRadarReports(): any[] {
  try {
    const raw = localStorage.getItem(RADAR_USER_REPORTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveUserRadarReport(report: any) {
  try {
    const list = getUserRadarReports();
    localStorage.setItem(RADAR_USER_REPORTS_KEY, JSON.stringify([report, ...list]));
    updateUserStats(s => ({
      ...s,
      consumerIQ: Math.min(100, s.consumerIQ + 4),
      badgesUnlocked: Array.from(new Set([...s.badgesUnlocked, 'whistleblower']))
    }));
  } catch {}
}
