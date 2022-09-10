import { useState } from "react";
import React from "react";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";
import CardList from "../CardList/CardList";

import SearchForm from "../SearchForm/SearchForm";

function TransparentBuisness() {
    const [request, setRequest] = useState('');
    const [resAllData, setResAllData] = useState({});
    const [resUlData, setResUlData] = useState([]);
    const [serverMessage, setServerMessage] = useState('');

    const handleRequest = (req) => {
        setServerMessage('');
        const requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        Api.getAll(requestAll.toString())
            .then((data) => {
                console.log(data);
                setResAllData(data);
                setResUlData(Array.from(data.ul.data));
            })
            .catch((err) => {
                setServerMessage(`Произошла ошибка: ${err.message}`);
            })
    }

    //console.log(resAllData.ul.hasMore);

    const handleSubmit = (data) => {
        setRequest(data.search);
        handleRequest(data.search);
    }

    const handleUlCardClick = (request) => {
        Api.getUl(request.toString())
            .then((data) => {
                console.log(data);
                const res = new URLSearchParams({ type: '', method: "get-response", id: data.id, token: data.token, type1: '' })
                setTimeout(() => {
                    Api.getUl(res.toString())
                    .then((ul) => {
                        console.log(ul);
                    })

                }, 2000)
            })
    }

    return (
        <section className="trans-buisness">
            <h1 className="trans-buisness__title">ПРОЗРАЧНЫЙ БИЗНЕС</h1>
            <SearchForm onSubmit={handleSubmit} request={request} message={serverMessage} />
            {resAllData.ul &&
                resAllData.ul.rowCount > 0 ?
                <CardList
                    data={resAllData.ul.data}
                    hasMore={resAllData.ul.hasMore}
                    page={resAllData.ul.page}
                    pageSize={resAllData.ul.pageSize}
                    rowCount={resAllData.ul.rowCount}
                    listname={'Юридические лица'}
                    request={request}
                    onUlCardClick={handleUlCardClick}
                />
                :
                <p>Результаты не найдены</p>
            }
        </section>
    )
}

export default TransparentBuisness;