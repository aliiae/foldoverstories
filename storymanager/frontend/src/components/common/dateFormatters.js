export const formatTimeStamp = (dateISOString) => {
  // hh:mm, dd/mm/yyyy
  const date = new Date(dateISOString);
  return `${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}, ${date.toLocaleDateString()}`;
};

export const formatTimeStampDateOnly = (dateISOString) => {
  // dd/mm/yyyy
  return new Date(dateISOString).toLocaleDateString();
};
