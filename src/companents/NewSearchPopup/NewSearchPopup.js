import { useState } from "react";
import { Link } from "react-router-dom";

function NewSearchPopup({ tokenReq, innReq, nameReq, data, onClose, masAdd }) {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleDisabled = () => {
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 3000)
    }

    const onTokenClick = () => {
        localStorage.setItem('linkRequest', `окружение ${data.name}, обновление страницы приведет к сбросу данных`);
        localStorage.setItem('cardRequest', tokenReq);
        handleDisabled();
        //onClose();
    }

    const onInnClick = () => {
        localStorage.setItem('linkRequest', data.inn);
        localStorage.setItem('cardRequest', innReq);
        handleDisabled();
        //onClose();
    }

    const onNameClick = () => {
        localStorage.setItem('linkRequest', data.name);
        localStorage.setItem('cardRequest', nameReq);
        handleDisabled();
        //onClose();
    }

    const handlePrevent = (e) => {
        isDisabled && e.preventDefault()
    }

    return (
        <section className="new-search-popup">
            <h1 className="new-search-popup__title">Осуществить поиск</h1>
            <ul className="new-search-popup__container">
                {
                    data.token && !masAdd &&
                    <li className="new-search-popup__btn-place">
                        <Link to={"/buisness"} target={'_blank'} disabled={isDisabled} className={isDisabled ? "new-search-popup__link new-search-popup__link_type_disabled" : "new-search-popup__link"} onClick={handlePrevent}>
                            <button type="button" onClick={onTokenClick} disabled={isDisabled} className={isDisabled ? "new-search-popup__btn new-search-popup__btn_type_disabled" : "new-search-popup__btn"}>СВЯЗАННЫЕ ЛИЦА</button>
                        </Link>
                        <span className="new-search-popup__description">найдем юридических лиц, где это лицо является учредителем/руководителем</span>
                    </li>
                }
                {
                    data.inn &&
                    <li className="new-search-popup__btn-place">
                        <Link to={"/buisness"} target={'_blank'} disabled={isDisabled} className={isDisabled ? "new-search-popup__link new-search-popup__link_type_disabled" : "new-search-popup__link"} onClick={handlePrevent}>
                            <button type="button" onClick={onInnClick} disabled={isDisabled} className={isDisabled ? "new-search-popup__btn new-search-popup__btn_type_disabled" : "new-search-popup__btn"}>ИНН</button>
                        </Link>
                        <span className="new-search-popup__description">найдем юридическое лицо или индвидуальных предпринимателей по ИНН и можно будет посмотреть подробности</span>
                    </li>
                }
                {
                    data.name &&
                    <li className="new-search-popup__btn-place">
                        <Link to={"/buisness"} target={'_blank'} disabled={isDisabled} className={isDisabled ? "new-search-popup__link new-search-popup__link_type_disabled" : "new-search-popup__link"} onClick={handlePrevent}>
                            <button type="button" onClick={onNameClick} disabled={isDisabled} className={isDisabled ? "new-search-popup__btn new-search-popup__btn_type_disabled" : "new-search-popup__btn"}>ФИО/НАИМЕНОВАНИЕ</button>
                        </Link>
                        <span className="new-search-popup__description">найдем всех юридических лиц или индивидуальных предпринимателей по ФИО или названию и можно будет посмотреть подробности</span>
                    </li>
                }
            </ul>
        </section>
    )
}

export default NewSearchPopup;