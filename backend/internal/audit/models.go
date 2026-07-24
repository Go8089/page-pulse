package audit

type AuditReport struct {
	HTTPStatus       int    `json:"http_status"`
	ResponseTimeMS   int64  `json:"response_time_ms"`
	Title            string `json:"title"`
	MetaDescription  string `json:"meta_description"`
	H1Count          int    `json:"h1_count"`
	ImagesMissingAlt int    `json:"images_missing_alt"`
	WordCount        int    `json:"word_count"`
}
