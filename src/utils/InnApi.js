export const urlToken = 'https://service.nalog.ru/inn-new-proc.do';
export const urlInn = 'https://service.nalog.ru/inn-new-proc.json';
export const proxyUrl = 'http://localhost:3001/';

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

export const getTrsnsBuis = (request) => {
    return fetch(`${proxyUrl + urlInn}?${request}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
        //body: JSON.stringify(request),
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            } else {
                throw new Error('запрос на Прозрачный Бизнес обработан с ошибкой');
            }
        })
}
