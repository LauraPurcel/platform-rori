"use client";

import { useEffect, useState } from "react";

import type { User } from "@/types";

const MOCK_USER_DETAILS: User = {
    id: 1,
    firstName: "Ion",
    lastName: "Popescu",
    cnp: "1901234567890",
    dateOfBirth: new Date("1990-05-15").toISOString(),
    phone: "0722 123 456",
    email: "ion.popescu@company.com",
    address: "Strada Exemplului, Nr. 10, București",
    passwordHash: "********", 
    hireDate: new Date("2020-01-15").toISOString(),
    active: true,
    role: { id: 2, name: "MANAGER" }, 
    department: { id: 5, name: "Dezvoltare Software" },
};


export default function ProfilePage() {
    const [details, setDetails] = useState<User | null>(MOCK_USER_DETAILS);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      
        setLoading(true);
        const timer = setTimeout(() => {
            setDetails(MOCK_USER_DETAILS);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); 
    }, []);

    if (loading) return <p style={{ padding: 20 }}>Se încarcă datele...</p>;
    if (error) return <p style={{ padding: 20, color: 'red' }}>Eroare: {error}</p>;
    if (!details) return <p style={{ padding: 20 }}>Nu s-au găsit detalii.</p>;

    return (
        <div style={{ padding: 20, maxWidth: 600, margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ borderBottom: '2px solid #0070f3', paddingBottom: '10px', marginBottom: '20px' }}>Date personale</h2>

            <p><strong>Nume:</strong> {details.firstName} {details.lastName}</p>
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Telefon:</strong> {details.phone}</p>
            <p><strong>Adresă:</strong> {details.address}</p>
            
            <p><strong>CNP:</strong> {details.cnp}</p> 
            <p><strong>Data nașterii:</strong> {details.dateOfBirth ? details.dateOfBirth : 'N/A'}</p>
            <p><strong>Data angajării:</strong> {details.hireDate ? details.hireDate: 'N/A'}</p>
            <p><strong>Stare:</strong> {details.active ? "Activ" : "Inactiv"}</p>

            <p style={{ marginTop: '20px', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
                <strong>Rol:</strong> {details.role?.name ?? "N/A"}
            </p>
            <p>
                <strong>Departament:</strong> {details.department?.name ?? "N/A"}
            </p>
        </div>
    );
}