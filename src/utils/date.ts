function formatDate(date: Date, separator = '-'): string {
  const d = new Date(date);
  return (
    d.getDate() + separator + (d.getMonth() + 1) + separator + d.getFullYear()
  );
}

function formatDateForInput(
  date: Date | string | undefined | null,
  separator = '-',
): string {
  if (!date) {
    return '';
  }
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return (
    d.getFullYear() +
    separator +
    (month.toString().length === 1 ? `0${month}` : month) +
    separator +
    (day.toString().length === 1 ? `0${day}` : day)
  );
}

export { formatDate, formatDateForInput };
