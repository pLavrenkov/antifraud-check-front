import * as constants from '../../utils/constants';

function CardBankruptsPrs({ name, inn, region, status, data }) {

    const handleClick = () => {

    }
    console.log(data);
    return (
        <section onClick={handleClick} className="card">
            <h3 className="card__title">{name}</h3>
            <p className="card__field card__field_type_marcked card__field_type_inn">{inn}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_region">{region}</p>
            <p className="card__field card__field_type_nowrap card__field_type_marcked card__field_type_date">{
                data.lastLegalCase ?
                `${(data.lastLegalCase.status && data.lastLegalCase.status.updateDate) ? constants.formatDate(data.lastLegalCase.status.updateDate) : ''
                }${(data.lastLegalCase.status && data.lastLegalCase.status.updateDate) && '. '
                }${(data.lastLegalCase.status && data.lastLegalCase.status.description) ? data.lastLegalCase.status.description : ''
                }` : 'информация не указана'
            }</p>
        </section>
    )
}

export default CardBankruptsPrs;