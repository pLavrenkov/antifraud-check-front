function RdlDetails({ cardData }) {
    return (
        <section className="details">
            <h1 className="details__title">{cardData.namefl}</h1>
            <p className="details__bdate">{`${cardData.datarozhd}`}</p>
            <p className="details__prop details__prop_type_underlined details__prop_type_date">{`${cardData.mestorozhd}`}</p>
            <div className="details__props-block details__props-title_type_long details__props-block_type_redesined">
                <h4 className="details__props-title details__props-title_type_long">Сроки дисквалификации</h4>
                <ul className="details__prop-module details__prop-module_type_cease">
                    <li className="details__prop details__prop_type_date details__prop_type_cease">{cardData.datanachdiskv || ''}</li>
                    <li className="details__prop details__prop_type_date details__prop_type_cease">{cardData.datakondiskv || ''}</li>
                </ul>
            </div>
            <div className="details__props">
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о позиции</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_ogrn">{cardData.dolzhnost}</li>
                        <li className="details__prop details__prop_type_way">{cardData.naimorg}</li>
                    </ul>
                </div>
                <div className="details__props-block">
                    <h4 className="details__props-title">Сведения о налоговом органе</h4>
                    <ul className="details__prop-module">
                        <li className="details__prop details__prop_type_inn">{cardData.nomzap}</li>
                        <li className="details__prop details__prop_type_kpp">{cardData.naimorgprot}</li>
                    </ul>
                </div>
            </div>
                        <div className="details__props-block details__props-title_type_long details__props-block_type_redesined">
                <h4 className="details__props-title details__props-title_type_long">Сведения о решении</h4>
                <ul className="details__prop-module details__prop-module_type_cease">
                    <li className="details__prop details__prop_type_date details__prop_type_cease">{cardData.svednarush || ''}</li>
                    <li className="details__prop details__prop_type_date details__prop_type_cease">{cardData.diskvsr || ''}</li>
                    <li className="details__prop details__prop_type_date details__prop_type_cease">{cardData.namesud || ''}</li>
                </ul>
            </div>
        </section>
    )
}

export default RdlDetails;