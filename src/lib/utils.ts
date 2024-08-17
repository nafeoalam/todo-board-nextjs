export function formatDate(dateString: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the start of the day
  const expiryDate = new Date(dateString);
  expiryDate.setHours(0, 0, 0, 0); // Normalize expiry date to the start of the day
  const oneDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / oneDay);

  // Check conditions for Today, Overdue, or 1 Day Left
  if (daysLeft < 0) {
    return "Overdue";
  } else if (daysLeft === 0) {
    return "Today";
  } else if (daysLeft === 1) {
    return "1 day left";
  }

  // For more than one day left, return the formatted date
  const year = expiryDate.getUTCFullYear(); // Use UTC to avoid timezone issues
  const month = expiryDate.getUTCMonth() + 1; // getUTCMonth returns 0-11
  const day = expiryDate.getUTCDate();

  // Pad the month and day with a zero if below 10
  const formattedMonth = `${month < 10 ? `0${month}` : month}`;
  const formattedDay = `${day < 10 ? `0${day}` : day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}
