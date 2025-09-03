import TurndownService from 'turndown'

// Configure Turndown service for better markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
})

// Add custom rules for better conversion
turndownService.addRule('strikethrough', {
  filter: ['del', 's'] as any,
  replacement: content => `~~${content}~~`,
})

/**
 * Convert HTML to Markdown
 */
export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html)
}

/**
 * Convert Markdown to HTML (basic implementation)
 * For better conversion, we'll use MDC in the frontend
 */
export function markdownToHtml(markdown: string): string {
  // Basic conversion - in practice we'll use MDC for rendering
  return markdown
    .replace(/^# (.*$)/g, '<h1>$1</h1>')
    .replace(/^## (.*$)/g, '<h2>$1</h2>')
    .replace(/^### (.*$)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}
