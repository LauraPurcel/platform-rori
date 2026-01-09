"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

/* Utils */
const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
};

const calculateDaysBetween = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);
    return Math.floor((e.getTime() - s.getTime()) / 86400000) + 1;
};

export default function LeaveRequestPage() {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });

    const [remainingDays, setRemainingDays] = useState(0);
    const [requestedDays, setRequestedDays] = useState(0);
    const [error, setError] = useState("");

    const router = useRouter();
    const tomorrow = getTomorrow();

    useEffect(() => {
        api.get("/api/leave/balance")
            .then(res => setRemainingDays(res.data.remainingDays))
            .catch(() => setRemainingDays(0));
    }, []);

    const validateDates = (start: string, end?: string) => {
        if (!start) return "Data de început este obligatorie.";

        const s = new Date(start);
        s.setHours(0, 0, 0, 0);

        if (s < tomorrow) {
            return "Concediul trebuie să înceapă cel puțin de mâine.";
        }

        if (end) {
            const e = new Date(end);
            e.setHours(0, 0, 0, 0);
            if (e < s) {
                return "Data de sfârșit nu poate fi înainte de cea de început.";
            }
        }

        return "";
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (error || requestedDays === 0) return;

        if (requestedDays > remainingDays) {
            setError("Nu ai suficiente zile de concediu disponibile.");
            return;
        }

        try {
            await api.post("/api/leave/request", {
                ...formData,
                paid: true,
            });
            router.push("/dashboard/employee");
        } catch {
            setError("Eroare la trimiterea cererii.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-slate-900">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-black mb-8">Cerere Concediu</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="date"
                            className="border rounded-xl p-3"
                            onChange={e => {
                                const start = e.target.value;
                                setFormData({ ...formData, startDate: start });

                                const err = validateDates(start, formData.endDate);
                                setError(err);

                                if (!err && formData.endDate) {
                                    setRequestedDays(
                                        calculateDaysBetween(start, formData.endDate)
                                    );
                                }
                            }}
                        />

                        <input
                            type="date"
                            className="border rounded-xl p-3"
                            onChange={e => {
                                const end = e.target.value;
                                setFormData({ ...formData, endDate: end });

                                const err = validateDates(formData.startDate, end);
                                setError(err);

                                if (!err && formData.startDate) {
                                    setRequestedDays(
                                        calculateDaysBetween(formData.startDate, end)
                                    );
                                }
                            }}
                        />
                    </div>

                    <textarea
                        rows={3}
                        className="w-full border rounded-xl p-3"
                        placeholder="Motiv (opțional)"
                        onChange={e =>
                            setFormData({ ...formData, reason: e.target.value })
                        }
                    />

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        Zile solicitate: <strong>{requestedDays}</strong> /{" "}
                        {remainingDays}
                    </div>

                    <button
                        type="submit"
                        disabled={!!error || requestedDays === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400
                                   text-white font-bold py-4 rounded-xl transition"
                    >
                        Trimite cererea
                    </button>
                </form>
            </div>
        </div>
    );
}
