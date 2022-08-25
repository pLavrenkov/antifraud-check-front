import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import * as InnApi from "../../utils/InnApi"

function InnPage() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const buttonName = 'НАЙТИ';
    const [inn, setInn] = useState('Не найдено');
    const [innSearchData, setInnSearchData] = useState({ c: 'find' });


    const getJWT = (req) => {
        InnApi.getToken(req)
            .then((token) => {
                if (!token) {
                    throw new Error('Токен не прислали');
                } else {
                    console.log(token);
                }
            })
            .catch(err => console.log(err))
    }

    const onSubmit = (data) => {
        console.log(data);
        setInnSearchData(data);
        const searchString = new URLSearchParams({ c: 'find', ...innSearchData });
        getJWT(searchString.toString());
    }
    console.log(innSearchData);
    const searchString = new URLSearchParams({ c: 'find', ...innSearchData });
    console.log(searchString.toString());


    return (
        <section className="inn-page">
            <div className="inn-page__content">
                <h1 className="inn-page__title">ПОЛУЧИТЬ ИНН</h1>
                <Form handleSubmit={handleSubmit} onSubmit={onSubmit} buttonName={buttonName} >
                    <div className="form__inputs">
                        <p className="form__set">
                            <label htmlFor="fam" className="form__label">Фамилия:</label>
                            <input name="fam" {...register("fam", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="nam" className="form__label">Имя:</label>
                            <input name="nam" {...register("nam", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="otch" className="form__label">Отчество:</label>
                            <input name="otch" {...register("otch", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="bdate" className="form__label">Дата рождения:</label>
                            <input name="bdate" {...register("bdate", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="doctype" className="form__label">Тип документа:</label>
                            <input name="doctype" {...register("doctype", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="docno" className="form__label">Номер документа:</label>
                            <input name="docno" {...register("docno", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                    </div>
                </Form>
                <p className="inn-page__result">ИНН: {inn}</p>
            </div>
        </section>
    )
}

export default InnPage;