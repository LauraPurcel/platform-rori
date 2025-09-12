import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const API_URL = https://platform-rori.onrender.com as string;

        fetch(`${API_URL}/api/message`)
            .then(res => res.text())
            .then(data => setMessage(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>{message || "Loading..."}</h1>
        </div>
    );
}

export default App;

