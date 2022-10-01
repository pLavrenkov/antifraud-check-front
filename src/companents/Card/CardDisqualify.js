function CardDisqualify({ data, datakondiskv, dolzhnost, naimorg, namefl, onCardClick }) {
    const handleClick = () => {
        console.log(data);
        onCardClick(data);
    }
    return (
        <section onClick={handleClick} className="card">
            <h3 className="card__title">{namefl}</h3>
            <p className="card__field card__field_type_position">{dolzhnost}</p>
            <p className="card__field card__field_type_org">{naimorg}</p>
            <p className="card__field card__field_type_date">{datakondiskv}</p>
        </section>
    )
}

export default CardDisqualify;
