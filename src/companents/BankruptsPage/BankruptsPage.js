import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";
import * as Api from "../../utils/bankruptsApi";
import SearchFilter from "../SearchFilter/SearchFilter";
import CardListBankrupts from "../CardList/CardListBankrupts";

function BancruptsPage() {
    const [request, setRequest] = useState(sessionStorage.getItem("bankruptsreq") ? sessionStorage.getItem("bankruptsreq") : '');
    const [serverMessage, setServerMessage] = useState('');
    const [prsBankrupts, setPrsBankrupts] = useState({});
    const [cmpBankrupts, setCmpBankrupts] = useState({});
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [isActive, setIsActive] = useState(sessionStorage.getItem("type") ? sessionStorage.getItem("type") : null);
    const [region, setRegion] = useState(sessionStorage.getItem("region") ? sessionStorage.getItem("region") : 'All');
    const [regionList, setRegionList] = useState(sessionStorage.getItem("regionlist") ? JSON.parse(sessionStorage.getItem("regionlist")) : {});


    const handleRequest = (req, offset, limit, isActive, region) => {
        setServerMessage('');
        Promise.all([
            Api.BankruptsCmpApi(req, offset, limit, isActive, region),
            Api.BankruptsPrsApi(req, offset, limit, isActive, region)
        ])
            .then((data) => {
                console.log(data);
                setCmpBankrupts(data[0]);
                setPrsBankrupts(data[1]);
                setIsLoaderOpen(false);
            })
            .catch((err) => {
                setIsLoaderOpen(false);
                setServerMessage(`Произошла ошибка: ${err.message}`);
                console.log(err);
            })
    }

    const handleSubmit = (data) => {
        setRequest(data.search);
        setIsLoaderOpen(true);
        sessionStorage.setItem("bankruptsreq", data.search);
        setTimeout(() => handleRequest(data.search, offset, limit, isActive, region), 2000);
    }

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("regionlist"))) {
            setRegionList(JSON.parse(sessionStorage.getItem("regionlist")));
        } else {
            Api.BankruptsRegionApi()
                .then((data) => {
                    setRegionList(data);
                    sessionStorage.setItem("regionlist", JSON.stringify(data));
                })
                .catch((err) => {
                    setServerMessage(`Произошла ошибка: ${err.message}`);
                    console.log(err);
                })
        }
        sessionStorage.getItem("bankruptsreq") && handleRequest(request, offset, limit, isActive, region);
        Api.BankruptsCookieApi();
    }, []);

    const handleRegionSubmit = (region) => {
        setRegion(region);
        sessionStorage.setItem("region", region);
    }

    const handleResetRegion = () => {
        setRegion("All");
        sessionStorage.setItem("region", 'All');
    }

    const handleCaseTypeSubmit = (type) => {
        setIsActive(type);
        sessionStorage.setItem("type", type);
    }

    const handleResetType = () => {
        setIsActive(null);
        sessionStorage.setItem("type", null);
    }

    console.log(`регион ${region}, тип дела ${isActive}`)
    console.log(cmpBankrupts);

    return (
        <section className="bankruptspage">
            <h1 className="bankruptspage__title">БАНКРОТЫ</h1>
            <SearchFilter
                onRegion={handleRegionSubmit}
                onCaseType={handleCaseTypeSubmit}
                regionList={regionList}
                resetType={handleResetType}
                resetRegion={handleResetRegion}
                type={isActive}

            />
            <SearchForm onSubmit={handleSubmit} request={request} message={serverMessage} />

            {
                cmpBankrupts.pageData && cmpBankrupts.pageData.length > 0 ?
                    <CardListBankrupts
                        listname={"Юридические лица и предприниматели"}
                        cards={cmpBankrupts.pageData}
                        total={cmpBankrupts.total}
                        offset={offset}
                        limit={limit}
                        request={request}
                        region={region}
                        typecase={isActive}
                    />
                    :
                    <p className="trans-buisness__nth-found">{request && 'Юридические лица и предприниматели: результаты не найдены'}</p>
            }
            {
                prsBankrupts.pageData && prsBankrupts.pageData.length > 0 ?
                    <CardListBankrupts
                        listname={"Физические лица"}
                        cards={prsBankrupts.pageData}
                        total={prsBankrupts.total}
                        offset={offset}
                        limit={limit}
                        request={request}
                        region={region}
                        typecase={isActive}
                    />
                    :
                    <p className="trans-buisness__nth-found">{request && 'Физические лица: результаты не найдены'}</p>
            }
            <LoaderAnimation isOpen={isLoaderOpen} />
        </section>
    )
}

export default BancruptsPage;