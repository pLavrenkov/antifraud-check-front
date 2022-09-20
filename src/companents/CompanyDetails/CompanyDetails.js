import { useEffect, useState } from "react";
import RiskFactor from "../RiskFactor/RistFactor";
import * as constans from "../../utils/constants";
import * as riskFactors from "../../utils/riskFactors";
import questionYellow from "../../images/question__yell.svg";
import markGreen from "../../images/mark__green.svg";
import exclamationRed from "../../images/exclamation__red.svg";
import CardDirector from "../Card/CardDirector";

function CompanyDetails({ cardData }) {
    const [address, setAddress] = useState('');
    const [isEntityClosed, setIsEntityClosed] = useState(false);
    const [isEntityRedesined, setIsEntityRedisined] = useState(false);
    const masaddressQuontity = `по адресу зарегистрировано ${cardData?.masaddress?.length || 0} юридических лиц(-а)`;

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
        if (cardData.liquidated) {
            setIsEntityClosed(true);
        } else if (cardData.vyp.НаимСтатусЮЛСокр && cardData.vyp.НаимСтатусЮЛСокр.includes('Прекрат')) {
            setIsEntityClosed(true);
        } else {
            setIsEntityClosed(false);
        }
        if (cardData.vyp.НаимСтатусЮЛ && cardData.vyp.НаимСтатусЮЛ.includes('реорг')) {
            setIsEntityRedisined(true);
        } else {
            setIsEntityRedisined(false);
        }
    }, [cardData]);



    console.log(cardData?.masaddress?.length)

    return (
        <section className="details">
            <p className={isEntityClosed ? "details__status" : isEntityRedesined ? "details__status details__status_type_redesined" : "details__status details__status_type_open"}>{isEntityClosed ? 'ДЕЯТЕЛЬНОСТЬ ПРЕКРАЩЕНА' : isEntityRedesined ? 'РЕОРГАНИЗАЦИЯ' : 'ДЕЙСТВУЮЩЕЕ'}</p>
            <h1 className="details__title">{`${cardData.vyp.НаимЮЛПолн || ''} // ${cardData.vyp.НаимЮЛСокр || ''}`}</h1>
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
            {isEntityRedesined ?
                <div className="details__props-block details__props-block_type_redesined">
                    <h4 className="details__props-title details__props-title_type_long details__props-title_type_redesined">Сведения о реорганизации</h4>
                    <ul className="details__prop-module details__prop-module_type_cease">
                        <li className="details__prop details__prop_type_date details__prop_type_cease">{constans.formatDate(cardData.vyp.ДатаСтатусЮЛ) || ''}</li>
                        <li className="details__prop details__prop_type_way details__prop_type_cease">{cardData.vyp.НаимСтатусЮЛ}</li>
                    </ul>
                </div> : ''
            }
            {
                isEntityClosed ?
                    <div className="details__props-block details__props-block_type_cease">
                        <h4 className="details__props-title details__props-title_type_long details__props-title_type_cease">Сведения о прекращении деятельности</h4>
                        <ul className="details__prop-module details__prop-module_type_cease">
                            <li className="details__prop details__prop_type_date details__prop_type_cease">{constans.formatDate(cardData.vyp.ДатаСтатусЮЛ) || ''}</li>
                            <li className="details__prop details__prop_type_way details__prop_type_cease">{cardData.vyp.НаимСтатусЮЛ}</li>
                        </ul>
                    </div>
                    :
                    <ul className="details__risk-factors">
                        {/* недействительный адрес */}
                        {cardData.vyp.invalid === 1 ?
                            <RiskFactor image={exclamationRed} title={'недействительный адрес места нахождения'} status={true} /> :
                            <RiskFactor image={markGreen} title={'претензии к адресу места нахождения отсутствуют'} status={false} />
                        }
                        {/* адрес массовой регистрации */}
                        {!cardData.masaddress || !cardData.masaddress.length ?
                            <RiskFactor image={markGreen} title={`по адресу не зарегистрировано других юридических лиц(-а)`} status={true} /> :
                            cardData.masaddress.length > 5 ?
                                <RiskFactor image={exclamationRed} title={`по адресу зарегистрировано ${cardData.masaddress.length} других юридических лиц`} status={true} /> :
                                cardData?.masaddress?.length > 1 ?
                                    <RiskFactor image={questionYellow} title={`по адресу зарегистрировано ${cardData.masaddress.length} других юридических лиц(-а)`} status={true} /> :
                                    <RiskFactor image={markGreen} title={`по адресу зарегистрировано ${cardData.masaddress.length || 0} других юридических лиц(-а)`} status={true} />
                        }
                        {/* массовый руководитель */}
                        {cardData.vyp.masruk && riskFactors.sortArrByProp(cardData.vyp.masruk) > 3 ?
                            <RiskFactor image={exclamationRed} title={`руководитель числится в ${riskFactors.sortArrByProp(cardData.vyp.masruk)} организации(-ях)`} status={true} /> :
                            riskFactors.sortArrByProp(cardData.vyp.masruk) > 1 ?
                                <RiskFactor image={questionYellow} title={`руководитель числится в ${riskFactors.sortArrByProp(cardData.vyp.masruk)} организации(-ях)`} status={true} /> :
                                <RiskFactor image={markGreen} title={`руководитель не числится в других организацях`} status={true} />
                        }
                        {/* массовый учредитель */}
                        {cardData.vyp.masuchr && riskFactors.sortArrByProp(cardData.vyp.masuchr) > 3 ?
                            <RiskFactor image={exclamationRed} title={`один из учредителей числится в ${riskFactors.sortArrByProp(cardData.vyp.masuchr)} организации(-ях)`} status={true} /> :
                            riskFactors.sortArrByProp(cardData.vyp.masuchr) > 1 ?
                                <RiskFactor image={questionYellow} title={`один из учредителей числится в ${riskFactors.sortArrByProp(cardData.vyp.masuchr)} организации(-ях)`} status={true} /> :
                                <RiskFactor image={markGreen} title={`ни один из учредителей не числится в других организацях`} status={true} />
                        }
                        {/* налоговая отчетность */}
                        {cardData.vyp.pr_otch && cardData.vyp.pr_otch === 1 ?
                            <RiskFactor image={exclamationRed} title={'не сдает налоговую отчетность более года'} status={true} /> :
                            <RiskFactor image={markGreen} title={'сдает налоговую отчетность'} status={true} />
                        }
                        {/* налоговые нарушения */}
                        {cardData.is_p_offense ?
                            <RiskFactor image={exclamationRed} title={`есть налоговые нарушения на ${cardData.vyp.offensesum || 'не установленную сумму'} рублей`} status={true} /> :
                            <RiskFactor image={markGreen} title={'нет налоговых нарушений'} status={true} />
                        }
                        {/* судебная задолженность по налогам */}
                        {cardData.vyp.pr_zd && cardData.vyp.pr_zd === 1 ?
                            <RiskFactor image={exclamationRed} title={'есть задолженность по налогам, переданная приставам'} status={true} /> :
                            <RiskFactor image={markGreen} title={'нет задолженности по налогам, переданной приставам'} status={true} />
                        }
                        {/* численность */}
                        {!cardData.is_p_sschr || !cardData.vyp.sschr ?
                            <RiskFactor image={questionYellow} title={`отсутствуют сведения о среднештатной численности`} status={true} /> :
                            cardData.vyp.sschr > 10 ?
                                <RiskFactor image={markGreen} title={`среднештатная численность ${cardData.vyp.sschr || 'не установлена'}`} status={true} /> :
                                cardData.vyp.sschr > 2 ?
                                    <RiskFactor image={questionYellow} title={`среднештатная численность ${cardData.vyp.sschr}`} status={true} /> :
                                    <RiskFactor image={exclamationRed} title={`среднештатная численность ${cardData.vyp.sschr}`} status={true} />
                        }
                        {/* срок создания */}
                        {cardData.vyp.ДатаРег && riskFactors.dateRegTimePeriodMonths(cardData.vyp.ДатаРег) > 12 ?
                            <RiskFactor image={markGreen} title={'создано более года назад'} status={true} /> :
                            cardData.vyp.ДатаРег && riskFactors.dateRegTimePeriodMonths(cardData.vyp.ДатаРег) > 3 ?
                                <RiskFactor image={questionYellow} title={'создано менее года назад'} status={true} /> :
                                cardData.vyp.ДатаРег && riskFactors.dateRegTimePeriodMonths(cardData.vyp.ДатаРег) > 0 ?
                                    <RiskFactor image={exclamationRed} title={'создано менее трех месяцев назад'} status={true} /> :
                                    cardData.vyp.ДатаОГРН && riskFactors.dateOGRNTimePeriodMonths(cardData.vyp.ДатаОГРН) > 12 ?
                                        <RiskFactor image={markGreen} title={'создано более года назад'} status={true} /> :
                                        cardData.vyp.ДатаОГРН && riskFactors.dateOGRNTimePeriodMonths(cardData.vyp.ДатаОГРН) > 3 ?
                                            <RiskFactor image={questionYellow} title={'создано менее года назад'} status={true} /> :
                                            <RiskFactor image={exclamationRed} title={'создано менее трех месяцев назад'} status={true} />
                        }
                        {/* уставной капитал */}
                        {cardData.vyp.СумКап && cardData.vyp.СумКап < 10001 ?
                            <RiskFactor image={exclamationRed} title={`уставной капитал равен минимальному`} /> :
                            cardData.vyp.СумКап && cardData.vyp.СумКап < 100000 ?
                                <RiskFactor image={questionYellow} title={`низкий уставной капитал ${cardData.vyp.СумКап} рублей`} /> :
                                cardData.vyp.СумКап ?
                                    <RiskFactor image={markGreen} title={`достаточный уставной капитал ${cardData.vyp.СумКап} рублей`} /> :
                                    <RiskFactor image={questionYellow} title={`сведения об уставном капитале отсутствуют`} />
                        }
                        {/* динамика выручки */}
                        {cardData.form1 && riskFactors.revenueDiff(cardData.form1) < -.5 ?
                            <RiskFactor image={exclamationRed} title={`сильное снижение выручки на ${Math.round(riskFactors.revenueDiff(cardData.form1) * 100)} % от прошлого года`} /> :
                            cardData.form1 && riskFactors.revenueDiff(cardData.form1) < -.001 ?
                                <RiskFactor image={questionYellow} title={`снижение выручки на ${Math.round(riskFactors.revenueDiff(cardData.form1) * 100)} % от прошлого года`} /> :
                                cardData.form1 && riskFactors.revenueDiff(cardData.form1) > .001 ?
                                    <RiskFactor image={markGreen} title={`рост выручки на ${Math.round(riskFactors.revenueDiff(cardData.form1) * 100)} % от прошлого года`} /> :
                                    <RiskFactor image={questionYellow} title={`релевантные сведения о динамике выручки отсутствуют`} />
                        }
                        {/* доля расходов */}
                        {cardData.form1 && riskFactors.expenseShare(cardData.form1) > 1 ?
                            <RiskFactor image={exclamationRed} title={`расходы выше выручки и соствляют ${Math.round(riskFactors.expenseShare(cardData.form1) * 100)} % от выручки`} /> :
                            cardData.form1 && riskFactors.revenueDiff(cardData.form1) > .8 ?
                                <RiskFactor image={questionYellow} title={`высокие расходы составляют ${Math.round(riskFactors.expenseShare(cardData.form1) * 100)} % от выручки`} /> :
                                cardData.form1 && riskFactors.revenueDiff(cardData.form1) > 0 ?
                                    <RiskFactor image={markGreen} title={`расходы составляют ${Math.round(riskFactors.expenseShare(cardData.form1) * 100)} % от выручки`} /> :
                                    <RiskFactor image={questionYellow} title={`релевантные сведения о доле расходов в выручке отсуствуют`} />
                        }
                    </ul>
            }
            {
                isEntityClosed ? '' :
                    <div className="details__props">
                        <div className="details__props-block">
                            <h4 className="details__props-title">Сведения о капитале</h4>
                            <ul className="details__prop-module">
                                <li className="details__prop details__prop_type_coins">{`${cardData.vyp.СумКап} рублей`}</li>
                                <li className="details__prop details__prop_type_moneybag">{cardData.vyp.НаимВидКап}</li>
                            </ul>
                        </div>
                        <div className="details__props-block">
                            <h4 className="details__props-title">Налоговые сведения</h4>
                            <ul className="details__prop-module">
                                <li className="details__prop details__prop_type_coins">{cardData.vyp.taxpaysum ? `${cardData.vyp.taxpaysum} рублей оплаченных налогов` : `сумма оплаченных налогов не известна`}</li>
                                <li className="details__prop details__prop_type_tax">{riskFactors.checkTaxMode(cardData.taxmode)}</li>
                            </ul>
                        </div>
                    </div>
            }
            {
                isEntityClosed ? '' :
                    <div className="details__props-block details__props-block_type_redesined">
                        <h4 className="details__props-title details__props-title_type_long">Сведения о руководстве</h4>
                        {cardData.vyp.masruk ?
                            cardData.vyp.masruk.map((item) => {
                                return <CardDirector
                                    key={item.token}
                                    inn={item.inn}
                                    token={item.token}
                                    name={item.name}
                                    position={item.position}
                                    cnt={item.cnt}
                                />
                            }) :
                            <p>сведения отсутствуют или скрыты</p>
                        }
                    </div>
            }
        </section>
    )
}

export default CompanyDetails;
