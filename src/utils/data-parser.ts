export function parseDate(date: string): number {
  const [day, month, year] = date.split('.').map(Number);
  const result = new Date(year, month - 1, day).getTime();
  return !isNaN(result) ? result : 0;
}
