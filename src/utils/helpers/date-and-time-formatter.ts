const getDate = (dateParam: Date | string): string => {
  if (!dateParam) {
    console.error('getDate() failed');
    return '';
  }

  const date = new Date(dateParam);
  const diff = Date.now() - date.getTime();

  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;
  const day = 24 * hour;

  const isLessThanAMin = diff < min;
  const isLessThanAnHour = diff < hour;
  const isLessThanADay = diff < day;
  const isLessThan48H = diff < 2 * day;

  if (isLessThanAMin) {
    return `Mindre enn 1 min siden`;
  } else if (isLessThanAnHour) {
    return `For ${Math.floor(diff / min)} min siden`;
  } else if (isLessThanADay) {
    return `For ${Math.floor(diff / hour)} timer siden`;
  } else if (isLessThan48H) {
    const options = { timeStyle: 'short' as const };
    return `I går kl ${new Intl.DateTimeFormat('no', options).format(date)}`;
  } else {
    const options = { dateStyle: 'short' as const, timeStyle: 'short' as const };
    const localDate = new Intl.DateTimeFormat('no', options).format(date);
    return localDate.toString();
  }
};

export default getDate;
