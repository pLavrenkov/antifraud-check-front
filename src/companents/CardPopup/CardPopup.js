import CompanyDetails from "../CardDetails/CompanyDetails";
import IpDetails from "../CardDetails/IpDetails";

function CardPopup({ isOpen, onClose, cardData, listname, token, handleLoading }) {

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
                    {cardData.type && cardData.type === 1 && <CompanyDetails cardData={cardData} token={token} handleLoading={handleLoading} />}
                    {cardData.type && cardData.type === 2 && <IpDetails cardData={cardData} token={token} handleLoading={handleLoading} />}
                </div>
            </div>
        </section>
    )
}

export default CardPopup;
