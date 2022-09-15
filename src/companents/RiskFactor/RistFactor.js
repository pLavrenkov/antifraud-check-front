function RiskFactor({ image, title, status }) {
    return (
        <li className="risk-faktor">
            <img src={image} alt="иконка" className="risk-factor__image" />
            <h4 className="risk-factor__title">{title}</h4>
            <p className="risk-factor__status"></p>
        </li>
    )
}

export default RiskFactor;
