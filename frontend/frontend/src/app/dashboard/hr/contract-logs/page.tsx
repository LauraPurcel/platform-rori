"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRContractLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        const res = await api.get("/hr/contract-logs");
        setLogs(res.data);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-slate-800">
                Istoric modificări contracte
            </h1>

            <table className="w-full border text-slate-800">
                <thead>
                    <tr className="bg-gray-100 text-slate-800">
                        <th className="border p-2">Angajat</th>                   
                        <th className="border p-2">Acțiune</th>
                        <th className="border p-2">Dată</th>
                        <th className="border p-2">Detalii</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td className="border p-2">
                                {log.employeeName}
                            </td>
                            <td className="border p-2 font-semibold">
                                {log.eventType}
                            </td>
                            <td className="border p-2">
                                {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="border p-2">
                                {log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {logs.length === 0 && (
                <p className="mt-4">Nu există modificări înregistrate.</p>
            )}
        </div>
    );
}
