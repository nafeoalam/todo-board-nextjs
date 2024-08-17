export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear(); // Use UTC to avoid timezone issues
  const month = date.getUTCMonth() + 1; // getUTCMonth returns 0-11
  const day = date.getUTCDate();

  // Pad the month and day with a zero if below 10
  const formattedMonth = `${month < 10 ? `0${month}` : month}`;
  const formattedDay = `${day < 10 ? `0${day}` : day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}
