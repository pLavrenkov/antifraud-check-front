function LoaderAnimation({ isOpen }) {
    return (
        <section className={isOpen ? "loader loader_type_active" : "loader"}>
            <div className="loader__container">
                <div className="loader__overflow">
                    <div className="loader__track"></div>
                </div>
                <p className="loader__title">идет загрузка...</p>
            </div>
        </section>
    )
}

export default LoaderAnimation;