import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import * as InnApi from "../../utils/InnApi";
import * as makeErr from "../../utils/errors";
import * as Validation from "../../utils/validation";

function InnPage() {
    const { register, formState: { errors }, handleSubmit, reset, watch, resetField } = useForm();
    const buttonName = 'НАЙТИ';
    const buttonReset = 'СБРОСИТЬ';
    const [inn, setInn] = useState('не найдено');
    const [innSearchData, setInnSearchData] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [serverResState, setServerResState] = useState(false);
    const [keyCode, setKeyCode] = useState('');

    const getINN = () => {
        const searchString = new URLSearchParams({
            c: 'find',
            captcha: '',
            captchaToken: '',
            ...innSearchData,
            docdt: '',
        }).toString();
        console.log(searchString);
        InnApi.getToken(searchString)
            .then((res) => {
                if (!res) {
                    setServerResState(false);
                    setServerMessage('Токен не получен');
                    throw new Error('Токен не прислали');
                } else {
                    setServerResState(true);
                    setServerMessage('Токен получен');
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
                            if (res.state === 1) {
                                setServerResState(true);
                                setServerMessage('Запрос обработан успешно');
                                setInn(res.inn);
                            } else {
                                setServerResState(false);
                                setServerMessage('ИНН для лица с такими данными не обнаружен');
                                setInn('Не найдено');
                            }

                        })
                        .catch((err) => {
                            setServerResState(false);
                            setServerMessage(`Произошла ошибка: ${err.message}, проверьте введенные данные`);
                            setInn('Не найдено');
                        })
                }, 2000)

            })
            .catch((err) => {
                setServerResState(false);
                setServerMessage(`Произошла ошибка: ${err.message}, проверьте введенные данные`);
                setInn('Не найдено');
            })
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

    const onReset = () => {
        reset({
            fam: '',
            nam: '',
            otch: '',
            bdate: '',
            doctype: '21',
            docno: ''
        });
        setServerMessage('');
        setInn('не найдено');
    }

    const onResetField = (field) => {
        resetField(field);
    }

    useEffect(() => {
        innSearchData.fam && getINN();
    }, [innSearchData]);

    //console.log(watch("fam"))
    const handleKeyCode = (e) => {
        setKeyCode(e.code);
    }

    return (
        <section className="inn-page">
            <div className="inn-page__content">
                <h1 className="inn-page__title">УЗНАТЬ ИНН</h1>
                <Form handleSubmit={handleSubmit} onSubmit={onSubmit} buttonName={buttonName} serverMessage={serverMessage} resState={serverResState} buttonReset={buttonReset} onReset={onReset}>
                    <div className="form__inputs">
                        <p className="form__set">
                            <label htmlFor="fam" className="form__label">Фамилия:</label>
                            <button type="button" className={watch("fam")?.length > 0 ? "form__reset-input" : "form__reset-input form__reset-input_type_closed"} onClick={() => resetField("fam")} />
                            <input name="fam" {...register("fam", {
                                required: true,
                                minLength: 2,
                                pattern: /^[а-яА-Я-]+$/,
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrFam(errors.fam?.type)}</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="nam" className="form__label">Имя:</label>
                            <button type="button" className={watch("nam")?.length > 0 ? "form__reset-input" : "form__reset-input form__reset-input_type_closed"} onClick={() => resetField("nam")} />
                            <input name="nam" {...register("nam", {
                                required: true,
                                minLength: 2,
                                pattern: /^[а-яА-Я-]+$/,
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrNam(errors.nam?.type)}</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="otch" className="form__label">Отчество:</label>
                            <button type="button" className={watch("otch")?.length > 0 ? "form__reset-input" : "form__reset-input form__reset-input_type_closed"} onClick={() => resetField("otch")} />
                            <input name="otch" {...register("otch", {
                                required: true,
                                minLength: 2,
                                pattern: /^[а-яА-Я-]+\s?[а-яА-Я-]*$/,
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrOtch(errors.otch?.type)}</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="bdate" className="form__label">Дата рождения:</label>
                            <input name="bdate" type="date" {...register("bdate", {
                                required: true,
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrBdate(errors.bdate?.type)}</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="doctype" className="form__label">Тип документа:</label>
                            <select name="doctype" defaultValue={"21"} {...register("doctype", { required: true })} className="form__input" >
                                <option value='21'>паспорт гражданина РФ</option>
                                <option value='01'>паспорт гражданина СССР</option>
                                <option value='03'>свидетельство о рождении РФ</option>
                                <option value='10'>паспорт иностранного гражданина</option>
                                <option value='12'>вид на жительство в РФ</option>
                                <option value='15'>разрешение на временное проживание в РФ</option>
                                <option value='19'>свидетельство о предоставлении убежища</option>
                                <option value='23'>свидетельство о рождении, выданное не в РФ</option>
                                <option value='62'>вид на жительство иностранного гражданина</option>
                            </select>
                            <span className="form__error">{makeErr.makeErrDoctype(errors.doctype?.type)}</span>
                        </p>
                        <p className="form__set">
                            <label htmlFor="docno" className="form__label">Номер документа:</label>
                            <button type="button" className={watch("docno")?.length > 0 ? "form__reset-input" : "form__reset-input form__reset-input_type_closed"} onClick={() => resetField("docno")} />
                            <input name="docno" placeholder={Validation.docnoPlaceHolder(watch("doctype"))} onKeyDown={handleKeyCode} {...register("docno", {
                                required: true,
                                maxLength: 15,
                                onChange: Validation.docNoFormat(watch("doctype"), keyCode),
                                pattern: Validation.docNoPattern(watch("doctype")),
                            })} className="form__input" />
                            <span className="form__error">{makeErr.makeErrDocNo(errors.docno?.type, watch("doctype"))}</span>
                        </p>
                    </div>
                </Form>
                <p className="inn-page__result">ИНН: {inn}</p>
            </div>
        </section>
    )
}

export default InnPage;