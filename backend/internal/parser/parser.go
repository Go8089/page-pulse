package parser

import (
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Parser struct{}

type Result struct {
	Title            string
	MetaDescription  string
	H1Count          int
	ImagesMissingAlt int
	WordCount        int
}

func New() *Parser {
	return &Parser{}
}

func (p *Parser) Parse(html string) (*Result, error) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		return nil, err
	}

	title := strings.TrimSpace(doc.Find("title").First().Text())
	metaDescription, _ := doc.Find(`meta[name="description"]`).Attr("content")
	h1Count := doc.Find("h1").Length()

	imagesMissingAlt := 0
	doc.Find("img").Each(func(i int, s *goquery.Selection) {
		if _, ok := s.Attr("alt"); !ok {
			imagesMissingAlt++
		}
	})

	doc.Find("script").Remove()
	doc.Find("style").Remove()

	wordCount := len(strings.Fields(doc.Text()))

	return &Result{
		Title:            title,
		MetaDescription:  strings.TrimSpace(metaDescription),
		H1Count:          h1Count,
		ImagesMissingAlt: imagesMissingAlt,
		WordCount:        wordCount,
	}, nil
}
