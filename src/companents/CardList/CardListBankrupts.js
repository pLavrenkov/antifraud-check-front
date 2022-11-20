import { useEffect, useState } from "react";
import CardBankruptsCmp from "../Card/CardBankruptsCmp";
import Preloader from "../Preloader/Preloader";

import * as Api from "../../utils/bankruptsApi";
import CardBankruptsPrs from "../Card/CardBankruptsPrs";

function CardListBankrupts({ listname, cards, total, limit, offset, region, request, typecase }) {
    const [offsetPage, setOffsetPage] = useState(offset);
    const [cardsPage, setCardsPage] = useState(cards);
    const [error, setError] = useState('');
    const [pageClickCount, setPageClickCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewPage = (offsetPage) => {
        (listname === "Юридические лица и предприниматели") &&
            Api.BankruptsCmpApi(request, offsetPage, limit, typecase, region)
                .then((data) => {
                    setCardsPage(data.pageData);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setOffsetPage(offsetPage - limit);
                    setIsLoading(false);
                    setError(`Произошла ошибка: ${err.message}`);
                    console.log(err);
                })
        listname === "Физические лица" &&
            Api.BankruptsPrsApi(request, offsetPage, limit, typecase, region)
                .then((data) => {
                    setCardsPage(data.pageData);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setOffsetPage(offsetPage - limit);
                    setIsLoading(false);
                    setError(`Произошла ошибка: ${err.message}`);
                    console.log(err);
                })
    }

    const nextPage = () => {
        setOffsetPage(offsetPage + limit);
        setPageClickCount(pageClickCount + 1);
    }

    const backPage = () => {
        setOffsetPage(offsetPage - limit);
        setPageClickCount(pageClickCount + 1);
    }

    useEffect(() => {
        if (pageClickCount !== 0) {
            setIsLoading(true);
            setTimeout(() => {
                handleNewPage(offsetPage);
            }, 3000);
        }
    }, [offsetPage]);

    useEffect(() => {
        setCardsPage(cards);
        setPageClickCount(0);
        setOffsetPage(0);
    }, [request, cards])

    console.log(pageClickCount)
    console.log(`offset: ${offsetPage}`)

    return (
        <section className="cardlist">
            <h2 className="cardlist__title">{listname}</h2>
            <ul className="cardslist__container">
                {listname === "Юридические лица и предприниматели" && cardsPage.map((item) => {
                    return (
                        <CardBankruptsCmp
                            key={item.guid}
                            name={item.name}
                            inn={item.inn ? item.inn : "не указан"}
                            token={item.guid}
                            region={item.region}
                            date={'нет даты'}
                            status={'нет описания'}
                            data={item}
                            lastcase={item.lastLegalCase}
                            listname={listname}
                        />
                    )
                })
                }
                {listname === "Физические лица" && cardsPage.map((item) => {
                    return (
                        <CardBankruptsPrs
                            key={item.guid}
                            name={item.fio}
                            inn={item.inn ? item.inn : "не указан"}
                            token={item.guid}
                            region={item.region}
                            date={'нет даты'}
                            status={'нет описания'}
                            data={item}
                            lastcase={item.lastLegalCase}
                            listname={listname}
                        />
                    )
                })
                }
            </ul>
            <div className="cardlist__btn-box">
                {
                    offsetPage > 1 &&
                    <button type="button" onClick={backPage} className="cardlist__btn cardlist__btn_type_back">&#10229; <span className="cardlist__btn-span">предыдущая страница</span></button>
                }
                <p className="cardlist__btn cardlist__btn_type_middle">{`всеого ${total}, страница ${Math.ceil(offsetPage / limit + 1)} из ${Math.ceil(total / limit)}`}</p>
                {
                    (offsetPage + limit) < total &&
                    <button type="button" onClick={nextPage} className="cardlist__btn cardlist__btn_type_next"><span className="cardlist__btn-span">cледующая страница</span> &#10230;</button>
                }
            </div>
            <p className="cardlist__error">{error}</p>
            <Preloader isOpen={isLoading} />
        </section>

    )
}

export default CardListBankrupts;