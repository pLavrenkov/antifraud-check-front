import { Link } from "react-router-dom";

function NewSearchPopup({ tokenReq, innReq, nameReq, data, onClose }) {
    const onTokenClick = () => {
        localStorage.setItem('linkRequest', `окружение ${data.name}, обновление страницы приведет к сбросу данных`);
        localStorage.setItem('cardRequest', tokenReq);
        onClose();
    }

    const onInnClick = () => {
        localStorage.setItem('linkRequest', data.inn);
        localStorage.setItem('cardRequest', innReq);
        onClose();
    }

    const onNameClick = () => {
        localStorage.setItem('linkRequest', data.name);
        localStorage.setItem('cardRequest', nameReq);
        onClose();
    }

    return (
        <section className="new-search-popup">
            <ul className="new-search-popup__container">
                <Link to={"/buisness"} target={'_blank'} className="new-search-popup__link">
                    {
                        data.token &&
                        <li className="new-search-popup__btn-place">
                            <button type="button" onClick={onTokenClick} className="new-search-popup__btn">Искать окружение</button>
                        </li>
                    }
                    {
                        data.inn &&
                        <li className="new-search-popup__btn-place">
                            <button type="button" onClick={onInnClick} className="new-search-popup__btn">Искать по ИНН</button>
                        </li>
                    }
                    {
                        data.name &&
                        <li className="new-search-popup__btn-place">
                            <button type="button" onClick={onNameClick} className="new-search-popup__btn">Искать по ФИО/наименованию</button>
                        </li>
                    }
                </Link>
            </ul>
        </section>
    )
}

export default NewSearchPopup;