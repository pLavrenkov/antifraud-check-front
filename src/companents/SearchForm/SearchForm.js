import { useForm } from "react-hook-form";

import * as makeErr from "../../utils/errors";

function SearchForm({ onSubmit, request, message }) {
    const { register, formState: { errors }, handleSubmit, watch, resetField } = useForm();

    const handleOnSubmit = (data) => {
        onSubmit(data);
        resetField("search");
    }

    return (
        <section className="searchform">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="searchform__container">
                <button type="button" onClick={() => resetField("search")} className={watch("search")?.length > 0 ? "searchform__reset-btn" : "searchform__reset-btn searchform__reset-btn_type_closed"} />
                <input name="search" type="text" placeholder="Введите запрос..." {...register("search", {
                    required: true,
                    minLength: 3,
                })} className="searchform__input" />
                <button type="submit" className={watch("search") ? "searchform__submit-btn" : "searchform__submit-btn searchform__submit-btn_type_disabled"} disabled={!watch("search")} >Найти</button>
                <span className="searchform__error">{makeErr.makeErrSearch(errors.search?.type)}</span>
            </form>
            <div className="searchform__results-container">
                {message && <p className="serchform__server-error">{message}</p>}
                {request && !message && <p className="serchform__request-box">результаты запроса <span className="searchform__request">{request}</span></p>}
            </div>
        </section>
    )
}

export default SearchForm;