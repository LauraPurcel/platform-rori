"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

export default function EmployeeDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/profile/me")
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-8">Se încarcă...</p>;
    if (!data) return <p className="p-8">Nu s-au găsit date.</p>;

    const { employee, contract } = data;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {employee.firstName[0]}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        Bun venit, {employee.firstName}
                    </h1>
                    <p className="text-slate-500">Dashboard angajat</p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date personale */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-slate-700">📄 Date Personale</h2>
                    <ul className="space-y-2 text-slate-600">
                        <li><strong>Nume:</strong> {employee.lastName} {employee.firstName}</li>
                        <li><strong>CNP:</strong> {employee.cnp}</li>
                        <li><strong>Email:</strong> {employee.user.email}</li>
                        <li><strong>Telefon:</strong> {employee.phone || "—"}</li>
                        <li><strong>Adresă:</strong> {employee.address || "—"}</li>
                    </ul>
                </div>

                {/* Contract */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-900">💼 Contract</h2>
                    {contract ? (
                        <ul className="space-y-2 text-blue-900">
                            <li><strong>Funcție:</strong> {contract.jobTitle}</li>
                            <li><strong>Salariu:</strong> {contract.baseSalary} RON</li>
                            <li><strong>Program:</strong> {contract.workingHours}h / săptămână</li>
                            <li>
                                <strong>Concediu:</strong>{" "}
                                {contract.paidLeaveDaysLeft} / {contract.paidLeaveDaysTotal}
                            </li>
                        </ul>
                    ) : (
                        <p className="text-orange-600 font-medium">
                            Contractul nu a fost încă generat de HR.
                        </p>
                    )}
                </div>
            </div>

            {/* Acțiuni */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/employee/leave">
                    <div className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 shadow-lg transition">
                        <h3 className="text-lg font-bold">🌴 Cere Concediu</h3>
                        <p className="text-sm opacity-90 mt-1">Trimite o cerere de concediu</p>
                    </div>
                </Link>

                <Link href="/dashboard/employee/office">
                    <div className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-6 shadow-lg transition">
                        <h3 className="text-lg font-bold">🏢 Rezervă Birou</h3>
                        <p className="text-sm opacity-90 mt-1">Alege o zi pentru birou</p>
                    </div>
                </Link>

                <Link href="/dashboard/employee/salary">
                    <div className="cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 shadow-lg transition">
                        <h3 className="text-lg font-bold">🏢 Salariu</h3>
                        <p className="text-sm opacity-90 mt-1">Date salariu</p>
                    </div>
                </Link>

            </div>
        </div>
    );
}
