"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types"; 

export default function ProfilePage() {
    const [details, setDetails] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const TEST_ENDPOINT = `http://localhost:8080/api/test/db-connection`; 

        fetch(TEST_ENDPOINT)
        .then((res) => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text) });
            }
            return res.json();
        })
        .then((data: User) => {
            setDetails(data);
        })
        .catch((err) => {
            console.error("Fetch Error:", err);
            setError(`[Eroare Backend] ${err.message}`); 
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return <p style={{ padding: 20 }}>Se încarcă datele din DB...</p>;
    if (error) return <p style={{ padding: 20, color: 'red' }}>Eroare de conexiune/backend: {error}</p>;
    if (!details) return <p style={{ padding: 20 }}>Nu s-au găsit detalii (verifică baza de date).</p>;

    return (
        <div style={{ padding: 20, maxWidth: 600, margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ borderBottom: '2px solid #0070f3', paddingBottom: '10px', marginBottom: '20px' }}>Date personale (Test Conexiune DB)</h2>

            <p><strong>Nume:</strong> {details.firstName} {details.lastName}</p>
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Telefon:</strong> {details.phone}</p>
            <p><strong>Adresă:</strong> {details.address}</p>
            
            <p><strong>CNP:</strong> {details.cnp}</p> 
           
            <p style={{ marginTop: '20px', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
                <strong>Rol:</strong> {details.role?.name ?? "N/A"}
            </p>
            <p>
                <strong>Departament:</strong> {details.department?.name ?? "N/A"}
            </p>
            <p style={{ color: 'orange', fontWeight: 'bold' }}>
                Aceste date provin direct din DB via `/api/test/db-connection`.
            </p>
        </div>
    );
}