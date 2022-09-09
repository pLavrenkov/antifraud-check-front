import * as constants from "./constants";

export const urlToken = 'https://service.nalog.ru/inn-new-proc.do';
export const urlInn = 'https://service.nalog.ru/inn-new-proc.json';

const proxyUrl = constants.PROXY;

export const getToken = (request) => {
    return fetch(`${proxyUrl + urlToken}?${request}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('запрос токена обработан с ошибкой');
            }
        })
}

export const getInn = (reqId) => {
    return fetch(`${proxyUrl + urlInn}?${reqId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            } else {
                throw new Error('запрос на ИНН обработан с ошибкой');
            }
        })
}


