const formatIdPrelevement = (id: number): string => {
  const newId = `${id}`;
  return `C${'0'.repeat(3 - newId.length) + newId}`;
};

export { formatIdPrelevement };
