import * as constants from "./constants";

export const BankruptsApi = (search, url) => {
    const req = new URLSearchParams({
        searchString: search,
        regionId: 'All',
        isActiveLegalCase: null,
        offset: 0,
        limit: 6
    }).toString();
    const ref = `${constants.urlBankrupts}?${req}`;
    return fetch(`${constants.PROXY + url}?${req}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Referer": `${constants.urlBankrupts}?${req}`,
        },
        Referer: ref,
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            } else {
                throw new Error('запрос на банкротство обработан с ошибкой');
            }
        })
}

export const BankruptsPrsApi = (search) => {
    console.log(search);
    const req = new URLSearchParams(search).toString();
    console.log(req);
    return fetch(constants.urlBankruptsPrs, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "SearchString": req,
        },
    })
        .then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            } else {
                throw new Error('запрос на банкротство обработан с ошибкой');
            }
        })
}
