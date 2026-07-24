import axios from "axios";
import type { AuditReport } from "../types/audit";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

export async function auditUrl(url: string): Promise<AuditReport> {
  const response = await api.post<AuditReport>("/audit", { url });
  return response.data;
}