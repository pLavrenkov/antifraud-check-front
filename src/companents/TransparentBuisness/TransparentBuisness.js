import { useState, useEffect } from "react";
import React from "react";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";
import CardList from "../CardList/CardList";

import SearchForm from "../SearchForm/SearchForm";
import CardPopup from "../CardPopup/CardPopup";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";
import { useLocation } from "react-router-dom";

function TransparentBuisness() {
    const [request, setRequest] = useState(localStorage.getItem("trbuisreq") || '');
    const [resAllData, setResAllData] = useState({});
    const [resUlData, setResUlData] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cardData, setCardData] = useState({});
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);
    const [cardToken, setCardToken] = useState('');
    const location = useLocation();
    const [cardRequest, setCardRequest] = useState(localStorage.getItem("cardRequest") || '');
    console.log(cardRequest);

    const handleRequest = (req) => {
        setServerMessage('');
        const requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        Api.getAll(requestAll.toString())
            .then((data) => {
                console.log(data);
                setResAllData(data);
                setResUlData(Array.from(data.ul.data));
                setIsLoaderOpen(false);
            })
            .catch((err) => {
                setIsLoaderOpen(false);
                setServerMessage(`Произошла ошибка: ${err.message}`);
            })
    }

    const handleCardRequest = (cardReq) => {
        setIsLoaderOpen(true);
        setTimeout(() => {
            Api.getAll(cardReq)
                .then((data) => {
                    console.log(data);
                    setResAllData(data);
                    setResUlData(Array.from(data.ul.data));
                    setIsLoaderOpen(false);
                    setCardRequest('');
                    localStorage.removeItem("cardRequest");
                    setIsLoaderOpen(false);
                })
                .catch((err) => {
                    setIsLoaderOpen(false);
                    setServerMessage(`Произошла ошибка: ${err.message}`);
                    setCardRequest('');
                    localStorage.removeItem("cardRequest");
                    setIsLoaderOpen(false);
                })
        }, 3000);
    }

    useEffect(() => {
        if (cardRequest) {
            handleCardRequest(cardRequest);
        } else if (localStorage.getItem("trbuisreq")) {
            localStorage.getItem("trbuisreq") &&
                handleRequest(localStorage.getItem("trbuisreq"));
        } else {
            return;
        }
    }, [])

    const handleSubmit = (data) => {
        setRequest(data.search);
        setIsLoaderOpen(true);
        setRequest(data.search);
        localStorage.setItem("trbuisreq", data.search);
        setTimeout(() => handleRequest(data.search), 2000);
    }

    const handleUlCardClick = (request) => {
        setIsLoaderOpen(true);
        Api.getUl(request.toString())
            .then((data) => {
                console.log(data);
                setCardToken(data.token);
                const res = new URLSearchParams({ type: '', method: "get-response", id: data.id, token: data.token, type1: '' })
                setTimeout(() => {
                    Api.getUl(res.toString())
                        .then((ul) => {
                            handlePopupOpen();
                            console.log(ul);
                            setCardData({...ul, token: cardToken});
                            setIsLoaderOpen(false);
                        })
                        .catch((err) => {
                            setIsLoaderOpen(false);
                            setServerMessage(`Произошла ошибка: ${err.message}`);
                            console.log(err);
                        })

                }, 2000)
            })
            .catch((err) => {
                setIsLoaderOpen(false);
                setServerMessage(`Произошла ошибка: ${err.message}`);
                console.log(err);
            })
    }

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    }

    const handlePopupClosed = () => {
        setIsPopupOpen(false);
    }

    useEffect(() => {
        const closeByEsc = (e) => {
            if (e.key === 'Escape') {
                handlePopupClosed();
            }
        }
        window.addEventListener('keydown', closeByEsc);
        return () => window.removeEventListener('keydown', closeByEsc);
    }, []);

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
                <p>{request && 'Результаты не найдены'}</p>
            }
            <CardPopup isOpen={isPopupOpen} onClose={handlePopupClosed} cardData={cardData} token={cardToken}/>
            <LoaderAnimation isOpen={isLoaderOpen} />
        </section>
    )
}

export default TransparentBuisness;