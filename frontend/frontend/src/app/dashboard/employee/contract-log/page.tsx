"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface ContractLog {
    eventType: string;
    timestamp: string;
    message: string;
}

export default function ContractHistoryPage() {
    const [logs, setLogs] = useState<ContractLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:8081/api/profile/me/contract-logs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLogs(res.data);
            } catch (err) {
                setError("Nu s-au putut încărca modificările contractului");
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <p className="p-6">Se încarcă...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto text-slate-800">
            <h1 className="text-2xl font-bold mb-6">Istoric modificări contract</h1>

            {logs.length === 0 && (
                <p className="text-gray-500">Nu există modificări.</p>
            )}

            <ul className="space-y-4">
                {logs.map((log, index) => (
                    <li
                        key={index}
                        className="border rounded-2xl p-4 shadow-sm bg-white"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">{log.eventType}</span>
                            <span className="text-sm text-gray-500">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-gray-700">{log.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
