function CardPopup({ isOpen, onClose, cardData }) {

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
                    ПОКА НИЧЕГО НЕТ, НО БУДЕТ КАРТОЧКА
                    
                </div>
            </div>
        </section>
    )
}

export default CardPopup;
