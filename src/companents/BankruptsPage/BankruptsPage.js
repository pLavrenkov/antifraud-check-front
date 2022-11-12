import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import * as Api from "../../utils/bankruptsApi";

function BancruptsPage() {
    const [request, setRequest] = useState(sessionStorage.getItem("bankruptsreq") ? sessionStorage.getItem("bankruptsreq") : '');
    const [serverMessage, setServerMessage] = useState('');
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    const handleRequest = (req) => {
        setServerMessage('');
        Api.BankruptsPrsApi(req)
        .then(data => console.log(data))
        const searchString = new URLSearchParams(req);
    }

    const handleSubmit = (data) => {
        setRequest(data.search);
        setIsLoaderOpen(true);
        sessionStorage.setItem("bankruptsreq", data.search);
        setTimeout(() => handleRequest(data.search), 2000);
    }

    return (
        <section className="bankruptspage">
            <h1 className="bankruptspage__title">БАНКРОТЫ</h1>
            <SearchForm onSubmit={handleSubmit} request={request} message={serverMessage} />
        </section>
    )
}

export default BancruptsPage;