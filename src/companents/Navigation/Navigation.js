import { Link, useLocation } from "react-router-dom";

function Navigation() {
    const location = useLocation();

    return (
        <nav className="nav">
            <ul className="nav__container">
                <Link to={'/'} className={location.pathname === '/' ? "nav__link nav__link_type_active" : "nav__link"}>
                    <span className="nav__title">О проекте</span>
                </Link>
                <Link to={'/inn'} className={location.pathname === '/inn' ? "nav__link nav__link_type_active" : "nav__link"}>
                    <span className="nav__title">Узнать ИНН</span>
                </Link>
            </ul>

        </nav>
    )
}

export default Navigation;
