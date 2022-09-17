export const sortArrByProp = (arr) => {
  if (arr) {
    arr.sort((a, b) => b.cnt - a.cnt);
    return arr[0].cnt;
  }
  return '';
}

// расчет разницы между датами в месяцах, дата регистрации
export const dateRegTimePeriodMonths = (data) => {
  const curDate = new Date();
  const regDate = new Date(
    data.replace(/(\d{2}).(\d{2}).(\d{4})/, (match, day, month, year) => {
      return `${year}-${month}-${day}`;
    })
  );
  const month = 365 * 24 * 60 * 5 * 1000;
  const monthsPeriod = (curDate.getTime() - regDate.getTime()) / month;
  console.log(monthsPeriod);
  return monthsPeriod;
};

// расчет разницы между датами в месяцах, дата регистрации
export const dateOGRNTimePeriodMonths = (data) => {
  const curDate = new Date();
  const regDate = new Date(data);
  const month = 365 * 24 * 60 * 5 * 1000;
  const monthsPeriod = (curDate.getTime() - regDate.getTime()) / month;
  console.log(monthsPeriod);
  return monthsPeriod;
};
