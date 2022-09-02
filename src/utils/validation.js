export const docNoPattern = (doctypeValue) => {
    if (doctypeValue === "21") {
        return /(\d\s?){10}/;
    } else if (doctypeValue === "03") {
        return /^[IVXL]{2}-[А-Я]{2}\s[\d]{6}$/;
    } else {
        return /[\d-\s]*/;
    }
}

export const docNoFormat = (doctypeValue) => {
    if (doctypeValue === "21" || !doctypeValue) {
        return function (e) {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) {
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 10);
            } else if (value.length > 1) {
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4);
            } else {
                e.target.value = value;
            }
        };
    } else if (doctypeValue === "03") {
        return function (e) {
            const value = e.target.value.replace(/[\s-]/g, '').toUpperCase();
            if (value.length > 3) {
                e.target.value = value.slice(0, 2) + '-' + value.slice(2, 4) + ' ' + value.slice(4, 10);
            } else if (value.length > 1) {
                e.target.value = value.slice(0, 2).toUpperCase() + '-' + value.slice(2, 4).toUpperCase();

            } else {
                e.target.value = value;
            }
        };
    } else {
        return;
    }
}

export const docnoPlaceHolder = (doctypeValue) => {
    if (doctypeValue === "21") {
        return "__ __ ______";
    } else if (doctypeValue === "03") {
        return "__-__ ______";
    } else {
        return "";
    }
}
