export const makeErrDocNo = (errType) => {
    if (errType === "pattern") {
        return "Необходимо ввести 10 цифр";
    } else if (errType === "required") {
        return "Введите данные";
    } else {
        return "";
    }
}

export const makeErrBdate = (errType) => {
   if (errType === "required") {
        return "Введите данные";
    } else {
        return "";
    }
}

export const makeErrFam = (errType) => {
    if (errType === "pattern") {
        return "Фамилия должна быть введена кириллицей, без пробелов";
    } else if (errType === "minLength") {
        return "Имя должно содержать не менее 2 символов";
    } else if (errType === "required") {
        return "Введите данные";
    } else {
        return "";
    }
}

export const makeErrNam = (errType) => {
    if (errType === "pattern") {
        return "Имя должно быть введено кириллицей, без пробелов";
    } else if (errType === "minLength") {
        return "Имя должно содержать не менее 2 символов";
    } else if (errType === "required") {
        return "Введите данные";
    } else {
        return "";
    }
}

export const makeErrOtch = (errType) => {
    if (errType === "pattern") {
        return "Отчество должно быть введено кириллицей, максимум с одним пробелом";
    } else if (errType === "minLength") {
        return "Имя должно содержать не менее 2 символов";
    } else if (errType === "required") {
        return "Введите данные";
    } else {
        return "";
    }
}

export const makeErrDoctype = (errType) => {
    if (errType === "required") {
         return "Выбирите значение из списка";
     } else {
         return "";
     }
 }