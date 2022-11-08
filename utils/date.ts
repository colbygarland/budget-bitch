const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const getCurrentDate = () => {
  let now = new Date();
  const offset = now.getTimezoneOffset();
  now = new Date(now.getTime() - offset * 60 * 1000);
  return formatDate(now);
};

export const getBeginningOfMonth = (date: string) => {
  const d = new Date(date);
  return formatDate(new Date(d.getFullYear(), d.getMonth(), 1));
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getMonthName = (date: string) => {
  const d = new Date(date);
  return monthNames[d.getMonth()];
};

export const getYear = (date: string) => {
  const d = new Date(date);
  return d.getFullYear();
};
