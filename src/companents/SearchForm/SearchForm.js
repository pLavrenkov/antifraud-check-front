import { useState } from "react";
import { useForm } from "react-hook-form";

import * as makeErr from "../../utils/errors";

function SearchForm() {
    const { register, formState: { errors }, handleSubmit, watch, resetField } = useForm();
    const [request, setRequest] = useState();

    const onSubmit = (data) => {
        setRequest(data.search);
        console.log(data);
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
            <p className="serchform__request-box">Результаты поискового запроса <span className="searchform__request">{request}</span></p>
        </section>
    )
}

export default SearchForm;