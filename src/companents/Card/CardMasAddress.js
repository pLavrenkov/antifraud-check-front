import * as constants from "../../utils/constants"

function CardMasAddress({ data, token, inn, name, address, numberentities, onCardClick }) {
    const onClick = () => {
       onCardClick(token, inn, name, true);
    }
    
    return (
        <section className="card card_type_detailcard" onClick={onClick}>
            <div className="card__link">
                <h3 className="card__title card__title_type_3line">{name}</h3>
                <p className="card__field card__field_type_detailcard">{`ИНН: ${inn || ''}`}</p>
            </div>
        </section>
    )
}

export default CardMasAddress;