function CardFlBadwill({ inn, token, name, position, company, onCardClick }) {
    const onClick = () => {
        onCardClick(token, inn, name, false);
    }
    console.log(token);

    return (
        <section className="card card_type_detailcard" onClick={onClick}>
            <div className="card__link">
                <h3 className="card__title card__title_type_2line">{name}</h3>
                <p className="card__field card__field_type_detailcard">{`ИНН ${inn}`}</p>
                <p className="card__field card__field_type_detailcard card__field_type_2lines">{position}</p>
            </div>
        </section>
    )
}

export default CardFlBadwill;