"use client";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function OfficeReservationPage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleReserve = async () => {
        if (!selectedDate) return alert("Te rugăm să alegi o dată!");

        setLoading(true);
        try {
            await api.post("/api/office/reserve", { date: selectedDate });
            alert("Rezervare confirmată! Te așteptăm la birou.");
            router.push("/dashboard/employee");
        } catch (err: any) {
            alert(err.response?.data?.message || "Nu s-a putut efectua rezervarea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                {/* Header Estetic */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-emerald-100 rounded-2xl text-emerald-600 mb-4">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-slate-800">Loc la Birou</h1>
                    <p className="text-slate-500 mt-2">Capacitate limitată: 20 locuri/zi</p>
                </div>

                {/* Formular de rezervare */}
                <div className="space-y-6">
                    <div className="relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                            Alege Ziua
                        </label>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]} // Nu poți rezerva în trecut
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-emerald-500 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                        <p className="text-amber-800 text-sm leading-relaxed">
                            <strong>Notă:</strong> Rezervările se aprobă automat în limita locurilor disponibile. Locul tău este garantat după confirmare.
                        </p>
                    </div>

                    <button
                        onClick={handleReserve}
                        disabled={loading}
                        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${loading ? 'bg-slate-400' : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-200'
                            }`}
                    >
                        {loading ? "Se procesează..." : "Rezervă Locul"}
                    </button>
                </div>
            </div>
        </div>
    );
}