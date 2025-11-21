"use client";

import { useEffect, useState } from "react";
// Importati tipul User corect (asumat din fisierul types.ts)
// ATENȚIE: Trebuie să definești corect structura User în types.ts pentru a include
// câmpurile complexe precum role și department.
import type { User } from "@/types";

// --- DATE MOC SIMULATE PENTRU TESTARE VIZUALĂ ---
const MOCK_USER_DETAILS: User = {
    id: 1,
    firstName: "Ion",
    lastName: "Popescu",
    cnp: "1901234567890",
    dateOfBirth: new Date("1990-05-15").toISOString(),
    phone: "0722 123 456",
    email: "ion.popescu@company.com",
    address: "Strada Exemplului, Nr. 10, București",
    passwordHash: "********", // Nu se afișează
    hireDate: new Date("2020-01-15").toISOString(),
    active: true,
    // Asumând că tipul User din types.ts include Role și Department
    role: { id: 2, name: "MANAGER" }, 
    department: { id: 5, name: "Dezvoltare Software" },
};
// ----------------------------------------------------


export default function ProfilePage() {
    // Schimbăm starea inițială la datele simulate și loading la false
    const [details, setDetails] = useState<User | null>(MOCK_USER_DETAILS);
    const [loading, setLoading] = useState(false); // Setează direct pe false
    const [error, setError] = useState<string | null>(null);

    // Folosim useEffect doar pentru a simula o mică întârziere (opțional)
    // și pentru a te obișnui să folosești useEffect la inițializarea datelor.
    // În acest mod, logica de fetch a fost complet eliminată.
    useEffect(() => {
        // Simulează o mică întârziere pentru a vedea starea "Se încarcă"
        // Dacă vrei să vezi direct datele, poți șterge tot conținutul acestui useEffect.
        setLoading(true);
        const timer = setTimeout(() => {
            setDetails(MOCK_USER_DETAILS);
            setLoading(false);
        }, 500); // Se încarcă datele simulate după 500ms

        return () => clearTimeout(timer); // Curăță timer-ul la demontare
    }, []);

    // Restul codului de afișare rămâne neschimbat

    if (loading) return <p style={{ padding: 20 }}>Se încarcă datele...</p>;
    if (error) return <p style={{ padding: 20, color: 'red' }}>Eroare: {error}</p>;
    if (!details) return <p style={{ padding: 20 }}>Nu s-au găsit detalii.</p>;

    // ATENȚIE: Proprietățile care sunt de tip Date în TypeScript 
    // trebuie convertite la string pentru a fi afișate corect în JSX.

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