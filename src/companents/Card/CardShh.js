function CardShh({ inn, token, name, cnt, onCardClick, listname }) {
    const onClick = () => {
        onCardClick(token, inn, name, false);
    }

    return (
        <section className="card card_type_detailcard" onClick={onClick}>
            <div className="card__link">
                <h3 className="card__title card__title_type_2line">{name}</h3>
                <p className="card__field card__field_type_detailcard">{`ИНН ${inn || ''}`}</p>
                <p className="card__field card__field_type_detailcard">
                    {
                        listname === "Учредители организаций" ? `является учредителем в ${cnt} организации(-ях)` : `является руководителем в ${cnt} организации(-ях)`
                    }
                </p>
            </div>
        </section>
    )
}

export default CardShh;