"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

/* Utils */
const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
};

const formatDate = (d: Date) => d.toISOString().split("T")[0];

export default function OfficeReservationPage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const tomorrow = getTomorrow();

    const validateDate = (date: string) => {
        if (!date) return "Te rugăm să alegi o dată.";
        const chosen = new Date(date);
        chosen.setHours(0, 0, 0, 0);

        if (chosen < tomorrow) {
            return "Data trebuie să fie cel puțin ziua de mâine.";
        }
        return "";
    };

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
        setError(validateDate(value));
    };

    const handleReserve = async () => {
        const validationError = validateDate(selectedDate);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/office/reserve", { date: selectedDate });
            router.push("/dashboard/employee");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Nu s-a putut efectua rezervarea."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-emerald-100 rounded-2xl text-emerald-600 mb-4">
                        🏢
                    </div>
                    <h1 className="text-3xl font-black">Rezervare Loc la Birou</h1>
                    <p className="text-slate-500 mt-2">
                        Capacitate limitată: 20 locuri / zi
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 text-slate-400">
                            Alege data
                        </label>
                        <input
                            type="date"
                            min={formatDate(tomorrow)}
                            className="w-full bg-slate-50 border-2 rounded-2xl p-4
                                       focus:border-emerald-500 outline-none"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}
                    </div>

                    <button
                        onClick={handleReserve}
                        disabled={loading || !!error}
                        className={`w-full py-4 rounded-2xl text-white font-bold transition
                            ${loading || error
                                ? "bg-slate-400"
                                : "bg-emerald-500 hover:bg-emerald-600"
                            }`}
                    >
                        {loading ? "Se procesează..." : "Rezervă locul"}
                    </button>
                </div>
            </div>
        </div>
    );
}
