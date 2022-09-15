import { useEffect, useState } from "react";
import * as constans from "../../utils/constants";

function CompanyDetails({ cardData }) {
    const [address, setAddress] = useState('');
    const [isEntityClosed, setIsEntityClosed] = useState(false);

    useEffect(() => {
        if (cardData.vyp.Адрес) {
            setAddress(cardData.vyp.Адрес.replace(/,{2,}/g, ',').replace(/,/g, ', ').replace(/,$/, ''));
        } else {
            setAddress(
                `${cardData.vyp.Индекс || ''}${(cardData.vyp.Индекс && ', ') || ''}
            ${cardData.vyp.ТипРегион || ''}${(cardData.vyp.ТипРегион && ' ') || ''}
            ${cardData.vyp.НаимРегион || ''}${(cardData.vyp.НаимРегион && ', ') || ''}
            ${cardData.vyp.ТипГород || ''}${(cardData.vyp.ТипГород && ' ') || ''}
            ${cardData.vyp.НаимГород || ''}${(cardData.vyp.НаимГород && ', ') || ''}
            ${cardData.vyp.ТипУлица || ''}${(cardData.vyp.ТипУлица && ' ') || ''}
            ${cardData.vyp.НаимУлица || ''}${(cardData.vyp.НаимУлица && ', ') || ''}
            ${cardData.vyp.Дом || ''}${(cardData.vyp.Дом && ', ') || ''}
            ${cardData.vyp.Корпус || ''}${(cardData.vyp.Корпус && ', ') || ''}
            ${cardData.vyp.Кварт || ''}`
            );
        }
        if (cardData.vyp.НаимСтатусЮЛСокр) {
            setIsEntityClosed(true);
        } else {
            setIsEntityClosed(false);
        }
    }, [cardData]);

    return (
        <section className="details">
            <p className={isEntityClosed ? "details__status" : "details__status details__status_type_open"}>{isEntityClosed ? 'ДЕЯТЕЛЬНОСТЬ ПРЕКРАЩЕНА' : 'ДЕЙСТВУЮЩЕЕ'}</p>
            <h1 className="details__title">{`${cardData.vyp.НаимЮЛПолн} // ${cardData.vyp.НаимЮЛСокр}`}</h1>
            <p className="detais__address">{address}</p>
            <div className="details__props">
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о создании</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_ogrn">{cardData.vyp.ОГРН}</li>
                        <li className="details__prop details__prop_type_way">{cardData.vyp.НаимСпОбрЮЛ}</li>
                        <li className="details__prop details__prop_type_date">{constans.formatDate(cardData.vyp.ДатаРег || cardData.vyp.ДатаОГРН || '')}</li>
                        <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимРО}</li>
                    </ul>
                </div>
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о налоговом учете</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_inn">{cardData.vyp.ИНН}</li>
                        <li className="details__prop details__prop_type_kpp">{cardData.vyp.КПП}</li>
                        <li className="details__prop details__prop_type_date">{constans.formatDate(cardData.vyp.ДатаПостУч || '')}</li>
                        <li className="details__prop details__prop_type_createStatement">{cardData.vyp.НаимНО}</li>
                    </ul>
                </div>
            </div>
            <ul className="details__factors">
            </ul>
        </section>
    )
}

export default CompanyDetails;
