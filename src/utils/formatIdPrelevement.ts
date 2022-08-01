const formatIdPrelevement = (id: number | null | undefined): string => {
  if (!id) {
    return '';
  }

  const newId = `${id}`;
  return `C${'0'.repeat(3 - newId.length) + newId}`;
};

export { formatIdPrelevement };
