function formatDate(date: Date, separator = '-'): string {
  const d = new Date(date);
  return (
    d.getDate() + separator + (d.getMonth() + 1) + separator + d.getFullYear()
  );
}

export { formatDate };
