"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function EmployeeSalaryPage() {
    const [salary, setSalary] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [noContract, setNoContract] = useState(false);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSalary();
        loadLogs();
    }, []);

    const loadSalary = async () => {
        const res = await api.get("/api/profile/me/salary");
        setSalary(res.data);
    };

    const loadLogs = async () => {
        const res = await api.get("/api/profile/me/contract-logs");
        setLogs(res.data);
    };

    if (!salary) return <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Contract de muncă inexistent
            </h2>

            <p className="text-gray-600 leading-relaxed">
                În acest moment nu există un contract de muncă activ asociat
                contului tău, de aceea datele salariale nu pot fi afișate.
            </p>
        </div>
    </div>
;

    return (
        <div className="space-y-10 text-slate-800">
            <h1 className="text-2xl font-bold">Date salariale</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Job title</p>
                    <p>{salary.jobTitle}</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Ore lucrate</p>
                    <p>{salary.workingHours}</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Salariu brut</p>
                    <p>{salary.grossSalary.toFixed(2)} RON</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Salariu net</p>
                    <p>{salary.netSalary.toFixed(2)} RON</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">CAS</p>
                    <p>{salary.casContribution.toFixed(2)} RON</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">CNAS</p>
                    <p>{salary.cnasContribution.toFixed(2)} RON</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Taxe</p>
                    <p>{salary.tax.toFixed(2)} RON</p>
                </div>
                <div className="p-4 border rounded bg-white">
                    <p className="font-semibold">Zile concediu rămase</p>
                    <p>{salary.paidLeaveDaysLeft}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-10">Istoric modificări HR</h2>
            {logs.length === 0 && <p>Nu există modificări.</p>}
            <div className="space-y-3 mt-4">
                {logs.map(log => (
                    <div key={log.id} className="p-4 border rounded bg-gray-50">
                        <p className="font-semibold">{log.action}</p>
                        <p className="text-sm text-gray-600">{new Date(log.timestamp).toLocaleString()}</p>
                        <p>{log.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
