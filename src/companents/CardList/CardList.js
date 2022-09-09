import { useEffect, useState } from "react";
import CardUl from "../Card/CardUl";

import * as constants from "../../utils/constants";
import * as Api from "../../utils/TransBuisApi";

function CardList({ data, hasMore, page, pageSize, rowCount, listname, request }) {
    const [cards, setCards] = useState(data);
    const [morePages, setMorePages] = useState(hasMore);
    const [pageNumber, setPageNumber] = useState(page);
    const [cardsPageSet, setCardsPageSet] = useState(pageSize);

    useEffect(() => {
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
        } else {
            requestAll = new URLSearchParams({ ...constants.searchTrBuisAllRequest, queryAll: req });
        }
        Api.getAll(requestAll.toString())
            .then((data) => {
                console.log(data.ul);
                setCards(data.ul.data);
                setMorePages(data.ul.hasMore);
                setPageNumber(data.ul.page);
                setCardsPageSet(data.ul.pageSize);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const backPage = () => {
        setPageNumber(pageNumber - 1);
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
    }

    useEffect(() => {
        setTimeout(() => {
            handleRequest(request);
            console.log(pageNumber);
        }, 2000)       
    }, [pageNumber]);

    console.log(cards);
    console.log(`наличие страниц: ${morePages}, номер страницы: ${pageNumber}, количество карточек на страницу: ${cardsPageSet}`);

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
                            yearcode={item.yearcode}
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
        </section>
    )
}

export default CardList;