import * as constants from "./constants";

const proxyUrl = constants.PROXY;
const transBuisUrl = "https://pb.nalog.ru/search-proc.json";
const companyUrl = "https://pb.nalog.ru/company-proc.json";
const vypUrl = "https://pb.nalog.ru/download-proc.json";
const pdfUrl = "https://pb.nalog.ru/excerpt.pdf";

export const getAll = (request) => {
    return fetch(`${proxyUrl + transBuisUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
        body: JSON.stringify(request),
    })
        .then((res) => {
            if (res.ok) {
                //console.log(res);
                return res.json();
            } else {
                throw new Error(`запрос на Прозрачный Бизнес обработан с ошибкой сервера`);
            }
        })
}

export const getUl = (request) => {
    return fetch(
        `${proxyUrl + companyUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
        body: JSON.stringify(request),
    })
        .then((res) => {
            if (res.ok) {
                //console.log(res);
                return res.json();
            } else {
                console.log(res);
                throw new Error(`запрос на Прозрачный Бизнес обработан с ошибкой сервера`);
            }
        })
}

export const getVip = (request) => {
    return fetch(`${proxyUrl + vypUrl}?${request}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('запрос токена на выписку обработан с ошибкой');
            }
        })
}

export const getPDF = (request) => {
    return fetch(`${proxyUrl + pdfUrl}?${request}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('запрос токена на выписку обработан с ошибкой');
            }
        })
}
