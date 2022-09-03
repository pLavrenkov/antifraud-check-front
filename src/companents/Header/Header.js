import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/angle.jpg";

function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <Link to={'/'} className="header__logo-container">
                    
                        <img src={logo} alt="glass angle" className="header__logo-image" />
                        <span className="header__logo-name">CheckUp</span>
                    
                </Link>
                <Navigation />
            </div>
        </header>
    );
}

export default Header;