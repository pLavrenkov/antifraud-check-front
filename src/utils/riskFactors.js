export const sortArrByProp = (arr) => {
  if (arr) {
    arr.sort((a, b) => b.cnt - a.cnt);
    return arr[0].cnt;
  }
  return '';
}

// расчет разницы между датами в месяцах
export const dateTimePeriodMonths = (data) => {
  const curDate = new Date();
  const regDate = new Date(
    data.replace(/(\d{2}).(\d{2}).(\d{4})/, (match, day, month, year) => {
      return `${year}-${month}-${day}`;
    })
  );
  const month = 365 * 24 * 60 * 60 * 1000;
  const monthsPeriod = (curDate.getTime() - regDate.getTime()) / month;
  return monthsPeriod;
};
