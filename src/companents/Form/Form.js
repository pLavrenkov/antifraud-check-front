function Form({ children, buttonName, onSubmit, handleSubmit, serverMessage, resState, buttonReset, onReset, onDisabled }) {
    
    return (
        <section className="form">
            {children}
            <span className={resState ? "form__server-message" : "form__server-message form__server-message_type_error"}>{serverMessage}</span>
            <button type="submit" className={onDisabled ? "form__button form__button_type_disabled" : "form__button"} disabled={onDisabled} onClick={handleSubmit(onSubmit)} >{buttonName}</button>
            <button type="button" className="form__button form__button_type_reset" onClick={() => onReset({})} >{buttonReset}</button>
        </section>
    )
}

export default Form;
