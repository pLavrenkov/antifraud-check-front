export const docNoPattern = (doctypeValue) => {
    if (doctypeValue === "21") {
        return /(\d\s?){10}/;
    } else if (doctypeValue === "03") {
        return /^[IVXL]{2}-[А-Я]{2}\s[\d]{6}$/;
    } else{
        return /[\d-\s]*/;
    }
}

export const docNoFormat = (doctypeValue) => {
    if (doctypeValue === "21" || !doctypeValue) {
        return function (e) {
            const value = e.target.value.replace(/\s/g, '');
            if (value.length > 4) {
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 10);
            } else if (value.length > 2) {
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4);

            } else {
                e.target.value = value;
            }
        };
    } else {
        return;
    }
}