"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types"; 

export default function ProfilePage() {
    const [details, setDetails] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            setError("Nu sunteți autentificat.");
            setLoading(false);
            return;
        }
        fetch(`http://localhost:8080/api/users/me`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    throw new Error("Sesiune expirată sau token invalid.");
                }
                throw new Error("Eroare la preluarea datelor.");
            }
            return res.json();
        })
        .then((data: User) => {
            setDetails(data);
        })
        .catch((err) => {
            console.error("Fetch Error:", err);
            setError(err.message || "Nu s-au putut prelua datele.");
        })
        .finally(() => {
            setLoading(false);
        });
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
            <p><strong>Data nașterii:</strong> {details.dateOfBirth ? details.dateOfBirth.toString() : 'N/A'}</p>
            <p><strong>Data angajării:</strong> {details.hireDate ? details.hireDate.toString() : 'N/A'}</p>
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