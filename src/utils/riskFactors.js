export const sortArrByProp = (arr) => {
    if (arr) {
    arr.sort((a, b) => b.cnt - a.cnt);
    return arr[0].cnt;
    }
    return '';
  }
