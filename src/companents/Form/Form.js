function Form({ children, buttonName, onSubmit, handleSubmit }) {
    
    return (
        <section className="form">
            {children}
            <span className="form__server-message">Ошибка</span>
            <button type="submit" className="form__button" onClick={handleSubmit(onSubmit)} >{buttonName}</button>
        </section>
    )
}

export default Form;
