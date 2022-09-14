import { useEffect, useState } from "react";

function CompanyDetails({ cardData }) {
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (cardData.vyp.Адрес) {
            setAddress(cardData.vyp.Адрес.replace(/,{2,}/g, ',').replace(/,/g, ', '));
        } else {
            setAddress(`${cardData.vyp.Индекс || ''}, ${cardData.vyp.ТипРегион || ''} ${cardData.vyp.НаимРегион || ''}, ${cardData.vyp.ТипУлица || ''} ${cardData.vyp.НаимУлица || ''}, ${cardData.vyp.Дом || ''}, ${cardData.vyp.Корпус || ''}, ${cardData.vyp.Кварт || ''}`);
        }
    }, [cardData])
    

    console.log(address);

    return (
        <section className="details">
            <h1 className="details__title">{cardData.vyp.НаимЮЛПолн}</h1>
            <p className="detais__address">{address}</p>
            <div className="details__container">
                <div className="details__current-status">
                    <div className="details__register">

                    </div>

                </div>
                <ul className="details__factors">

                </ul>
            </div>
        </section>
    )
}

export default CompanyDetails;
