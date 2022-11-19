import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SearchFilter({ onRegion, onCaseType, regionList, resetType, resetRegion }) {
    const { register, formState: { errors }, handleSubmit, reset, watch, resetField } = useForm();
   
    const onSubmit = (data) => {
        onRegion(data.region);
        onCaseType(data.casetype);
        console.log(data.casetype);
    }

    console.log(!watch("casetype"))


    return (
        <form className="searchfilter" onChange={handleSubmit(onSubmit)}>
            <p className="searchfilter__formset">
                <label htmlFor="casetype" className="searchfilter__label">Тип дела:</label>
                <button type="button" onClick={() => {resetType(); resetField("casetype")}} className={!watch("casetype") || watch("casetype") === 'null' ? "searchfilter__reset-btn searchfilter__reset-btn_type_closed" : "searchfilter__reset-btn"} />
                <select name="casetype" defaultValue={sessionStorage.getItem("type") ? sessionStorage.getItem("type") : 'null'} {...register("casetype", { required: true })} className="searchfilter__input">
                    <option value={'null'} className="searchfilter__option">Все</option>
                    <option value={true} className="searchfilter__option">Активные</option>
                    <option value={false} className="searchfilter__option">Завершенные</option>
                </select>
            </p>
            <p className="searchfilter__formset">
                <label htmlFor="region" className="searchfilter__label">Регион:</label>
                <button type="button" onClick={() => {resetRegion(); resetField("region")}} className={!watch("region") || watch("region") === 'All' ? "searchfilter__reset-btn searchfilter__reset-btn_type_closed" : "searchfilter__reset-btn"} />
                <select name="region" defaultValue={sessionStorage.getItem("region") ? sessionStorage.getItem("region") : "All"} {...register("region", { required: true })} className="searchfilter__input">
                    <option value={'All'} className="searchfilter__option">Все</option>
                    {regionList.length > 0 &&
                        regionList.map((item) => {
                            return <option key={item.id} value={item.id} className="searchfilter__option">{item.name}</option>
                        })
                    }

                </select>
            </p>
        </form>
    )
}

export default SearchFilter;