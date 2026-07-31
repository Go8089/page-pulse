const STORAGE_KEY = "pagepulse-recent-audits";

export function getRecentAudits(): string[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveRecentAudit(url: string) {
  const recent = getRecentAudits();

  const updated = [
    url,
    ...recent.filter((item) => item !== url),
  ].slice(0, 5);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}