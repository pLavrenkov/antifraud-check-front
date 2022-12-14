export const PROXY = 'http://localhost:3001/';

export const searchTrBuisAllRequest = {
    type: '',
    page: 1,
    pageSize: 6,
    pbCaptchaToken: '',
    token: '',
    mode: 'search-all',
    queryAll: '',
    queryUl: '',
    okvedUl: '',
    statusUl: '',
    regionUl: '',
    isMspUl: '',
    mspUl1: 1,
    mspUl2: 2,
    mspUl3: 3,
    queryIp: '',
    okvedIp: '',
    statusIp: '',
    regionIp: '',
    isMspIp: '',
    mspIp1: 1,
    mspIp2: 2,
    mspIp3: 3,
    queryUpr: '',
    uprType1: 1,
    uprType0: 1,
    queryRdl: '',
    dateRdl: '',
    queryAddr: '',
    regionAddr: '',
    queryOgr: '',
    ogrFl: 1,
    ogrUl: 1,
    npTypeDoc: 1,
    ogrnUlDoc: '',
    ogrnIpDoc: '',
    nameUlDoc: '',
    nameIpDoc: '',
    formUlDoc: '',
    formIpDoc: '',
    ifnsDoc: '',
    dateFromDoc: '',
    dateToDoc: '',
}

// перевод даты из формата YYYY-MM-DD в DD.MM.YYYY
export const formatDate = (date) => {
    if (!date) {
        return '';
    } else {
        const d = date.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, ser1, ser2, ser3) => {
            return `${ser3}.${ser2}.${ser1}`
        });
        const g = d.match(/\d{2}.\d{2}.\d{4}/);
        return g;
    }
}
