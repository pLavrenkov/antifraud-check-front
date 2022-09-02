function Form({ children, buttonName, onSubmit, handleSubmit, serverMessage, resState, buttonReset, onReset }) {
    
    return (
        <section className="form">
            {children}
            <span className={resState ? "form__server-message" : "form__server-message form__server-message_type_error"}>{serverMessage}</span>
            <button type="submit" className="form__button" onClick={handleSubmit(onSubmit)} >{buttonName}</button>
            <button type="button" className="form__button form__button_type_reset" onClick={() => onReset({})} >{buttonReset}</button>
        </section>
    )
}

export default Form;
