function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__copyright">&copy; 2022, Павел Лавренков</p>
                <ul className="footer__link-container">
                    <li>
                        <a href="https://service.nalog.ru/inn.do" target="_blank" rel="noreferrer" className="footer__link">Узнать ИНН</a>
                    </li>
                    <li>
                        <a href="https://pb.nalog.ru/" target="_blank" rel="noreferrer" className="footer__link">Прозрачный бизнес</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;