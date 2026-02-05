import dayjs from 'dayjs';

// Date utility functions

export const formatDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY');
};

export const formatTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('HH:mm');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY HH:mm');
};

export const isToday = (date) => {
  if (!date) return false;
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isTomorrow = (date) => {
  if (!date) return false;
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
};

export const isPast = (date) => {
  if (!date) return false;
  return dayjs(date).isBefore(dayjs(), 'day');
};

export const getRelativeDate = (date) => {
  if (!date) return '';
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isPast(date)) return 'Overdue';
  return formatDate(date);
};

export const getStartOfDay = (date = new Date()) => {
  return dayjs(date).startOf('day').toDate();
};

export const getEndOfDay = (date = new Date()) => {
  return dayjs(date).endOf('day').toDate();
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
};

export const getDaysDifference = (date1, date2) => {
  if (!date1 || !date2) return 0;
  return dayjs(date2).diff(dayjs(date1), 'day');
};
