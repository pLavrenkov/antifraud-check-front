import React from "react";
import { useEffect, useState } from "react";
import CardUl from "../Card/CardUl";
import Preloader from "../Preloader/Preloader";

import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";
import CardIp from "../Card/CardIp";
import CardDirector from "../Card/CardDirector";
import CardShh from "../Card/CardShh";

function CardList({ data, hasMore, page, pageSize, rowCount, listname, request, onUlCardClick, onCardClick }) {
    const [cards, setCards] = useState(data);
    const [morePages, setMorePages] = useState(hasMore);
    const [pageNumber, setPageNumber] = useState(page);
    const [cardsPageSet, setCardsPageSet] = useState(pageSize);
    const [previosPage, setPreviosPage] = useState(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPageReq, setIsPageReq] = useState(false);

    useEffect(() => {
        setIsPageReq(false);
        setCards(data);
        setMorePages(hasMore);
        setPageNumber(page);
        setCardsPageSet(pageSize);
    }, [data]);

    const handleRequest = (req) => {
        console.log(pageNumber);
        let requestAll = '';
        if (listname === 'Юридические лица') {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req, queryUl: req, page: pageNumber, mode: 'search-ul' });
            Api.getAll(requestAll.toString())
                .then((data) => {
                    console.log(data.ul);
                    setCards(data.ul.data);
                    setMorePages(data.ul.hasMore);
                    setPageNumber(data.ul.page);
                    setCardsPageSet(data.ul.pageSize);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(`Произошла ошибка: ${err.message}`)
                    setPageNumber(previosPage);
                    setIsLoading(false);
                })
        } else if (listname === 'Индивидуальные предприниматели') {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req, queryIp: req, page: pageNumber, mode: 'search-ip' });
            Api.getAll(requestAll.toString())
                .then((data) => {
                    console.log(data.ip);
                    setCards(data.ip.data);
                    setMorePages(data.ip.hasMore);
                    setPageNumber(data.ip.page);
                    setCardsPageSet(data.ip.pageSize);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(`Произошла ошибка: ${err.message}`)
                    setPageNumber(previosPage);
                    setIsLoading(false);
                })
        } else if (listname === 'Руководители организаций') {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req, queryUpr: req, page: pageNumber, mode: 'search-upr-uchr' });
            Api.getAll(requestAll.toString())
                .then((data) => {
                    console.log(data.upr);
                    setCards(data.upr.data);
                    setMorePages(data.upr.hasMore);
                    setPageNumber(data.upr.page);
                    setCardsPageSet(data.upr.pageSize);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(`Произошла ошибка: ${err.message}`)
                    setPageNumber(previosPage);
                    setIsLoading(false);
                })
        } else if (listname === 'Учредители организаций') {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req, queryUpr: req, page: pageNumber, mode: 'search-upr-uchr' });
            Api.getAll(requestAll.toString())
                .then((data) => {
                    console.log(data.uchr);
                    setCards(data.uchr.data);
                    setMorePages(data.uchr.hasMore);
                    setPageNumber(data.uchr.page);
                    setCardsPageSet(data.uchr.pageSize);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(`Произошла ошибка: ${err.message}`)
                    setPageNumber(previosPage);
                    setIsLoading(false);
                })
        } else {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
            Api.getAll(requestAll.toString())
                .then((data) => {
                    console.log(data.ul);
                    setCards(data.ul.data);
                    setMorePages(data.ul.hasMore);
                    setPageNumber(data.ul.page);
                    setCardsPageSet(data.ul.pageSize);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(`Произошла ошибка: ${err.message}`)
                    setPageNumber(previosPage);
                    setIsLoading(false);
                })
        }
    }

    const backPage = () => {
        setIsPageReq(true);
        setPreviosPage(pageNumber);
        setPageNumber(pageNumber - 1);
        setError('');
    }

    const nextPage = () => {
        setIsPageReq(true);
        setPreviosPage(pageNumber);
        setPageNumber(pageNumber + 1);
        setError('');
    }

    useEffect(() => {
        console.log(`страница = ${pageNumber}; предыдущая страница = ${previosPage}; запрос = ${request}`)
        isPageReq && setIsLoading(true);
        isPageReq &&
            setTimeout(() => {
                handleRequest(request);
            }, 3000)
    }, [pageNumber]);

    console.log(cards);

    return (
        <section className="cardlist">
            <h2 className="cardlist__title">{listname}</h2>
            <ul className="cardslist__container">
                {listname === "Юридические лица" && cards.map((item) => {
                    return (
                        <CardUl
                            key={item.token}
                            inn={item.inn ? item.inn : "не указан"}
                            invalid={item.invalid}
                            namec={item.namec ? item.namec : item.namep}
                            namep={item.namep}
                            okved2={item.okved2 ? item.okved2 : "ОКВЭД не указан"}
                            okved2name={item.okved2name ? item.okved2name : ""}
                            periodcode={item.periodcode}
                            regionname={item.regionname ? item.regionname : "регион не указан"}
                            token={item.token}
                            handleLoading={setIsLoading}
                            yearcode={item.yearcode}
                            listname={listname}
                            onCardClick={onUlCardClick}

                        />
                    )
                })
                }
                {listname === "Индивидуальные предприниматели" && cards.map((item) => {
                    return (
                        <CardIp
                            key={item.token}
                            inn={item.inn ? item.inn : "не указан"}
                            ogrn={item.ogrn ? item.ogrn : "не указан"}
                            namec={item.namec || ''}
                            okved2={item.okved2 ? item.okved2 : "ОКВЭД не указан"}
                            okved2name={item.okved2name ? item.okved2name : ""}
                            periodcode={item.periodcode}
                            token={item.token}
                            handleLoading={setIsLoading}
                            yearcode={item.yearcode}
                            listname={listname}
                            onCardClick={onUlCardClick}
                        />
                    )
                })
                }
                {listname === "Руководители организаций" && cards.map((item) => {
                    return (
                        <CardShh
                            key={item.token}
                            inn={item.inn ? item.inn : "не указан"}
                            token={item.token}
                            name={item.name || ''}
                            type={item.type}
                            cnt={item.ul_cnt}
                            position={item.position || ''}
                            listname={listname}
                            onCardClick={onUlCardClick}
                        />
                    )
                })
                }
                {listname === "Учредители организаций" && cards.map((item) => {
                    return (
                        <CardShh
                            key={item.token}
                            inn={item.inn ? item.inn : "не указан"}
                            token={item.token}
                            name={item.name || ''}
                            type={item.type}
                            cnt={item.ul_cnt}
                            listname={listname}
                            onCardClick={onUlCardClick}
                        />
                    )
                })
                }
            </ul>
            <div className="cardlist__btn-box">
                {
                    pageNumber > 1 &&
                    <button type="button" onClick={backPage} className="cardlist__btn cardlist__btn_type_back">&#10229; <span className="cardlist__btn-span">предыдущая страница</span></button>
                }
                {
                    morePages &&
                    <button type="button" onClick={nextPage} className="cardlist__btn cardlist__btn_type_next"><span className="cardlist__btn-span">cледующая страница</span> &#10230;</button>
                }
            </div>
            <p className="cardlist__error">{error}</p>
            <Preloader isOpen={isLoading} />
        </section>
    )
}

export default CardList;