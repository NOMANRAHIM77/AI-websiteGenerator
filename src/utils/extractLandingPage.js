export default function extractLandingPage(text) {
  if (!text) return "";

  // Detect if AI returned HTML
  const hasHTML =
    text.includes("<html") ||
    text.includes("<body") ||
    text.includes("<style") ||
    text.includes("<div");

  if (!hasHTML) return "";

  // Extract pure HTML portion
  let match = text.match(/<html[\s\S]*<\/html>/i);
  if (match) return match[0];

  match = text.match(/<body[\s\S]*<\/body>/i);
  if (match) return `<html>${match[0]}</html>`;

  // Fallback: return entire text if it contains HTML tags
  return text;
}
