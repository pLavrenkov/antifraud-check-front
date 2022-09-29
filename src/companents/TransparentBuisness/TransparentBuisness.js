import { useState, useEffect } from "react";
import React from "react";
import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";
import CardList from "../CardList/CardList";

import SearchForm from "../SearchForm/SearchForm";
import CardPopup from "../CardPopup/CardPopup";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";
import CompanyDetails from "../CardDetails/CompanyDetails";
import IpDetails from "../CardDetails/IpDetails";
import NewSearchPopup from "../NewSearchPopup/NewSearchPopup";

function TransparentBuisness() {
    const [request, setRequest] = useState(sessionStorage.getItem("trbuisreq") ? sessionStorage.getItem("trbuisreq") : localStorage.getItem('linkRequest') ? localStorage.getItem('linkRequest') : '');
    const [resAllData, setResAllData] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isNewSearchPopupOpen, setIsNewSearchPopupOpen] = useState(false);
    const [cardData, setCardData] = useState({});
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);
    const [cardToken, setCardToken] = useState('');
    const [cardRequest, setCardRequest] = useState(localStorage.getItem("cardRequest") || '');
    const [tokenReq, setTokenReq] = useState('');
    const [innReq, setInnReq] = useState('');
    const [nameReq, setNameReq] = useState('');
    const [currentClickData, setCurrentClickData] = useState({});
    const [isMassAdd, setIsMassAdd] = useState(false);

    const handleRequest = (req) => {
        setServerMessage('');
        const requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        Api.getAll(requestAll.toString())
            .then((data) => {
                console.log(data);
                setResAllData(data);
                setIsLoaderOpen(false);
            })
            .catch((err) => {
                setIsLoaderOpen(false);
                setServerMessage(`Произошла ошибка: ${err.message}`);
            })
    }

    const handleCardRequest = (cardReq) => {
        console.log(cardReq);
        setIsLoaderOpen(true);
        setTimeout(() => {
            Api.getAll(cardReq)
                .then((data) => {
                    console.log(data);
                    setResAllData(data);
                    localStorage.setItem("reqData", JSON.stringify(data));
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
        console.log(cardRequest);
        if (cardRequest) {
            handleCardRequest(cardRequest);
            sessionStorage.setItem("trbuisreq", localStorage.getItem('linkRequest'));
            console.log("сработал cardrequest");
        } else if (sessionStorage.getItem("trbuisreq") && !sessionStorage.getItem("trbuisreq").includes("окружение")) {
            sessionStorage.getItem("trbuisreq") &&
                handleRequest(sessionStorage.getItem("trbuisreq"));
                console.log("сработал sessionStorage");
                console.log(!sessionStorage.getItem("trbuisreq").includes("окружение"));
        } else {
            setResAllData(JSON.parse(localStorage.getItem("reqData")));
            console.log("сработал localStorage");
        }
    }, [])

    const handleSubmit = (data) => {
        setRequest(data.search);
        setIsLoaderOpen(true);
        sessionStorage.setItem("trbuisreq", data.search);
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
                            setCardData({ ...ul, token: cardToken });
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

    const handleTokenRequest = (token, name) => {
        const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, token, mode: "search-ul", queryUl: name, pageSize: 99, });
        setTokenReq(req.toString())
    }

    const handleInnRequest = (inn) => {
        const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: inn });
        setInnReq(req.toString());
    }

    const handleNameRequest = (name) => {
        const req = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: name });
        setNameReq(req.toString());
    }

    const handleOnCardClick = (token, inn, name, isMasAdd) => {
        setCurrentClickData({ token, inn, name });
        setIsNewSearchPopupOpen(true);
        token && name && handleTokenRequest(token, name);
        inn && handleInnRequest(inn);
        name && handleNameRequest(name);
        setIsMassAdd(isMasAdd);
    }

    const handlePopupNewSearchClosed = () => {
        setIsNewSearchPopupOpen(false);
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
                <p className="trans-buisness__nth-found">{request && 'Юридические лица: результаты не найдены'}</p>
            }
            {resAllData.ip &&
                resAllData.ip.rowCount > 0 ?
                <CardList
                    data={resAllData.ip.data}
                    hasMore={resAllData.ip.hasMore}
                    page={resAllData.ip.page}
                    pageSize={resAllData.ip.pageSize}
                    rowCount={resAllData.ip.rowCount}
                    listname={'Индивидуальные предприниматели'}
                    request={request}
                    onUlCardClick={handleUlCardClick}
                />
                :
                <p className="trans-buisness__nth-found">{request && 'Индивидуальные предприниматели: результаты не найдены'}</p>
            }
            {resAllData.upr &&
                resAllData.upr.rowCount > 0 ?
                <CardList
                    data={resAllData.upr.data}
                    hasMore={resAllData.upr.hasMore}
                    page={resAllData.upr.page}
                    pageSize={resAllData.upr.pageSize}
                    rowCount={resAllData.upr.rowCount}
                    listname={'Руководители организаций'}
                    request={request}
                    onUlCardClick={handleOnCardClick}
                />
                :
                <p className="trans-buisness__nth-found">{request && 'Руководители организаций: результаты не найдены'}</p>
            }
            {resAllData.uchr &&
                resAllData.uchr.rowCount > 0 ?
                <CardList
                    data={resAllData.uchr.data}
                    hasMore={resAllData.uchr.hasMore}
                    page={resAllData.uchr.page}
                    pageSize={resAllData.uchr.pageSize}
                    rowCount={resAllData.uchr.rowCount}
                    listname={'Учредители организаций'}
                    request={request}
                    onUlCardClick={handleOnCardClick}
                />
                :
                <p className="trans-buisness__nth-found">{request && 'Учредители организаций: результаты не найдены'}</p>
            }
            <CardPopup isOpen={isPopupOpen} onClose={handlePopupClosed} cardData={cardData} token={cardToken} handleLoading={setIsLoaderOpen}>
                {cardData.type && cardData.type === 1 && <CompanyDetails cardData={cardData} token={cardToken} handleLoading={setIsLoaderOpen} onCardClick={handleOnCardClick} />}
                {cardData.type && cardData.type === 2 && <IpDetails cardData={cardData} token={cardToken} handleLoading={setIsLoaderOpen} onCardClick={handleOnCardClick} />}
            </CardPopup>
            <CardPopup isOpen={isNewSearchPopupOpen} onClose={handlePopupNewSearchClosed} cardData={cardData} token={cardToken} handleLoading={setIsLoaderOpen}>
                <NewSearchPopup tokenReq={tokenReq} innReq={innReq} nameReq={nameReq} data={currentClickData} onClose={handlePopupNewSearchClosed} masAdd={isMassAdd} />
            </CardPopup>
            <LoaderAnimation isOpen={isLoaderOpen} />
        </section>
    )
}

export default TransparentBuisness;