import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";
import * as Api from "../../utils/bankruptsApi";

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

    return (
        <section className="bankruptspage">
            <h1 className="bankruptspage__title">БАНКРОТЫ</h1>
            <SearchForm onSubmit={handleSubmit} request={request} message={serverMessage} />
            <LoaderAnimation isOpen={isLoaderOpen} />
        </section>
    )
}

export default BancruptsPage;