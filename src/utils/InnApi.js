export const urlToken = 'https://service.nalog.ru/inn-new-proc.do';
export const urlInn = 'https://service.nalog.ru/inn-new-proc.json';

export const getToken = (request) => {
    return fetch(`${urlToken}?${request}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
        //body: JSON.stringify(request),
        credentials: 'include',
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Запрос токена обработан с ошибкой');
            }
        })
}

export const getInn = (reqId) => {
    return fetch(`${urlInn}?${reqId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
        },
        //body: JSON.stringify(request),
        credentials: 'include',
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            } else {
                throw new Error('Запрос на ИНН обработан с ошибкой');
            }
        })
}
