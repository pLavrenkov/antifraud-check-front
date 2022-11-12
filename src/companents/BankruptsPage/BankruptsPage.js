import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";

function BancruptsPage() {
    const [request, setRequest] = useState('петров');
    const [serverMessage, setServerMessage] = useState('');
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    const handleRequest = (req) => {
        setServerMessage('');
        const searchString = new URLSearchParams(req);
        
    }

    const handleSubmit = (data) => {
        setRequest(data.search);
        setIsLoaderOpen(true);
        sessionStorage.setItem("trbuisreq", data.search);
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