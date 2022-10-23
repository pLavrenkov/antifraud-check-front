function CardApplication({ inn, token, name, data, position, company, onCardClick }) {
    const onClick = () => {
        onCardClick(token, inn, name, false);
    }

    return (
        <section className="card card_type_detailcard card_type_application" onClick={onClick}>
            <div className="card__link">
                <h3 className="card__title card__title_type_3line">{name}</h3>
                <p className="card__field card__field_type_marcked card__field_type_date">{data.date_post}</p>
                <p className="card__field card__field_type_marcked card__field_type_inn">{data.form}</p>
                <p className="card__field card__field_type_marcked card__field_type_inn">{data.in_number}</p>
                <p className="card__field card__field_type_marcked card__field_type_inn">{data.channel}</p>
                <p className="card__field card__field_type_marcked card__field_type_inn">{data.vidresh || 'решение не принято'}</p>
                <p className="card__field card__field_type_marcked card__field_type_date">{data.date_complete}</p>
                <p className="card__field card__field_type_marcked card__field_type_date">{data.ifns}</p>
                <p className="card__field card__field_type_marcked card__field_type_date">{data.grn}</p>
            </div>
        </section>
    )
}

export default CardApplication;