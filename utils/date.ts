const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const getNow = (): Date => {
  let now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000);
};

export const getCurrentDate = () => {
  return formatDate(getNow());
};

export const getCurrentMonth = () => {
  const currentDate = getCurrentDate().split('-');
  return `${currentDate[0]}-${currentDate[1]}`;
};

export const getBeginningOfMonth = (date: string) => {
  return `${date}-01`;
};

export const getEndOfMonth = (date: string) => {
  const d = new Date(date);
  return formatDate(new Date(d.getFullYear(), d.getMonth() + 2, 0));
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
  const month = Number(date.split('-')[1]);
  return monthNames[month - 1];
};

export const getYear = (date: string) => {
  return date.split('-')[0];
};
