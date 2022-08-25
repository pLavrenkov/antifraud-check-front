export const urlToken = 'https://service.nalog.ru/inn-new-proc.do';

export const getToken = (request) => {
    fetch(urlToken, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Host": "service.nalog.ru",
            "Proxy": "https://service.nalog.ru"
        },
        body: JSON.stringify(request),
        credentials: 'include',
    })
    .then((res) => {
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Запрос обработан с ошибкой');
        }
    })
    .catch(err => console.log(err))
}