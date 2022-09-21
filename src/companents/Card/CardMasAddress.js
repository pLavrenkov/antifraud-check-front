import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as constants from "../../utils/constants";

function CardMasAddress({ inn, token, name, cnt }) {
    const [cardRequest, setCardRequest] = useState('');

    const handleClick = (inn, name) => {
        if (inn) {
            const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: inn });
            setCardRequest(req.toString());
            localStorage.setItem('cardRequest', req.toString());
        } else {
            const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: name });
            setCardRequest(req.toString());
            localStorage.setItem('cardRequest', req.toString());
        }
    }

    const onClick = () => {
        handleClick(inn, name);
    }

    return (
        <section className="card card_type_detailcard" onClick={onClick}>
            <Link to={{ pathname: "/buisness", state: { cardRequest: cardRequest } }} target={'_blank'} className="card__link">
                <h3 className="card__title card__title_type_detailcard">{name}</h3>
                <p className="card__field card__field_type_detailcard">{`ИНН ${inn || ''}`}</p>
            </Link>
        </section>
    )
}

export default CardMasAddress;