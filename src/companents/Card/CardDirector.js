import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as constants from "../../utils/constants";

function CardDirector({ inn, token, name, position, cnt }) {
    const [cardRequest, setCardRequest] = useState('');

    useEffect(() => {
        const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, token, mode: "search-ul", queryUl: name, });
        setCardRequest(req.toString());
        localStorage.setItem('cardRequest', req.toString());

    }, []);
    console.log(cardRequest);

    return (
        <section className="card">
            <Link to={{ pathname: "/buisness", state: cardRequest }} target={'_blank'} >
                <h3 className="card__title">{position}</h3>
                <p className="card__field">{name}</p>
                <p className="card__field">{inn}</p>
                <p className="card__field">{`является руководителем в ${cnt} организации(-ях)`}</p>
            </Link>
        </section>
    )
}

export default CardDirector;