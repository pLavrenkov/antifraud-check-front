import { useForm } from "react-hook-form";

function SearchFilter({ onRegion, onCaseType, regionList }) {
    const { register, formState: { errors }, handleSubmit, reset, watch, resetField } = useForm();

    const onSubmit = (data) => {
        onRegion(data.region);
        onCaseType(data.casetype);
    }

    return (
        <form className="searchfilter" onChange={handleSubmit(onSubmit)}>
            <p className="searchfilter__formset">
                <label htmlFor="casetype" className="searchfilter__label">Тип дела</label>
                <select name="casetype" defaultValue={"All"} {...register("casetype", { required: true })} className="searchfilter__input">
                    <option value='All'>Все</option>
                    <option value={true}>Активные</option>
                    <option value={false}>Завершенные</option>
                </select>
            </p>
            <p className="searchfilter__formset">
                <label htmlFor="region" className="searchfilter__label">Регион</label>
                <select name="region" defaultValue={"All"} {...register("region", { required: true })} className="searchfilter__input">
                    <option value={null}>Все</option>
                    {
                        regionList.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }

                </select>
            </p>
        </form>
    )
}

export default SearchFilter;