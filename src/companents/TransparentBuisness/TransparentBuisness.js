import { useState } from "react";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";

import SearchForm from "../SearchForm/SearchForm";

function TransparentBuisness() {
    const [request, setRequest] = useState('');
    const handleRequest = (req) => {
        const requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        Api.getAll(requestAll.toString())
            .then(data => console.log(data))
    }

    const handleSubmit = (data) => {
        setRequest(data.search);
        handleRequest(data.search);
    }
    
    return (
        <section className="trans-buisness">
            <h1 className="trans-buisness__title">ПРОЗРАЧНЫЙ БИЗНЕС</h1>
            <SearchForm onSubmit={handleSubmit} request={request}/>
        </section>
    )
}

export default TransparentBuisness;