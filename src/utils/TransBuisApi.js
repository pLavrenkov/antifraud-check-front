import * as constants from "./constants";

const proxyUrl = constants.PROXY;
const transBuisUrl = "https://pb.nalog.ru/search-proc.json";
const companyUrl = "https://pb.nalog.ru/company-proc.json"

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

