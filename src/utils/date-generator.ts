export function dateGenerator(generateCurrent = false) {
  if (generateCurrent) {
   return new Intl.DateTimeFormat('ru-RU').format(Date.now())
  }

  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = new Date().getFullYear();

  return `${day}.${month}.${year}`;
};