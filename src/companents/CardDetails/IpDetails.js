import { useEffect, useState } from "react";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";
import { BankruptsApi } from "../../utils/bankruptsApi";

function IpDetails({ cardData, token, handleLoading }) {
    const [isIpClosed, setIsIpClosed] = useState(false);
    const [name, setName] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        setName(`${cardData.vyp.Фамилия} ${cardData.vyp.Имя} ${cardData.vyp.Отчество || ''}`);
        if (cardData.liquidated) {
            setIsIpClosed(true);
        } else if (cardData.vyp.НаимСтатусСокр && cardData.vyp.НаимСтатусСокр.includes('Прекрат')) {
            setIsIpClosed(true);
        } else {
            setIsIpClosed(false);
        }
        //handleBankrupts();
    }, [cardData]);

    const handleBankrupts = () => {
        BankruptsApi(cardData.vyp.ИННФЛ, constants.urlBankruptsPerson)
            .then((data) => {
                console.log(data);
            })
            .catch(err => console.log(err));
        BankruptsApi(cardData.vyp.ИННФЛ, constants.urlBankruptsEntity)
            .then((data) => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    const handleApiVyp = (request) => {
        handleLoading(true);
        setIsBtnDisabled(true);
        setTimeout(() => {
            setIsBtnDisabled(false);
        }, 10000)
        Api.getVip(request)
            .then((data) => {
                const req = new URLSearchParams({
                    token: data.token,
                    id: data.id,
                    method: "check-response",
                }).toString();
                const pdfReq = new URLSearchParams({
                    token: data.token,
                    id: data.id,
                }).toString();
                setTimeout(() => {
                    setTimeout(() => {
                        Api.getVip(req)
                            .then((data) => {
                                Api.getPDF(pdfReq)
                                    .then((data) => {
                                        constants.formFileToDownload(data, cardData.vyp.ИННФЛ, 'pdf', 'application/pdf');
                                        handleLoading(false);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        handleLoading(false);
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                                handleLoading(false);
                            });
                    }, 3000);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                handleLoading(false);
            });
    }

    const handleVypClick = () => {
        const preReq = new URLSearchParams({
            token: token,
            inn: cardData.vyp.ИННФЛ,
            pdf: "vyp",
        }).toString();
        const vypReq = new URLSearchParams({
            params: preReq,
            method: "get-request"
        }).toString();
        handleApiVyp(vypReq);
    }

    return (
        <section className="details">
            <div className="details__header">
                <button type="button" onClick={handleVypClick} className={isBtnDisabled ? "details__btn details__btn_type_disabled" : "details__btn"} disabled={isBtnDisabled} >
                    получить выписку из ЕГРЮЛ
                </button>
                <p className={isIpClosed ? "details__status" : "details__status details__status_type_open"}>
                    {isIpClosed ? 'ДЕЯТЕЛЬНОСТЬ ПРЕКРАЩЕНА' : 'ДЕЙСТВУЮЩЕЕ'}
                </p>
            </div>
            <h1 className="details__title">{name}</h1>
            <div className="details__props details__props_type_column">
                <div className="details__props-container">
                    <ul className="details__props-block details__props-block_type_100">
                        {
                            cardData.vyp.ВидГражд ?
                                <li className="details__prop details__prop_type_biggerfont details__prop_type_address">
                                    {cardData.vyp.ВидГражд < 2 ? "гражданин Российской Федерации" : "не является гражданином Российской Федерации"}
                                </li> :
                                ''
                        }
                        <li className="details__prop details__prop_type_biggerfont details__prop_type_okved">{`${cardData.vyp.КодОКВЭД || ''} - ${cardData.vyp.НаимОКВЭД || 'ОКВЭД не указан'}`}</li>
                    </ul>
                </div>
            </div>
            <div className="details__props details__props_type_toplined">
                <div className="details__props-container">
                    <div className="details__props-block details__props-block_type_50">
                        <h4 className="details__props-title">Сведения о создании</h4>
                        <ul className="details__prop-module details__props-module_type_column">
                            <li className="details__prop details__prop_type_ogrn">{cardData.vyp.ОГРНИП}</li>
                            <li className="details__prop details__prop_type_date">{constants.formatDate(cardData.vyp.ДатаЗаписи || cardData.vyp.ДатаОГРНИП || '')}</li>
                            <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимРО}</li>
                        </ul>
                    </div>
                    <div className="details__props-block details__props-block_type_50">
                        <h4 className="details__props-title">Сведения о налоговом учете</h4>
                        <ul className="details__prop-module details__props-module_type_column">
                            <li className="details__prop details__prop_type_inn">{cardData.vyp.ИННФЛ}</li>
                            <li className="details__prop details__prop_type_date">{constants.formatDate(cardData.vyp.ДатаПостУч || '')}</li>
                            <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимНО}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {isIpClosed ?
                <div className="details__props details__props_type_toplined">
                    <h4 className="details__props-title details__props-title_type_long details__props-title_type_cease">Сведения о прекращении деятельности</h4>
                    <div className="details__props-container">
                        <div className="details__props-block details__props-block_type_100 details__props-block_type_non-rightborder">
                            <ul className="details__prop-module">
                                <li className="details__prop details__prop_type_date details__prop_type_cease details__prop_type_30">{constants.formatDate(cardData.vyp.ДатаСтатус) || ''}</li>
                                <li className="details__prop details__prop_type_way details__prop_type_cease details__prop_type_70">{cardData.vyp.НаимСтатус}</li>
                            </ul>
                        </div>
                    </div>
                </div> : ''
            }
        </section>
    )
}

export default IpDetails;