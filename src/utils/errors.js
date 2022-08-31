export const makeErrDocNo = (errType) => {
    if (errType === "pattern") {
        return "Необходимо ввести 10 цифр";
    } else {
        return "";
    }
}