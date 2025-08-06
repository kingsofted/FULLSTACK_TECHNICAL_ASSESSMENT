export const formatDate = (dateValue?: string | number) => {
  if (!dateValue) return 'Undefined';

  let date;

  if (typeof dateValue === 'number' || /^\d+$/.test(String(dateValue))) {
    date = new Date(Number(dateValue));
  } else {
    date = new Date(dateValue);
  }

  return isNaN(date.getTime()) ? 'Undefined' : date.toLocaleString();
};