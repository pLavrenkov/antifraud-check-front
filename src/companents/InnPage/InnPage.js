import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import * as InnApi from "../../utils/InnApi";
import * as makeErr from "../../utils/errors";

function InnPage() {
    const { register, formState: { errors }, setError, handleSubmit, watch } = useForm();
    const buttonName = 'НАЙТИ';
    const [inn, setInn] = useState('Не найдено');
    const [innSearchData, setInnSearchData] = useState({});

    const getINN = () => {
        const searchString = new URLSearchParams({ c: 'find', ...innSearchData, }).toString();
        InnApi.getToken(searchString)
            .then((res) => {
                if (!res) {
                    throw new Error('Токен не прислали');
                } else {
                    const searchInn = new URLSearchParams({
                        c: 'get',
                        requestId: res.requestId
                    }).toString();
                    return searchInn;
                }
            })
            .then((reqId) => {
                setTimeout(() => {
                    InnApi.getInn(reqId)
                        .then((res) => {
                            console.log(res);
                            setInn(res.inn);
                        })
                        .catch(err => console.log(err))
                }, 3000)

            })
            .catch(err => console.log(err))
    }

    const onSubmit = (data) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        const bdateArr = data.bdate.toLocaleString('ru', options).split('-');
        setInnSearchData({
            ...data,
            bdate: bdateArr[2] + '.' + bdateArr[1] + '.' + bdateArr[0],

        });
    }

    useEffect(() => {
        innSearchData.fam && getINN();
    }, [innSearchData]);

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
                            <input name="bdate" type="date" {...register("bdate", {
                                required: true,
                            })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="doctype" className="form__label">Тип документа:</label>
                            <input name="doctype" {...register("doctype", { required: true })} className="form__input" />
                            <span className="form__error">ошибка</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="docno" className="form__label">Номер документа:</label>
                            <input name="docno" {...register("docno", {
                                required: true,
                                maxLength: 12,
                                onChange: (e) => {
                                    const value = e.target.value.replace(/\s/g, '');
                                    if (value.length > 4) {
                                        e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 10);
                                    } else if (value.length > 2) {
                                        e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 4);

                                    } else {
                                        e.target.value = value;
                                    }
                                },
                                pattern: /(\d\s?){10}/,
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrDocNo(errors.docno?.type)}</span>
                        </p>
                    </div>
                </Form>
                <p className="inn-page__result">ИНН: {inn}</p>
            </div>
        </section>
    )
}

export default InnPage;