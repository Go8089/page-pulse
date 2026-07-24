package audit

type AuditRequest struct {
	URL string `json:"url" binding:"required,url"`
}
