import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";
import * as Api from "../../utils/bankruptsApi";
import SearchFilter from "../SearchFilter/SearchFilter";

function BancruptsPage() {
    const [request, setRequest] = useState(sessionStorage.getItem("bankruptsreq") ? sessionStorage.getItem("bankruptsreq") : '');
    const [serverMessage, setServerMessage] = useState('');
    const [prsBankrupts, setPrsBankrupts] = useState({});
    const [cmpBankrupts, setCmpBankrupts] = useState({});
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [isActive, setIsActive] = useState(null);
    const [region, setRegion] = useState('All');
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
                    console.log(data);
                    setRegionList(data);
                    sessionStorage.setItem("regionlist", JSON.stringify(data));
                })
                .catch((err) => {
                    setServerMessage(`Произошла ошибка: ${err.message}`);
                    console.log(err);
                })
        }
    }, []);

    const handleRegionSubmit = (region) => {
        setRegion(region);
    }

    const handleCaseTypeSubmit = (type) => {
        setIsActive(type);
    }

    console.log(`регион ${region}, тип дела ${isActive}`)

    return (
        <section className="bankruptspage">
            <h1 className="bankruptspage__title">БАНКРОТЫ</h1>
            <SearchForm onSubmit={handleSubmit} request={request} message={serverMessage} />
            <SearchFilter onRegion={handleRegionSubmit} onCaseType={handleCaseTypeSubmit} regionList={regionList} />
            <LoaderAnimation isOpen={isLoaderOpen} />
        </section>
    )
}

export default BancruptsPage;