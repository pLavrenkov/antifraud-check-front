import * as constants from "../../utils/constants"

function CardAddress({ data, token, inn, name, address, numberentities, onCardClick }) {
    const onClick = () => {
        console.log(token);
        onCardClick(token, inn, address, false);
    }
    console.log(data.address);

    return (
        <section className="card card_type_detailcard" onClick={onClick}>
            <div className="card__link">
                <h3 className="card__title card__title_type_3line">{constants.formatAddress(address)}</h3>
                <p className="card__field card__field_type_detailcard">{`зарегистрировано ${numberentities || ''} юридических лиц (-а)`}</p>
            </div>
        </section>
    )
}

export default CardAddress;