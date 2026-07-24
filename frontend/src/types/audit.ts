export interface AuditReport {
  http_status: number;
  response_time_ms: number;
  title: string;
  meta_description: string;
  h1_count: number;
  images_missing_alt: number;
  word_count: number;
}