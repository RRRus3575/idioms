export function isYoungerThanNDays(createdAtISO, days = 30) {
  if (!createdAtISO) return false;
  const created = new Date(createdAtISO);
  if (isNaN(+created)) return false;

  const MS = 24 * 60 * 60 * 1000;
  return Date.now() - created.getTime() < days * MS;
}

