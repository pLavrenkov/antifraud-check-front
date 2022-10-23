function CardUl({ inn, invalid, namec, namep, okved2, okved2name, periodcode, regionname, token, yearcode, onCardClick }) {
    const handleClick = () => {
        const request = new URLSearchParams({ type1: '', token, method: 'get-request', type: '' });
        console.log(token);
        console.log(request);
        onCardClick(request);
    }

    return (
        <section onClick={handleClick} className="card">
            <h3 className="card__title">{namec}</h3>
            <p className="card__field card__field_type_marcked card__field_type_inn">{inn}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_region">{regionname}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_okved">{`${okved2} - ${okved2name}`}</p>
        </section>
    )
}

export default CardUl;
