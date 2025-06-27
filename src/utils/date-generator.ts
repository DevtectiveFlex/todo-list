export function dateGenerator() {
  return `${String(Math.floor(Math.random() * 30)).padStart(2, '0')}.${String(Math.floor(Math.random() * 13)).padStart(2, '0')}.2025`;
}
