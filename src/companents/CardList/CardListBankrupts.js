import CardBankruptsCmp from "../Card/CardBankruptsCmp";
import Preloader from "../Preloader/Preloader";

function CardListBankrupts({ listname, cards, total, pageNumber, backPage, nextPage, isLoading, morePages, error, offset, limit }) {


    return (
        <section className="cardlist">
            <h2 className="cardlist__title">{listname}</h2>
            <ul className="cardslist__container">
                {listname === "Юридические лица и предприниматели" && cards.map((item) => {
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

            </ul>
            <div className="cardlist__btn-box">
                {
                    offset > 1 &&
                    <button type="button" onClick={backPage} className="cardlist__btn cardlist__btn_type_back">&#10229; <span className="cardlist__btn-span">предыдущая страница</span></button>
                }
                <p className="cardlist__btn cardlist__btn_type_middle">{`всего: ${total}`}</p>
                {
                    (offset + limit) < total &&
                    <button type="button" onClick={nextPage} className="cardlist__btn cardlist__btn_type_next"><span className="cardlist__btn-span">cледующая страница</span> &#10230;</button>
                }
            </div>
            <p className="cardlist__error">{error}</p>
            <Preloader isOpen={isLoading} />
        </section>

    )
}

export default CardListBankrupts;