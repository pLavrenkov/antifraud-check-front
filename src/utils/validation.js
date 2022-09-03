export const docNoPattern = (doctypeValue) => {
    if (doctypeValue === "21") {
        return /(\d\s?){10}/;
    } else if (doctypeValue === "03") {
        return /^[IVXL]{2}-[А-Я]{2}\s[\d]{6}$/;
    } else {
        return /[\d-\s]*/;
    }
}

export const docNoFormat = (doctypeValue, key) => {
    console.log(key)
    if (doctypeValue === "21" || !doctypeValue) {
        return function (e) {
            const valueLength = e.target.value.replace(/\D/g, '').length;
            if (valueLength > 3 && key !== 'Backspace') {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 10);
            } else if (valueLength > 1 && key !== 'Backspace') {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4);
            } else if (key === 'Backspace') {
                return;
            } else {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value;
            }
        };
    } else if (doctypeValue === "03") {
        return function (e) {
            const valueLength = e.target.value.replace(/[\s-]/g, '').length;
            if (valueLength > 3 && key !== 'Backspace') {
                const value = e.target.value.replace(/[\s-]/g, '').toUpperCase();
                e.target.value = value.slice(0, 2) + '-' + value.slice(2, 4) + ' ' + value.slice(4, 10);
            } else if (valueLength > 1 && key !== 'Backspace') {
                const value = e.target.value.replace(/[\s-]/g, '').toUpperCase();
                e.target.value = value.slice(0, 2).toUpperCase() + '-' + value.slice(2, 4).toUpperCase();
            } else if (key === 'Backspace' || key === 'Delete') {
                return;
            } else {
                const value = e.target.value.replace(/[\s-]/g, '').toUpperCase();
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
