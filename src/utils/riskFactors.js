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
  return monthsPeriod;
};

// расчет разницы между датами в месяцах, дата регистрации
export const dateOGRNTimePeriodMonths = (data) => {
  const curDate = new Date();
  const regDate = new Date(data);
  const month = 365 * 24 * 60 * 5 * 1000;
  const monthsPeriod = (curDate.getTime() - regDate.getTime()) / month;
  return monthsPeriod;
};

// расчет разницы по выручке
export const revenueDiff = (formArr) => {
  if (formArr) {
    formArr.sort((a, b) => b.yearcode - a.yearcode);
    if (formArr[1].revenue) {
      return formArr[0].revenue / formArr[1].revenue;
    }
    return '';
  }
  return '';
}

export const expenseShare = (formArr) => {
  if (formArr) {
    formArr.sort((a, b) => b.yearcode - a.yearcode);
    if (formArr[0].revenue && formArr[0].expense) {
      return formArr[0].expense / formArr[0].revenue;
    }
    return '';
  }
  return '';
}

export const checkTaxMode = (taxModeArr) => {
  if (taxModeArr) {
    taxModeArr.sort((a, b) => b.yearcode - a.yearcode);
    if (taxModeArr[0].envd === 1) {
      return 'единый налог на вмененный доход';
    } else if (taxModeArr[0].eshn === 1) {
      return 'единый сельскохозяйственный налог';
    } else if (taxModeArr[0].spr === 1) {
      return 'режим соглашения по разделу продукции';
    } else if (taxModeArr[0].usn === 1) {
      return 'упрощенная система налогобложения';
    } else if (taxModeArr[0].empty === 1) {
      return 'основная система налогообложения';
    } else {
      return 'система налогообложения не определена';
    }
  }
  return 'система налогообложения не определена';
}
