"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRLeaveManagement() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRequests = async () => {
        try {
            setError(null); 
            const res = await api.get("/hr/leaves/pending");
            setRequests(res.data);
            setLoading(false);
        } catch (err: any) {
            console.error("Eroare la încărcarea cererilor", err);
            setError("Nu s-au putut încărca cererile.");
            setLoading(false);
        }
    };

    useEffect(() => { loadRequests(); }, []);

    const handleAction = async (id: number, action: "approve" | "reject") => {
        try {
            setError(null);
            await api.post(`/hr/leave/${id}/${action}`);
            alert(`Cerere ${action === "approve" ? "aprobată" : "respinsă"}!`);
            loadRequests(); 
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || "Eroare la procesarea cererii";
            setError(msg);
        }
    };

    if (loading) return <p className="p-10 text-center">Se încarcă cererile...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestionare Cereri Concediu</h1>

            {/* Afișare eroare */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                    {error}
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3 border-b text-left">Angajat</th>
                            <th className="px-5 py-3 border-b text-left">Perioada</th>
                            <th className="px-5 py-3 border-b text-left">Motiv</th>
                            <th className="px-5 py-3 border-b text-center">Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req: any) => (
                            <tr key={req.id} className="hover:bg-gray-50">
                                <td className="px-5 py-5 border-b text-sm">
                                    {req.employee.lastName} {req.employee.firstName}
                                </td>
                                <td className="px-5 py-5 border-b text-sm">
                                    {req.startDate} {" -> "} {req.endDate}
                                </td>
                                <td className="px-5 py-5 border-b text-sm">
                                    {req.reason}
                                </td>
                                <td className="px-5 py-5 border-b text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => handleAction(req.id, "approve")}
                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 font-bold"
                                    >
                                        Aprobă
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, "reject")}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 font-bold"
                                    >
                                        Respinge
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-5 py-10 text-center text-gray-400">
                                    Nu există cereri în așteptare.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
