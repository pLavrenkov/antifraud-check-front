import { useState } from "react";
import { useForm } from "react-hook-form";

import * as makeErr from "../../utils/errors";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/InnApi";

function SearchForm() {
    const { register, formState: { errors }, handleSubmit, watch, resetField } = useForm();
    const [request, setRequest] = useState('');
    const [apiRequest, setApiRequest] = useState({});
    console.log(request);
    console.log(apiRequest);

    const handleRequest = (req) => {
        const requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        Api.getTrsnsBuis(requestAll.toString())
            .then(data => console.log(data))
        console.log(JSON.stringify(requestAll.toString()));

    }

    const onSubmit = (data) => {
        setRequest(data.search);
        resetField("search");
        handleRequest(data.search);
    }



    return (
        <section className="searchform">
            <form onSubmit={handleSubmit(onSubmit)} className="searchform__container">
                <button type="button" onClick={() => resetField("search")} className={watch("search")?.length > 0 ? "searchform__reset-btn" : "searchform__reset-btn searchform__reset-btn_type_closed"} />
                <input name="search" type="text" placeholder="Введите запрос..." {...register("search", {
                    required: true,
                    minLength: 3,
                })} className="searchform__input" />
                <button type="submit" className="searchform__submit-btn">Найти</button>
                <span className="searchform__error">{makeErr.makeErrSearch(errors.search?.type)}</span>
            </form>
            <p className="serchform__server-error">Ошибка сервера</p>
            <p className="serchform__request-box">результаты запроса <span className="searchform__request">{request}</span>:</p>
        </section>
    )
}

export default SearchForm;