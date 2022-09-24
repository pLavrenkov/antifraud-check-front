import { useEffect, useState } from "react";
import * as constants from "../../utils/constants"

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
    }, [cardData]);

    const handleVypClick = () => {

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
            <p className="detais__okved">{`${cardData.vyp.КодОКВЭД || ''} - ${cardData.vyp.НаимОКВЭД || 'ОКВЭД не указан'}`}</p>
            <div className="details__props">
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о создании</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_ogrn">{cardData.vyp.ОГРНИП}</li>
                        <li className="details__prop details__prop_type_date">{constants.formatDate(cardData.vyp.ДатаЗаписи || cardData.vyp.ДатаОГРНИП || '')}</li>
                        <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимРО}</li>
                    </ul>
                </div>
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о налоговом учете</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_inn">{cardData.vyp.ИННФЛ}</li>
                        <li className="details__prop details__prop_type_date">{constants.formatDate(cardData.vyp.ДатаПостУч || '')}</li>
                        <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимНО}</li>
                    </ul>
                </div>
            </div>
            {isIpClosed ?
                <div className="details__props-block details__props-title_type_long details__props-block_type_cease">
                    <h4 className="details__props-title details__props-title_type_long details__props-title_type_cease">Сведения о прекращении деятельности</h4>
                    <ul className="details__prop-module details__prop-module_type_cease">
                        <li className="details__prop details__prop_type_date details__prop_type_cease">{constants.formatDate(cardData.vyp.ДатаСтатус) || ''}</li>
                        <li className="details__prop details__prop_type_way details__prop_type_cease">{cardData.vyp.НаимСтатус}</li>
                    </ul>
                </div> : ''
            }
        </section>
    )
}

export default IpDetails;