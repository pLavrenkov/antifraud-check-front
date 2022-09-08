export const docNoPattern = (doctypeValue) => {
    if (doctypeValue === "21") {
        return /(\d\s?){10}/;
    } else if (doctypeValue === "03") {
        return /^[IVXLCDM]{1,6}-[А-Я]{2}\s[\d]{6}$/;
    } else if (doctypeValue === "01") {
        return /^[IVXLCDM]{1,6}-[А-Я]{2}\s[\d]{6}$/;
    } else {
        return /[\d-\s]*/;
    }
}

export const docNoFormat = (doctypeValue, key) => {
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
            const docNum = e.target.value.replace(/[\s-]/g, '').toUpperCase().match(/([IXVLCDM]*)([А-Я]{0,2})(\d{0,6})/);
            if (docNum[3] && key !== 'Backspace') {
                e.target.value = docNum[1] + '-' + docNum[2] + ' ' + docNum[3];
            } else if (docNum[2] && key !== 'Backspace') {
                e.target.value = docNum[1] + '-' + docNum[2] + ' ';
            } else if (docNum[1].length > 1 && key !== 'Backspace') {
                e.target.value = docNum[1] + '-';
            } else if (key === 'Backspace') {
                return;
            } else {
                e.target.value = docNum[1];
            }
        };
    } else if (doctypeValue === "01") {
        return function (e) {
            const docNum = e.target.value.replace(/[\s-]/g, '').toUpperCase().match(/([IXVLCDM]*)([А-Я]{0,2})(\d{0,6})/);
            if (docNum[3] && key !== 'Backspace') {
                e.target.value = docNum[1] + '-' + docNum[2] + ' ' + docNum[3];
            } else if (docNum[2] && key !== 'Backspace') {
                e.target.value = docNum[1] + '-' + docNum[2] + ' ';
            } else if (docNum[1].length > 1 && key !== 'Backspace') {
                e.target.value = docNum[1] + '-';
            } else if (key === 'Backspace') {
                return;
            } else {
                e.target.value = docNum[1];
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
    } else if (doctypeValue === "01") {
        return "__-__ ______";
    } else {
        return "";
    }
}
