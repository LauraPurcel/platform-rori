"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function PersonalDataPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        api.get("/employee/me").then(res => setData(res.data));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <>
            <h2>Date personale</h2>
            <p>CNP: {data.cnp}</p>
            <p>Nume: {data.lastName}</p>
            <p>Prenume: {data.firstName}</p>
            <p>Email: {data.email}</p>
            <p>Telefon: {data.phone}</p>
            <p>Adresă: {data.address}</p>
            <p>Data nașterii: {data.birthDate}</p>
        </>
    );
}
