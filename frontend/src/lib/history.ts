import type { AuditReport } from "../types/audit";

export interface SavedAudit {
  id: string;
  url: string;
  score: number;
  createdAt: string;
  report: AuditReport;
}

const STORAGE_KEY = "pagepulse-history";

export function getRecentAudits(): SavedAudit[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRecentAudit(audit: Omit<SavedAudit, "id" | "createdAt">) {
  const history = getRecentAudits();

  const newAudit: SavedAudit = {
    ...audit,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  history.unshift(newAudit);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history.slice(0, 20))
  );
}

export function deleteAudit(id: string) {
  const history = getRecentAudits().filter(
    (audit) => audit.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}