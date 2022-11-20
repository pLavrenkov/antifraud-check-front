import * as constants from '../../utils/constants';

function CardBankruptsCmp({ name, inn, region, status, data}) {

    const handleClick = () => {

    }
console.log(data);
    return (
        <section onClick={handleClick} className="card">
            <h3 className={data.isActive ? "card__title" : "card__title card__title_type_nonactive"}>{name}</h3>
            <p className="card__field card__field_type_marcked card__field_type_inn">{inn}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_region">{region}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_date">{
                `${
                    data.statusUpdateDate ? constants.formatDate(data.statusUpdateDate) : data.lastLegalCase.status && data.lastLegalCase.status.updateDate ? constants.formatDate(data.lastLegalCase.status.updateDate) : ''
                }${
                    (data.statusUpdateDate || (data.lastLegalCase.status && data.lastLegalCase.status.updateDate)) && '. '
                }${
                    data.status ? data.status : data.lastLegalCase.status && data.lastLegalCase.status.description ? data.lastLegalCase.status.description : ''
                }`
            }</p>
        </section>
    )
}

export default CardBankruptsCmp;