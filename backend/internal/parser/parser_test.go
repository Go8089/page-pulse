package parser

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParse_HappyPath(t *testing.T) {
	p := New()
	html := `
	<html>
	<head>
		<title>Example Domain</title>
		<meta name="description" content="Example description">
	</head>
	<body>
		<h1>Main Heading</h1>

		<img src="a.jpg" alt="image">

		<img src="b.jpg">

		<p>Hello world from Page Pulse parser test.</p>
	</body>
	</html>
	`

	result, err := p.Parse(html)

	assert.NoError(t, err)
	assert.Equal(t, "Example Domain", result.Title)
	assert.Equal(t, "Example description", result.MetaDescription)
	assert.Equal(t, 1, result.H1Count)
	assert.Equal(t, 1, result.ImagesMissingAlt)
	assert.Greater(t, result.WordCount, 0)
}

func TestParse_NoMetaDescription(t *testing.T) {
	p := New()

	html := `
	<html>
	<head>
		<title>Example</title>
	</head>
	<body>
		<h1>Hello</h1>
	</body>
	</html>
	`

	result, err := p.Parse(html)

	assert.NoError(t, err)
	assert.Empty(t, result.MetaDescription)
}

func TestParse_MultipleH1(t *testing.T) {
	p := New()
	html := `
	<html>
	<body>
		<h1>One</h1>
		<h1>Two</h1>
		<h1>Three</h1>
	</body>
	</html>
	`

	result, err := p.Parse(html)

	assert.NoError(t, err)
	assert.Equal(t, 3, result.H1Count)
}

func TestParse_ImageAltCount(t *testing.T) {
	p := New()
	html := `
	<html>
	<body>
		<img src="1.png">
		<img src="2.png">
		<img src="3.png" alt="logo">
	</body>
	</html>
	`

	result, err := p.Parse(html)

	assert.NoError(t, err)
	assert.Equal(t, 2, result.ImagesMissingAlt)
}
