import { Link } from "react-router-dom";
import fnsImageGrey from "../../images/fns_grey.svg";
import fnsImageBlue from "../../images/fns_blue.svg";

function MainPage() {
    return (
        <section className="main-page">
            <article className="main-page__article">
                <h2 className="main-psge__title">О проекте</h2>
                <h3 className="main-page__subtitle">для кого этот проект</h3>
                <p className="main-page__text">Этот проект о том, что....</p>
            </article>
            <article className="main-page__article">
                <h2 className="main-psge__title">Прозрачный бизнес</h2>
                <h3 className="main-page__subtitle">данные ФНС</h3>
                <p className="main-page__text">Сервис предоставляет возможность...</p>
                <img src={fnsImageGrey} alt="Лого ФНС" className="main-page__image" />
                <Link to={'/buisness'} className="main-page__link"><span className="main-page__span">перейти</span> &#10230;</Link>
            </article>
            <article className="main-page__article main-page__article_type_imageleft">
                <h2 className="main-psge__title main-psge__title_type_imageleft">Узнать ИНН</h2>
                <h3 className="main-page__subtitle main-page__subtitle_type_imageleft">данные ФНС</h3>
                <p className="main-page__text main-psge__text_type_imageleft">Сервис предоставляет возможность...</p>
                <img src={fnsImageBlue} alt="Лого ФНС" className="main-page__image main-page__image_type_imageleft" />
                <Link to={'/inn'} className="main-page__link"><span className="main-page__span">перейти</span> &#10230;</Link>
            </article>
        </section>
    )
}

export default MainPage;
