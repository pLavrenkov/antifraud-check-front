import { useEffect, useState } from "react";

function Disclaimer() {
    const [isClosed, setIsClosed] = useState(sessionStorage.getItem('isClosed') || false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBox = (e) => {
        setIsChecked(e.target.checked);
    }

    const handleDisclaimerHidden = () => {
        setIsClosed(true);
        sessionStorage.setItem('isClosed', isClosed);
    }

    useEffect(() => {
        const disclaimerPass = sessionStorage.getItem('isClosed');
        if (disclaimerPass) {
            setIsClosed(true);
        } else {
            setIsClosed(false);
        }
    }, [])

    return (
        <section className={isClosed ? "disclaimer disclaimer_type_closed" : "disclaimer"}>
            <div className="disclaimer__overlay" />
            <div className="disclaimer__container">
                <h1 className="disclaimer__title">Условия предоставления сервиса</h1>
                <p className="disclaimer__notice">
                    Сервис обрабатывает персональные данные. Введенная информация сервисом не сохряется ни в cookie, ни в локальном хранилище.
                    Трансграничная передача персональных данных не осуществляется.
                    Данные передается на сервер ФНС и иные государственные сервисы в целях получения дополнительной информации на основании внесенных пользователем данных.
                    Пользователь гарантирует, что использует вносимые им персональные данные на законых основаниях, включая наличие согласия владельца персональных данных на их обработку.
                    Владелец сервиса не отвечает за действия пользователя, связанные с обработкой им персональных данных.
                </p>
                <div className="disclaimer__checkbox-container">
                    <input name="disclaimer-checkbox" type="checkbox" className="disclaimer__checkbox" onClick={handleCheckBox} />
                    <label htmlFor="disclaimer-chekbox" className="disclaimer__checkbox-label">с условиями предоставления сервиса ознакомлен и согласен</label>
                </div>
                <button type="button" disabled={!isChecked} className="disclaimer__button" onClick={handleDisclaimerHidden} >Использовать сервис</button>
            </div>
        </section>
    )
}

export default Disclaimer;