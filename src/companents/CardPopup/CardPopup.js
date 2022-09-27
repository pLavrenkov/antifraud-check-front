function CardPopup({ children, isOpen, onClose }) {
    const closePopupByLayout = (e) => {
        if (e.target.className.includes('cardpopup_type_active')) {
            onClose();
        }
    }

    return (
        <section onClick={closePopupByLayout} className={isOpen ? "cardpopup cardpopup_type_active" : "cardpopup"}>
            <div className="cardpopup__container">
                <button type="button" onClick={onClose} className="cardpopup__btn" />
                <div className="cardpopup__board">
                   {children}
                </div>
            </div>
        </section>
    )
}

export default CardPopup;
