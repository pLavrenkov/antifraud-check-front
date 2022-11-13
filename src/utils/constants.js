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

// формирование файла для загрузки
export const formFileToDownload = (data, inn, ext, filetype) => {
    const [date] = new Date().toISOString().split('T');
    let blob = new Blob([data], { type: filetype });
    let link = document.createElement('a');
    link.download = `${date}_${inn}.${ext}`;
    link.href = URL.createObjectURL(blob);
    console.log(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
    }, 100);

}

// url для api
export const urlBankrupts = 'https://bankrot.fedresurs.ru/bankrupts';
export const urlBankruptsEntity = 'https://bankrot.fedresurs.ru/backend/prsnbankrupts';
export const urlBankruptsPerson = 'https://bankrot.fedresurs.ru/backend/cmpbankrupts';
export const urlBankruptsPrs = 'http://localhost:3002/bankrupts/prsnbankrupts';
export const urlBankruptsCmp = 'http://localhost:3002/bankrupts/cmpbankrupts'
export const urlBankruptsRegions = 'http://localhost:3002/bankrupts/regions'

// форматирование адреса из ЕГРЮЛ
export const formatAddress = (address) => {
    return address.replace(/,{2,}/g, ',').replace(/,/g, ', ').replace(/,$/, '');
}
