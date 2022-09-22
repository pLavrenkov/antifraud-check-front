import CompanyDetails from "../CompanyDetails/CompanyDetails";

function CardPopup({ isOpen, onClose, cardData, listname, token }) {

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
                    {cardData.type && cardData.type === 1 && <CompanyDetails cardData={cardData} token={token} />}
                </div>
            </div>
        </section>
    )
}

export default CardPopup;
