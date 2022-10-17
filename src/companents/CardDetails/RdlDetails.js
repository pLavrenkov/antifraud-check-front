function RdlDetails({ cardData }) {
    return (
        <section className="details">
            <h1 className="details__title">{cardData.namefl}</h1>
            <div className="details__props details__props_type_column">
                <div className="details__props-container">
                    <ul className="details__props-block details__props-block_type_100">
                        <li className="details__prop details__prop_type_biggerfont details__prop_type_birthday">{`${cardData.datarozhd}`}</li>
                        <li className="details__prop details__prop_type_biggerfont details__prop_type_birthplace">{`${cardData.mestorozhd}`}</li>
                    </ul>
                </div>
            </div>
            <div className="details__props details__props_type_toplined">
                <h4 className="details__props-title details__props-title_type_long">Сроки дисквалификации</h4>
                <div className="details__props-container">
                    <div className="details__props-block details__props-block_type_100 details__props-block_type_non-rightborder">
                        <ul className="details__prop-module">
                            <li className="details__prop details__prop_type_date details__prop_type_50">{cardData.datanachdiskv || ''}</li>
                            <li className="details__prop details__prop_type_date details__prop_type_50">{cardData.datakondiskv || ''}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="details__props details__props_type_toplined">
                <div className="details__props-container">
                    <div className="details__props-block details__props-block_type_50">
                        <h4 className="details__props-title">Сведения о позиции</h4>
                        <ul className="details__prop-module details__props-module_type_column">
                            <li className="details__prop details__prop_type_role">{cardData.dolzhnost}</li>
                            <li className="details__prop details__prop_type_company">{cardData.naimorg}</li>
                        </ul>
                    </div>
                    <div className="details__props-block details__props-block_type_50">
                        <h4 className="details__props-title">Сведения о налоговом органе</h4>
                        <ul className="details__prop-module details__props-module_type_column">
                            <li className="details__prop details__prop_type_num">{cardData.nomzap}</li>
                            <li className="details__prop details__prop_type_createStatement">{cardData.naimorgprot}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="details__props details__props_type_toplined">
                <h4 className="details__props-title details__props-title_type_long">Сведения о решении</h4>
                <div className="details__props-container">
                    <div className="details__props-block details__props-block_type_100 details__props-block_type_non-rightborder">
                        <ul className="details__prop-module">
                            <li className="details__prop details__prop_type_law details__prop_type_30">{cardData.svednarush || ''}</li>
                            <li className="details__prop details__prop_type_date details__prop_type_30">{cardData.diskvsr || ''}</li>
                            <li className="details__prop details__prop_type_court">{cardData.namesud || ''}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RdlDetails;